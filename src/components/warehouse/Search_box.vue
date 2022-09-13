<template>
  <el-form ref="resetForm" :model="query_form" label-width="auto" :inline="true">
    <el-form-item>
      <el-input
        v-model="query_form.input_name"
        style="width: 200px"
        size="small"
        placeholder="仓库名称"
      ></el-input>
    </el-form-item>

    <el-form-item>
      <el-select
        v-model="query_form.city_value"
        placeholder="所在城市"
        size="small"
      >
        <el-option
          v-for="item in city"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
          <span style="float: left">{{ item.label }}</span>
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-select
        v-model="query_form.area_value"
        placeholder="所在区域"
        size="small"
      >
        <el-option
          v-for="item in area"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
          <span style="float: left">{{ item.label }}</span>
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-input
        v-model.number="query_form.input_acreage"
        style="width: 200px"
        size="small"
        placeholder="仓库面积 ~ 仓库面积"
      ></el-input>
    </el-form-item>

    <el-form-item>
      <el-input
        v-model.number="query_form.input_community"
        style="width: 200px"
        size="small"
        placeholder="关联小区数 ~ 关联小区数"
      ></el-input>
    </el-form-item>

    <el-form-item>
      <el-input
        v-model.number="query_form.input_rider"
        style="width: 200px"
        size="small"
        placeholder="骑手数 ~ 骑手数"
      ></el-input>
    </el-form-item>

    <el-form-item>
      <el-input
        v-model.number="query_form.input_sorting"
        style="width: 200px"
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
      this.tableData.forEach((item) => {
        this.city.push({ label: item.city, value: item.city });
        this.area.push({ label: item.area, value: item.area });
      });
    });
  },
  mounted() {},
  methods: {
    submitForm() {
      this.showData = this.tableData.filter(
        (item) =>
          item.name == this.query_form.input_name ||
          item.city == this.query_form.city_value ||
          item.area == this.query_form.area_value ||
          item.acreage == this.query_form.input_acreage
      );
    },
    resetForm() {
      // this.$refs[formName].resetFields();
      this.query_form.city_value=''
      this.query_form.area_value=''
      this.query_form.input_name=''
      this.query_form.input_acreage=''
      this.query_form.input_community=''
      this.query_form.input_rider=''
      this.query_form.input_sorting=''
      bus.$emit("query_form", null);
    },
  },
  watch: {
    showData: function (newVal, oldVal) {
      console.log(oldVal);
      console.log(newVal);
      if (newVal != oldVal) {
        bus.$emit("query_form", newVal);
      }
    },
  },
};
</script>
