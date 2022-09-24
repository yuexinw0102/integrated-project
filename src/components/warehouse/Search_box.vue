<template>
  <el-form
    ref="resetForm"
    :model="query_form"
    label-width="auto"
    :inline="true"
  >
    <el-form-item prop="name">
      <el-input
        v-model="query_form.name"
        style="width: 200px"
        size="small"
        placeholder="仓库名称"
      ></el-input>
    </el-form-item>

    <el-form-item prop="city">
      <el-select v-model="query_form.city" placeholder="所在城市" size="small">
        <el-option
          v-for="(item, index) in city"
          :key="index"
          :label="item.label"
          :value="item.label"
        >
          <span style="float: left">{{ item.label }}</span>
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item prop="area">
      <el-select v-model="query_form.area" placeholder="所在区域" size="small">
        <el-option
          v-for="(item, index) in area"
          :key="index"
          :label="item.label"
          :value="item.label"
        >
          <span style="float: left">{{ item.label }}</span>
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item prop="acreage">
      <el-input
        v-model.number="query_form.acreage"
        style="width: 200px"
        size="small"
        placeholder="仓库面积 ~ 仓库面积"
      ></el-input>
    </el-form-item>

    <el-form-item prop="community">
      <el-input
        v-model.number="query_form.community"
        style="width: 200px"
        size="small"
        placeholder="关联小区数"
      ></el-input>
    </el-form-item>

    <el-form-item prop="rider">
      <el-input
        v-model.number="query_form.rider"
        style="width: 200px"
        size="small"
        placeholder="骑手数"
      ></el-input>
    </el-form-item>

    <el-form-item prop="sorting">
      <el-input
        v-model.number="query_form.sorting"
        style="width: 205px"
        size="small"
        placeholder="分拣员数"
      ></el-input>
    </el-form-item>

    <el-form-item>
      <el-button size="small" type="primary" @click="submitForm()"
        >查询</el-button
      >
      <el-button size="small" @click="resetForm('resetForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<style>
.el-form-item {
  margin-bottom: 0;
}
</style>

<script>
import bus from "@/eventBus/eventBus";
import warehouse from "@/axios/warehouse";

export default {
  data() {
    return {
      area: [],
      city: [],
      tableData: [],
      showData: [],
      query_form: {
        city: "",
        area: "",
        name: "",
        acreage: "",
        community: "",
        rider: "",
        sorting: "",
      },
    };
  },
  created() {
    warehouse.search().then(({ data }) => {
      if (data.status == "success") {
        this.tableData = data.data;
        this.showData = this.tableData;
        this.handlerGetBox();
      }
    });
    warehouse.searchCommunity().then(({ data }) => {
      if (data.status == "success") {
        this.showData.forEach((item) => {
          data.data.forEach((item1) => {
            if (item.id == item1.warehouseId) {
              item.community = item1.community;
            }
          });
        });
      }
    });
    warehouse.searchRider().then(({ data }) => {
      if (data.status == "success") {
        this.showData.forEach((item) => {
          data.data.forEach((item1) => {
            if (item.id == item1.warehouseId) {
              item.rider = item1.rider;
            }
          });
        });
      }
    });
    warehouse.searchSorting().then(({ data }) => {
      if (data.status == "success") {
        this.showData.forEach((item) => {
          data.data.forEach((item1) => {
            if (item.id == item1.warehouseId) {
              item.sorting = item1.sorting;
            }
          });
        });
      }
    });
  },
  mounted() {},
  methods: {
    //获取所有城市和区域数据并去重
    handlerGetBox() {
      let city = [];
      let area = [];
      this.showData.forEach((item, index) => {
        city.push({ label: item.city, disabled: false });
        area.push({ label: item.area, disabled: false });
      });
      let obj = {};
      this.city = city.reduce(function (item, next) {
        obj[next.label] ? "" : (obj[next.label] = true && item.push(next));
        return item;
      }, []);
      this.area = area.reduce(function (item, next) {
        obj[next.label] ? "" : (obj[next.label] = true && item.push(next));
        return item;
      }, []);
    },
    submitForm() {
      warehouse
        .doSearch(this.query_form)
        .then(({ data }) => {
          console.log("handelSearch 查询", data);
          this.showData = data.data;
          console.log("handelSearch searchList", this.showData);
        })
        .catch((err) => {
          console.log("search err--", err);
          this.$message.error("Error error搜索失败");
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      bus.$emit("warehouse_query_form", null);
    },
  },
  watch: {
    showData: function (newVal, oldVal) {
      if (newVal != oldVal) {
        bus.$emit("warehouse_query_form", newVal);
      }
    },
    area: function (val) {
      if (val == []) {
        this.handlerGetBox;
      }
    },
    city: function (val) {
      if (val == []) {
        this.handlerGetBox;
      }
    },
  },
};
</script>
