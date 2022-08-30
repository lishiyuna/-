// 专门出来处理商品管理相关的网络请求
import request from "@/utils/request";
import { ElMessage } from "element-plus";

export async function getUserinfo(id) {
    let res;
    if (id) {
        res = await request.get("/my/userinfo", { params: { id } });
        return res;
    } else {
        res = await request.get("/my/userinfo");
        return res;
    }
}

export async function editAvatar(data) {
    let res = await request.post("/my/update/avatar", data);
    return res;

}
export async function editUserinfo(data) {
    let res = await request.post("/my/userinfo", data);
    return res;
}
export async function editPassword(oldP,newP) {
    let res = await request.put("/my/updatepwd", {oldPwd:oldP,newPwd:newP});
    return res;
}