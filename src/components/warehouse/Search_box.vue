<template>
  <el-form
    ref="resetForm"
    :model="query_form"
    label-width="auto"
    :inline="true"
  >
    <el-form-item prop="input_name">
      <el-input
        v-model="query_form.input_name"
        style="width: 200px"
        size="small"
        placeholder="仓库名称"
      ></el-input>
    </el-form-item>

    <el-form-item prop="city_value">
      <el-select
        v-model="query_form.city_value"
        placeholder="所在城市"
        size="small"
      >
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

    <el-form-item prop="area_value">
      <el-select
        v-model="query_form.area_value"
        placeholder="所在区域"
        size="small"
      >
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

    <el-form-item prop="input_acreage">
      <el-input
        v-model.number="query_form.input_acreage"
        style="width: 200px"
        size="small"
        placeholder="仓库面积 ~ 仓库面积"
      ></el-input>
    </el-form-item>

    <el-form-item prop="input_community">
      <el-input
        v-model.number="query_form.input_community"
        style="width: 200px"
        size="small"
        placeholder="关联小区数 ~ 关联小区数"
      ></el-input>
    </el-form-item>

    <el-form-item prop="input_rider">
      <el-input
        v-model.number="query_form.input_rider"
        style="width: 200px"
        size="small"
        placeholder="骑手数 ~ 骑手数"
      ></el-input>
    </el-form-item>

    <el-form-item prop="input_sorting">
      <el-input
        v-model.number="query_form.input_sorting"
        style="width: 205px"
        size="small"
        placeholder="分拣员数 ~ 分拣员数"
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
import axios from "axios";
import bus from "@/eventBus/eventBus";

export default {
  data() {
    return {
      area: [],
      city: [],
      tableData: [],
      showData: [],
      query_form: {
        city_value: "",
        area_value: "",
        input_name: "",
        input_acreage: "",
        input_community: "",
        input_rider: "",
        input_sorting: "",
      },
    };
  },
  created() {
    axios.get("/warehouse").then((res) => {
      this.tableData = res.data.data;
      let city = [];
      let area = [];
      this.tableData.forEach((item, index) => {
        city.push({ label: item.city.val, disabled: false });
        area.push({ label: item.area.val, disabled: false });
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
    });
  },
  mounted() {},
  methods: {
    submitForm() {
      this.showData = this.tableData.filter((item) => {
        return (
          item.city.key == this.query_form.city_value ||
          item.area.key == this.query_form.area_value ||
          item.name.indexOf(this.query_form.input_name) >= 0 ||
          item.acreage.indexOf(this.query_form.input_acreage) >= 0
        );
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      bus.$emit("warehouse_query_form", null);
    },
  },
  watch: {
    showData: function (newVal, oldVal) {
      console.log(oldVal);
      console.log(newVal);
      if (newVal != oldVal) {
        bus.$emit("warehouse_query_form", newVal);
      }
    },
  },
};
</script>
