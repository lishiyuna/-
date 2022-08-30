// 专门出来用户相关的网络请求
import request from "@/utils/request";
import { ElMessage } from "element-plus";
export async function getDynamic(id) {
    let res;
    if (id) {
        res = await request.get("/api/dynamic", { params: { id } });
        return res;
    } else {
        res = await request.get("/api/dynamic");
        return res;
    }
}
// export async function addLbt(data) {
//     console.log('AAAAAAA',data);
//     let res = await request.post("/api/lbtadd", data);
//     return res;
// }