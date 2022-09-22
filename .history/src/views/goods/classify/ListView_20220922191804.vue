<template>
  <ContentView>
    <!-- 面包屑插槽 -->
    <template v-slot:breadcrumb>
      <el-card shadow="never">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>商品管理</el-breadcrumb-item>
          <el-breadcrumb-item>分类列表</el-breadcrumb-item>
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
              <el-row :gutter="20" class="demo-autocomplete searchFormRow">
                <!-- 分类名称 -->
                <el-col :span="8">
                  <el-form-item prop="classifyName">
                    <el-autocomplete
                      class="inline-input"
                      size="small"
                      v-model="goodsSearchForm.classifyName"
                      :fetch-suggestions="querySearch"
                      placeholder="分类名称"
                      :trigger-on-focus="false"
                      @select="handleSelect"
                      style="width: 100%"
                    >
                    </el-autocomplete>
                  </el-form-item>
                </el-col>

                <!-- 层级 -->
                <el-col :span="3">
                  <el-form-item prop="tier">
                    <el-select
                      clearable
                      size="small"
                      v-model="goodsSearchForm.tier"
                      filterable
                      placeholder="层级"
                    >
                      <el-option :value="'一级'"> </el-option>
                      <el-option :value="'二级'"> </el-option>
                      <el-option :value="'三级'"> </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <!-- 所属上级 -->
                <el-col :span="3">
                  <el-form-item prop="superior">
                    <el-select
                      clearable
                      size="small"
                      v-model="goodsSearchForm.superior"
                      filterable
                      placeholder="所属上级"
                    >
                      <el-option label="蔬菜" value="蔬菜"></el-option>
                      <el-option label="水果" value="水果"></el-option>
                      <el-option label="肉类" value="肉类"></el-option>
                      <el-option label="蛋类" value="蛋类"></el-option>
                      <el-option label="家禽类" value="家禽类"></el-option>
                      <el-option label="酒类" value="酒类"></el-option>
                      <el-option label="矿泉水" value="矿泉水"></el-option>
                      <el-option label="食用油" value="食用油"></el-option>
                      <el-option label="调味品" value="调味品"></el-option>
                      <el-option label="小家电" value="小家电"></el-option>
                      <el-option label="手机" value="手机"></el-option>
                      <el-option label="大家电" value="大家电"></el-option>
                      <el-option label="服饰" value="服饰"></el-option>
                    </el-select>
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
                <span style="font-weight: bold">{{ searchListTotal }}</span>
                条数据</span
              >
              <el-button
                style="float: right; padding: 7px; margin: 0 10px"
                type="primary"
                icon="el-icon-plus"
                @click="handleAddSecond"
                >新增二级</el-button
              >
              <el-button
                style="float: right; padding: 7px"
                type="primary"
                icon="el-icon-plus"
                @click="handleAddFirst"
                >新增一级</el-button
              >
              <el-dialog
                title="新增二级"
                :visible.sync="dialogFormVisible"
                width="30%"
              >
                <el-form :model="addForm">
                  <el-form-item label="所属上级" :label-width="formLabelWidth">
                    <el-select
                      clearable
                      v-model="addForm.superior"
                      placeholder="请选择"
                      size="medium"
                    >
                      <el-option label="新鲜蔬果" value="新鲜蔬果"></el-option>
                      <el-option label="休闲零食" value="休闲零食"></el-option>
                      <el-option label="肉禽蛋" value="肉禽蛋"></el-option>
                      <el-option label="酒水乳饮" value="酒水乳饮"></el-option>
                      <el-option label="粮油调味" value="粮油调味"></el-option>
                      <el-option label="品牌家电" value="品牌家电"></el-option>
                      <el-option label="美妆个护" value="美妆个护"></el-option>
                      <el-option label="个人百货" value="个人百货"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="二级名称" :label-width="formLabelWidth">
                    <el-input
                      id="addSecIpt"
                      v-model="addForm.classifyName"
                      autocomplete="off"
                    ></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="handleCancelAddSec">取 消</el-button>
                  <el-button type="primary" @click="handleAddSec"
                    >确 定</el-button
                  >
                </div>
              </el-dialog>
            </div>
            <el-table
              :data="showDatas"
              stripe
              border
              style="width: 100%"
              class="myTable"
            >
              <el-table-column prop="classifyName" label="分类名称" width="301">
              </el-table-column>
              <el-table-column prop="tier" label="层级" width="313">
              </el-table-column>
              <el-table-column prop="superior" label="所属上级" width="310">
              </el-table-column>
              <el-table-column label="操作" width="280">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="small"
                    @click="handleTableEdit(scope.$index, scope.row)"
                    >编辑</el-button
                  >&nbsp;&nbsp;&nbsp;&nbsp;
                  <el-dialog
                    title="分类详情"
                    :visible.sync="editFormVisible"
                    width="30%"
                  >
                    <el-form :model="editForm">
                      <el-form-item
                        label="分类名称"
                        :label-width="formLabelWidth"
                      >
                        <el-input
                          auto-complete
                          id="addSecIpt"
                          v-model="editForm.classifyName"
                          autocomplete="off"
                        ></el-input>
                      </el-form-item>
                      <el-form-item label="层级" :label-width="formLabelWidth">
                        <el-select
                          clearable
                          v-model="editForm.tier"
                          placeholder="请选择"
                          size="medium"
                        >
                          <el-option label="一级" value="一级"></el-option>
                          <el-option label="二级" value="二级"></el-option>
                          <el-option label="三级" value="三级"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item
                        label="所属上级"
                        :label-width="formLabelWidth"
                      >
                        <el-select
                          clearable
                          v-model="editForm.superior"
                          placeholder="请选择"
                          size="medium"
                        >
                          <el-option label="蔬菜" value="蔬菜"></el-option>
                          <el-option label="水果" value="水果"></el-option>
                          <el-option label="肉类" value="肉类"></el-option>
                          <el-option label="蛋类" value="蛋类"></el-option>
                          <el-option label="家禽类" value="家禽类"></el-option>
                          <el-option label="零食" value="零食"></el-option>
                          <el-option label="酒类" value="酒类"></el-option>
                          <el-option label="饮品" value="饮品"></el-option>
                          <el-option label="矿泉水" value="矿泉水"></el-option>
                          <el-option label="食用油" value="食用油"></el-option>
                          <el-option label="调味品" value="调味品"></el-option>
                          <el-option label="小家电" value="小家电"></el-option>
                          <el-option label="手机" value="手机"></el-option>
                          <el-option label="大家电" value="大家电"></el-option>
                          <el-option label="服饰" value="服饰"></el-option>
                          <el-option label="化妆品" value="化妆品"></el-option>
                          <el-option label="百货" value="百货"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="handleCancelEdit">取 消</el-button>
                      <el-button type="primary" @click="handleEdit"
                        >确 定</el-button
                      >
                    </div>
                  </el-dialog>
                  <el-button
                    type="text"
                    size="small"
                    @click="handleTableDel(scope.$index, scope.row)"
                    >删除</el-button
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
        :total="searchList.length !== 0 ? searchListTotal : tableData.length"
      ></Pagination>
    </template>
  </ContentView>
