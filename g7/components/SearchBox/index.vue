<template>
    <div>
        <div v-dom-sel>
            <slot></slot>
        </div>
        <div class="border-form" v-if="showPull">
            <span @click="pullForm" style="background: #e10032">
                <i :class="!!isPull? 'el-icon-arrow-up' : 'el-icon-arrow-down'" style="font-size: 12px;"></i>
            </span>
        </div>
        <div class="border-form" v-else></div>
    </div>
</template>

<script>
    export default {
        name: 'g7SearchBox',
        data() {
            return {
                showPull: false,
                isPull: false,
            };
        },
        mounted() {

        },
        methods: {
            pullForm() {
                this.isPull = !this.isPull;
            },
        },
    };
</script>

<style scoped>

</style>
