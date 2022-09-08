<template>
  <ContentView>
    <!-- 搜索插槽 -->
    <template v-slot:searchForm>
      <GoodsProductSearchForm> </GoodsProductSearchForm>
    </template>
    <!-- 表格插槽 -->
    <template v-slot:dataTable>
      <GoodsProductTable>
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
            <el-table
              :data="showDatas"
              stripe
              border
              style="width: 100%"
              class="myTable"
            >
              <el-table-column prop="id" label="商品ID" width="134">
              </el-table-column>
              <el-table-column prop="title" label="商品标题" width="140">
              </el-table-column>
              <el-table-column prop="variety" label="品种" width="140">
              </el-table-column>
              <el-table-column prop="store" label="储存条件" width="80">
              </el-table-column>
              <el-table-column prop="weight" label="规格" width="100">
              </el-table-column>
              <el-table-column prop="classify" label="商品分类" width="100">
              </el-table-column>
              <el-table-column prop="isRecommend" label="推荐" width="60">
              </el-table-column>
              <el-table-column prop="originalPrice" label="商品原价" width="90">
              </el-table-column>
              <el-table-column prop="nowPrice" label="商品现价" width="90">
              </el-table-column>
              <el-table-column prop="state" label="商品状态" width="90">
              </el-table-column>
              <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                  <el-button
                    @click="handleTableEdit(scope.$index, scope.row)"
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
      </GoodsProductTable></template
    >
    <!-- 分页插槽 -->
    <template v-slot:pagination>
      <Pagination></Pagination>
    </template>
  </ContentView>
</template>

<script>
  import axios from "axios";
  import bus from "@/eventBus/eventBus.js";
  import ContentView from "@/components/ContentView.vue";
  import GoodsProductSearchForm from "@/components/GoodsProductSearchForm.vue";
  import GoodsProductTable from "@/components/GoodsProductTable.vue";
  import Pagination from "@/components/Pagination.vue";
  export default {
    name: "ProductList",
    data() {
      return {
        tableData: [], // 数据总数
        page: {
          currentPage: 1, // 当前页码
          pageSize: 10,
          pageTotal: 0,
        },
        showDatas: [], // 页面显示数据
      };
    },
    methods: {
      // 获取表格数据
      handleGetData() {
        axios
          .get("/product_list")
          .then((res) => {
            let { GoodsInfo } = res.data.data[0];
            this.tableData = GoodsInfo;
            this.setPageinations(); // 设置默认分页数据
            bus.$emit("tableTotal", this.tableData.length);
          })
          .catch((err) => {
            console.log("err", err);
          });
      },
      // 设置分页相关数据
      setPageinations() {
        this.page.pageTotal = this.tableData.length;
        this.page.pageSize = 10;
        this.page.currentPage = 1;
        // 默认显示的表格数据
        this.showDatas = this.tableData.filter((item, index) => {
          return index < this.page.pageSize;
        });
        console.log(this.showDatas);
        console.log("表格的setPageinations设置默认分页数据");
      },

      // 编辑
      handleTableEdit(index, row) {
        console.log(index, row);
      },
    },
    mounted() {
      this.handleGetData();
      bus.$on("sizeChange", (val) => {
        this.page.pageSize = val;
        this.page.currentPage = 1; // size变化时页码置为1
        this.showDatas = this.tableData.filter((item, index) => {
          return index < val;
        });
      });
      bus.$on("currentChange", (val) => {
        // console.log("表格组件currentChange接收", val);
        let size = this.page.pageSize * (val - 1);
        let num = this.page.pageSize * val;
        let tables = []; //
        for (let i = size; i < num; i++) {
          if (this.tableData[i]) {
            tables.push(this.tableData[i]);
          }
          this.showDatas = tables;
        }
      });
    },
    watch: {
      ["page.pageSize"]: {
        handler(newValue, oldValue) {
          // console.log("page.pageSize改变了", newValue, oldValue);
          this.page.pageSize = newValue;
          console.log("监听size的", this.page);
          console.log("this.page.pageSize", this.page.pageSize);
        },
        deep: true,
      },
      ["page.currentPage"]: {
        handler(newValue, oldValue) {
          // console.log("page.currentPage改变了", newValue, oldValue);
          this.page.currentPage = newValue;
          console.log("监听num的", this.page);
          console.log("this.page.currentPage", this.page.currentPage);
        },
        deep: true,
      },
    },
    components: {
      ContentView,
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