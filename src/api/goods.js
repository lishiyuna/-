// 专门出来处理商品管理相关的网络请求
import request from "@/utils/request";
import { ElMessage } from "element-plus";

/**
 * 
 * @param {*} data   { size:每页数量  page:页码数 }
 */
export async function getGoods(data) {
    let res;
    if (data.id) {
        res = await request.get("/goodsinfo", { params: { id: data.id } });
    } else {
        res = await request.get("/goodslist", { params: data });
    }
    return res.list;
}


// 根据分类来获取商品列表
export async function getCategoryGoods(topid, childid) {
    let res = await request.get("/goodslist", { params: { fid: topid, sid: childid } });
    return res.list;
}

// 管理总数（用于计算分页）
export async function getTotal() {
    let res = await request.get("/goodscount");
    return res.list[0].total;
}
// 管理添加
export async function addGoods(data) {
    let res = await request.post("/goodsadd", data);
    return true;
}
// 管理编辑
export async function editGoods(data) {
    let res = await request.post("/goodsedit", data);
    return true;
}
// 管理删除
export async function goodsDel(id) {
    if (!id) {
        ElMessage.warning("请传入删除id");
        return;
    }
    let res = await request.post("/goodsdelete", { id })
    // 返回删除后的管理列表
    return res;
}
