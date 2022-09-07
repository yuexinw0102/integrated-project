<template>
    <el-row type="flex" justify="">
        <el-col>
            <el-input v-model="input" style="width:300px" size="small" placeholder="仓库名称"></el-input>
            <el-input v-model="input" style="width:300px" size="small" placeholder="请输入内容"></el-input>
        </el-col>
    </el-row>
</template>

<script>
    import { mapMutations } from "vuex";
    import { NAMES } from "@/store";
    export default {
        data() {
            return {
                data:"",
                input:""
            }
        },
        created() {
            this.data=this[NAMES.wa_city]
        },
        methods: {
            ...mapMutations([NAMES.wa_city]),
        },
    }
</script>