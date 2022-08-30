<template>
  <div class="content">
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" label="Id" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="tel" label="电话" />
      <el-table-column prop="danwei" label="单位" />
      <el-table-column prop="zhiwei" label="职位" />
      <el-table-column prop="other" label="备注" />
      <el-table-column prop="address" label="操作" width="200" align="center">
        <template v-slot="scope">
          <router-link :to="'/usercontent/' + scope.row.id">
            <el-button
              type="primary"
              icon="InfoFilled"
              size="small"
              @click="handleEdit(scope.row.id)"
            />
          </router-link>
          <el-button
            class="delBtn"
            @click="handleDelete(scope.row.id)"
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
import { getWxUserList, delWxUserList } from "@/api/user";
import { ElMessage, ElMessageBox } from "element-plus";
import { ref } from "vue";

const tableData = ref(null);
async function getlist() {
  let res = await getWxUserList();
  console.log(res);
  tableData.value = res.data;
}
getlist();

function handleEdit(id) {
  console.log(id);
}

function handleDelete(id) {
  ElMessageBox.confirm("确认删除此用户？", "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      console.log(id);
      await delWxUserList(id);
      await getlist();
      ElMessage({
        type: "success",
        message: "删除成功",
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消删除",
      });
    });
}
</script>
  
  <style lang="scss" scoped>
.content {
  width: 100%;
  height: 100vh;
}

a {
  text-decoration: none;
}

.delBtn {
  margin-left: 10px;
}
</style>
  