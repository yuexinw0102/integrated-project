<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>仓库管理 > {{ warehouseEditor }}</span>
    </div>
    <div class="text item">
      <el-form ref="form" :rules="rules" :model="form" label-width="auto">
        <!-- 仓库名称 -->
        <el-form-item label="仓库名称" prop="name">
          <el-input v-model="form.name" placeholder="仓库名称"></el-input>
        </el-form-item>
        <!-- 所在城市和区域 -->
        <el-form-item label="所在城市">
          <v-distpicker
            :province="form.province"
            :city="form.city"
            :area="form.area"
            style="width: 100%"
            @selected="onSelected"
          ></v-distpicker>
        </el-form-item>
        <!-- 仓库地址 -->
        <el-form-item label="仓库地址" prop="detailedAddress">
          <el-input
            placeholder="仓库地址"
            type="textarea"
            v-model="form.detailedAddress"
          ></el-input>
        </el-form-item>
        <!-- 仓库面积 -->
        <el-form-item label="仓库面积" prop="acreage">
          <el-input
            placeholder="仓库面积"
            v-model.number="form.acreage"
          ></el-input>
        </el-form-item>
        <!-- 小区 -->
        <el-form-item label="关联小区" type="flex" justify="">
          <el-input
            placeholder="请输入小区名称"
            v-model="searchData.searchCommunity"
            style="width: 200px"
          ></el-input>
          <el-button type="primary" @click="search('community')"
            >查询</el-button
          >
          <el-button type="primary" @click="dialogFormVisible = true"
            >新增小区</el-button
          >
          <!-- 小区新增 -->
          <el-dialog title="新增小区" :visible.sync="dialogFormVisible">
            <el-form :model="increaseData" ref="increaseData">
              <el-form-item label="请输入名称" prop="name">
                <el-input
                  v-model="increaseData.name"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="请输入地址" prop="value">
                <el-input
                  v-model="increaseData.value"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button
                type="primary"
                @click="increase('community', 'increaseData')"
                >确 定</el-button
              >
            </div>
          </el-dialog>
          <!-- 小区内容显示表格 -->
          <el-table
            :data="searchData.communityData"
            style="width: 100%"
            border
            size="small"
          >
            <el-table-column prop="name" label="小区名称" width="auto">
            </el-table-column>
            <el-table-column prop="value" label="小区地址" width="auto">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="deleteCommunity(scope.row.id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <!-- 骑手 -->
        <el-form-item label="配置骑手" type="flex" justify="">
          <el-input
            placeholder="请输入骑手名称"
            v-model="searchData.searchRider"
            style="width: 200px"
          ></el-input>
          <el-button type="primary" @click="search('rider')">查询</el-button>
          <el-button type="primary" @click="dialogFormVisible1 = true"
            >新增骑手</el-button
          >
          <!-- 骑手新增 -->
          <el-dialog title="新增骑手" :visible.sync="dialogFormVisible1">
            <el-form :model="personnelData" ref="personnelData">
              <el-form-item label="请输入姓名" prop="name">
                <el-input
                  v-model="personnelData.name"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="请输入电话" prop="phone">
                <el-input
                  v-model.number="personnelData.phone"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible1 = false">取 消</el-button>
              <el-button
                type="primary"
                @click="increase('rider', 'personnelData')"
                >确 定</el-button
              >
            </div>
          </el-dialog>
          <!-- 骑手数据显示区域 -->
          <el-table
            :data="searchData.riderData"
            style="width: 100%"
            :row-class-name="state"
            border
            size="small"
          >
            <el-table-column prop="name" label="骑手名称" width="auto">
            </el-table-column>
            <el-table-column prop="phone" label="手机号" width="auto">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.state == 1"
                  type="text"
                  size="small"
                  @click="disable(scope.row.id, 1)"
                  >停用</el-button
                >
                <el-button
                  v-else
                  type="text"
                  size="small"
                  @click="enable(scope.row.id, 1)"
                  >启用</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <!-- 分拣员 -->
        <el-form-item label="配置分拣员" type="flex" justify="">
          <el-input
            placeholder="请输入分拣员名称"
            v-model="searchData.searchSorting"
            style="width: 200px"
          ></el-input>
          <el-button type="primary" @click="search('sorting')">查询</el-button>
          <el-button type="primary" @click="dialogFormVisible2 = true"
            >新增分拣员</el-button
          >
          <!-- 分拣员新增 -->
          <el-dialog title="新增分拣员" :visible.sync="dialogFormVisible2">
            <el-form :model="personnelData" ref="personnelData">
              <el-form-item label="请输入姓名" prop="name">
                <el-input
                  v-model="personnelData.name"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="请输入电话" prop="phone">
                <el-input
                  v-model.number="personnelData.phone"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible2 = false">取 消</el-button>
              <el-button
                type="primary"
                @click="increase('sorting', 'personnelData')"
                >确 定</el-button
              >
            </div>
          </el-dialog>
          <!-- 分拣员数据显示区域 -->
          <el-table
            :data="searchData.sortingData"
            style="width: 100%"
            border
            size="small"
            :row-class-name="state"
          >
            <el-table-column prop="name" label="分拣员名称" width="auto">
            </el-table-column>
            <el-table-column prop="phone" label="手机号" width="auto">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.state == 1"
                  type="text"
                  size="small"
                  @click="disable(scope.row.id, 2)"
                  >停用</el-button
                >
                <el-button
                  v-else
                  type="text"
                  size="small"
                  @click="enable(scope.row.id, 2)"
                  >启用</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <!-- 操作 -->
        <el-form-item>
          <el-button @click="back()">返回</el-button>
          <el-button type="primary" @click="save('form')">保存资料</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<style>
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.el-table .warning-row {
  background-color: oldlace;
}
</style>
<script>
import VDistpicker from "v-distpicker";
import warehouse from "@/axios/warehouse";
import warehouseRider from "@/axios/warehouseRider";
import warehouseSorting from "@/axios/warehouseSorting";
import warehouseCommunity from "@/axios/warehouseCommunity";
export default {
  name: "AbsencesAddOrEdit",
  data() {
    return {
      dataId: this.$route.query.id,
      warehouseEditor: "",
      showData: [],
      communityData: [],
      riderData: [],
      sortingData: [],
      searchData: {
        searchCommunity: "",
        searchRider: "",
        searchSorting: "",
        communityData: [],
        riderData: [],
        sortingData: [],
      },
      form: {
        id: "",
        name: "",
        province: "",
        area: "",
        city: "",
        acreage: "",
        detailedAddress: "",
        state: 1,
      },
      rules: {
        name: [
          { required: true, message: "请输入仓库名称", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "blur",
          },
        ],
        acreage: [
          { required: true, message: "请输入仓库面积", trigger: "blur" },
        ],
        detailedAddress: [
          { required: true, message: "请输入仓库地址", trigger: "blur" },
        ],
      },
      increaseData: {
        id: "",
        name: "",
        value: "",
        warehouseId: "",
      },
      personnelData: {
        id: "",
        name: "",
        phone: "",
        warehouseId: "",
        state: 1,
      },
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
    };
  },
  computed: {
    fullAddress: function () {
      return (
        this.selected.province +
        "-" +
        this.selected.city +
        "-" +
        this.selected.area
      );
    },
  },
  created() {
    //数据获取
    warehouse.search().then(({ data }) => {
      if (data.status == "success") {
        this.showData = data.data;
        this.handlerGetBox();
      }
    });
    warehouseCommunity.search().then(({ data }) => {
      if (data.status == "success") {
        this.communityData = data.data;
        this.communityData.forEach((item) => {
          if (item.warehouseId == this.dataId) {
            this.searchData.communityData.push(item);
          }
        });
      }
    });
    warehouseRider.search().then(({ data }) => {
      if (data.status == "success") {
        this.riderData = data.data;
        this.riderData.forEach((item) => {
          if (item.warehouseId == this.dataId) {
            this.searchData.riderData.push(item);
          }
        });
      }
    });
    warehouseSorting.search().then(({ data }) => {
      if (data.status == "success") {
        this.sortingData = data.data;
        this.sortingData.forEach((item) => {
          if (item.warehouseId == this.dataId) {
            this.searchData.sortingData.push(item);
          }
        });
      }
    });

    //面包屑内容
    if (this.dataId == undefined) {
      this.warehouseEditor = "新增仓库";
    } else {
      this.warehouseEditor = "仓库详情";
    }
  },
  mounted() {},
  methods: {
    back() {
      this.$router.push("/warehouse");
    },
    //所在城市和区域下拉框数据获取与去重
    handlerGetBox() {
      this.showData.forEach((item, index) => {
        if (item.id == this.dataId) {
          this.form = item;
        }
      });
    },
    save(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.form.id !== "") {
            //修改
            warehouse.edit(this.form);
          } else if (this.form.id == "") {
            //增加
            let max = [];
            this.showData.forEach((item) => {
              max.push(item.id);
            });
            let arr = Math.max(...max);
            this.form.id = arr + 1;
            warehouse.add(this.form);
          }
        }
      });
    },
    search(dataName) {
      if (dataName == "community") {
        this.communityData = this.form[dataName].filter(
          (item) => item.name == this.searchCommunity
        );
      } else if (dataName == "rider") {
        this.riderData = this.form[dataName].filter(
          (item) => item.name == this.searchRider
        );
      } else if (dataName == "sorting") {
        this.sortingData = this.form[dataName].filter(
          (item) => item.name == this.searchSorting
        );
      }
    },

    //小区删除
    deleteCommunity(index) {
      warehouseCommunity.deleteById(index);
    },

    //增加
    increase(dataName, formName) {
      if (dataName == "community") {
        if (this.increaseData.name !== "" && this.increaseData.value !== "") {
          this.dialogFormVisible = false;
          let max = [];
          this.communityData.forEach((item) => {
            max.push(item.id);
          });
          let arr = Math.max(...max);
          this.increaseData.id = arr + 1;
          this.increaseData.warehouseId = this.dataId;
          warehouseCommunity.add(this.increaseData);
        } else {
          this.$message.error("请输入内容");
        }
      } else if (dataName == "rider") {
        if (this.personnelData.name !== "" && this.personnelData.phone !== "") {
          this.dialogFormVisible1 = false;
          let max = [];
          this.riderData.forEach((item) => {
            max.push(item.id);
          });
          let arr = Math.max(...max);
          this.personnelData.id = arr + 1;
          this.personnelData.warehouseId = this.dataId;
          warehouseRider.add(this.personnelData);
        } else {
          this.$message.error("请输入内容");
        }
      } else if (dataName == "sorting") {
        if (this.personnelData.name !== "" && this.personnelData.phone !== "") {
          this.dialogFormVisible2 = false;
          let max = [];
          this.sortingData.forEach((item) => {
            max.push(item.id);
          });
          let arr = Math.max(...max);
          this.personnelData.id = arr + 1;
          this.personnelData.warehouseId = this.dataId;
          warehouseSorting.add(this.personnelData);
        } else {
          this.$message.error("请输入内容");
        }
      }
      this.$refs[formName].resetFields();
    },

    //城市三级联动插件
    onSelected(data) {
      const { province, city, area } = data;
      if (!province.code && !city.code && !city.code) return;
      this.form.province = province.value;
      this.form.city = city.value;
      this.form.area = area.value;
    },

    //停用与启用
    state({ row, rowIndex }) {
      if (row.state === 0) {
        return "warning-row";
      }
    },
    disable(id, dataName) {
      if (dataName == 1) {
        this.searchData.riderData.forEach((item) => {
          if (item.id === id) {
            item.state = 0;
            warehouseRider.edit({ state: `${item.state}`, id: item.id });
          }
        });
      } else {
        this.searchData.sortingData.forEach((item) => {
          if (item.id === id) {
            item.state = 0;
            warehouseSorting.edit({ state: `${item.state}`, id: item.id });
          }
        });
      }
    },
    enable(id, dataName) {
      if (dataName == 1) {
        this.searchData.riderData.forEach((item) => {
          if (item.id === id) {
            item.state = 1;
            warehouseRider.edit({ state: `${item.state}`, id: item.id });
          }
        });
      } else {
        this.searchData.sortingData.forEach((item) => {
          if (item.id === id) {
            item.state = 1;
            warehouseSorting.edit({ state: `${item.state}`, id: item.id });
          }
        });
      }
    },
  },

  components: {
    VDistpicker,
  },
};
</script>
