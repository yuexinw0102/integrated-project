<template>
    <el-row>
        <el-col>
            <el-button style="margin-bottom: 10PX;" type="primary">新增仓库</el-button>
            <el-table :data="get_data1" border style="width: 100%; overflow:auto;" height= '475' stripe v-infinite-scroll="load" >
                <el-table-column prop="name" label="仓库名称">
                </el-table-column>
                <el-table-column prop="city" label="所在城市">
                </el-table-column>
                <el-table-column prop="area" label="所在区域">
                </el-table-column>
                <el-table-column prop="date" label="仓库地址">
                    <template slot-scope="scope">
                        <el-button type="text" size="small">查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="acreage" label="仓库面积">
                </el-table-column>
                <el-table-column prop="date" label="关联小区数">
                </el-table-column>
                <el-table-column prop="date" label="骑手数">
                </el-table-column>
                <el-table-column prop="date" label="分拣员数">
                </el-table-column>
                <el-table-column prop="date" label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small">仓库详情</el-button>
                        <el-button type="text" size="small">停用</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>
</template>

<style>
    *{
        /* justify-content: space-between; */
    }
</style>
<script>
    export default {
        props:["get_data1"],
        data() {
            return {
                tableData: [{
                    name: this.get_data1.name,
                    city: this.get_data1.city,
                    area: this.get_data1.area,
                    acreage: this.get_data1.acreage,
                }]
            }
        }
    }
</script>