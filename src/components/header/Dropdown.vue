<!-- 头部下拉框 -->
<template>
  <el-dropdown :hide-on-click="false" trigger="click" @command="handleCommand">
    <span class="el-dropdown-link">
      {{ adminName
      }}<el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu class="dropdown-box">
        <el-dropdown-item command="UserFilled" icon="UserFilled"
          >个人中心</el-dropdown-item
        >
        <el-dropdown-item command="updatePassword" icon="Grid"
          >修改密码</el-dropdown-item
        >
        <el-dropdown-item command="logout" icon="SwitchButton"
          >退出登录</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
// import { addAdmin, editAdmin, getAdmin } from "@/api/admin";
// const route = useRoute();
const router = useRouter();
const store = useStore();
// 将获取到的管理员名称首字母大写
let adminName = store.state.userStore.adminName.name;
adminName = adminName[0].toUpperCase() + adminName.substr(1);
console.log(adminName);
let pageID = store.state.userStore.adminName.id; //动态路由携带的id

const handleCommand = (command) => {
  // console.log(command);
  if (command == "logout") {
    store.commit("logout");
    router.push("/login");
    ElMessage({
      showClose: true,
      message: "退出登录",
      type: "success",
    });
  } else if (command == "UserFilled") {
    // store.commit("logout");
    router.push("/profile/" + pageID);
    ElMessage({
      showClose: true,
      message: "个人中心",
      type: "success",
    });
  } else if (command == "updatePassword") {
    router.push("/updatePassword/" + pageID);
    ElMessage({
      showClose: true,
      message: "修改密码",
      type: "success",
    });
  }
};
</script>

<style>
.el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

.dropdown-box {
  padding: 5px;
}
</style>
