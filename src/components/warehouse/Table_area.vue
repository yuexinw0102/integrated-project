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
        <el-table-column prop="city.val" label="所在城市"> </el-table-column>
        <el-table-column prop="area.val" label="所在区域"> </el-table-column>
        <el-table-column prop="date" label="仓库地址">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top">
              <p>所在城市: {{ scope.row.city.val }}</p>
              <p>所在区域: {{ scope.row.area.val }}</p>
              <p>详细地址: {{ scope.row.detailed_address }}</p>
              <div slot="reference" class="name-wrapper">
                <el-button type="text" size="small">查看</el-button>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="acreage" label="仓库面积"> </el-table-column>

        <el-table-column prop="community.length" label="关联小区数">
        </el-table-column>
        <el-table-column prop="rider.length" label="骑手数"></el-table-column>
        <el-table-column prop="sorting.length" label="分拣员数">
        </el-table-column>
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
import router from "@/router";
export default {
  data() {
    return {
      tableData: JSON.parse(localStorage.getItem("warehouseData")),
      showData: [],
      page: {
        page_size: 10,
        page_num: 1,
      },
    };
  },
  mounted() {
    this.showData = this.tableData
    console.log();
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
    rider(value, row, column) {
      return row.state == column.filteredValue[0];
    },
    new_warehouse(id) {
      if (typeof id !== "number") {
        this.$router.replace("/new_warehouse");
        this[NAMES.set_warehouseDataId]("");
        this[NAMES.set_warehouseEditor]("新增仓库");
      } else {
        this.$router.replace("/new_warehouse");
        this[NAMES.set_warehouseDataId](id);
        this[NAMES.set_warehouseEditor]("仓库详情");
      }
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
        }
      });
    },
    enable(id) {
      this.showData.forEach((item) => {
        if (item.id === id) {
          item.state = 1;
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
    },
  },
};
</script>
