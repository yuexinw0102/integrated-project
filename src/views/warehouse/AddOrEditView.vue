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
        <el-row type="flex" justify="">
          <el-col :span="11">
            <el-form-item label="所在城市" prop="city">
              <el-select
                v-model="form.city"
                placeholder="所在城市"
                style="width: 100%"
              >
                <el-option label="区域一" value="shanghai"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2"></el-col>
          <el-col :span="11">
            <el-form-item label="所在区域" prop="area">
              <el-select
                v-model="form.area"
                placeholder="所在区域"
                style="width: 100%"
              >
                <el-option label="区域一" value="shanghai"></el-option>
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

        <el-form-item >

        </el-form-item>

        <el-form-item>
          <el-button @click="back()">返回</el-button>
          <el-button type="primary" @click="onSubmit">保存资料</el-button>
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
import bus from "@/eventBus/eventBus";
export default {
  name: "AbsencesAddOrEdit",
  data() {
    return {
      showData: [],
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
    };
  },
  mounted() {
    bus.$on("modify", (val) => {
      // console.log(val);
      this.showData = val;
    });
  },
  methods: {
    back(){
      // console.log(this.$router);
      this.$router.push('/warehouse')
    }
  },
};
</script>
