<template>
    <div>
        <el-steps :active="stepActive" finish-status="success">
            <el-step v-for="(item, index) in setpList" :title="item.title" :key="index" />
        </el-steps>
    </div>
</template>

<script>
    export default {
        name: 'g7Steps',
        props: {
            /**
             * @parms setpList =>
             *  [{
                    title: '标题1',
                }, {
                    title: '标题2',
                }]
            */
            setpList: {
                type: Array,
            },
            stepActive: {
                type: Number,
            },
        },
        data: () => ({
        }),
        mounted() {
        },
        methods: {
        },
    };
</script>

<style>
.el-step__head.is-process .is-text{
    border-color: #e10032 !important;
    background: #e10032 !important;
}
.el-step__head.is-process .el-step__icon-inner{
    color: #fff !important;
}
.is-success .el-step__icon.is-text{
    border-color: #e10032 !important;
}
.is-success .el-step__icon{
    background: #e10032 !important;
}
.is-success .el-step__icon-inner{
    color: #fff !important;
}
.el-step__title.is-success{
    color: #e10032 !important;
}
.el-step__head.is-success{
    color: #e10032 !important;
    border-color: #e10032 !important;
}
</style>
