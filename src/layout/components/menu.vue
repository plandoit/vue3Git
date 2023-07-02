<template>
    <template v-for="(item, index) in menuList" :key="item.path">
        <!-- 没有子路由 -->
        <!-- 数据大屏 -->
        <template v-if="!item.children">
            <el-menu-item v-if="!item.meta.hidden" :index="item.path">
                <template #title>
                    <span>{{ item.meta.title }}</span>
                </template>
            </el-menu-item>
        </template>
        <template v-if="!item.meta.hidden">
            <!-- 只有一个子路由 -->
            <!-- 首页 -->
            <template v-if="item.children && item.children.length == 1">
                <el-menu-item v-if="!item.children[0].meta.hidden" :index="item.children[0].path">
                    <template #title>
                        <span>{{ item.children[0].meta.title }}</span>
                    </template>
                </el-menu-item>
            </template>
            <!-- 多个子路由 -->
            <!-- 权限管理 -->
            <el-sub-menu :index="item.path" v-if="item.children && item.children.length > 1">
                <template #title>
                    <span>{{ item.meta.title }}</span>
                </template>
                <Menu :menuList="item.children"></Menu>
            </el-sub-menu>
        </template>


    </template>
</template>

<script setup lang='ts'>
// 获取父组件的路由组件

defineProps(['menuList'])

</script>
<script lang="ts">
export default {
    name: "Menu"
}
</script>

<style scoped lang='scss'></style>