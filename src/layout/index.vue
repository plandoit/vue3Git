<template>
    <div class="layout_container">
        <!-- 左侧菜单 -->
        <div class="layout_slider">
            <Logo></Logo>
            <el-scrollbar class="scrollbar">
                <!-- 表单组件 -->
                <el-menu :default-active="$route.path" background-color="#001529" text-color="white" router>
                    <Menu :menuList="userStore.menuRoutes"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <!-- 顶部导航 -->
        <div class="layout_tabbar">
            <Tabbar></Tabbar>
        </div>
        <!-- 内容展示区域 -->
        <div class="layout_main">
            <Main></Main>
        </div>
    </div>
</template>

<script setup lang='ts'>
// 引入顶部导航
import Tabbar from './components/tabbar.vue'
// 引入main组件
import Main from './components/main.vue'
// 引入logo组件
import Logo from './components/logo.vue'
// 引入菜单组件
import Menu from './components/menu.vue'
// 获取用户相关的小仓库
import useUserStore from '../store/modules/user';
// 获取路由对象
import { useRoute } from 'vue-router';
const userStore = useUserStore();

const $route = useRoute()

</script>
<script lang="ts">
export default {
    name: 'layout'
}
</script>

<style scoped lang="scss">
.layout_container {
    width: 100%;
    height: 100%;


    .layout_slider {
        width: $base-menu-width;
        height: 100vh;
        color: white;
        background: $base-menu-background;

        .scrollbar {
            width: 100%;
            height: calc(100vh - $base-menu-logo-height);

            .el-menu {
                border-right: none;
            }
        }
    }

    .layout_tabbar {
        position: fixed;
        width: calc(100% - $base-menu-width);
        height: $base-tabbar-height;
        top: 0px;
        left: $base-menu-width;
    }

    .layout_main {
        position: absolute;
        width: calc(100% - $base-menu-width);
        height: calc(100% - $base-tabbar-height);
        left: $base-menu-width;
        top: $base-tabbar-height;
        padding: 20px;
        overflow: hidden;
    }
}
</style>