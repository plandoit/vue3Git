// 用户相关的小仓库
import { defineStore } from "pinia";
import { reqLogin, reqUserInfo, reqLogout } from "../../apis/user/index";
import type { loginFormData, loginResponseData, userInfoReponseData } from '../../apis/user/type'
import { ref } from "vue";
import { constantRoute } from "../../router/routes";
const useUserStore = defineStore('User', () => {
    const token = ref(localStorage.getItem("TOKEN"))
    const menuRoutes = ref(constantRoute)
    const username = ref('')
    const avatar = ref('')
    // 登录
    const userLogin = async (data: loginFormData) => {
        let result: loginResponseData = await reqLogin(data)
        // console.log(result);
        // 登录成功,code=200
        if (result.code === 200) {
            token.value = (result.data as string)
            // console.log(token);
            // 本地持久化存储
            localStorage.setItem("TOKEN", (result.data as string))
            // 返回成功
            return 'ok'
        } else {
            // 登录失败,code=201
            return Promise.reject(new Error(result.message))
        }

    }
    // 获取用户信息方法
    const userInfo = async () => {
        // 获取用户信息存储至仓库
        const res: userInfoReponseData = await reqUserInfo()
        console.log(res);
        // 如果获取用户信息成功，存储
        if (res.code === 200) {
            username.value = res.data.name
            avatar.value = res.data.avatar
            return 'ok'
        } else {
            return Promise.reject(new Error(res.message))
        }

    }
    // 退出登录
    const userLogout = async () => {
        // 告诉服务器，token被遗弃
        const res: any = await reqLogout()
        console.log(res);
        if (res.code == 200) {
            token.value = ''
            username.value = ''
            avatar.value = ''
            localStorage.removeItem('TOKEN')
            return 'ok'
        }
        else {
            return Promise.reject(new Error(res.message))
        }

    }

    return { userLogin, token, menuRoutes, userInfo, username, avatar, userLogout }
})

export default useUserStore

