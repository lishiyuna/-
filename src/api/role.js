// 专门出来处理系统设置下角色管理相关的网络请求
import request from "@/utils/request";
// 获取角色列表
export async function getRole(id) {
    // 读列表（树形、不是树形）   读某一个
    let res;
    if (id) {
        res = await request.get("/roleinfo", { params: { id } });
    } else {
        res = await request.get("/rolelist");  // 获取属性结构菜单！
    }
    return res.list;
}


//编辑角色
export function roleEdit(data) {
    return request({
        method: "post",
        url: "/roleedit",
        data,
    });
};

//添加角色
export function roleAdd(data) {
    return request({
        method: "post",
        url: "/roleadd",
        data,
    });
};

//删除角色
export function roleDel(data) {
    return request({
        method: 'post',
        url: '/roledelete',
        data: {
            id: data
        }
    })
};
