<!-- 角色编辑和增加 -->
<template>
  <el-form :model="state.data" ref="resetFormData" :rules="rules">
    <el-form-item label="角色名称" prop="rolename">
      <el-input v-model="state.data.rolename" />
    </el-form-item>
    <el-form-item label="权限" prop="type">
      <div class="account-list" label="权限">
        <el-tree
          ref="tree"
          :data="state.newMenuList"
          :props="defaultProps"
          show-checkbox
          node-key="id"
          default-expand-all
          :default-checked-keys="state.data.menus"
          @check="handleTreeChecked"
        ></el-tree>
      </div>
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <el-radio-group v-model="state.data.status">
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
import { reactive, ref, onMounted, computed, toRaw } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
// 引入 ElMessage 组件
import { ElMessage } from "element-plus";
import "element-plus/es/components/message/style/css";
import { roleEdit, getRole, roleAdd } from "@/api/role.js";
import { getMenus } from "@/api/menu.js";
const route = useRoute();
const router = useRouter();
const store = useStore();
let pageID = route.params.id; //动态路由携带的id

const state = reactive({
  data: {
    menus: [], //权限数组
    rolename: "", //角色名称
    status: 1, //状态
  },
  newMenuList: [], //更新菜单
  formReset: {}, //重置菜单
});
//表单的校验规则
const rules = reactive({
  rolename: [{ required: true, message: "必填", trigger: "blur" }],
  url: [
    { required: true, message: "必填", trigger: "blur" },
    // { min: 3, max: 8, message: "必填", trigger: "blur" },
  ],
});
const defaultProps = {
  children: state.newMenuList.children, //子菜单
  label: "title", //树形名称
};

//获取角色权限列表
const requestMenuList = async () => {
  state.newMenuList = await getMenus(); //获取菜单
  if (pageID) {
    let res = await getRole(pageID); //获取角色权限
    console.log(res);
    res.menus = res.menus.split(","); //权限数组
    state.data = res; //更新表单数据
    state.formReset = { ...res }; // 赋给一个临时变量，用于重置
  }
};

const tree = ref(null);
onMounted(() => {
  console.log("tree", tree.value);
});
requestMenuList();

function handleTreeChecked(data, node) {
  // 根据单选框来更新权限数组
  console.log(node);
  // state.data.menus = [...node.checkedKeys, ...node.halfCheckedKeys];
  state.data.menus = node.checkedKeys
  console.log(state.data.menus);
  console.log([...node.checkedKeys, ...node.halfCheckedKeys]);
}

// 编辑按钮
const onSubmit = async (data) => {
  await resetFormData.value.validate(async (valid, fields) => {
    let res;
    if (pageID) {
      state.data.id = pageID; //加上id请求参数
      console.log(ref);
      try {
        res = await roleEdit(state.data); //编辑请求
      } catch (error) {
        console.log(error);
      }
    } else {
      // 添加按钮
      try {
        console.log("submit!", toRaw(state.data));
        res = await roleAdd(state.data);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }

    if (res.code == 200) {
      // await store.dispatch("updateMenu", newMenu);
      router.back(); //添加/编辑成功返回上一级菜单
      ElMessage({
        showClose: true,
        message: res.msg,
        type: "success",
      });
    }
  });
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