</template>

<script>
import axios from "axios";
import classify from "@/axios/goods/classify.js";
import product from "@/axios/goods/product.js"; // 请求后台数据
import bus from "@/eventBus/eventBus.js"; // 引入兄弟组件传值中间件
import ContentView from "@/components/ContentView.vue";
import GoodsProductSearchForm from "@/components/Goods/GoodsProductSearchForm.vue";
import GoodsProductTable from "@/components/Goods/GoodsProductTable.vue";
import Pagination from "@/components/Goods/GoodsProductPagination.vue";
export default {
  name: "ClassifyList",
  data() {
    return {
      tableData: [], // 数据总数
      page: {
        currentPage: 1, // 当前页码
        pageSize: 10,
        pageTotal: 0,
      },
      showDatas: [], // 页面显示数据
      // 搜索数据
      goodsSearchForm: {
        classifyName: "", // 分类名称
        tier: "", // 层级
        superior: "", // 所属上级
      },
      // 新增表单
      editForm: {
        classifyName: "", //分类名称
        superior: "", // 所属上级
        tier: "", //
      },
      searchListTotal: 0, // 搜索数据总数
      searchFlag: false, // 是否开始搜索,控制分页
      searchList: [],
      searchRes: [],
      state1: "",
      editFormVisible: false,
      addSecVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      maxId: 0, // 最大id值
      // 新增二级表单
      addForm: {
        id: 0,
        classifyName: "", // 二级名称
        superior: "", // 所属上级
        tier: "二级", //
      },
    };
  },
  mounted() {
    this.handleGetData();
    bus.$on("sizeChange", (val) => {
      this.page.pageSize = val;
      this.page.currentPage = 1; // size变化时页码置为1
      if (this.searchFlag || this.searchList) {
        this.showDatas = this.searchList.filter((item, index) => {
          return index < val;
        });
      } else {
        this.showDatas = this.tableData.filter((item, index) => {
          return index < val;
        });
      }
    });
    bus.$on("currentChange", (val) => {
      // console.log("表格组件currentChange接收", val);
      let size = this.page.pageSize * (val - 1);
      let num = this.page.pageSize * val;
      let tables = []; //
      // if (this.searchFlag || this.searchList) {
      //   for (let i = size; i < num; i++) {
      //     if (this.searchList[i]) {
      //       tables.push(this.searchList[i]);
      //     }
      //     this.showDatas = tables;
      //   }
      // } else {
      tables.length = 0; // 清空
      for (let i = size; i < num; i++) {
        if (this.searchList.length !== 0) {
          // this.showDatas = this.searchList;
          tables.push(this.searchList[i]);
        } else if (this.tableData[i]) {
          tables.push(this.tableData[i]);
        }
        this.showDatas = tables;
      }
      // console.log("tables", tables);
      /* if (tables.length > 0) {
          tables.length = 0; // 清空
          for (let i = size; i < num; i++) {
            if (this.searchList.length != 0) {
              // this.showDatas = this.searchList;
              tables.push(this.searchList[i]);
            }
            this.showDatas = tables;
          }
        } */
      // console.log("页码改变了 tables", tables);
      // console.log("页码改变了 showDatas", this.showDatas);
      // console.log("页码改变了 searchList.length", this.searchList.length);
      // }
    });
    // '商品ID/商品标题/品种'搜索框相关
    this.searchRes = this.loadAll();
  },
  methods: {
    // 获取表格数据
    handleGetData() {
      classify.search().then(({ data }) => {
        if (data.status == "success") {
          this.tableData = data.data;
          this.setPageinations(this.tableData);
        }
        let id_list = [];
        this.tableData.forEach((item) => {
          item.id = parseInt(item.id);
          id_list.push(item.id);
        });
        this.maxId = Math.max(...id_list); // 获取 最大id值
      });
    },
    // 设置分页相关数据
    setPageinations(data) {
      this.page.pageTotal = data.length;
      this.page.pageSize = 10;
      this.page.currentPage = 1;
      // 默认显示的表格数据
      this.showDatas = data.filter((item, index) => {
        return index < this.page.pageSize;
      });
      // console.log("this.showDatas", this.showDatas);
      // console.log("表格的setPageinations设置默认分页数据");
    },

    // 删除
    handleTableDel(index, row) {
      // console.log("删除 index", index, row.id);
      classify
        .deleteById(row.id)
        .then(({ data }) => {
          console.log("handleTableDel data", data);
          if (data.status == "success") {
            this.$message({
              type: "success",
              message: data.message,
            });
          }
          this.tableData = data.data;
          if (this.searchList.length > 0) {
            // 搜索数据长度 > 0
          }
          this.handleGetData();
        })
        .catch((err) => this.$message.error(data.message));
    },

    //   查询按钮
    handelSearch() {
      console.log("handelSearch 查询");
      classify
        .doSearch(this.goodsSearchForm)
        .then(({ data }) => {
          console.log("handelSearch 查询", data);
          this.searchFlag = true; // 开启搜索
          this.searchListTotal = data.data.length;
          this.searchList = data.data;
          this.showDatas = this.searchList;
          this.setPageinations(this.showDatas);
          console.log("handelSearch searchList", this.searchList);
        })
        .catch((err) => {
          console.log("search err--", err);
          this.$message.error("Error error搜索失败");
        });
    },

    // 新增一级分类
    handleAddFirst() {
      this.$prompt("一级名称：", "新增一级", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPlaceholder: "请输入0-5个字符的名称",
        // inputPattern: /[]/, // 输入框验证正则表达式
        inputErrorMessage: "输入格式不正确",
      })
        .then(({ value }) => {
          let addFrom = {};
          addFrom.id = parseInt(this.maxId) + 1;
          addFrom.classifyName = value;
          addFrom.tier = "一级";
          addFrom.superior = "/";
          console.log("addFrom", addFrom);
          classify
            .add(addFrom)
            .then(({ data }) => {
              console.log("classify data", data);
              if (data.status == "success") {
                this.$message({
                  type: "success",
                  message: " 一级名称： " + value + " 添加成功",
                });
              }
            })
            .catch(() => {
              this.$message.error(data.message);
            });
          this.handleGetData();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消新增",
          });
        });
    },

    // 新增二级分类
    handleAddSecond() {
      this.dialogFormVisible = true;
    },
    // 提交新增二级
    handleAddSec() {
      this.dialogFormVisible = false;
      let form = this.addForm;
      console.log("form", form);
      form.id = parseInt(this.maxId) + 1;
      classify
        .add(form)
        .then(({ data }) => {
          console.log("handleAddSec addFrom", data);
          if (data.status == "success") {
            this.$message({
              type: "success",
              message: "二级名称添加成功",
            });
          }
        })
        .catch((err) => {
          console.log("新增二级 err", err);
          this.$message.error(data.message);
        });
      this.handleGetData();
    },
    // 取消新增二级分类
    handleCancelAddSec() {
      this.dialogFormVisible = false;
      this.$message({
        type: "info",
        message: "取消新增",
      });
    },

    // 点击编辑
    handleTableEdit(index, row) {
      this.editFormVisible = true; // 编辑弹窗
      this.editForm = row;
      console.log("Edit", this.editForm);
    },

    // 提交编辑
    handleEdit() {
      console.log("确认提交编辑内容");
      this.editFormVisible = false;
      classify
        .edit(this.editForm)
        .then(({ data }) => {
          console.log("handleEdit data", data);
          if (data.status == "success") {
            this.$message({
              type: "success",
              message: "编辑成功!",
            });
          } else {
            this.$message.error("编辑失败");
          }
        })
        .catch((err) => {
          console.log("handleEdit err", err);
        });
    },

    // 取消编辑
    handleCancelEdit() {
      this.editFormVisible = false;
      this.$message({
        type: "info",
        message: "取消编辑",
      });
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
        return res.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
      };
    },
    loadAll() {
      return [
        { value: "车厘子", address: "长宁区新渔路144号" },
        {
          value: "微醺",
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
    ["page.pageSize"]: {
      handler(newValue, oldValue) {
        // console.log("page.pageSize改变了", newValue, oldValue);
        this.page.pageSize = newValue;
      },
      deep: true,
    },
    ["page.currentPage"]: {
      handler(newValue, oldValue) {
        // console.log("page.currentPage改变了", newValue, oldValue);
        this.page.currentPage = newValue;
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
/* // 搜索部分开始 */
.goodsSearchCard {
  height: 90px;
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
/* // 搜索部分结束 */

deep/#addSecIpt {
  width: 221.5px;
}
</style>
