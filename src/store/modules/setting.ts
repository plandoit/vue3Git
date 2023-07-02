// layout组件相关配置仓库
import { defineStore } from "pinia";
const useLayOutSettingStore = defineStore('SettingStore', {
    state: () => {
        return {
            refrash: false  //控制刷新
        }
    }
})

export default useLayOutSettingStore