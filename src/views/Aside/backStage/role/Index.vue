<!-- 角色管理 -->
<template>
  <div class="tableBox">
    <router-link to="/role/add">
      <el-button type="primary">新增角色</el-button>
    </router-link>
    <el-table :data="state.tableData" style="width: 100%" row-key="id">
      <el-table-column prop="id" label="ID"></el-table-column>

      <el-table-column prop="rolename" label="角色名称"></el-table-column>

      <el-table-column prop="address" label="状态">
        <template v-slot="scope">
          <el-tag type="success" v-if="scope.row.status == 1">已启用</el-tag>
          <el-tag type="danger" v-else>已禁用</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="address" label="操作">
        <template v-slot="scope">
          <router-link :to="'role/' + scope.row.id">
            <el-button type="primary" icon="Edit" size="small" />
          </router-link>
          <el-button
            @click="delRole(scope.row.id)"
            type="danger"
            icon="Delete"
            size="small"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
// 引入 ElMessage 组件
import { ElMessage } from "element-plus";
import "element-plus/es/components/message/style/css";
import { getRole, roleDel } from "@/api/role.js";
const router = useRouter();
const state = reactive({
  tableData: [],
});
// 获得角色列表
async function roleList(data) {
  try {
    let res = await getRole(data);
    console.log("res:", res);
    state.tableData = res;
    console.log("form:", state.tableData);
  } catch (error) {
    console.log("error:", error);
  }
}
//执行异步
roleList();

function delRole(data) {
  // console.log('删除按钮参数',data);
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
        let res = await roleDel(data);
        state.tableData = res.list;
        console.log(res);
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