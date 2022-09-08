<template>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.currentPage"
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
    name: "Pagination",
    data() {
      return {
        page: {
          currentPage: 1, // 当前页码
          pageSize: 10,
          pageTotal: 0,
        },
        allTableDatas: [],
        tableDatas: [],
      };
    },
    methods: {
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        bus.$emit("sizeChange", val);
      },
      handleCurrentChange(val) {
        bus.$emit("currentChange", val);
      },
    },
    mounted() {
      bus.$on("tableTotal", (val) => {
        // console.log("分页组件接收tableTotal", val);
        this.page.pageTotal = val;
      });
    },
  };
</script>

<style></style>