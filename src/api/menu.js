// 专门出来处理系统设置下菜单管理相关的网络请求
import request from "@/utils/request";
// 获取菜单列表
export async function getMenus(id) {
    // 读列表（树形、不是树形）   读某一个
    let res;
    if (id) {
        res = await request.get("/menuinfo", { params: { id } });
    } else {
        res = await request.get("/menulist", { params: { istree: 1 } });  // 获取属性结构菜单！
    }
    return res.list;
}


//编辑菜单
export function menuEdit(data) {
    return request({
        method: "post",
        url: "/menuedit",
        data,
    });
};

//添加菜单
export async function menuAdd(data) {
    let res = await request.post("/menuadd", data);
    return res;
}

//删除菜单
export function menuDel(data) {
    return request({
        method: 'post',
        url: '/menudelete',
        data: {
            id: data
        }
    })
};
