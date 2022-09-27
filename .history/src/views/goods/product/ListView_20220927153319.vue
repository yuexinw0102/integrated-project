<template>
  <ContentView>
    <!-- 面包屑插槽 -->
    <template v-slot:breadcrumb>
      <el-card shadow="never">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>商品管理</el-breadcrumb-item>
          <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-card>
    </template>
    <!-- 搜索插槽 -->
    <template v-slot:searchForm>
      <GoodsProductSearchForm>
        <template>
          <el-card class="goodsSearchCard" shadow="never">
            <el-form
              ref="goodsSearchForm"
              :model="goodsSearchForm"
              class="goodsSearchForm"
            >
              <el-row :gutter="30" class="demo-autocomplete searchFormRow">
                <!-- 商品ID/商品标题/品种 -->
                <el-col :span="8">
                  <el-form-item prop="title">
                    <el-autocomplete
                      class="inline-input"
                      size="small"
                      v-model="goodsSearchForm.title"
                      :fetch-suggestions="querySearch"
                      placeholder="商品ID/商品标题/品种"
                      :trigger-on-focus="false"
                      @select="handleSelect"
                      style="width: 100%"
                    >
                    </el-autocomplete>
                  </el-form-item>
                </el-col>

                <!-- 商品状态 -->
                <el-col :span="3">
                  <el-form-item prop="state">
                    <el-select
                      size="small"
                      v-model="goodsSearchForm.state"
                      filterable
                      placeholder="商品状态"
                    >
                      <el-option :value="'已上架'"> </el-option>
                      <el-option :value="'待上架'"> </el-option>
                      <el-option :value="'已下架'"> </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <!-- 储存条件 -->
                <el-col :span="3">
                  <el-form-item prop="store">
                    <el-select
                      size="small"
                      v-model="goodsSearchForm.store"
                      filterable
                      placeholder="储存条件"
                    >
                      <el-option :value="'冷藏'"> </el-option>
                      <el-option :value="'常温'"> </el-option>
                      <el-option :value="'冷冻'"> </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <!-- 商品规格 -->
                <el-col :span="6">
                  <el-form-item prop="weight">
                    <el-input
                      size="small"
                      v-model.number="goodsSearchForm.weight"
                      placeholder="请输入商品规格"
                    ></el-input>
                  </el-form-item>
                </el-col>

                <!-- 规格单位 -->
                <el-col :span="2">
                  <el-form-item prop="unit">
                    <el-select
                      size="small"
                      v-model="goodsSearchForm.unit"
                      filterable
                      placeholder="kg"
                    >
                      <el-option :value="'kg'"> </el-option>
                      <el-option :value="'g'"> </el-option>
                      <el-option :value="'mg'"> </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="30" class="searchFormRow">
                <!-- 商品分类 -->
                <el-col :span="3">
                  <el-form-item prop="classify">
                    <el-select
                      size="small"
                      v-model="goodsSearchForm.classify"
                      filterable
                      placeholder="商品分类"
                    >
                      <el-option :value="'蔬菜'"> </el-option>
                      <el-option :value="'水果'"> </el-option>
                      <el-option :value="'零食'"> </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <!-- 商品现价 -->
                <el-col :span="8">
                  <el-form-item prop="nowPrice">
                    <el-input
                      size="small"
                      v-model.number="goodsSearchForm.nowPrice"
                      placeholder="请输入商品现价"
                    ></el-input>
                  </el-form-item>
                </el-col>

                <!-- 商品原价 -->
                <el-col :span="8">
                  <el-form-item prop="originalPrice">
                    <el-input
                      size="small"
                      v-model.number="goodsSearchForm.originalPrice"
                      placeholder="请输入商品原价"
                    ></el-input>
                  </el-form-item>
                </el-col>

                <el-col class="search-btn-col" :span="5">
                  <el-button size="small" @click="handelSearch" type="primary"
                    >查询</el-button
                  >
                  <el-button
                    size="small"
                    @click="$refs['goodsSearchForm'].resetFields()"
                    >重置</el-button
                  >
                </el-col>
              </el-row>
            </el-form>
          </el-card>
        </template>
      </GoodsProductSearchForm>
    </template>
    <!-- 表格插槽 -->
    <template v-slot:dataTable>
      <GoodsProductTable>
        <template>
          <el-card shadow="never">
            <div slot="header" class="clearfix">
              <span style="font-size: 14px"
                >查询结果：共计
                <span style="font-weight: bold">{{
                  searchListTotal ? searchListTotal : 0
                }}</span>
                条数据</span
              >
              <el-button
                style="float: right; padding: 7px"
                type="primary"
                icon="el-icon-plus"
                @click="handleTableAdd"
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
              <el-table-column prop="classify_id" label="商品ID" width="134">
              </el-table-column>
              <el-table-column prop="title" label="商品标题" width="140">
              </el-table-column>
              <el-table-column prop="category" label="品种" width="140">
              </el-table-column>
              <el-table-column prop="store" label="储存条件" width="80">
              </el-table-column>
              <el-table-column prop="weight" label="规格/g" width="100">
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
                  <el-button
                    @click="handleTableDel(scope.$index, scope.row)"
                    type="text"
                    size="small"
                    >立即下架</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </template>
      </GoodsProductTable></template
    >
    <!-- 分页插槽 -->
    <template v-slot:pagination>
      <Pagination
        :total="searchList.length != 0 ? searchListTotal : tableData.length"
      ></Pagination>
    </template>
  </ContentView>
