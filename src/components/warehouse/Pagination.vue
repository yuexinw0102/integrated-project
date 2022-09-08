<template>
  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
    :page-sizes="[10,50,100,200]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
    :total="get_count">
  </el-pagination>
</template>

<script>
  export default {
    name: "Pagination",
    props: ["get_count"],
    data() {
      return {
        currentPage: 1,
        pageSize: 10
      }
    },
    mounted() {
    },
    methods: {

      handler_num_change(val) {
        this.pager.page_num = val;
        this.$emit("num_change", val);
      },
      handler_size_change(val) {
        console.log("handler_size_change val", val);
        this.pager.page_size = val;
        this.pager.page_num = 1;
        this.$emit("size_change", val);
      },
    },
  };
</script>

<style></style>