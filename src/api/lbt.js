// 专门出来用户相关的网络请求
import request from "@/utils/request";
import { ElMessage } from "element-plus";

export async function getLbt(id) {
    let res;
    if (id) {
        res = await request.get("/api/lbts", { params: { id } });
        return res;
    } else {
        res = await request.get("/api/lbts");
        return res;
    }
}
export async function addLbt(data) {
    let res = await request.post("/api/lbtadd", data);
    return res;
}
export async function editLbt(data) {
    let res = await request.put("/api/lbtedit", data);
    return res;
}
export async function deleteLbt(id) {
    console.log(id);
    let res = await request.delete("/api/lbtdelete", { data: { id } });
    return res;
}