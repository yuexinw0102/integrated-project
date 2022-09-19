<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>仓库管理 > {{ title() }}</span>
    </div>
    <div v-for="o in 4" :key="o" class="text item">
      {{ "列表内容 " + o }}
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

.box-card {
  width: 480px;
}
</style>
<script>
import bus from "@/eventBus/eventBus";
export default {
  name: "AbsencesAddOrEdit",
  data() {
    return {
      showData: [],
    };
  },
  mounted() {
    bus.$on("modify", (val) => {
        console.log(val);
      this.showData = val;
    });
  },
  methods: {
    title() {
      if (this.showData === []) {
        return "新增仓库";
      }else {
        return "仓库详情";
      }
    },
  },
};
</script>
