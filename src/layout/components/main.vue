<template>
    <!-- 添加路由切换时的动画 -->
    <router-view v-slot="{ Component }">
        <transition name="fade">
            <component :is="Component" v-if="flag" />
        </transition>
    </router-view>
</template>

<script setup lang='ts'>
import { nextTick, ref, watch } from 'vue';
import useLayoutSettingStore from '../../store/modules/setting'
const layoutSettingStore = useLayoutSettingStore()


const flag = ref(true)
// 监听数据是否发生变化来决定是否刷新页面
watch(() => layoutSettingStore.refrash, () => {
    flag.value = false
    nextTick(() => {
        flag.value = true
    })
})

</script>

<style scoped>
.fade-enter-from {
    opacity: 0;
    transform: scale(0);
}

.fade-enter-active {
    transition: all is;
}

.fade-enter-to {
    opacity: 1;
    transform: scale(1);
}
</style>