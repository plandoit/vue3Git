<template>
    <div class="tabbar">
        <div class="tabbar_left">
            <el-icon style="margin-right: 10px;" @click="changeIcon">
                <component :is="fold ? 'Fold' : 'Expand'"></component>
            </el-icon>
            <!-- 左侧面包屑 -->
            <el-breadcrumb separator-icon="ArrowRight">
                <el-breadcrumb-item :to="item.path" v-for="(item, index) in $route.matched" :key="index"
                    v-show="item.meta.title">
                    <span>{{ item.meta.title }}</span>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="tabbar_right">
            <el-button size="small" icon="Refresh" circle @click="refrash" />
            <el-button size="small" icon="FullScreen" circle @click="fullScreen" />
            <el-button size="small" icon="Setting" circle />
            <img :src="userStore.avatar" style="border-radius: 50%; width: 24px;height: 24px;margin:0px 10px;" alt="">
            <!-- 下拉菜单 -->
            <el-dropdown>
                <span class="el-dropdown-link">
                    {{ userStore.username }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useLayoutSettingStore from '../../store/modules/setting'
import useUserStore from '../../store/modules/user';
const fold = ref(false)
// 图标切换
const changeIcon = () => {
    fold.value = !fold.value
}
// 获取路由对象
const $route = useRoute()
const $router = useRouter()

// 获取用户相关的小仓库
const userStore = useUserStore()

const layoutSettingStore = useLayoutSettingStore()
// 刷新
const refrash = () => {
    layoutSettingStore.refrash = !layoutSettingStore.refrash
}
// 全屏
const fullScreen = () => {
    let full = document.fullscreenElement
    if (!full) {
        // 全屏
        document.documentElement.requestFullscreen()
    } else {
        // 退出全屏
        document.exitFullscreen()
    }
}

// 退出登录按钮
const logout = async () => {
    // 第一件事：需要向服务器发送请求[退出登录接口]
    // 第二件事：仓库当中关于用户相关的数据清空[token,username,avatar]
    // 第三件事：跳转至登陆页面
    await userStore.userLogout();
    $router.push({ path: '/login' })
}

</script>

<style scoped lang='scss'>
.tabbar {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;

    .tabbar_left {
        display: flex;
        align-items: center;
        margin-left: 20px;
    }

    .tabbar_right {
        display: flex;
        align-items: center;
        margin-right: 20px;
    }
}
</style>