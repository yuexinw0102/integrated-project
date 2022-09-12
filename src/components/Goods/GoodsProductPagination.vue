<template>
  <div class="block">
    <el-pagination
    background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="page.currentPage"
      :page-sizes="[10, 50, 100, 200]"
      :page-size="page.pageSize"
      layout="total, prev, pager, next, sizes, jumper"
      :total="page.pageTotal"
    >
    </el-pagination>
  </div>
</template>

<script>
  import bus from "@/eventBus/eventBus.js";
  export default {
  name: "GoodsProductPagination",
    props: [],
    data() {
      return {
        page: {
          currentPage: 1, // 当前页码
          pageSize: 10,
          pageTotal: 0,
        },
      };
    },
    methods: {
      handleSizeChange(val) {
        // 发送变化的size
        bus.$emit("sizeChange", val);
      },
      handleCurrentChange(val) {
        // 发送变化的页码
        bus.$emit("currentChange", val);
      },
    },
    mounted() {
      // 获取数据总数
      bus.$on("tableTotal", (val) => {
        // console.log("分页组件接收tableTotal", val);
        this.page.pageTotal = val;
      });
    },
    
  };
</script>

<style lang="less" scoped>
  .block {
    padding: 20px;
  }
</style>