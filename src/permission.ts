// 路由权鉴：指验证用户是否拥有访问系统的权利
// （某个路由什么条件下可以访问，什么条件不能访问）
// 引入进度条
import "nprogress/nprogress.css"
import nprogress from 'nprogress'
import router from "./router";
// 全局守卫：项目中任意路由切换都会触发的钩子
// 全局前置守卫

// 获取用户相关的内部token数据，判断用户是否登录成功
import useUserStore from "./store/modules/user";
import pinia from "./store";
const userStore = useUserStore(pinia)

router.beforeEach(async (to: any, from: any, next: any) => {
    /* 
    to:将要访问的路由
    from:来时的路由
    next:路由的放行函数
    */
    // 访问某一个路由之前会触发的守卫（钩子）
    nprogress.start()

    // 获取token,判断登录状态
    const token = userStore.token
    const username = userStore.username
    if (token) {
        if (to.path == '/login') {
            next({ path: "/" })
        } else {
            if (username) {
                next()
            } else {
                try {
                    await userStore.userInfo()
                    next({ ...to })
                } catch (error) {
                    // token过期：获取不到用户信息了
                    await userStore.userLogout()
                    next({ path: '/login' })
                }
            }
        }
    } else {
        if (to.path == '/login') {
            next()
        } else {
            next({ path: '/login' })
        }
    }
    // next()
})
// 全局后置守卫
router.afterEach((to: any, from: any) => {
    // 修改网页title
    document.title = '后台管理系统--' + to.meta.title
    nprogress.done()
})

// 任意路由切换实现进度条业务  --nprogress
// 路由鉴权（路由组件访问权限设置）


