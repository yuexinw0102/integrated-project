<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>仓库管理 > {{ $store.state.warehouseEditor }}</span>
    </div>
    <div class="text item">
      <el-form ref="form" :rules="rules" :model="form" label-width="auto">
        <!-- 仓库名称 -->
        <el-form-item label="仓库名称" prop="name">
          <el-input v-model="form.name" placeholder="仓库名称"></el-input>
        </el-form-item>
        <!-- 所在城市和区域 -->
        <el-form-item v-if="this.dataId == ''" label="所在城市">
          <v-distpicker @selected="onSelected"></v-distpicker>
        </el-form-item>
        <el-row v-else type="flex" justify="">
          <el-col :span="11">
            <el-form-item prop="city" label="所在城市">
              <el-select
                v-model="form.city"
                placeholder="所在城市"
                size="small"
                style="width: 100%"
              >
                <el-option
                  v-for="(item, index) in city"
                  :key="index"
                  :label="item.label"
                  :value="item.label"
                >
                  <span style="float: left">{{ item.label }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2"></el-col>
          <el-col :span="11">
            <el-form-item prop="area" label="所在城市">
              <el-select
                v-model="form.area"
                placeholder="所在区域"
                size="small"
                style="width: 100%"
              >
                <el-option
                  v-for="(item, index) in area"
                  :key="index"
                  :label="item.label"
                  :value="item.label"
                >
                  <span style="float: left">{{ item.label }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 仓库地址 -->
        <el-form-item label="仓库地址" prop="detailed_address">
          <el-input
            placeholder="仓库地址"
            type="textarea"
            v-model="form.detailed_address"
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
            <el-table-column prop="address" label="小区地址" width="auto">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="deleteCommunity(scope.$index)"
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
            <el-form :model="increaseData" ref="increaseData">
              <el-form-item label="请输入姓名">
                <el-input
                  v-model="increaseData.name"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="请输入电话">
                <el-input
                  v-model.number="increaseData.value"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible1 = false">取 消</el-button>
              <el-button
                type="primary"
                @click="increase('rider', 'increaseData')"
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
                  @click="disable(scope.row.name, 1)"
                  >停用</el-button
                >
                <el-button
                  v-else
                  type="text"
                  size="small"
                  @click="enable(scope.row.name, 1)"
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
            <el-form :model="increaseData" ref="increaseData">
              <el-form-item label="请输入姓名" prop="name">
                <el-input
                  v-model="increaseData.name"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="请输入电话" prop="value">
                <el-input
                  v-model.number="increaseData.value"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible2 = false">取 消</el-button>
              <el-button
                type="primary"
                @click="increase('sorting', 'increaseData')"
                @change="validation('increaseData')"
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
                  @click="disable(scope.row.name, 2)"
                  >停用</el-button
                >
                <el-button
                  v-else
                  type="text"
                  size="small"
                  @click="enable(scope.row.name, 2)"
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
import { mapState } from "vuex";
export default {
  name: "AbsencesAddOrEdit",
  data() {
    return {
      showData: JSON.parse(localStorage.getItem("warehouseData")),
      area: "",
      city: "",
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
        area: {},
        city: {},
        acreage: "",
        detailed_address: "",
        community: [],
        rider: [],
        sorting: [],
        state:1
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
        detailed_address: [
          { required: true, message: "请输入仓库地址", trigger: "blur" },
        ],
      },
      selected: {
        province: "",
        city: "",
        area: "",
      },
      increaseData: {
        name: "",
        value: "",
      },
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
    };
  },
  computed: {
    ...mapState({
      dataId: "warehouseDataId",
    }),
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
  methods: {
    back() {
      this.$router.push("/warehouse");
    },
    save(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.form.id !== "") {
            this.showData.forEach((item) => {
              if (item.id == this.form.id) {
                item = this.form;
              }
            });
            localStorage.setItem(
              "warehouseData",
              JSON.stringify(this.showData)
            );
          } else if (this.form.id == "") {
            let max = [];
            ;
            this.showData.forEach((item) => {
              max.push(item.id);
            });
            let arr = Math.max(...max);
            this.form.id = arr + 1;
            this.form.area = {key:this.form.id,val:this.selected.area}
            this.form.city = {key:this.form.id,val:this.selected.city}
            this.showData.push(this.form);
            localStorage.setItem(
              "warehouseData",
              JSON.stringify(this.showData)
            );
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
    deleteCommunity(index) {
      this.form.community.splice(index, 1);
    },
    validation() {
      this.$refs[formName].validate();
    },
    increase(dataName, formName) {
      if (dataName == "community") {
        this.dialogFormVisible = false;
        this.form.community.push({
          name: this.increaseData.name,
          address: this.increaseData.value,
        });
      } else if (dataName == "rider") {
        this.dialogFormVisible1 = false;
        this.form.rider.push({
          name: this.increaseData.name,
          phone: this.increaseData.value,
          state: 1,
        });
      } else if (dataName == "sorting") {
        this.dialogFormVisible2 = false;
        this.form.sorting.push({
          name: this.increaseData.name,
          phone: this.increaseData.value,
          state: 1,
        });
      }
      if (this.increaseData.name !== "" || this.increaseData.value !== "") {
        this.$refs[formName].resetFields();
      }
    },
    onSelected(data) {
      const { province, city, area } = data;
      if (!province.code && !city.code && !city.code) return;
      this.selected.province = province.value;
      this.selected.city = city.value;
      this.selected.area = area.value;
    },
    state({ row, rowIndex }) {
      if (row.state === 0) {
        return "warning-row";
      } else {
        return "";
      }
    },
    disable(name, dataName) {
      if (dataName == 1) {
        this.form.rider.forEach((item1) => {
          if (item1.name === name) {
            item1.state = 0;
          }
        });
      } else {
        this.form.sorting.forEach((item1) => {
          if (item1.name === name) {
            item1.state = 0;
          }
        });
      }
    },
    enable(name, dataName) {
      if (dataName == 1) {
        this.form.rider.forEach((item1) => {
          if (item1.name === name) {
            item1.state = 1;
          }
        });
      } else {
        this.form.sorting.forEach((item1) => {
          if (item1.name === name) {
            item1.state = 1;
          }
        });
      }
    },
  },
  created() {
    let city = [];
    let area = [];
    this.showData.forEach((item) => {
      city.push({ label: item.city.val, disabled: false });
      area.push({ label: item.area.val, disabled: false });
    });
    let obj = {};
    this.city = city.reduce(function (item, next) {
      obj[next.label] ? "" : (obj[next.label] = true && item.push(next));
      return item;
    }, []);
    this.area = area.reduce(function (item, next) {
      obj[next.label] ? "" : (obj[next.label] = true && item.push(next));
      return item;
    }, []);
    this.showData.forEach((item) => {
      if (this.dataId !== "") {
        if (item.id == this.dataId) {
          return (this.form = item);
        }
      }
    });
    this.searchData.communityData = this.form.community;
    this.searchData.riderData = this.form.rider;
    this.searchData.sortingData = this.form.sorting;
  },
  components: {
    VDistpicker,
  },
};
</script>
