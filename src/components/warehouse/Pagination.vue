<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="page.page_num"
    :page-sizes="[10, 50, 100, 200]"
    :page-size="page.page_size"
    layout="total, sizes, prev, pager, next, jumper"
    :total="page.page_count"
  >
  </el-pagination>
</template>

<script>
import bus from "@/eventBus/eventBus";
export default {
  name: "Pagination",
  data() {
    return {
      page: {
        page_count: 0,
        page_num: 1,
        page_size: 10,
      },
    };
  },
  mounted() {
    bus.$on("get_count",(val)=>{
      this.page.page_count = val;
    })
  },
  methods: {
    handleCurrentChange(val) {
      bus.$emit("num_change", val);
    },
    handleSizeChange(val) {
      bus.$emit("size_change", val);
    },
  },
};
</script>

<style></style>
