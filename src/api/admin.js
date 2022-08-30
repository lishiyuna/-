// 专门出来处理系统设置下管理员管理相关的网络请求
import request from "@/utils/request";
import { ElMessage } from "element-plus";

/**
 * 
 * @param {*} data  { uid:uid值 }  { size:每页数量  page:页码数 }
 */
export async function getAdmin(data) {
    let res;
    if (data.uid) {
        res = await request.get("/userinfo", { params: { uid:data.uid } });
    } else {
        res = await request.get("/userlist",{ params:data }); 
    }
    return res.list;
}

// 管理员总数（用于计算分页）
export async function getTotal(){
    let res = await request.get("/usercount");
    return res.list[0].total;
}
// 管理员添加
export async function addAdmin(data) {
    let res = await request.post("/useradd", data);
    ElMessage.success(res.msg)
    return true;
}
// 管理员编辑
export async function editAdmin(data) {
    let res = await request.post("/useredit", data);
    ElMessage.success(res.msg)
    return true;
}
// 管理员删除
export async function adminDel(uid) {
    if (!uid) {
        ElMessage.warning("请传入删除uid");
        return;
    }
    let res = await request.post("/userdelete", { uid })
    ElMessage.success(res.msg)
    // 返回删除后的管理员列表
    return res.list;
}
