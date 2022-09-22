<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
  import axios from "axios";
  import bus from "@/eventBus/eventBus.js";
  export default {
    name: "GoodsProductTable",
    created() {},
    mounted() {
      // this.handleGetData();
      /* bus.$on("sizeChange", (val) => {
        this.page.pageSize = val;
        this.page.currentPage = 1; // size变化时页码置为1
        this.showDatas = this.tableData.filter((item, index) => {
          return index < val;
        });
        console.log("表格中size变化了");
      });
      bus.$on("currentChange", (val) => {
        // this.handleGetData();
        console.log("表格组件currentChange接收", val);
        let size = this.page.pageSize * (val - 1);
        let num = this.page.pageSize * val;
        let tables = []; //
        for (let i = size; i < num; i++) {
          if (this.tableData[i]) {
            tables.push(this.tableData[i]);
          }
          this.showDatas = tables;
        }
        console.log("表格中num变化了");
      }); */
    },
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
    /* methods: {
      // 获取表格数据
      handleGetData() {
        axios
          .get("/product_list")
          .then((res) => {
            let { GoodsInfo } = res.data.data[0];
            this.tableData = GoodsInfo;
            this.setPageinations(); // 设置默认分页数据
            // console.log("this.tableData", this.tableData);
            // console.log(this.tableData.length);
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
        console.log("表格的setPageinations设置默认分页数据");
      },

      // 编辑
      handleTableEdit(index, row) {
        console.log(index, row);
      },
    }, */
    watch: {
      /* ["page.pageSize"]: {
        handler(newValue, oldValue) {
          console.log("page.pageSize改变了", newValue, oldValue);
          this.page.pageSize = newValue;
          console.log("打印监听中的page", this.page);
          console.log("监听size的", this.page);
        },
        deep: true,
      },
      ["page.currentPage"]: {
        handler(newValue, oldValue) {
          console.log("page.currentPage改变了", newValue, oldValue);
          this.page.currentPage = newValue;
          console.log("监听num的", this.page);
        },
        deep: true,
      }, */
      // page: {
      //   handler() {
      //     this.handleGetData();
      //   },
      //   deep: true,
      // },
    },
  };
</script>

<style lang="less" scoped>
  /deep/.myTable {
    text-align: center;

    th,
    td {
      padding: 5px 0;
      text-align: center;
    }
  }
</style>
