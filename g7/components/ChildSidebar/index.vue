<template>
    <div class="menu-wrapper">
        <template v-for="item in items">
            <router-link v-if="noSubs(item)" :to="joinPath(item)" :key="item.name">
                <el-menu-item :index="item.index">
                    <i :class="item.icon"></i>
                    <span slot="title">{{ item.name }}</span>
                </el-menu-item>
            </router-link>
            <el-submenu v-else :index="item.index" :key="item.name">
                <template slot="title">
                    <i :class="item.icon"></i>
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
                                    <i :class="child.icon"></i>
                                    <span slot="title">{{ child.name }}</span>
                                </el-menu-item>
                            </router-link>
                        </template>
                        <template v-else>
                            <el-menu-item :index="child.index" class="el-menu-item-alink">
                                <a :href="joinPath(child)">
                                <i :class="child.icon"></i>
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
    import { Submenu, MenuItem } from "g7s-element";

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
        components: {
            [MenuItem.name]: MenuItem,
            [Submenu.name]: Submenu
        }
    };
</script>

<style scoped>
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
