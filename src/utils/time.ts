// 封装一个获取时间的函数
export const getTime = () => {
    let message = ''
    let hours = new Date().getHours()
    if (hours <= 9) {
        message = "早上"
    }
    else if (hours <= 12) {
        message = "上午"
    }
    else if (hours <= 18) {
        message = "下午"
    }
    else if (hours <= 24) {
        message = "晚上"
    }
    return message
}