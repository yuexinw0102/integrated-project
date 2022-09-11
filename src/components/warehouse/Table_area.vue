<template>
  <el-row>
    <el-col>
      <el-button style="margin-bottom: 10px" type="primary">新增仓库</el-button>
      <el-table
        :data="
          tableData.slice(
            (page.page_num - 1) * page.page_size,
            page.page_num * page.page_size
          )
        "
        border
        style="width: 100%; overflow: auto"
        height="475"
        stripe
        v-infinite-scroll="load"
      >
        <el-table-column prop="name" label="仓库名称"> </el-table-column>
        <el-table-column prop="city" label="所在城市"> </el-table-column>
        <el-table-column prop="area" label="所在区域"> </el-table-column>
        <el-table-column prop="date" label="仓库地址">
          <template slot-scope="scope">
            <el-button type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="acreage" label="仓库面积"> </el-table-column>
        <el-table-column prop="date" label="关联小区数"> </el-table-column>
        <el-table-column prop="date" label="骑手数"> </el-table-column>
        <el-table-column prop="date" label="分拣员数"> </el-table-column>
        <el-table-column prop="date" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small">仓库详情</el-button>
            <el-button type="text" size="small">停用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<style></style>
<script>
import axios from "axios";
import bus from "@/eventBus/eventBus";
export default {
  data() {
    return {
      showData: [],
      tableData: [],
      page: {
        page_size: 10,
        page_num: 1,
      },
    };
  },
  created() {
    axios.get("/warehouse").then((res) => {
      this.tableData = res.data.data;
      bus.$emit("get_count", res.data.data.length);
    });
  },
  mounted() {
    bus.$on("num_change", (val) => {
      this.page.page_num = val;
    });
    bus.$on("size_change", (val) => {
      this.page.page_size = val;
      this.page.page_num = 1; 
    });
  },
};
</script>
