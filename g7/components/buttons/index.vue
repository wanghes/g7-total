<template>
    <div class="buttons_group">
        <span class="buttons-box" v-for="item in buttonsGroup">
            <el-button :type="item.type" 
                    :disabled="item.bdisabled" 
                    class="hidden-sm-and-down ml4" 
                    :icon="item.icon" 
                    @click="handleClick(item)">{{item.buttonName}}</el-button>
            <el-tooltip class="item" effect="dark" :content="item.buttonName" placement="top-start">
                <el-button :type="item.type" 
                            :disabled="item.bdisabled" 
                            class="hidden-md-and-up ml4" 
                            :icon="item.icon" 
                            @click="handleClick(item)"></el-button>
            </el-tooltip>
        </span>
    </div>
</template>

<script>
    export default {
        name: 'g7Buttons',
        data() {
            return {
                bdisabled: false,
            };
        },
        props: {
            buttonsGroup: {
                type: Array,
            },
        },
        mounted() {},
        methods: {
            handleClick(item) {
                this.$emit(item.handle);
            },
        }
    };
</script>

<style scoped>
    .buttons_group {
        padding: 15px 0;
    }
    .ml4{
        margin-left:4px;
    }
</style>
