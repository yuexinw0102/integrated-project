<template>
    <el-row type="flex" justify="space-between" align="middle">
        <el-col :span="6">
            <el-avatar :size="35" fit="fill" :src="require('../assets/logo.png')" style=" overflow: unset;"></el-avatar>
            <span style="font-size: 20px;"><b>生鲜商城—后台管理系统</b></span>
        </el-col>
        <el-col :span="2" style="display: flex; justify-content: center;">
            <el-dropdown @command="handel_command">
                <el-avatar icon="el-icon-user-solid" style=" overflow:unset;"></el-avatar>
                <el-dropdown-menu>
                    <el-dropdown-item >个人信息</el-dropdown-item>
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
            return {
            }
        },
        methods: {
            handel_command(command){
                sessionStorage.removeItem("vuex");
                this.$router.replace("/login");
            }
        }
    }

</script>

<style>
    .navbar {
        text-align: left;
    }

    .collapse .navbar-nav {
        position: absolute;
        right: 0;
        top: -5px;
        margin-right: 50px;
    }

    .breadcrumb {
        margin: 7px;
        display: inline-block;

    }

    .text-red {
        color: #ff0000;
    }

    .list-group-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .flex-content {
        display: flex;
        justify-content: space-between;
    }

    .jumbotron {
        background-color: white;
        border: solid 1px #ededed;
    }

    #content_div {
        padding: 0 15px 0 15px;
        margin-top: 0;
    }
</style>