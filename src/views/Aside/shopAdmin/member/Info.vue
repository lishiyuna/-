<template>
  <el-form :model="state.form" ref="resetFormData">
    <el-form-item label="昵称" prop="nickname">
      <el-input placeholder="请输入昵称" v-model="state.form.nickname" />
    </el-form-item>
    <el-form-item label="手机号码" prop="phone">
      <el-input placeholder="请输入手机号码" v-model="state.form.phone" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input placeholder="为空则不修改密码" v-model="state.form.password" />
    </el-form-item>

    <el-form-item label="状态" prop="status">
      <el-radio-group v-model="state.form.status">
        <el-radio :label="1">正常</el-radio>
        <el-radio :label="2">禁用</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit()">{{
        props.editID ? "立即修改" : "立即添加"
      }}</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref, onMounted, getCurrentInstance } from "vue";
// 引入 ElMessage 组件
import { ElMessage, ElMessageBox } from "element-plus";
import "element-plus/es/components/message/style/css";
//引入编辑会员api
import { getMember, editMember } from "@/api/member.js";

const tree = ref(null); //树形控件的ref
const { proxy } = getCurrentInstance();
console.log(proxy.$HOST);
//分类数据
const state = reactive({
  form: {
    uid: "",
    nickname: "",
    password: "",
    phone: "",
    status: 1,
  },
});

const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const disabled = ref(false);
// const emit = defineEmits(["updataList"]);
// 在子组件中使用emit引用父组件的方法
const emit = defineEmits({
  refrashTable: null,
});
// 调用该方法
const refrashTable = () => {
  emit("refrashTable");
};
const props = defineProps(["editID"]);
console.log("父组件的变量", props.editID);

onMounted(async () => {
  //获取一条分类数据
  let res = await getMember(props.editID);
  console.log(res);
  state.form = res;
  state.form.password = "";
});

// 编辑按钮
const onSubmit = async (data) => {
  state.form.id = props.editID; // 给表单数据添加上id
  try {
    res = await editMember(formdata); //编辑请求
    console.log(res);
  } catch (error) {
    console.log(error);
  }
  refrashTable();
};

// 重置表单
const resetFormData = ref(null);
const resetForm = () => {
  if (props.editID) {
    console.log(state.data);
    console.log(state.formReset);
    state.data = state.formReset;
  } else {
    resetFormData.value.resetFields();
    state.data.menus = [];
  }
};
</script>
