<template>
  <ContentView>
    <template #searchForm>
      <span>分拣监控</span>

      <Search_box style="height: auto"></Search_box>
    </template>
    <template #dataTable>
      <Table_area style="margin-bottom: 5px"></Table_area>
    </template>

    <template v-slot:pagination>
      <Pagination></Pagination>
    </template>
  </ContentView>
</template>

<script>
<<<<<<< HEAD
import ContentView from "@/components/ContentView.vue";
import Search_box from "@/components/order/Search_box.vue";
import Table_area from "@/components/order/Table_area.vue";
import Pagination from "@/components/Pagination.vue";
export default {
  name: "ListView",
  components: { ContentView, Search_box, Table_area, Pagination },
};
</script>
=======
    import bus from "@/eventBus/eventBus.js"; // 引入兄弟组件传值中间件
    import ContentView from "@/components/ContentView.vue";
    import Pagination from "@/components/Goods/GoodsProductPagination.vue";
    import order from "@/axios/order.js"; // 请求后台数据
  import cities from "@/utils/cities.js"; // 引入级联文件
    import process from "@/axios/process/process"
    export default {
      name: "ProductList",
      data() {
        return {
          tableData: [], // 数据总数
          searchListTotal: 0,
          page: {
            currentPage: 1, // 当前页码
            pageSize: 10,
            pageTotal: 0,
          },
          activeName: "first", // tab栏默认显示
          showDatas: [], // 页面显示数据
          // 搜索数据
          goodsSearchForm: {
            orderNumber: "",
            orderPay: "",
            payStatus: "",
            createTime: "",
            realityPrice: "",
            goodsPrice: "",
            goodsCount: "",
          },
          address: "",
          searchFlag: false, // 是否开始搜索,控制分页
          searchList: [], // 存放搜索数据
          searchRes: [],
          state1: "",
          // 详情抽屉
          drawer: false,
          direction: "ltr", // 抽屉往左开
          // 修改收货地址表单
          addressForm: {
            address1: [],
            address2: "",
          },
          cities, // 级联文件
          loading: false,
          timer: null,
          addressFormRules: {
            address1: [
              {
                required: true,
                message: "请选择收货地址",
                trigger: "blur",
              },
            ],
            address2: [
              {
                required: true,
                message: "请输入详细地址",
                trigger: "blur",
              },
            ],
          },

          processVisible: false, // 物流信息弹框
          processInfo: [], // 物流信息
        };
      },
      mounted() {
        this.handleGetData();
        bus.$on("sizeChange", (val) => {
          this.page.pageSize = val;
          this.page.currentPage = 1; // size变化时页码置为1
          if (this.searchList.length != 0) {
            // 当开始搜索时
            this.showDatas = this.searchList.filter((item, index) => {
              return index < val;
            });
          } else if (this.tableData.length > 0) {
            // 默认
            this.showDatas = this.tableData.filter((item, index) => {
              return index < val;
            });
          }
        });
        bus.$on("currentChange", (val) => {
          let size = this.page.pageSize * (val - 1);
          let num = this.page.pageSize * val;
          let tables = []; //
          for (let i = size; i < num; i++) {
            if (this.searchList.length != 0) {
              tables.push(this.searchList[i]);
            } else if (this.tableData[i]) {
              tables.push(this.tableData[i]);
            }
            this.showDatas = tables;
          }
          // console.log("currentChange接收", val);
        });
        // '商品ID/商品标题/品种'搜索框相关
        this.searchRes = this.loadAll();
      },
      methods: {
        // 获取表格数据
        // 获取测试数据
        handleGetData() {
          order
            .search()
            .then(({ data }) => {
              // console.log("search data", data);
              if (data.status == "success") {
                this.tableData = data.data;
                this.setPageinations(this.tableData); // 设置默认分页数据
                // bus.$emit("tableTotal", this.tableData.length);
              }
            })
            .catch((err) => this.$message.error("获取所有数据失败！"));
        },
        // 设置分页相关数据
        setPageinations(data) {
          // 传入要显示的数据
          this.page.pageTotal = data.length;
          this.page.pageSize = 10;
          this.page.currentPage = 1;
          // console.log("setPageinations 页码", this.page.currentPage);
          // 默认显示的表格数据
          this.showDatas = data.filter((item, index) => {
            return index < this.page.pageSize;
          });
        },

        //  查看收货地址
        handleCheckAddress(index, row) {
          // console.log("查看收货地址", index, row);
          this.address = row.address;
        },

        // 点击切换tab栏
        handleClick(tab, event) {
          console.log(tab, event);
        },

        // 新增商品
        handleTableAdd() {
          console.log("新增商品");
          this.$router.push("/product_list/add");
        },

        // 修改收货地址
        handleUpdateAddr(index, row) {
          this.drawer = true;
          console.log("handleUpdateAddr --", index, row);
          /* this.$router.push({
              path: "/product_list/edit",
              query: {
                id: row.id, // 同一个页面获取url参数 传值
              },
            }); */
        },
        // 关闭详情按钮
        handleClose(done) {
          if (this.loading) {
            return;
          }
          this.$confirm("确定要修改地址吗？")
            .then((_) => {
              this.loading = true;
              this.timer = setTimeout(() => {
                done();
                // 动画关闭需要一定的时间
                setTimeout(() => {
                  this.loading = false;
                }, 400);
              }, 2000);
            })
            .catch((_) => {});
        },

        // 关闭抽屉表单
        cancelForm() {
          this.loading = false;
          this.drawer = false;
          clearTimeout(this.timer);
        },

        // 查看物流详情
        handleDistribution(index, row) {
          console.log("handleDistribution 物流详情 --", index, row);
          process.get("/kuaidi/1106975712662").then(({ data: res }) => {
            /* if (res.meta.status !== 200) {
              return this.$message.error("获取物流信息失败")
            } */
            if (res.meta.status === 200) {
              this.$message.success("获取物流信成功");
              this.processInfo = res.data;
              this.processVisible = true;
              console.log("processInfo: " , this.processInfo)
            }
          });
          /* this.$router.push({
              path: "/product_list/edit",
              query: {
                id: row.id, // 同一个页面获取url参数 传值
              },
            }); */
        },

        //   查询按钮（搜索）
        handelSearch() {
          order
            .doSearch(this.goodsSearchForm)
            .then(({ data }) => {
              if (data.status == "success") {
                this.searchFlag = true;
                console.log("search data--", data);
                this.searchListTotal = data.data.length; // 查询后数据显示总数
                this.searchList = data.data; // 查询后的数据
                this.showDatas = this.searchList; // 查询后的数据
                this.setPageinations(this.searchList); // 设置分页数据
                console.log("doSearch searchFlag--", this.searchFlag);
                // bus.$emit("tableTotal", this.tableData.length);
              }
            })
            .catch((err) => {
              console.log("search err--", err);
              this.$message.error("error error搜索失败！");
            });
          // this.searchFlag = false; // 关闭搜索开关
        },

        // '商品ID/商品标题/品种'搜索框相关方法开始
        querySearch(queryString, cb) {
          var searchRes = this.searchRes;
          var results = queryString
            ? searchRes.filter(this.createFilter(queryString))
            : searchRes;
          // 调用 callback 返回建议列表的数据
          cb(results);
        },
        createFilter(queryString) {
          return (res) => {
            return (
              res.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
            );
          };
        },
        loadAll() {
          return [
            { value: "三全鲜食（北新泾店）", address: "长宁区新渔路144号" },
            {
              value: "Hot honey 首尔炸鸡（仙霞路）",
              address: "上海市长宁区淞虹路661号",
            },
            {
              value: "新旺角茶餐厅",
              address: "上海市普陀区真北路988号创邑金沙谷6号楼113",
            },
            { value: "泷千家(天山西路店)", address: "天山西路438号" },
            {
              value: "胖仙女纸杯蛋糕（上海凌空店）",
              address: "上海市长宁区金钟路968号1幢18号楼一层商铺18-101",
            },
            { value: "贡茶", address: "上海市长宁区金钟路633号" },
            {
              value: "豪大大香鸡排超级奶爸",
              address: "上海市嘉定区曹安公路曹安路1685号",
            },
            {
              value: "茶芝兰（奶茶，手抓饼）",
              address: "上海市普陀区同普路1435号",
            },
            { value: "十二泷町", address: "上海市北翟路1444弄81号B幢-107" },
            { value: "星移浓缩咖啡", address: "上海市嘉定区新郁路817号" },
            { value: "阿姨奶茶/豪大大", address: "嘉定区曹安路1611号" },
            { value: "新麦甜四季甜品炸鸡", address: "嘉定区曹安公路2383弄55号" },
            {
              value: "Monica摩托主题咖啡店",
              address: "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F",
            },
          ];
        },
        handleSelect(item) {
          console.log(item);
        },
        // '商品ID/商品标题/品种'搜索框相关方法结束
      },
      watch: {
        "page.pageSize": {
          handler(newValue, oldValue) {
            // console.log("page.pageSize改变了", newValue, oldValue);
            this.page.pageSize = newValue;
          },
          deep: true,
        },
        "page.currentPage": {
          handler(newValue, oldValue) {
            console.log("page.currentPage改变了", newValue, oldValue);
            this.page.currentPage = newValue;
          },
          deep: true,
        },
        tableData: {
          handler(newValue, oldValue) {
            this.tableData = newValue;
          },
        },
      },
      components: {
        ContentView,
        Pagination,
      },
    };
</script>

<style lang="less" scoped>
  /deep/#content_div {
    padding: 0;
  }
  .el-dropdown {
    vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  // 搜索部分开始
  .goodsSearchCard {
    height: 130px;
  }
  .searchFormRow {
    height: 50px;
  }
  .el-form-item {
    margin-bottom: 0;
  }
  .search-btn-col {
    margin-top: 5px;
  }
  // 搜索部分结束
  /deep/.el-drawer {
    box-shadow: 0 0 20px 0px #6d69691f;
  }
  /deep/.el-cascader,
  .address2-ipt {
    width: 360px;
  }
</style>
>>>>>>> origin/feature-product
