<template>
    <el-row type="flex" justify="">
        <el-col>
            <el-input v-model="input" style="width:300px" size="small" placeholder="仓库名称"></el-input>
            <el-input v-model="input" style="width:300px" size="small" placeholder="请输入内容"></el-input>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        props: ['get_data'],
        data() {
            return {
                data: this.get_data,
                input: ""
            }
        },
        mounted() {

        },
        methods: {
        },
    }
</script>