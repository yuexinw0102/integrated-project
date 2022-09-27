<template>
  <ContentView>
    <template #searchForm>
      <span>分拣监控</span>

      <Search_box style="height: auto"></Search_box>
    </template>
    <template #dataTable>
      <Table_area style="margin-bottom: 5px"></Table_area>
    </template>

    <template v-slot:pagination>
      <Pagination></Pagination>
    </template>
  </ContentView>
</template>

<script>
import ContentView from "@/components/ContentView.vue";
import Search_box from "@/components/sorting/Search_box.vue";
import Table_area from "@/components/sorting/Table_area.vue";
import Pagination from "@/components/Pagination.vue";
export default {
  name: "ListView",
  components: { ContentView, Search_box, Table_area, Pagination },
};
</script>