</template>

<script>
  // searchList.length != 0 ? searchList.length : tableData.length
  import bus from "@/eventBus/eventBus.js"; // 引入兄弟组件传值中间件
  import ContentView from "@/components/ContentView.vue";
  import GoodsProductSearchForm from "@/components/Goods/GoodsProductSearchForm.vue";
  import GoodsProductTable from "@/components/Goods/GoodsProductTable.vue";
  import Pagination from "@/components/Goods/GoodsProductPagination.vue";
  import product from "@/axios/goods/product.js"; // 请求后台数据
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
        showDatas: [], // 页面显示数据
        // 搜索数据
        goodsSearchForm: {
          title: "",
          state: "",
          store: "",
          weighit: "",
          unit: "",
          classify: "",
          nowPrice: "",
          originalPrice: "",
        },
        searchFlag: false, // 是否开始搜索,控制分页
        searchList: [], // 存放搜索数据
        searchRes: [],
        state1: "",
      };
    },
    mounted() {
      this.handleGetData();
      // this.handleGetTestData();
      /* product.getAll().then(({ data }) => {
        this.tableData = data.data;
      }) */
      bus.$on("sizeChange", (val) => {
        this.page.pageSize = val;
        this.page.currentPage = 1; // size变化时页码置为1
        if (this.searchFlag || this.searchList) {
          console.log("Searching", this.searchList);
          // 当开始搜索时
          this.showDatas = this.searchList.filter((item, index) => {
            return index < val;
          });
        } else {
          // 默认
          this.showDatas = this.tableData.filter((item, index) => {
            return index < val;
          });
        }
      });
      bus.$on("currentChange", (val) => {
        // console.log("currentChange接收", val);
        let size = this.page.pageSize * (val - 1);
        let num = this.page.pageSize * val;
        let tables = []; //
        // if (this.searchFlag || this.searchList) {
        //   // console.log("Searching", this.searchList);
        //   // 当开始搜索时
        //   for (let i = size; i < num; i++) {
        //     if (this.searchList[i]) {
        //       tables.push(this.searchList[i]);
        //     }
        //     this.showDatas = tables;
        //   }
        //   // console.log("currentChange searchFlag--", this.searchFlag);
        // } else {
        for (let i = size; i < num; i++) {
          if (this.searchList.length != 0) {
            tables.push(this.searchList[i]);
          } else if (this.tableData[i]) {
            tables.push(this.tableData[i]);
          }
          this.showDatas = tables;
        }
        /*  if (tables.length > 0) {
          tables.length = 0; // 清空
          for (let i = size; i < num; i++) {
            if (this.searchList.length != 0) {
              tables.push(this.searchList[i]);
            }
            this.showDatas = tables;
          }
        } */
        // }
      });
      // '商品ID/商品标题/品种'搜索框相关
      this.searchRes = this.loadAll();
    },
    // updated() {
    //   console.log("Searching", this.searchList);
    // },
    methods: {
      // 获取表格数据
      /* handleGetData() {
        axios
          .get("/product_list")
          .then((res) => {
            let { GoodsInfo } = res.data.data[0];
            this.tableData = GoodsInfo;
            this.setPageinations(); // 设置默认分页数据
            console.log(this.tableData);
            // 发送数据总数到分页组件
            bus.$emit("tableTotal", this.tableData.length);
          })
          .catch((err) => {
            console.log("err", err);
          });
      }, */
      // 获取测试数据
      handleGetData() {
        /* axios
          .get(
            "https://baf8d293-f94c-4026-88de-7fa4d473c8a9.mock.pstmn.io/getAllData"
          )
          .then((res) => {
            let { data } = res.data;
            this.tableData = data;
            this.setPageinations(); // 设置默认分页数据
            // console.log(this.tableData);
            // 发送数据总数到分页组件
            bus.$emit("tableTotal", this.tableData.length);
          })
          .catch((err) => {
            console.log("err", err);
          }); */
        product
          .search()
          .then(({ data }) => {
            // console.log("data", data);
            if (data.status == "success") {
              this.tableData = data.data;
              this.setPageinations(this.tableData); // 设置默认分页数据
              // bus.$emit("tableTotal", this.tableData.length);
            }
          })
          .catch((err) => this.$message.error(err));
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
        // console.log(this.showDatas);
        // console.log("表格的setPageinations设置默认分页数据");
      },

      //  下架商品
      handleTableDel(index, row) {
        console.log("下架商品", index, row);
        product
          .deleteById(row.id)
          .then((data) => {
            console.log("deleteById-----data", data);
            this.tableData = data.data;
            this.handleGetData();
          })
          .catch((err) => this.$message.error(err));
      },

      // 新增商品
      handleTableAdd() {
        console.log("新增商品");
        this.$router.push("/product_list/add");
      },

      // 编辑
      handleTableEdit(index, row) {
        console.log("handleTableEdit --", index, row);
        this.$router.push({
          path: "/product_list/edit",
          query: {
            id: row.id, // 同一个页面获取url参数 传值
          },
        });
      },

      //   查询按钮（搜索）
      handelSearch() {
        product
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
          /*  { "value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
          { "value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" },
          { "value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路" },
          { "value": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺" },
          { "value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819" },
          { "value": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
          { "value": "枪会山", "address": "上海市普陀区棕榈路" },
          { "value": "纵食", "address": "元丰天山花园(东门) 双流路267号" },
          { "value": "钱记", "address": "上海市长宁区天山西路" },
          { "value": "壹杯加", "address": "上海市长宁区通协路" },
          { "value": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
          { "value": "爱茜茜里(西郊百联)", "address": "长宁区仙霞西路88号1305室" },
          { "value": "爱茜茜里(近铁广场)", "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺" },
          { "value": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6" },
          { "value": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号" },
          { "value": "超级鸡车（丰庄路店）", "address": "上海市嘉定区丰庄路240号" },
          { "value": "妙生活果园（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "香宜度麻辣香锅", "address": "长宁区淞虹路148号" },
          { "value": "凡仔汉堡（老真北路店）", "address": "上海市普陀区老真北路160号" },
          { "value": "港式小铺", "address": "上海市长宁区金钟路968号15楼15-105室" },
          { "value": "蜀香源麻辣香锅（剑河路店）", "address": "剑河路443-1" },
          { "value": "北京饺子馆", "address": "长宁区北新泾街道天山西路490-1号" },
          { "value": "饭典*新简餐（凌空SOHO店）", "address": "上海市长宁区金钟路968号9号楼地下一层9-83室" },
          { "value": "焦耳·川式快餐（金钟路店）", "address": "上海市金钟路633号地下一层甲部" },
          { "value": "动力鸡车", "address": "长宁区仙霞西路299弄3号101B" },
          { "value": "浏阳蒸菜", "address": "天山西路430号" },
          { "value": "四海游龙（天山西路店）", "address": "上海市长宁区天山西路" },
          { "value": "樱花食堂（凌空店）", "address": "上海市长宁区金钟路968号15楼15-105室" },
          { "value": "壹分米客家传统调制米粉(天山店)", "address": "天山西路428号" },
          { "value": "福荣祥烧腊（平溪路店）", "address": "上海市长宁区协和路福泉路255弄57-73号" },
          { "value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
          { "value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号" },
          { "value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼" },
          { "value": "阳阳麻辣烫", "address": "天山西路389号" },
          { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" } */
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
</style>