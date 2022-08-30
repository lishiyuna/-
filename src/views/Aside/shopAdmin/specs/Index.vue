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
    <!-- 抽屉 -->
    <el-drawer
      :title="editID ? '修改' : '添加'"
      v-model="drawer"
      direction="ltr"
      :before-close="handleClose"
      :destroy-on-close="true"
    >
      <template #default>
        <Info @refrashTable="getSpecsList(pagedata)" :editID="editID"></Info>
      </template>

      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">取消</el-button>
        </div>
      </template>
    </el-drawer>

    <el-table :data="state.tableData" style="width: 100%" row-key="id">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="specsname" label="属性名称"></el-table-column>
      <el-table-column prop="attrs" label="属性值"></el-table-column>
      <el-table-column prop="address" label="状态">
        <template v-slot="scope">
          <el-tag type="success" v-if="scope.row.status == 1">已启用</el-tag>
          <el-tag type="danger" v-else>已禁用</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="address" label="操作">
        <template v-slot="scope">
          <el-button
            type="primary"
            icon="Edit"
            size="small"
            @click="editSpecs(scope.row.id)"
          />
          <el-button
            @click="delSpecs(scope.row.id)"
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
import { ElMessage } from "element-plus";
import "element-plus/es/components/message/style/css";
import { getTotal, specsDel, getSpecs } from "@/api/specs.js";

const drawer = ref(false); //抽屉变量
let editID = ref(null); //编辑菜单ID
// 拿到编辑id
function editSpecs(data) {
  drawer.value = true;
  editID.value = data;
}
const pagedata = reactive({
  size: 5, //每页个数
  page: 1, //页码
});
// 表格数据总数
let total = ref(null);

// 表格数据
const state = reactive({
  tableData: [],
});

//每页个数发生变化的回调函数
function handleSizeChange(data) {
  // console.log("每页个数", data);
  pagedata.size = data;
  getSpecsList(pagedata);
  // console.log("页码+每页个数", pagedata);
}

//页码发生变化的回调函数
function handleCurrentChange(data) {
  // console.log("页码", data);/
  pagedata.page = data;
  getSpecsList(pagedata);
  // console.log("页码+每页个数", pagedata);
}
console.log("页码+每页个数", pagedata);

// 获得商品属性列表
async function getSpecsList(data) {
  try {
    console.log("传参", data);
    drawer.value = false;
    total.value = await getTotal();
    let res = await getSpecs(data);
    state.tableData = res;
    // console.log("form:", state.tableData);
  } catch (error) {
    console.log("error:", error);
  }
}
//执行异步
getSpecsList(pagedata);
//删除项
async function delSpecs(data) {
  ElMessageBox.confirm("此操作将永久删除该菜单/目录, 是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      ElMessage.success({
        message: "删除成功!",
      });
      try {
        let res = await specsDel(data);
        console.log("管理员删除", res);
        // 更新表格
        total.value = await getTotal();
        getSpecsList(pagedata);
      } catch (error) {
        console.log(error);
      }
    })
    .catch(() => {
      ElMessage.info({
        message: "已取消删除",
      });
    });
}

// 关闭抽屉
const handleClose = (done) => {
  ElMessageBox.confirm("确认关闭？")
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};
function cancelClick() {
  drawer.value = false;
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
.tableBox {
  padding: 20px;
}
</style>