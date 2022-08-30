<template>
  <div class="tableBox">
    <router-link to="/admin/add">
      <el-button type="primary">添加管理员</el-button>
    </router-link>
    <el-table :data="state.tableData" style="width: 100%" row-key="id">
      <el-table-column
        prop="uid"
        label="用户ID"
        width="330px"
      ></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="rolename" label="角色名称"></el-table-column>
      <el-table-column prop="address" label="状态">
        <template v-slot="scope">
          <el-tag type="success" v-if="scope.row.status == 1">已启用</el-tag>
          <el-tag type="danger" v-else>已禁用</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="address" label="操作">
        <template v-slot="scope">
          <router-link :to="'admin/' + scope.row.uid">
            <el-button type="primary" icon="Edit" size="small" />
          </router-link>
          <el-button
            @click="delAdmin(scope.row.uid)"
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
import { useRouter } from "vue-router";
// 引入 ElMessage 组件
import { ElMessage } from "element-plus";
import "element-plus/es/components/message/style/css";
import { getTotal, adminDel, getAdmin } from "@/api/admin.js";
const value = ref(false);
const router = useRouter();
const pagedata = reactive({
  size: 5, //每页个数
  page: 1, //页码
});
let total = ref(null);

const state = reactive({
  tableData: [], // 表格数据
});
//每页个数发生变化的回调函数
function handleSizeChange(data) {
  pagedata.size = data;
  adminList(pagedata);
}
//页码发生变化的回调函数
function handleCurrentChange(data) {
  pagedata.page = data;
  adminList(pagedata);
}
console.log("页码+每页个数", pagedata);

// 获得角色列表
async function adminList(data) {
  try {
    let res = await getAdmin(data);
    total.value = await getTotal();
    state.tableData = res;
  } catch (error) {
    console.log("error:", error);
  }
}
//执行异步
adminList(pagedata);
async function delAdmin(data) {
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
        let res = await adminDel(data);
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
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
.tableBox {
  padding: 20px;
  box-sizing: border-box;
}
</style>