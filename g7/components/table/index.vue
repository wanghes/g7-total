<template>
    <div class="list-content">
        <div class="list-wrap" >
            <div class="table-wrapper" style="display: flex; flex-direction: column;">
                <el-table border ref="multipleTable" tooltip-effect="dark" :data="tableDatas" :default-sort = "{prop: 'date', order: 'descending'}" style="width: 100%; flex:1;" height="90%" @selection-change="handleSelectionChange" @row-click="handleSelectionRow" @cell-click="handleColumnClick">
                    <el-table-column fixed type="selection" width="35">
                    </el-table-column>
                    <el-table-column sortable :prop="item.fieldName" :key="index" :label="item.title" :min-width="item.width" v-for="(item,index) in tableHeaderDatas" show-overflow-tooltip>
                        <template slot-scope="scope" >
                            <t-render :row="scope.row" :index="index" :col="item"></t-render>
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
    export default {
        name: 'g7Table',
        components: {
            // tRender组件渲染
            tRender: {
              functional: true,
              /**
               * @param {row} obj 行数据
               * @param {index} number 行索引
               * @param {col} obj 列属性
               */
              props: ['row','index','col'],
              render(h,ctx) {
                var child
                var {col} = ctx.props
                if(col.render){
                    var view = col.render(h,ctx.props)
                    view = (
                      <div class="hover">
                        {view}
                      </div>
                    )
                    child = [view]
                }else{
                  var childText = eval(`ctx.props.row.${col.fieldName}`);
                  //如果需要过滤数据请写filter函数;
                  if(col.filter) {
                    childText = col.filter(childText)
                  }
                  child =childText
                }
                var tdclass = col.class || []
                return h(
                  'span',
                  {
                    class: [...tdclass]
                  },
                  child
                )
              }
            },
        },        
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
            // 当某个单元格被点击-测试
            handleColumnClick(column, event) {
                this.$emit('handleColumnClick', column, event);
            }
        },
    };
</script>

<style scoped>
    .table-wrapper {
        height: 100%;
        cursor: pointer;
    }
</style>
