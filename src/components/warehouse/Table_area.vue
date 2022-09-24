<template>
  <el-row>
    <el-col>
      <el-button
        style="margin-bottom: 10px"
        type="primary"
        @click="new_warehouse()"
        size="small"
        >新增仓库</el-button
      >
      <el-table
        :data="
          showData.slice(
            (page.page_num - 1) * page.page_size,
            page.page_num * page.page_size
          )
        "
        border
        style="width: 100%; overflow: auto"
        height="450"
        :row-class-name="state"
      >
        <el-table-column prop="name" label="仓库名称"> </el-table-column>
        <el-table-column prop="city" label="所在城市"> </el-table-column>
        <el-table-column prop="area" label="所在区域"> </el-table-column>
        <el-table-column prop="date" label="仓库地址">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top">
              <p>所在城市: {{ scope.row.city }}</p>
              <p>所在区域: {{ scope.row.area }}</p>
              <p>详细地址: {{ scope.row.detailedAddress }}</p>
              <div slot="reference" class="name-wrapper">
                <el-button type="text" size="small">查看</el-button>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="acreage" label="仓库面积"> </el-table-column>

        <el-table-column prop="community" label="关联小区数"> </el-table-column>
        <el-table-column prop="rider" label="骑手数"></el-table-column>
        <el-table-column prop="sorting" label="分拣员数"> </el-table-column>
        <el-table-column
          label="操作"
          :filters="[
            { text: '已启用', value: '1' },
            { text: '已停用', value: '0' },
          ]"
          :filter-method="rider"
        >
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.state == 1"
              type="text"
              size="small"
              @click="new_warehouse(scope.row.id)"
              >仓库详情</el-button
            >
            <el-button
              v-if="scope.row.state == 1"
              type="text"
              size="small"
              @click="disable(scope.row.id)"
              >停用</el-button
            >
            <el-button
              v-else
              type="text"
              size="small"
              @click="enable(scope.row.id)"
              >启用</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<style>
.el-table .warning-row {
  background-color: oldlace;
}
</style>
<script>
import bus from "@/eventBus/eventBus";
import { mapMutations } from "vuex";
import { NAMES } from "@/store";
import warehouse from "@/axios/warehouse";
export default {
  data() {
    return {
      tableData: [],
      showData: [],
      page: {
        page_size: 10,
        page_num: 1,
      },
    };
  },
  created() {},
  mounted() {
    this.handlerGetData();
    bus.$on("warehouse_num_change", (val) => {
      this.page.page_num = val;
    });
    bus.$on("warehouse_size_change", (val) => {
      this.page.page_size = val;
      this.page.page_num = 1;
    });
    bus.$on("warehouse_query_form", (val) => {
      this.showData = val;
      if (val == null) {
        this.showData = this.tableData;
      }
    });
  },
  computed: {},
  methods: {
    //获取数据
    handlerGetData() {
      warehouse.search().then(({ data }) => {
        if (data.status == "success") {
          this.tableData = data.data;
          this.showData = this.tableData;
        }
      });
      warehouse.searchCommunity().then(({ data }) => {
        if (data.status == "success") {
          this.showData.forEach((item) => {
            data.data.forEach((item1) => {
              if (item.id == item1.warehouseId) {
                item.community = item1.community;
              }
            });
          });
        }
      });
      warehouse.searchRider().then(({ data }) => {
        if (data.status == "success") {
          this.showData.forEach((item) => {
            data.data.forEach((item1) => {
              if (item.id == item1.warehouseId) {
                item.rider = item1.rider;
              }
            });
          });
        }
      });
      warehouse.searchSorting().then(({ data }) => {
        if (data.status == "success") {
          this.showData.forEach((item) => {
            data.data.forEach((item1) => {
              if (item.id == item1.warehouseId) {
                item.sorting = item1.sorting;
              }
            });
          });
        }
      });
    },
    rider(value, row, column) {
      return row.state == column.filteredValue[0];
    },
    new_warehouse(id) {
      console.log(id);
      this.$router.replace({path:"/new_warehouse",query:{id:id}});
      // this[NAMES.set_warehouseDataId](id);
    },
    state({ row, rowIndex }) {
      if (row.state === 0) {
        return "warning-row";
      }
    },
    disable(id) {
      this.showData.forEach((item) => {
        if (item.id === id) {
          item.state = 0;
          warehouse
            .edit({ state: `${item.state}`, id: item.id })
            .then(({ data }) => {
              console.log("handleEdit data", data);
              if (data.status == "success") {
                this.$message({
                  type: "success",
                  message: "已停用",
                });
              } else {
                this.$message.error("停用失败");
              }
            })
            .catch((err) => {
              console.log("handleEdit err", err);
            });
        }
      });
    },
    enable(id) {
      this.showData.forEach((item) => {
        if (item.id === id) {
          item.state = 1;
          warehouse
            .edit({ state: `${item.state}`, id: item.id })
            .then(({ data }) => {
              console.log("handleEdit data", data);
              if (data.status == "success") {
                this.$message({
                  type: "success",
                  message: "已启用",
                });
              } else {
                this.$message.error("启用失败");
              }
            })
            .catch((err) => {
              console.log("handleEdit err", err);
            });
        }
      });
    },
    ...mapMutations([NAMES.set_warehouseEditor, NAMES.set_warehouseDataId]),
  },
  watch: {
    showData: function (newVal, oldVal) {
      if (newVal != oldVal) {
        bus.$emit("warehouse_get_count", this.showData.length);
      }
      // newVal.forEach(val => {
      //   console.log(val);
      //   if (val.state == "0") {
      //     this.state()
      //   }
      // })
    },
  },
};
</script>
