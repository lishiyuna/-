// 专门出来处理轮播图相关的网络请求
import request from "@/utils/request";
import { ElMessage } from "element-plus";


export async function getBanner(id) {
    let res;
    if (id) {
        res = await request.get("/bannerinfo", { params: { id } });
    } else {
        res = await request.get("/bannerlist");
    }
    return res.list;
}

export async function addBanner(data) {
    let res = await request.post("/banneradd", data);
    ElMessage.success(res.msg)
    return true;
}

export async function editBanner(data) {
    let res = await request.post("/banneredit", data);
    ElMessage.success(res.msg)
    return true;
}

export async function bannerDel(id) {
    if (!id) {
        ElMessage.warning("请传入删除id");
        return;
    }
    let res = await request.post("/bannerdelete", { id })
    return res.list;
}