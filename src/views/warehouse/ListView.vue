<template>
    <ContentView>
        <template #search_form>
            <Search_box :get_data="data"></Search_box>
        </template>
        <template #data_table>
            <Table_area style="margin-top: 30px;margin-bottom:20px" :get_data1="data"></Table_area>
        </template>
        <template v-slot:pagination>
            <Pagination :get_count="get_count"></Pagination>
        </template>
    </ContentView>

</template>

<script>
    import axios from 'axios'
    import ContentView from "@/components/ContentView.vue";
    import Search_box from "@/components/warehouse/Search_box.vue";
    import Table_area from "@/components/warehouse/Table_area.vue";
    import Pagination from "@/components/warehouse/Pagination.vue";

    export default {
        name: "AbsencesList",
        data() {
            return {
                data: [],
                get_count:0
            };
        },
        created() {
            axios.get("/warehouse").then(res => {
                console.log(res.data.count);
                this.data = res.data.data;
                this.get_count = res.data.count;
            });
            
        },
        mounted() {
        },
        methods: {
        },
        components: { ContentView, Search_box, Table_area,Pagination }
    }
</script>

<style>

</style>