// 登录接口需要携带参数ts类型
export interface loginFormData {
    username: string,
    password: string
}

// 定义服务器返回用户信息相关的数据类型
export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

// 登录接口返回数据类型
export interface loginResponseData extends ResponseData {
    data: String
}

// 获取用户信息
export interface userInfoReponseData extends ResponseData {
    data: {
        name: string,
        avatar: string,
        roles: string[],
        buttons: string[],
        routes: string[],
    }

}





