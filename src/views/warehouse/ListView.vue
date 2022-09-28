<template>
  <ContentView>
     <!-- 面包屑插槽 -->
     <template v-slot:breadcrumb>
      <el-card shadow="never">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>仓库管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-card>
    </template>
    <template #searchForm>
      <Search_box style="height:auto"></Search_box>
    </template>
    <template #dataTable>
      <Table_area style="margin-bottom:5px;"></Table_area>
    </template>
    <template v-slot:pagination>
      <Pagination></Pagination>
    </template>
  </ContentView>
</template>

<script>
import ContentView from "@/components/ContentView.vue";
import Search_box from "@/components/warehouse/Search_box.vue";
import Table_area from "@/components/warehouse/Table_area.vue";
import Pagination from "@/components/Pagination.vue";
export default {
  name: "ListView",
  components: { ContentView, Search_box, Table_area, Pagination },
};
</script>