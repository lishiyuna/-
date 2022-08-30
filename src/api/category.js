// 专门出来处理系统设置下菜单管理相关的网络请求
import request from "@/utils/request";
import { ElMessage, ElMessageBox } from "element-plus";
export async function getCategory(id) {
    // 读列表   读某一个
    let res;
    if (id) {
        res = await request.get("/cateinfo", { params: { id } });
    } else {
        res = await request.get("/catelist", { params: { istree: 1 } });
    }
    return res.list;
}

// 读取某个一级分类下的二级分类数据
export async function getChildCategory(pid) {
    let res = await request.get("/catelist", { params: { pid } });
    return res.list;
}

export async function addCategory(data) {
    let res = await request.post("/cateadd", data);
    ElMessage.success({
        message: res.msg,
    });
    return true;
}

export async function editCategory(data) {
    let res = await request.post("/cateedit", data);
    ElMessage.success({
        message: res.msg,
    });
    return true;
}

export async function categoryDel(id) {
    if (!id) {
        return;
    }
    let res = await request.post("/catedelete", { id })
    if (res) {
        return res.list;
    }
}