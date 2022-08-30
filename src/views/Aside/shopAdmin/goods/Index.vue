<!-- 商品分类 -->
<template>
  <div class="tableBox">
    <el-button
      type="primary"
      @click="
        drawer = true;
        editID = null;
      "
      >新增</el-button
    >
    <el-drawer
      :title="editID ? '修改' : '添加'"
      v-model="drawer"
      direction="ltr"
      :before-close="handleClose"
      :destroy-on-close="true"
    >
      <template #default>
        <Info @refrashTable="getGoodsList" :editID="editID"></Info>
      </template>

      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">取消</el-button>
        </div>
      </template>
    </el-drawer>

    <el-table :data="tableData" style="width: 100%" row-key="id">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="firstcatename" label="一级分类"></el-table-column>
      <el-table-column prop="secondcatename" label="二级分类"></el-table-column>
      <el-table-column prop="goodsname" label="商品名称"></el-table-column>
      <el-table-column prop="img" label="商品图片">
        <template v-slot="scope">
          <el-image
            v-if="scope.row.img"
            :src="$HOST + scope.row.img"
            :preview-src-list="[$HOST + scope.row.img]"
            fit="cover"
            :preview-teleported="true"
            :hide-on-click-modal="true"
          />
        </template>
      </el-table-column>
      <el-table-column prop="price" label="销售价格"></el-table-column>
      <el-table-column prop="market_price" label="市场价格"></el-table-column>
      <el-table-column prop="isnew" label="是否新品">
        <template v-slot="scope">
          <el-switch
            v-model="scope.row.newboolean"
            inline-prompt
            style="
              --el-switch-on-color: #409eff;
              --el-switch-off-color: #ff4949;
            "
            active-text="Y"
            inactive-text="N"
            @change="changeRow(scope.row, 'isnew')"
          />
        </template>
      </el-table-column>
      <el-table-column prop="ishot" label="是否热卖">
        <template v-slot="scope">
          <el-switch
            v-model="scope.row.hotboolean"
            inline-prompt
            style="
              --el-switch-on-color: #409eff;
              --el-switch-off-color: #ff4949;
            "
            active-text="Y"
            inactive-text="N"
            @change="changeRow(scope.row, 'ishot')"
          />
        </template>
      </el-table-column>
      <el-table-column prop="address" label="状态">
        <template v-slot="scope">
          <el-tag type="success" v-if="scope.row.status == 1">已启用</el-tag>
          <el-tag type="danger" v-else>已禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" width="200">
        <template v-slot="scope">
          <el-button
            type="primary"
            icon="Edit"
            size="small"
            @click="editCategory(scope.row.id)"
          />
          <el-button
            @click="delGoods(scope.row.id)"
            type="danger"
            icon="Delete"
            size="small"
          />
        </template>
      </el-table-column>
    </el-table>
    <div class="demo-pagination-block">
      <el-pagination
        v-model:currentPage="pagedata.page"
        v-model:page-size="pagedata.size"
        :page-sizes="[5, 10, 15, 20]"
        small
        background
        layout="sizes, prev, pager, next"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import Info from "./Info.vue";
// 引入 ElMessage 组件
import { ElMessage, ElMessageBox } from "element-plus";
//引入封装goods相关api
import { goodsDel, getGoods, getTotal, editGoods } from "@/api/goods.js";
const drawer = ref(false); //抽屉变量
const tableData = ref(null); //表格数据
let editID = ref(null); //编辑菜单ID
// 编辑id赋值
function editCategory(data) {
  drawer.value = true;
  editID.value = data;
}
const pagedata = reactive({
  size: 5, //每页个数
  page: 1, //页码
});
// 表格数据总数
let total = ref(null);

//获取表格数据
async function getGoodsList() {
  console.log("子组件调用了父组件方方法更新表格");
  drawer.value = false;
  try {
    total.value = await getTotal();
    drawer.value = false;
    let list = await getGoods(pagedata);
    //为表格添加控制开关按钮
    tableData.value = list.map((val) => {
      val.newboolean = val.isnew == 1 ? true : false;
      val.hotboolean = val.ishot == 1 ? true : false;
      return val;
    });

    console.log("表格数据", tableData.value);
  } catch (error) {
    console.log(error);
  }
}
//执行异步
getGoodsList();

//每页个数发生变化的回调函数
function handleSizeChange(data) {
  pagedata.size = data;
  getGoodsList();
}

//页码发生变化的回调函数
function handleCurrentChange(data) {
  pagedata.page = data;
  getGoodsList();
}

//删除表格
function delGoods(data) {
  ElMessageBox.confirm("此操作将永久删除该菜单/目录, 是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      ElMessage.success({
        message: "删除成功!",
      });
      await goodsDel(data);
      total.value = await getTotal();
      console.log("goods.vue页面", res);
      // 更新商品分类列表
      getGoodsList();
    })
    .catch(() => {
      ElMessage.info({
        message: "已取消删除",
      });
    });
}

//编辑表格
async function changeRow(val, type) {
  // val是这一行的数据，type是修改的字段（ishot,isnew）
  console.log(val, type);
  // { id:xxx,isnew:xxx }
  // { id:xxx,ishot:xxx }
  let newval = val[type] == 1 ? 0 : 1;
  let data = { id: val.id, [type]: newval };
  // 使用FormData进行提交
  let formdata = new FormData();
  for (let k in data) {
    formdata.append(k, data[k]);
  }
  await editGoods(formdata);
  getGoodsList();
}

// 关闭抽屉
function cancelClick() {
  drawer.value = false;
}
const handleClose = (done) => {
  ElMessageBox.confirm("确认关闭？")
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};
</script>

<style lang="scss">
a {
  text-decoration: none;
}
.tableBox {
  padding: 20px;
  box-sizing: border-box;
}

.image-slot {
  font-size: 30px;
}
.image-slot .el-icon {
  font-size: 30px;
}
.el-image {
  height: 60px;
  border: 1px solid #eee;
}

.el-image-viewer__canvas {
  img {
    width: 50%;
    height: auto;
  }
}
</style>
