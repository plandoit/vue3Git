<template>
    <div class="login_container">
        <el-row>
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24">
                <el-form class="login_form" :model="loginForm" :rules="rules" ref="login_Form">
                    <h1>hello</h1>
                    <h2>欢迎</h2>
                    <el-form-item prop="username">
                        <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" :prefix-icon="Lock" show-password v-model="loginForm.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button :loading="loading" @click="login" type="primary" class="login_btn"
                            size="default">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang='ts'>
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElNotification } from 'element-plus';
// 引入用户仓库
import useUserStore from '../../store/modules/user.ts'
import { getTime } from '../../utils/time.ts'
const useStore = useUserStore()
const router = useRouter()
const login_Form = ref()
// 控制按钮加载效果
const loading = ref(false)
// 收集账密数据
let loginForm = reactive({ username: 'admin', password: 'atguigu123' })
// 登录按钮
const login = async () => {
    // 表单校验通过才能登录
    await login_Form.value.validate()
    loading.value = true
    try {
        loading.value = false
        await useStore.userLogin(loginForm)
        router.push('/')
        // 成功提示
        ElNotification({
            type: 'success',
            message: '欢迎回来',
            title: `Hi,${getTime()}好`
        })
    } catch (error) {
        loading.value = false
        ElNotification({
            type: 'error',
            message: (error as Error).message
        })
    }
}


// 自定义表单校验规则
const validatorUserName = (rule: any, value: any, callback: any) => {
    // rule:校验对象
    // value:表单元素文本内容
    if (value.length >= 5 && value.length <= 10) {
        callback()
    } else {
        callback(new Error('账号长度为5-10位'))
    }
}
const validatorPassword = (rule: any, value: any, callback: any) => {
    if (value.length >= 5 && value.length <= 15) {
        callback()
    } else {
        callback(new Error('密码长度为5-15位'))
    }
}

//表单校验
const rules = {
    username: [
        {
            trigger: 'change',
            validator: validatorUserName
        }
    ],
    password: [
        {
            trigger: 'change',
            validator: validatorPassword
        }
    ]
}


</script>

<style scoped lang="scss">
.login_container {
    width: 100%;
    height: 100%;
    background: url('../../assets/images/background.jpg') no-repeat;
    background-size: cover;
    background-attachment: fixed;
    position: fixed;

    .login_form {
        position: relative;
        width: 80%;
        top: 30vh;
        background: url('../../assets/images/login_form.png') no-repeat;
        background-size: cover;
        padding: 40px;

        h1 {
            color: white;
            font-size: 40px;
        }

        h2 {
            color: white;
            font-size: 20px;
            margin: 20px 0px;
        }

        .login_btn {
            width: 100%;
        }
    }
}
</style>