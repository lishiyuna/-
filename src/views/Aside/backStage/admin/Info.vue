<!-- 管理员编辑和增加 -->
<template>
  <el-form :model="state.form" ref="resetFormData">
    <el-form-item label="角色名称" prop="roleid">
      <el-select v-model="state.form.roleid" placeholder="请选择">
        <el-option
          v-for="item in state.roleList"
          :label="item.rolename"
          :value="item.id"
          :key="item.id"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="管理员名称" prop="username">
      <el-input v-model="state.form.username" />
    </el-form-item>

    <el-form-item label="管理员密码" prop="password">
      <el-input
        v-model="state.form.password"
        :placeholder="$route.params.id ? '留空为不修改密码' : ''"
      />
    </el-form-item>

    <el-form-item label="状态" prop="status">
      <el-radio-group v-model="state.form.status">
        <el-radio :label="1">正常</el-radio>
        <el-radio :label="2">禁用</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit()">{{
        pageID ? "立即修改" : "立即添加"
      }}</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref, onMounted} from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
// 引入 ElMessage 组件
import { ElMessage } from "element-plus";
import "element-plus/es/components/message/style/css";
import { getRole } from "@/api/role.js";
import { addAdmin, editAdmin, getAdmin } from "@/api/admin";
const route = useRoute();
const router = useRouter();
const store = useStore();
let pageID = route.params.id; //动态路由携带的id

const state = reactive({
  form: {
    roleid: "",
    username: "",
    password: "",
    status: 1,
  },
  roleList: {},
});

// const state.roleList = reactive({});
async function getRoleList(data) {
  try {
    let res = await getRole(data);
    state.roleList = res;
  } catch (error) {
    console.log(error);
  }
}
onMounted(async () => {
  getRoleList();
  //获取一条管理员数据
  if (pageID) {
    console.log("pageID", pageID);
    let res = await getAdmin({
      uid: pageID,
    });
    console.log(res);
    state.form = res;
    state.form.password = "";
  }
});
const tree = ref(null);

// 编辑按钮
const onSubmit = async (data) => {
  let res;
  if (pageID) {
    state.form.uid = pageID; //加上uid请求参数
    console.log(ref);
    try {
      res = await editAdmin(state.form); //编辑请求
    } catch (error) {
      console.log(error);
    }
  } else {
    // 添加按钮
    try {
      console.log("submit!", { ...state.form });
      res = await addAdmin(state.form);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
  router.back(); //添加/编辑成功返回上一级菜单
};

// 重置表单
const resetFormData = ref(null);
const resetForm = () => {
  if (pageID) {
    console.log(state.data);
    console.log(state.formReset);
    state.data = state.formReset;
  } else {
    resetFormData.value.resetFields();
    state.data.menus = [];
  }
};
</script>

<style lang="scss">
.account-list {
  margin-left: 40px;
}
.el-form {
  width: 500px;
  padding: 20px;
  box-sizing: border-box;
}
</style>
