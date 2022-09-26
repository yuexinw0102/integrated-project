<template>
  <el-row>
    <el-col>
      <el-table
        :data="
          showData.slice(
            (page.page_num - 1) * page.page_size,
            page.page_num * page.page_size
          )
        "
        border
        style="width: 100%; overflow: auto"
        height="500"
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
        }else if (item.payment == "1") {
          item.payment = "微信支付";
        }else if (item.payment == "2") {
          item.payment = "支付宝支付";
        }
        data1.data.data.forEach((item1) => {
          if (item.warehouseId == item1.id) {
            item.name = item1.name;
            item.value = item1.value;
          }
        });
      });
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
};
</script>
