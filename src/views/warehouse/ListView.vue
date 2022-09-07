<template>
    <div>
        仓库管理
        <el-card class="box-card" @get="get_data">
            <Search_box></Search_box>
        </el-card>
    </div>
</template>

<script>
    import axios from 'axios'
    import Search_box from "@/components/warehouse/Search_box.vue";
    import Table_area from "@/components/warehouse/Table_area.vue";
    import { mapMutations } from "vuex";
	import { NAMES } from "@/store";
    export default {
        name: "AbsencesList",
        data() {
            return {
                data: ""
            };
        },
        created() {
            axios.get("/warehouse").then(res => {
                this.data = res.data;
            });
            
        },
        methods: {
            get_data(){
                [NAMES.wa_city](this.data)
            },
            ...mapMutations([NAMES.wa_city]),
        },
        components: { Search_box, Table_area }
    }
</script>

<style>

</style>