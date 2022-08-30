// 专门出来处理商品规格总数管理相关的网络请求
import request from "@/utils/request";
import { ElMessage } from "element-plus";

/**
 * 
 * @param {*} data   { size:每页数量  page:页码数 }
 */
export async function getSpecs(data) {
    let res;
    if (data.id) {
        res = await request.get("/specsinfo", { params: { id: data.id } });
    } else {
        res = await request.get("/specslist", { params: data });
    }
    return res.list;
}

export async function getSpecsAll() {
    let res = await request.get("/specslist")

    return res.list;
}


// 商品规格总数总数（用于计算分页）
export async function getTotal() {
    let res = await request.get("/specscount");
    return res.list[0].total;
}
// 商品规格总数添加
export async function addSpecs(data) {
    let res = await request.post("/specsadd", data);
    return true;
}
// 商品规格总数编辑
export async function editSpecs(data) {
    let res = await request.post("/specsedit", data);
    return true;
}
// 商品规格总数删除
export async function specsDel(id) {
    if (!id) {
        ElMessage.warning("请传入删除id");
        return;
    }
    let res = await request.post("/specsdelete", { id })
    // 返回删除后的商品规格总数列表
    return res;
}
