// 专门出来处理限时秒杀相关的网络请求
import request from "@/utils/request";
import { ElMessage } from "element-plus";

export async function getSeck(id) {
    let res;
    if (id) {
        res = await request.get("/seckinfo", { params: { id } });
    } else {
        res = await request.get("/secklist");
    }
    return res.list;
}

export async function addSeck(data) {
    let res = await request.post("/seckadd", data);
    ElMessage.success(res.msg)
    return true;
}

export async function editSeck(data) {
    let res = await request.post("/seckedit", data);
    ElMessage.success(res.msg)
    return true;
}

export async function seckDel(id) {
    if (!id) {
        ElMessage.warning("请传入删除id");
        return;
    }
    let res = await request.post("/seckdelete", { id })
    return res.list;
}