<template>
  <el-form
    ref="resetForm"
    :model="query_form"
    label-width="auto"
    :inline="true"
  >
    <el-form-item prop="id">
      <el-input
        v-model="query_form.id"
        style="width: 200px"
        size="small"
        placeholder="订单编号"
      ></el-input>
    </el-form-item>

    <el-form-item prop="state">
      <el-select
        v-model="query_form.sortingState"
        placeholder="分拣状态"
        size="small"
      >
        <el-option
          v-for="(item, index) in options"
          :key="index.value"
          :label="item.label"
          :value="item.value"
        >
          <span style="float: left">{{ item.label }}</span>
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item prop="timeLength">
      <el-input
        v-model.number="query_form.sortingTime"
        style="width: 200px"
        size="small"
        placeholder="分拣时长"
      ></el-input>
    </el-form-item>

    <el-form-item prop="city">
      <el-select v-model="query_form.city" placeholder="所在城市" size="small">
        <el-option
          v-for="(item, index) in city"
          :key="index"
          :label="item"
          :value="item"
        >
          <span style="float: left">{{ item }}</span>
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item prop="area">
      <el-select v-model="query_form.area" placeholder="所在区域" size="small">
        <el-option
          v-for="(item, index) in area"
          :key="index"
          :label="item"
          :value="item"
        >
          <span style="float: left">{{ item }}</span>
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item prop="time">
      <el-date-picker
        v-model="query_form.time"
        type="datetime"
        value-format="yyyy-MM-dd HH:mm:ss"
        size="small"
        placeholder="下单时间"
      >
      </el-date-picker>
    </el-form-item>

    <el-form-item prop="quantity">
      <el-input
        v-model="query_form.quantity"
        style="width: 200px"
        size="small"
        placeholder="商品数量"
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
import order from "@/axios/order";
import warehouseSorting from "@/axios/warehouseSorting";

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
        id: "",
        time: "",
        quantity: "",
        sortingTime: "",
        sortingState: "",
      },
      options: [
        { value: "1", label: "已分拣" },
        { value: "0", label: "未分拣" },
      ],
    };
  },
  async created() {
    let data = await order.search();
    let data1 = await warehouse.search();

    if (data.data.status == "success" && data1.data.status == "success") {
      this.tableData = data.data.data;
      this.showData = this.tableData;
      this.showData.forEach((item) => {
        if (item.state == "1") {
          item.state = "已分拣";
        } else if (item.state == "0") {
          item.state = "未分拣";
        }
        data1.data.data.forEach((item1) => {
          if (item.warehouseId == item1.id) {
            item.warehouse = item1.name;
            item.city = item1.city;
            item.area = item1.area;
          }
        });
        const moment = require("moment");
        item.time = moment(item.time).format("Y-MM-DD HH:mm:ss");
      });
    }
    this.handlerGetBox();
  },
  methods: {
    //获取所有城市和区域数据并去重
    handlerGetBox() {
      let city = [];
      let area = [];
      this.showData.forEach((item, index) => {
        city.push(item.city);
        area.push(item.area);
      });
      this.city = [...new Set(city)];
      this.area = [...new Set(area)];
    },
    submitForm() {
      sorting
        .doSearch(this.query_form)
        .then(({ data }) => {
          this.showData = data.data;
        })
        .catch((err) => {
          this.$message.error("Error error搜索失败");
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      bus.$emit("warehouse_query_form", null);
    },
  },
  watch: {
    showData: async function (newVal, oldVal) {
      if (newVal != oldVal) {
        bus.$emit("warehouse_query_form", newVal);
        let data1 = await warehouse.search();
        let data2 = await warehouseSorting.search();

        if (data1.data.status == "success" && data2.data.status == "success") {
          this.showData.forEach((item) => {
            if (item.state == "1") {
              item.state = "已分拣";
            } else if (item.state == "0") {
              item.state = "未分拣";
            }
            data1.data.data.forEach((item1) => {
              if (item.warehouseId == item1.id) {
                item.warehouse = item1.name;
                item.city = item1.city;
                item.area = item1.area;
              }
            });
            data2.data.data.forEach((item1) => {
              if (item.warehouseId == item1.warehouseId) {
                item.sorting = item1.name;
              }
            });
          });
        }
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
