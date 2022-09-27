<template #state>
  <ContentView>
    <!-- 面包屑插槽 -->
    <template v-slot:breadcrumb>
      <el-card shadow="never">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/welcome' }"
            >首页</el-breadcrumb-item
          >
          <el-breadcrumb-item>订单管理</el-breadcrumb-item>
          <el-breadcrumb-item>订单详情</el-breadcrumb-item>
        </el-breadcrumb>
      </el-card>
    </template>
    <template #dataTable>
      <orderDetails></orderDetails>
    </template>
  </ContentView>
</template>
<script>
import orderDetails from "@/components/order/orderDetails.vue";
import ContentView from "@/components/ContentView.vue";

export default {
  name: "AbsencesList",

  components: { orderDetails, ContentView },
};
</script>
