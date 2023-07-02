<template>
    <el-card style="overflow: hidden;">
        <el-button type="primary" icon="Plus" @click="addTrademark">添加品牌</el-button>
        <!-- 表格 -->
        <el-table style="margin:10px 0px;" border :data="trademarkArr">
            <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
            <!-- prop默认是通过div进行展示 -->
            <el-table-column prop="tmName" label="品牌名称"></el-table-column>
            <el-table-column label="品牌LOGO">
                <!-- 通过插槽定义展示框架 -->
                <template #="{ row, $index }">
                    <img :src="row.logoUrl" style="width:100px;height: 100px;">
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #="{ row, $index }">
                    <el-button type="primary" size="small" icon="Edit" @click="updateTrademark(row)"></el-button>
                    <el-popconfirm title="确认删除吗？" icon="delete" @confirm="removeTrademark(row.id)">
                        <template #reference>
                            <el-button type="primary" size="small" icon="Delete"></el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination @size-change="sizeChange" @current-change="getHasTrademark" :pager-count="8"
            v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]" :background="true"
            layout="prev, pager, next, jumper,->,sizes,total" :total="total">
        </el-pagination>
    </el-card>
    <!-- 弹窗对话框 -->
    <!-- v-model：控制对话框的显示隐藏 -->
    <el-dialog v-model="dialogFormVisible" :title="trademarkParams.id ? '修改品牌' : '添加品牌'">
        <el-form style="width: 80%;">
            <el-form-item label="品牌名称" label-width="90px">
                <el-input placeholder="输入品牌名称" v-model="trademarkParams.tmName"></el-input>
            </el-form-item>
            <el-form-item label="品牌LOGO" label-width="90px">
                <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="false"
                    :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
        </el-form>
        <!-- 插槽footer显示按钮 -->
        <template #footer>
            <el-button type="primary" size="default" @click="cancel">取消</el-button>
            <el-button type="primary" size="default" @click="confirm">确定</el-button>
        </template>
    </el-dialog>
</template>

<script setup lang='ts'>
import { onMounted, reactive, ref } from 'vue';
import { reqHasTrademark, reqAddOrUpdateTrademark, reqDeleteTrademark } from '../../../apis/product/trademark';
import type { UploadProps } from 'element-plus'
// import { ElMessage } from 'element-plus/es/components';
import { ElMessage } from '../../../../node_modules/element-plus/es/components';

// 对话框的状态
const dialogFormVisible = ref<boolean>(false)
// 当前页码
const pageNo = ref<number>(1)
// 每页存储数组条数
const limit = ref<number>(3)
// 定义获取数据
const total = ref<number>(0)
const trademarkArr = ref<any>([])

// 定义手机新增品牌数据
const trademarkParams = reactive({
    id: '',
    tmName: '',
    logoUrl: ''
})

// 获取已有品牌的接口封装为一个函数
const getHasTrademark = async () => {
    const res = await reqHasTrademark(pageNo.value, limit.value)
    if (res.code == 200) {
        total.value = res.data.total
        trademarkArr.value = res.data.records
    }
}
// 组件挂载完毕钩子
onMounted(() => {
    getHasTrademark()
})
// 下拉菜单
const sizeChange = () => {
    pageNo.value = 1
    getHasTrademark()
}
// 添加按钮
const addTrademark = () => {
    dialogFormVisible.value = true
    // 将收集的数据清空
    trademarkParams.id = ''
    trademarkParams.tmName = ''
    trademarkParams.logoUrl = ''
}
// 编辑按钮
const updateTrademark = (row: any) => {
    // console.log(row);
    dialogFormVisible.value = true
    // 通过es6语法简化
    Object.assign(trademarkParams, row)
    // trademarkParams.id = row.id
    // trademarkParams.tmName = row.tmName
    // trademarkParams.logoUrl = row.logoUrl
}
// 取消按钮
const cancel = () => {
    dialogFormVisible.value = false
}
// 确认按钮
const confirm = async () => {
    const res = await reqAddOrUpdateTrademark(trademarkParams)
    // console.log(res);
    if (res.code == 200) {
        dialogFormVisible.value = false
        ElMessage({
            type: 'success',
            message: trademarkParams.id ? '修改成功' : '添加成功'
        })
        // 再次获取品牌数
        getHasTrademark(trademarkParams.id ? pageNo.value : 1)
    } else {
        ElMessage({
            type: 'error',
            message: trademarkParams.id ? '修改失败' : '添加失败'
        })
    }


}




/* 
    上传端口有问题，报错500
*/

// 上传图片之前触发的钩子函数
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    //该钩子是在图片上传成功之前触发，用来限制文件类型与大小
    if (rawFile.type == "image/png" || rawFile.type == "image/jpeg" || rawFile.type == "image/gif") {
        if (rawFile.size / 1024 / 1024 < 4) {
            return true
        } else {
            ElMessage({
                type: 'error',
                message: '上传文件大小必须小于4M'
            })
            return false
        }
    } else {
        ElMessage({
            type: 'error',
            message: '上传文件格式必须为png|jpg|gif'
        })
        return false
    }
}

// 图片上传成功的钩子函数
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
    //response : 即为当前上传图片post请求服务器返回的数据
    trademarkParams.logoUrl = response.data
}
// 删除按钮
const removeTrademark = async (id: number) => {
    const res = await reqDeleteTrademark(id)
    if (res.code == 200) {
        ElMessage({
            type: 'success',
            message: '删除成功'
        })
        // 刷新数据
        getHasTrademark(trademarkArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
    } else {
        ElMessage({
            type: 'error',
            message: '删除失败'
        })
    }
}


</script>


<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>