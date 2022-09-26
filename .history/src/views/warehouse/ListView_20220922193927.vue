<template>
  <ContentView>
    <template #searchForm>
      <span>仓库管理</span>
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
import Pagination from "@/components/warehouse/Pagination.vue";
export default {
  name: "ListView",
  components: { ContentView, Search_box, Table_area, Pagination },
};
</script>