<template>
  <el-container id="root">
    <el-header style="padding: 0">
      <MyHeader></MyHeader>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <MyMenus></MyMenus>
      </el-aside>
      <el-main id="my-main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import MyMenus from "@/components/MyMenus.vue";
  import MyHeader from "@/components/MyHeader.vue";

  export default {
    name: "HomeView",
    data() {
      return {
        loginUser: JSON.parse(sessionStorage.getItem("token")),
      };
    },
    components: {
      MyMenus,
      MyHeader,
    },
  };
</script>

<style lang="less" scoped>
  /deep/#my-main {
    table {
      text-align: center;

      th,
      td {
        padding: 5px 0;
        text-align: center;
      }
    }
  }
  #root{
    height: 100%;
  }
  #root > .el-header,
  .el-footer {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  #root > .el-aside {
    background-color: #d3dce6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  #root > .el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
</style>