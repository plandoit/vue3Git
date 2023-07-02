// 进行axios二次封装:使用请求与响应拦截器
import axios from 'axios';
import { ElMessage } from 'element-plus';
// 引入用户相关的仓库
import useUserStore from '../store/modules/user';

/* 第一步：利用axios对象的create方法，去创建axios实例
 (其他配置：基础路径、超时的时间)
 */
let request = axios.create({
    //基础路径
    baseURL: import.meta.env.VITE_APP_BASE_API, //基础路径上会携带/api
    timeout: 5000 //超时时间
});
//第二步：request实例添加请求与响应拦截器
// 请求拦截器
request.interceptors.request.use((config) => {
    // 获取用户相关的小仓库，获取用户内部的token
    const userStore = useUserStore()
    if (userStore.token) {
        config.headers.token = userStore.token
    }

    // config配置对象，headers属性请求头，经常给服务器端携带公共参数
    // 返回配置对象
    return config;
});
// 响应拦截器
request.interceptors.response.use((response) => {
    // 成功回调
    // 简化数据
    return response.data;
}, (error) => {
    let message = ''
    let status = error.response.status
    switch (status) {
        case 401:
            message = 'token过期'
            break;
        case 403:
            message = '无权访问'
            break;
        case 404:
            message = '请求地址错误'
            break;
        case 500:
            message = '服务器出现问题'
            break;
        default:
            message = '网络出现问题'
            break;
    }
    ElMessage({
        type: 'error',
        message
    })

    return Promise.reject(error)
});

export default request;


