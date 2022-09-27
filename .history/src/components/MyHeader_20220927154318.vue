<template>
  <el-row type="flex" justify="space-between" align="middle">
    <el-col
      :span="6"
      style="display: flex; justify-content: center; align-items: center"
    >
      <el-avatar
        :size="35"
        fit="fill"
        :src="require('../assets/logo.png')"
      ></el-avatar>
      <span style="font-size: 20px"><b>生鲜商城—后台管理系统</b></span>
    </el-col>
    <el-col :span="3">
      <el-dropdown
        @command="handel_command"
        style="display: flex; justify-content: center; align-items: center"
      >
        <el-avatar
          src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
        ></el-avatar>
        <el-dropdown-menu>
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item command="logout" divided>注销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "MyHeader",
  data() {
    return {};
  },
  methods: {
    handel_command(command) {
      sessionStorage.removeItem("token");
      this.$router.replace("/login");
    },
  },
};
</script>

<style>
    .navbar {
        text-align: left;
    }
