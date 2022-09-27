<template>
  <el-card class="box-card">
    <el-descriptions
      class="margin-top"
      :title="showData.orderState | orderList"
      :column="2"
      border
    >
      <el-descriptions-item>
        <template slot="label"> 订单编号 </template>
        {{ showData.id }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"> 商品金额 </template>
        {{ showData.money | money }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"> 下单时间 </template>
        {{ showData.time }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"> 配送费用 </template>
        {{ showData.shippingFee | money }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"> 支付方式 </template>
        {{ showData.payment }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"> 实付金额 </template>
        {{ showData.amountPaid | money }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"> 收货地址 </template>
        {{ showData.value }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"> 预约时间 </template>
        尽快送达（预计14:15前）
      </el-descriptions-item>
    </el-descriptions>
    <br />
    <el-button @click="back()">返回</el-button>
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
import warehouseCommunity from "@/axios/warehouseCommunity";
import order from "@/axios/order";

export default {
  name: "AbsencesAddOrEdit",
  data() {
    return {
      dataId: this.$route.query.id,
      showData: [],
      tableData: [],
    };
  },
  async created() {
    let data = await order.search();
    let data1 = await warehouseCommunity.search();

    if (data.data.status == "success" && data1.data.status == "success") {
      this.tableData = data.data.data;
      this.showData = this.tableData;
      this.showData.forEach((item) => {
        if (item.orderState == "0") {
          item.orderState = "待支付";
        } else if (item.orderState == "1") {
          item.orderState = "待分拣";
        } else if (item.orderState == "2") {
          item.orderState = "待配送";
        } else if (item.orderState == "3") {
          item.orderState = "配送中";
        } else if (item.orderState == "4") {
          item.orderState = "交易完成";
        } else if (item.orderState == "5") {
          item.orderState = "交易关闭";
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
        if (item.id == this.dataId) {
          this.showData = item;
        }
        const moment = require("moment");
        item.time = moment(item.time).format("Y-MM-DD HH:mm:ss");
      });
    }
  },
  filters: {
    money(value) {
      return "￥ " + value;
    },
    orderList(value) {
      return "订单状态：" + value;
    },
  },
  methods: {
    back() {
      this.$router.push("/order_list");
    },
  },
};
</script>
