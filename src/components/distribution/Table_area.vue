<template>
  <el-row>
    <el-col>
      <p>
        <span>{{ waiting | Waiting }}</span>
        <span>{{ onTime | OnTime }}</span>
        <span>{{ timeout | Timeout }}</span>
      </p>
      <el-table
        :data="
          showData.slice(
            (page.page_num - 1) * page.page_size,
            page.page_num * page.page_size
          )
        "
        border
        style="width: 100%; overflow: auto"
        height="430"
      >
        <el-table-column prop="id" label="订单编号"> </el-table-column>
        <el-table-column prop="time" label="下单时间"> </el-table-column>
        <el-table-column prop="quantity" label="商品数量"> </el-table-column>
        <el-table-column prop="riderTime" label="配送时长"> </el-table-column>
        <el-table-column prop="riderState" label="配送状态"> </el-table-column>
        <el-table-column prop="rider" label="配送员"> </el-table-column>
        <el-table-column prop="city" label="所在城市"> </el-table-column>
        <el-table-column prop="area" label="所在区域"></el-table-column>
        <el-table-column prop="warehouse" label="仓库名称"> </el-table-column>
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
import warehouse from "@/axios/warehouse";
import order from "@/axios/order";
import warehouseRider from "@/axios/warehouseRider";
export default {
  data() {
    return {
      tableData: [],
      showData: [],
      Timeout: "",
      OnTime: "",
      Waiting: "",
      page: {
        page_size: 10,
        page_num: 1,
      },
    };
  },
  async created() {
    let data = await order.search();
    let data1 = await warehouse.search();
    let data2 = await warehouseRider.search();

    if (
      data.data.status == "success" &&
      data1.data.status == "success" &&
      data2.data.status == "success"
    ) {
      this.tableData = data.data.data;
      this.showData = this.tableData;
      let onTime = [];
      let waiting = [];
      let timeout = [];
      this.showData.forEach((item) => {
        if (item.riderState == "0") {
          item.riderState = "待配送";
          waiting.push(item);
        } else if (item.riderState == "1") {
          item.riderState = "准时配送";
          onTime.push(item);
        } else if (item.riderState == "2") {
          item.riderState = "超时配送";
          timeout.push(item);
        }
        data1.data.data.forEach((item1) => {
          if (item.warehouseId == item1.id) {
            item.warehouse = item1.name;
            item.city = item1.city;
            item.area = item1.area;
          }
        });
        data2.data.data.forEach((item1) => {
          if (item.warehouseId == item1.warehouseId) {
            item.rider = item1.name;
          }
        });
        const moment = require("moment");
        item.time = moment(item.time).format("Y-MM-DD HH:mm:ss");
      });
      this.waiting = waiting.length;
      this.onTime = onTime.length;
      this.timeout = timeout.length;
    }
  },
  mounted() {
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
  watch: {
    showData: function (newVal, oldVal) {
      if (newVal != oldVal) {
        bus.$emit("warehouse_get_count", this.showData.length);
      }
    },
  },
  filters: {
    Waiting(value) {
      return "待配送（" + value + "） ";
    },
    Timeout(value) {
      return "超时配送（" + value + "） ";
    },
    OnTime(value) {
      return "准时配送（" + value + "） ";
    },
  },
};
</script>
