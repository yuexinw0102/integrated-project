<template>
  <el-row>
    <el-col>
      <p>
        <span>{{ waitingPayment | WaitingPayment }}</span>
        <span>{{ waitingSorting | WaitingSorting }}</span>
        <span>{{ waitingRider | WaitingRider }}</span>
        <span>{{ onRider | OnRider }}</span>
        <span>{{ deal | Deal }}</span>
        <span>{{ dealOut | DealOut }}</span>
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
        <el-table-column prop="payment" label="支付方式"> </el-table-column>
        <el-table-column prop="money" label="商品金额"> </el-table-column>
        <el-table-column prop="shippingFee" label="配送费"> </el-table-column>
        <el-table-column prop="amountPaid" label="实付金额"> </el-table-column>
        <el-table-column prop="quantity" label="商品数量"> </el-table-column>
        <el-table-column prop="date" label="收货地址">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top">
              <p>小区名: {{ scope.row.name }}</p>
              <p>详细地址: {{ scope.row.value }}</p>
              <div slot="reference" class="name-wrapper">
                <el-button type="text" size="small">查看</el-button>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="orderState" label="订单状态"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="new_order(scope.row.id)"
              >订单详情</el-button
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
import warehouseCommunity from "@/axios/warehouseCommunity";
import order from "@/axios/order";
export default {
  data() {
    return {
      tableData: [],
      showData: [],
      waitingPayment: "",
      waitingSorting: "",
      waitingRider: "",
      onRider: "",
      deal: "",
      dealOut: "",
      page: {
        page_size: 10,
        page_num: 1,
      },
    };
  },
  async created() {
    let data = await order.search();
    let data1 = await warehouseCommunity.search();

    if (data.data.status == "success" && data1.data.status == "success") {
      this.tableData = data.data.data;
      this.showData = this.tableData;
      let waitingPayment = [];
      let waitingSorting = [];
      let waitingRider = [];
      let onRider = [];
      let deal = [];
      let dealOut = [];
      this.showData.forEach((item) => {
        if (item.orderState == "0") {
          item.orderState = "待支付";
          waitingPayment.push(item);
        } else if (item.orderState == "1") {
          item.orderState = "待分拣";
          waitingSorting.push(item);
        } else if (item.orderState == "2") {
          item.orderState = "待配送";
          waitingRider.push(item);
        } else if (item.orderState == "3") {
          item.orderState = "配送中";
          onRider.push(item);
        } else if (item.orderState == "4") {
          item.orderState = "交易完成";
          deal.push(item);
        } else if (item.orderState == "5") {
          item.orderState = "交易关闭";
          dealOut.push(item);
        }
        if (item.payment == "0") {
          item.payment = "/";
        } else if (item.payment == "1") {
          item.payment = "微信支付";
        } else if (item.payment == "2") {
          item.payment = "支付宝支付";
        }
        data1.data.data.forEach((item1) => {
          if (item.warehouseId == item1.id) {
            item.name = item1.name;
            item.value = item1.value;
          }
        });
        const moment = require("moment");
        item.time = moment(item.time).format("Y-MM-DD HH:mm:ss");
      });
      this.waitingPayment = waitingPayment.length;
      this.waitingSorting = waitingSorting.length;
      this.waitingRider = waitingRider.length;
      this.onRider = onRider.length;
      this.deal = deal.length;
      this.dealOut = dealOut.length;
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
  computed: {},
  methods: {
    new_order(id) {
      this.$router.replace({ path: "/new_order", query: { id: id } });
    },
  },
  watch: {
    showData: function (newVal, oldVal) {
      if (newVal != oldVal) {
        bus.$emit("warehouse_get_count", this.showData.length);
      }
    },
  },
  filters: {
    WaitingSorting(value) {
      return "待分拣（" + value + "） ";
    },
    WaitingRider(value) {
      return "待配送（" + value + "） ";
    },
    WaitingPayment(value) {
      return "待支付（" + value + "） ";
    },
    OnRider(value) {
      return "配送中（" + value + "） ";
    },
    Deal(value) {
      return "交易完成（" + value + "） ";
    },
    DealOut(value) {
      return "交易关闭（" + value + "） ";
    },
  },
};
</script>
