<!-- 菜单管理 -->
<template>
  <el-form :model="state.form" ref="resetFormData" :rules="rules">
    <el-form-item label="类型" prop="type">
      <el-radio-group v-model="state.form.type">
        <el-radio :disabled="$route.params.id ? true : false" :label="1"
          >目录</el-radio
        >
        <el-radio :disabled="$route.params.id ? true : false" :label="2"
          >菜单</el-radio
        >
      </el-radio-group>
    </el-form-item>

    <el-form-item label="上级" v-if="state.form.type == 2" prop="pid">
      <el-select v-model="state.form.pid" placeholder="请选择父级">
        <el-option label="顶级目录" value="0" />
        <el-option
          v-for="item in menulist"
          :label="item.title"
          :value="item.id"
          :key="item.id"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="标题" prop="title">
      <el-input v-model="state.form.title" />
    </el-form-item>

    <el-form-item v-show="state.form.type == 1" label="图标" prop="icon">
      <el-input v-model="state.form.icon" />
    </el-form-item>
    <el-form-item v-show="state.form.type == 2" label="地址" prop="url">
      <el-input v-model="state.form.url" />
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
import { reactive, ref, onMounted, computed, toRaw } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
// 引入 ElMessage 组件
import { ElMessage } from "element-plus";
import "element-plus/es/components/message/style/css";
import { menuEdit, getMenus, menuAdd } from "@/api/menu.js";
const route = useRoute();
const router = useRouter();
const store = useStore();
let menulist = computed(() => store.state.userStore.menus);
// console.log(menulist);
//表单的校验规则
const rules = reactive({
  title: [{ required: true, message: "必填", trigger: "blur" }],
  url: [
    { required: true, message: "必填", trigger: "blur" },
    // { min: 3, max: 8, message: "必填", trigger: "blur" },
  ],
});
// 动态路由携带的id参数
let pageID = route.params.id;
const state = reactive({
  form: {
    pid: "0",
    title: "",
    type: 1,
    url: "",
    icon: "",
    status: 1,
  },
  formReset: {},
});

// 返回一个菜单
async function aMenu(data) {
  try {
    let res = await getMenus(data);
    state.form = res;
    //保存初始数据
    state.formReset = { ...res };
  } catch (error) {
    console.log("error:", error);
  }
}
if (pageID) {
  aMenu(pageID);
}

// 编辑按钮/添加按钮
console.log(state.form);

const onSubmit = async (data) => {
  await resetFormData.value.validate(async (valid, fields) => {
    let res;
    // 编辑按钮
    if (pageID) {
      // console.log("submit!", toRaw(pageID));
      state.form.id = pageID;
      try {
        res = await menuEdit(state.form);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    } else {
      //添加按钮
      try {
        console.log("submit!", toRaw(state.form));
        res = await menuAdd(state.form);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
    if (res.code == 200) {
      router.back();
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
    console.log(state.formReset);
    state.form = state.formReset;
  } else {
    resetFormData.value.resetFields();
  }
};
</script>

<style lang="scss" scoped>
.el-form {
  width: 500px;
  padding: 20px;
  box-sizing: border-box;
}
</style>