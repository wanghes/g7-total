<template>
    <div class="list-content">
        <div class="list-wrap" >
            <div class="table-wrapper" style="display: flex; flex-direction: column;">
                <el-table border ref="multipleTable" tooltip-effect="dark" :data="tableDatas" :default-sort = "{prop: 'date', order: 'descending'}" style="width: 100%; flex:1;" height="90%" @selection-change="handleSelectionChange" @row-click="handleSelectionRow">
                    <el-table-column fixed type="selection" width="35">
                    </el-table-column>
                    <el-table-column sortable :prop="item.fieldName" :key="index" :label="item.title" :min-width="item.width" v-for="(item,index) in tableHeaderDatas" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <!--<el-tag v-if="item.fieldName == 'status'" :type="scope.row.status === 1 ? 'success' : 'danger'" close-transition>{{scope.row.status | statusFilter}}</el-tag>-->
                            <span >{{scope.row[item.fieldName]}}</span>
                        </template>
                    </el-table-column>
                </el-table>
                <div>
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="paginationDatas.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="paginationDatas.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="paginationDatas.totalPage" :small="true" style="float: right; overflow: hidden; padding: 10px 0;">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { Table, Pagination, TableColumn } from "g7s-element";

    export default {
        name: 'g7Table',
        data() {
            return {
            };
        },
        props: {
            tableDatas: {
                type: Array,
            },
            tableHeaderDatas: {
                type: Array,
            },
            paginationDatas: {
                type: Object,
            },
        },
        mounted() {},
        methods: {
            handleSelectionChange(val) {
                this.$parent.buttonsGroup = this.$parent.buttonsGroup.map((item) => {
                    if (item.ismultiple === undefined) {
                        return item;
                    }
                    if (!item.ismultiple && val.length > 1 || !item.ismultiple && val.length < 1 || item.ismultiple && val.length < 1) {
                        item.bdisabled = true;
                        return item;
                    }
                    if (!item.ismultiple && val.length === 1 || item.ismultiple && val.length > 0) {
                        item.bdisabled = false;
                        return item;
                    }
                    return item;
                });
                this.$emit('handleSelectionChange', val);
            },
            handleSelectionRow(row) {
                debugger;
                this.$refs.multipleTable.toggleRowSelection(row);
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.$emit('handleSizeChange', val);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.$emit('handleCurrentChange', val);
            },
        },
        components: {
            [Table.name]: Table,
            [Pagination.name]: Pagination,
            [TableColumn.name]: TableColumn
        }
    };
</script>

<style scoped>
    .table-wrapper {
        height: 100%;
    }
</style>
