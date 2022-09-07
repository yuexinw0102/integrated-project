<template>
  <el-card shadow="never">
    <div slot="header" class="clearfix">
      <span style="font-size: 14px"
        >查询结果：共计 
        <span style="font-weight: bold">0</span>&nbsp;条数据</span
      >
      <el-button
        style="float: right; padding: 7px"
        type="primary"
        icon="el-icon-plus"
        >新增商品</el-button
      >
    </div>
    <el-table :data="tableData" height="575" border style="width: 100%">
      <el-table-column prop="id" label="商品ID" width="120"> </el-table-column>
      <el-table-column prop="title" label="商品标题" width="140">
      </el-table-column>
      <el-table-column prop="variety" label="品种" width="100">
      </el-table-column>
      <el-table-column prop="store" label="储存条件" width="100">
      </el-table-column>
      <el-table-column prop="weight" label="规格" width="100">
      </el-table-column>
      <el-table-column prop="classify" label="商品分类" width="100">
      </el-table-column>
      <el-table-column prop="isRecommend" label="推荐" width="60">
      </el-table-column>
      <el-table-column prop="originalPrice" label="商品原价" width="110">
      </el-table-column>
      <el-table-column prop="nowPrice" label="商品现价" width="110">
      </el-table-column>
      <el-table-column prop="state" label="商品状态" width="110">
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            @click="handleTableEdit(scope.row)"
            type="text"
            size="small"
            >商品详情</el-button
          >
          <el-button type="text" size="small">立即下架</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
  import axios from "axios";
  export default {
    name: "GoodsProductTable",
    data() {
      return {
        tableData: [],
      };
    },
    methods: {
      handleTableEdit(row) {
        console.log(row);
      },
    },
    mounted() {
      axios
        .get("/product_list")
        .then((res) => {
          let { GoodsInfo } = res.data.data[0];
          this.tableData = GoodsInfo;
          console.log("this.tableData", this.tableData);
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
  };
</script>

<style></style>