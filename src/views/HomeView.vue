<template>
    <el-container id="root">
        <el-header>Header</el-header>
        <el-container>
            <el-aside width="200px">
                <MyMenus></MyMenus>
            </el-aside>
            <el-main>
                <router-view /> 
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import MyMenus from "@/components/MyMenus.vue";

    export default {
        name: "HomeView",
        components: {
            MyMenus,
        },
    }

</script>

<style scoped>
    #root>.el-header,
    .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    #root>.el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    #root>.el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
    }
</style>