<template>
    <div class="menu-wrapper">
        <template v-for="item in items">
            <router-link v-if="noSubs(item)" :to="joinPath(item)" :key="item.name">
                <el-menu-item :index="item.index">
                    <g7-svg :type="item.icon" class="g7_svg_icon"></g7-svg>
                    <span slot="title">{{ item.name }}</span>
                </el-menu-item>
            </router-link>
            <el-submenu v-else :index="item.index" :key="item.name">
                <template slot="title">
                    <g7-svg v-if="item.icon" :type="item.icon" class="g7_svg_icon"></g7-svg>
                    <span slot="title">{{ item.name }}</span>
                </template>

                <template v-for="child in item.subs">
                    <g7-child-menu 
                        :is-nest="true"
                        :projectPath="projectPath"
                        :projectBasePath="projectBasePath"
                        :env="env"
                        :items="[child]"
                        :key="child.name"
                        class="nest-menu"
                        v-if="child.subs && child.subs.length">
                    </g7-child-menu>
                    <template v-else>
                        <template v-if="directPath(child)">
                            <router-link :to="joinPath(child)" :key="child.name" >
                                <el-menu-item :index="child.index">
                                    <g7-svg :type="child.icon" class="g7_svg_icon"></g7-svg>
                                    <span slot="title">{{ child.name }}</span>
                                </el-menu-item>
                            </router-link>
                        </template>
                        <template v-else>
                            <el-menu-item :index="false" class="el-menu-item-alink">
                                <a :href="joinPath(child)">
                                    <g7-svg v-if="item.icon" :type="child.icon" class="g7_svg_icon"></g7-svg>
                                    <span slot="title">
                                        {{ child.name }}
                                    </span>
                                </a>
                            </el-menu-item>
                        </template>
                    </template>
                </template>
            </el-submenu>
        </template>
    </div>
</template>

<script>
    export default {
        name: 'g7ChildMenu',
        data() {
            return {
            };
        },
        props: {
            env: {
                type: String,
            },
            items: {
                type: Array,
            },
            projectPath: {
                type: String,
            },
            projectBasePath: {
                type: String,
            },
        },
        methods: {
            noSubs(item) {
                return (!item.subs || (item.subs && !item.subs.length)) && item.path;
            },
            joinPath(item) {
                if (this.development) {
                    return item.path;
                }
                return this.externalPath(item);
            },
            directPath(child) {
                return (child.system && child.system === this.projectPath) || !child.system  || this.development;
            },
            externalPath(item) {
                if (!item.system || item.system === 'base') {
                    return `${this.projectBasePath}${item.path}`;
                }
                return `${this.projectBasePath}/${item.system}${item.path}`;
            },
        },
        computed: {
            development() {
                return this.env === 'development';
            },
        },
    };
</script>

<style scoped>
.g7_svg_icon{
    width:16px; height: 16px; color: #BEBEBE; position: relative; top: 2px;
}
.el-menu-item-alink{
    padding-left: 0 !important;
    padding-right: 0 !important;
    color: rgb(63, 63, 63);
    background-color: rgb(255, 255, 255);
}
.el-menu-item-alink a{
    display: block;
    padding-left: 40px;
    padding-right: 45px;
    color: rgb(63, 63, 63);
}
</style>
