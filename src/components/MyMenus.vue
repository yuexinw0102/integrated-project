<template>
  <el-col style="height: 100%">
    <el-menu
      :default-active=this.$route.path
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      style="height: 100%"
      router
    >
      <el-menu-item index="/welcome">
        <i class="el-icon-s-grid"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/user">
        <i class="el-icon-user-solid"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-s-goods"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/product_list">商品列表</el-menu-item>
          <el-menu-item index="/classify_list">分类列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-s-order"></i>
          <span>订单管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/order_list">订单列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/warehouse">
        <i class="el-icon-s-home"></i>
        <span slot="title">仓库管理</span>
      </el-menu-item>
      <el-menu-item index="/sorting">
        <i class="el-icon-s-flag"></i>
        <span slot="title">分拣监控</span>
      </el-menu-item>
      <el-menu-item index="/distribution">
        <i class="el-icon-truck"></i>
        <span slot="title">配送监控</span>
      </el-menu-item>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-s-tools"></i>
          <span>权限中心</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/role">角色管理</el-menu-item>
          <el-menu-item index="/department">部门管理</el-menu-item>
          <el-menu-item index="/account">账号管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-col>
</template>

<script>
export default {
  name: "HelloWorld",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"></style>
