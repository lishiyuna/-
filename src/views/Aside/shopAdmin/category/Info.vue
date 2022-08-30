<template>
  <el-form :model="state.form" ref="resetFormData">
    <el-form-item label="上级分类" prop="pid">
      <el-select v-model="state.form.pid" placeholder="请选择">
        <el-option label="顶级分类" :value="0"></el-option>
        <el-option
          v-for="item in state.categoryList"
          :label="item.catename"
          :value="item.id"
          :key="item.id"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="分类名称" prop="catename" width="120px">
      <el-input placeholder="请输入分类名称" v-model="state.form.catename" />
    </el-form-item>

    <el-form-item label="上传图片" prop="url">
      <el-upload
        action="#"
        list-type="picture-card"
        :auto-upload="false"
        :limit="1"
        :on-exceed="handleExceed"
        :on-change="fileChange"
        :file-list="state.fileList"
        ref="file"
      >
        <el-icon><Plus /></el-icon>
        <template #file="{ file }">
          <div>
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
            />
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
              >
                <el-icon><zoom-in /></el-icon>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <el-icon><Delete /></el-icon>
              </span>
            </span>
          </div>
        </template>
      </el-upload>
      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
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
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
// 引入 ElMessage 组件
import { ElMessage, ElMessageBox } from "element-plus";
import "element-plus/es/components/message/style/css";
//引入封装删除获取菜单api
import { addCategory, getCategory, editCategory } from "@/api/category.js";

import { UploadProps, UploadUserFile } from "element-plus";

const route = useRoute();
const router = useRouter();
const store = useStore();
const tree = ref(null); //树形控件的ref
const { proxy } = getCurrentInstance();
console.log(proxy.$HOST);
//分类数据
const state = reactive({
  form: {
    pid: "",
    catename: "",
    img: "",
    status: 1,
  },
  categoryList: [],
  fileList: [],
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

// 缩略图删除
const handleRemove = (uploadFile) => {
  state.fileList = [];
  console.log("缩略图删除", uploadFile);
};
// 缩略图放大
function handlePictureCardPreview(uploadFile) {
  dialogImageUrl.value = uploadFile.url;
  dialogVisible.value = true;
}
let file = ref(null);
// 超出限制
function handleExceed(uploadFile) {
  console.log(file);
  console.log(uploadFile);
}
//文件发生变化的回调函数
const fileChange = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url;
  //Raw才是真正的文件地址
  state.form.img = uploadFile.raw;
};
//文件发生错误的回调函数
const error = (uploadFile, uploadFiles) => {
  console.log(uploadFile);
  console.log(uploadFiles);
};

// 获取分类列表;
async function getCategoryList() {
  try {
    let res = await getCategory();
    state.categoryList = res;
  } catch (error) {
    console.log(error);
  }
}

onMounted(async () => {
  getCategoryList();
  //获取一条分类数据
  if (props.editID) {
    console.log("props.editID", props.editID);
    let res = await getCategory(props.editID);
    console.log(res);
    state.form = res;
    // 回显图片
    let url = state.form.img ? proxy.$HOST + state.form.img : "";
    if (url) {
      state.fileList.push({ name: state.form.catename, url });
    }
  }
});

// 编辑按钮/添加按钮
const onSubmit = async (data) => {
  // 发送请求！
  // 使用FormData提交数据！
  let formdata = new FormData();
  for (let k in state.form) {
    formdata.append(k, state.form[k]);
  }
  let res;

  if (props.editID) {
    formdata.append("id", props.editID); // 给表单数据添加上id
    try {
      res = await editCategory(formdata); //编辑请求
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  } else {
    // 添加按钮
    try {
      console.log("submit!", { ...formdata });
      res = await addCategory(formdata);
    } catch (error) {
      console.log(error);
    }
  }
  console.log(res);
  //   更新表格
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
