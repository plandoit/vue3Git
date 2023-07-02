// 品牌管理模块的接口
import request from "../../utils/request"
enum API {
    // 获取已有的品牌接口
    TRADEMARK_URL = "/admin/product/baseTrademark/",
    // 添加品牌
    ADDTRADEMARK_URL = "/admin/product/baseTrademark/save",
    // 修改品牌
    UPDATETRADEMARK_URL = "/admin/product/baseTrademark/update",
    // 删除品牌
    DELETE_URL = "/admin/product/baseTrademark/remove/"
}
// 获取已有品牌的接口方法
// page：获取第几页
// limit：获取几个已有品牌的数据
export const reqHasTrademark = (page: number, limit: number) => request.get<any, any>(API.TRADEMARK_URL + `${page}/${limit}`)

// 添加修改品牌接口方法
export const reqAddOrUpdateTrademark = (data: any) => {
    if (data.id) {
        return request.put<any, any>(API.UPDATETRADEMARK_URL, data)
    }
    else {
        return request.post<any, any>(API.ADDTRADEMARK_URL, data)
    }
}

// 删除品牌接口方法
export const reqDeleteTrademark = (id: number) => request.delete<any, any>(API.DELETE_URL + id)