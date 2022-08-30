// 专门出来用户相关的网络请求
import request from "@/utils/request";
import { ElMessage } from "element-plus";

export async function getMember(uid) {
    let res;
    if (uid) {
        res = await request.get("/memberinfo", { params: { uid } });
        return res.list;
    } else {
        res = await request.get("/memberlist");
        return res.list;
    }
}


export async function editMember(data) {
    let res = await request.post("/memberedit", data);
    ElMessage.success(res.msg)
    return true;
}

