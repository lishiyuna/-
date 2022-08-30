<!-- 菜单管理 -->
<template>
  <div class="tableBox">
    <router-link to="/menu/add">
      <el-button type="primary">新增菜单</el-button>
    </router-link>
    <el-table :data="state.tableData" style="width: 100%" row-key="id">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="type" label="类型">
        <template v-slot="scope">
          <el-tag
            :disabled="$route.params.id ? true : false"
            type="success"
            v-if="scope.row.type == 1"
            >目录</el-tag
          >
          <el-tag
            :disabled="$route.params.id ? true : false"
            v-if="scope.row.type == 2"
            >菜单</el-tag
          >
        </template>
      </el-table-column>

      <el-table-column prop="icon" label="图标">
        <template v-slot="scope">
          <el-icon v-if="scope.row.icon">
            <component :is="scope.row.icon" />
          </el-icon>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="地址" width="110"></el-table-column>
      <el-table-column prop="address" label="状态">
        <template v-slot="scope">
          <el-tag type="success" v-if="scope.row.status == 1">已启用</el-tag>
          <el-tag type="danger" v-else>已禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" align="center">
        <template v-slot="scope">
          <router-link :to="'/menu/' + scope.row.id">
            <el-button type="primary" icon="Edit" size="small" />
          </router-link>
          <el-button
            @click="delMenu(scope.row.id)"
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
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
// 引入 ElMessage 组件
import { ElMessage, ElMessageBox } from "element-plus";
//引入封装删除获取菜单api
import { menuDel, getMenus } from "@/api/menu.js";
const router = useRouter();
const store = useStore();
onMounted(() => {});

const state = reactive({
  tableData: [],
});
async function getMenuList() {
  try {
    let list = await getMenus();
    console.log(list);
    state.tableData = list;
  } catch (error) {
    console.log(error);
  }
}
//执行异步
getMenuList();
//删除菜单
function delMenu(data) {
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
        let res = await menuDel(data);
        // console.log('menu.vue页面',res);
        getMenuList();
        // console.log(res);
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
<style lang="scss">
a {
  text-decoration: none;
}
.tableBox {
  padding: 20px;
  box-sizing: border-box;
}
</style>
