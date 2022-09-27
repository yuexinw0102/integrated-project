<template>
  <el-form
    ref="resetForm"
    :model="query_form"
    label-width="auto"
    :inline="true"
  >
    <el-form-item prop="id">
      <el-input
        v-model="query_form.id"
        style="width: 200px"
        size="small"
        placeholder="订单编号"
      ></el-input>
    </el-form-item>

    <el-form-item prop="payment">
      <el-select
        v-model="query_form.payment"
        placeholder="支付方式"
        size="small"
      >
        <el-option
          v-for="(item, index) in options1"
          :key="index.value"
          :label="item.label"
          :value="item.value"
        >
          <span style="float: left">{{ item.label }}</span>
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item prop="orderState">
      <el-select
        v-model="query_form.orderState"
        placeholder="订单状态"
        size="small"
      >
        <el-option
          v-for="(item, index) in options"
          :key="index.value"
          :label="item.label"
          :value="item.value"
        >
          <span style="float: left">{{ item.label }}</span>
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item prop="time">
      <el-date-picker
        v-model="query_form.time"
        type="datetime"
        value-format="yyyy-MM-dd HH:mm:ss"
        size="small"
        placeholder="下单时间"
      >
      </el-date-picker>
    </el-form-item>

    <el-form-item prop="amountPaid">
      <el-input
        v-model.number="query_form.amountPaid"
        style="width: 200px"
        size="small"
        placeholder="实付金额"
      ></el-input>
    </el-form-item>

    <el-form-item prop="money">
      <el-input
        v-model.number="query_form.money"
        style="width: 200px"
        size="small"
        placeholder="商品金额"
      ></el-input>
    </el-form-item>

    <el-form-item prop="quantity">
      <el-input
        v-model="query_form.quantity"
        style="width: 200px"
        size="small"
        placeholder="商品数量"
      ></el-input>
    </el-form-item>

    <el-form-item>
      <el-button size="small" type="primary" @click="submitForm()"
        >查询</el-button
      >
      <el-button size="small" @click="resetForm('resetForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<style>
.el-form-item {
  margin-bottom: 0;
}
</style>

<script>
import bus from "@/eventBus/eventBus";
import order from "@/axios/order";
import warehouseCommunity from "@/axios/warehouseCommunity";

export default {
  data() {
    return {
      tableData: [],
      showData: [],
      query_form: {
        id: "",
        time: "",
        payment: "",
        quantity: "",
        orderState: "",
        amountPaid: "",
        money: "",
        quantity: "",
      },
      options: [
        { value: "5", label: "交易关闭" },
        { value: "4", label: "交易完成" },
        { value: "3", label: "配送中" },
        { value: "2", label: "待配送" },
        { value: "1", label: "待分拣" },
        { value: "0", label: "待支付" },
      ],
      options1: [
        { value: "2", label: "支付宝支付" },
        { value: "1", label: "微信支付" },
        { value: "0", label: "/" },
      ],
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
      });
    }
  },
  methods: {
    submitForm() {
      order
        .doSearch(this.query_form)
        .then(({ data }) => {
          this.showData = data.data;
        })
        .catch((err) => {
          this.$message.error("Error error搜索失败");
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      bus.$emit("warehouse_query_form", null);
    },
  },
  watch: {
    showData: async function (newVal, oldVal) {
      if (newVal != oldVal) {
        bus.$emit("warehouse_query_form", newVal);
        let data1 = await warehouseCommunity.search();
        if (data1.data.status == "success") {
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
          });
        }
      }
    },
  },
};
</script>
