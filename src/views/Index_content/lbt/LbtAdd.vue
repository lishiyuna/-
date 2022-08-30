<template>
  <div class="content">
    <el-form
      ref="ruleFormRef"
      :model="state.form"
      status-icon
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="轮播图名称" prop="name">
        <el-input v-model="state.form.name" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="轮播图片" prop="img">
        <el-upload
          action="#"
          list-type="picture-card"
          :on-change="fileChange"
          :auto-upload="false"
          :file-list="state.fileList"
          :on-exceed="handleExceed"
          :before-remove="beforeRemove"
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
                  @click="handleDownload(file)"
                >
                  <el-icon><Download /></el-icon>
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
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">{{
          lbtID ? "立即修改" : "立即添加"
        }}</el-button>
        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { UploadProps } from "element-plus";
import { FormInstance } from "element-plus";
import { useRoute, useRouter } from "vue-router";
import { addLbt, getLbt, editLbt } from "@/api/lbt";

import { Delete, Download, Plus, ZoomIn } from "@element-plus/icons-vue";

const ruleFormRef = ref();
const route = useRoute();
const router = useRouter();
// 动态路由携带的id参数
let lbtID = route.params.id;

const state = reactive({
  form: {
    name: "",
    img: "",
  },
  fileList: [],
});
// 通过id回显
async function getlistById(id) {
  try {
    let res = await getLbt(id);
    state.form = res.records[0];
    console.log(state.form);
    // 回显图片
    let url = state.form.img ? state.form.img : "";
    if (url) {
      state.fileList.push({ name: state.form.name, url });
    }
  } catch (error) {
    console.log("error:", error);
  }
}
if (lbtID) {
  getlistById(lbtID);
}
const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const disabled = ref(false);

// 缩略图删除
const handleRemove = (uploadFile) => {
  state.fileList = [];
  console.log(uploadFile);
};
// 删除
const beforeRemove = (file, fileList) => {
  const result = new Promise((resolve, reject) => {
    ElMessageBox.confirm("此操作将删除该图片, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        let index = fileList.indexOf(file);
        fileList.splice(index, 1);
        // 请求删除接口
      })
      .catch(() => {
        reject(false);
      });
  });
  return result;
};
const handlePictureCardPreview = (file) => {
  dialogImageUrl.value = file.url;
  dialogVisible.value = true;
};
let file = ref(null);
// 超出限制
function handleExceed(uploadFile) {
  ElMessage.warning("只能传入一张图片哦~~");
  console.log(file);
  console.log(uploadFile);
}
const fileChange = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url;
  //Raw才是真正的文件地址
  state.form.img = uploadFile.raw;
};
const handleDownload = (file) => {
  console.log(file);
};

const rules = reactive({
  // pass: [{ validator: validatePass, trigger: "blur" }],
  // checkPass: [{ validator: validatePass2, trigger: "blur" }],
  // age: [{ validator: checkAge, trigger: "blur" }],
});

const submitForm = (formEl) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      // 使用FormData提交数据！
      let formdata = new FormData();
      for (let k in state.form) {
        formdata.append(k, state.form[k]);
      }
      let res;
      //编辑
      if (lbtID) {
        state.form.id = lbtID;
        try {
          res = await editLbt(formdata);
          console.log(res);
        } catch (error) {
          console.log(error);
        }
      } else {
        //添加
        try {
           res = await addLbt(formdata);
          console.log(res);
        } catch (error) {
          console.log(error);
        }
      }
      if (res.code == 1) {
        router.back();
        ElMessage({
          showClose: true,
          message: res.msg,
          type: "success",
        });
      }
    } else {
      console.log("error submit!");
      return false;
    }
  });
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100vh;
  padding-top: 100px;
  display: flex;
  justify-content: center;
}
a {
  text-decoration: none;
}
</style>
