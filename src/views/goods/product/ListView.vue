<template>
  <div>
    商品列表
    <!-- 搜索区域 -->
    <GoodsProductSearchForm></GoodsProductSearchForm>
    <!-- 表格区域 -->
    <GoodsProductTable></GoodsProductTable>
    <!-- 分页组件区域 -->
    <Pagination></Pagination>
  </div>
</template>

<script>
  import GoodsProductSearchForm from "@/components/GoodsProductSearchForm.vue";
  import GoodsProductTable from "@/components/GoodsProductTable.vue";
  import Pagination from "@/components/Pagination.vue";
  export default {
    name: "ProductList",
    data() {
      return {};
    },
    methods: {},
    mounted() {},
    components: {
      Pagination,
      GoodsProductSearchForm,
      GoodsProductTable,
    },
  };
</script>

<style lang="less" scoped>
  .el-dropdown {
    vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
