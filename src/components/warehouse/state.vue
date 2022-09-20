<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>仓库管理 > {{ $store.state.warehouseEditor }}</span>
    </div>
    <div class="text item">
      <el-form ref="form" :model="form" label-width="auto">
        <el-form-item label="仓库名称" prop="name">
          <el-input v-model="form.name" placeholder="仓库名称"></el-input>
        </el-form-item>

        <el-form-item v-if="this.dataId == ''">
          <v-distpicker @selected="onSelected"></v-distpicker>
        </el-form-item>
        <el-row v-else type="flex" justify="">
          <el-col :span="11">
            <el-form-item prop="city" label="所在城市">
              <el-select
                v-model="form.city"
                placeholder="所在城市"
                size="small"
                style="width: 100%"
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
          </el-col>
          <el-col :span="2"></el-col>
          <el-col :span="11">
            <el-form-item prop="area" label="所在城市">
              <el-select
                v-model="form.area"
                placeholder="所在区域"
                size="small"
                style="width: 100%"
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
          </el-col>
        </el-row>

        <el-form-item label="仓库地址" prop="detailed_address">
          <el-input
            placeholder="仓库地址"
            type="textarea"
            v-model="form.detailed_address"
          ></el-input>
        </el-form-item>

        <el-form-item label="仓库面积" prop="acreage">
          <el-input placeholder="仓库面积" v-model="form.acreage"></el-input>
        </el-form-item>

        <el-form-item> </el-form-item>

        <el-form-item>
          <el-button @click="back()">返回</el-button>
          <el-button type="primary">保存资料</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<style>
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>
<script>
import { NAMES } from "@/store";
import axios from "axios";
import VDistpicker from "v-distpicker";
import { mapState } from "vuex";
export default {
  name: "AbsencesAddOrEdit",
  data() {
    return {
      showData: JSON.parse(localStorage.getItem("warehouseData")),
      area: "",
      city: "",
      form: {
        name: "",
        area: "",
        city: "",
        detailed_address: "",
        acreage: "",
        community: "",
        rider: "",
        sorting: "",
      },
      selected: {
        province: "",
        city: "",
        area: "",
      },
    };
  },
  computed: {
    ...mapState({
      dataId: "warehouseDataId",
    }),
    fullAddress: function () {
      return (
        this.selected.province +
        "-" +
        this.selected.city +
        "-" +
        this.selected.area
      );
    },
  },
  methods: {
    back() {
      this.$router.push("/warehouse");
    },
    onSelected(data) {
      const { province, city, area } = data;
      if (!province.code && !city.code && !city.code) return;
      this.selected.province = province.value;
      this.selected.city = city.value;
      this.selected.area = area.value;
    },
  },
  created() {
    let city = [];
    let area = [];
    this.showData.forEach((item) => {
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
    this.showData.forEach((item) => {
      if (this.dataId !== "") {
        if (item.id == this.dataId) {
          return (this.form = item);
        }
      }
    });
  },
  components: {
    VDistpicker,
  },
};
</script>
