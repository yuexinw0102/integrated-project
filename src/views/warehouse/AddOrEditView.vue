<template>
  <ContentView>
    <!-- 面包屑插槽 -->
    <template v-slot:breadcrumb>
      <el-card shadow="never">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/welcome' }"
            >首页</el-breadcrumb-item
          >
          <el-breadcrumb-item>仓库管理</el-breadcrumb-item>
          <el-breadcrumb-item>{{$store.state.warehouseEditor}}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-card>
    </template>
    <template #dataTable>
      <State></State>
    </template>
  </ContentView>
</template>
<script>
import State from "@/components/warehouse/state.vue";
import ContentView from "@/components/ContentView.vue";
import { mapState } from "vuex";
export default {
  name: "AbsencesList",
  methods: {
    ...mapState(["warehouseEditor"])
  },
  components: { State,ContentView },
};
</script>
