<template>
  <el-form
    :model="ruleForm.from"
    label-width="120px"
    class="demo-ruleForm"
    :size="formSize"
    status-icon
  >
    <el-form-item label="医生" prop="team">
      <el-input v-model="ruleForm.from.team" />
    </el-form-item>
    <el-form-item
      label="科室"
      prop="team"
      v-if="router.currentRoute.value.params.groupId"
    >
      <el-input v-model="ruleForm.from.department" />
    </el-form-item>
    <el-form-item label="医院" prop="unit">
      <el-input v-model="ruleForm.from.unit" />
    </el-form-item>
    <el-form-item label="职位" prop="position">
      <el-input v-model="ruleForm.from.position" />
    </el-form-item>
    <el-form-item label="上班时间" prop="onlineTime">
      <el-input v-model="ruleForm.from.onlineTime" />
    </el-form-item>

    <el-form-item label="个人简介" prop="desc1">
      <el-input
        v-model="ruleForm.from.desc1"
        type="textarea"
        resize="none"
        :autosize="{ minRows: 8, maxRows: 4 }"
        placeholder="请输入简介"
      />
    </el-form-item>
    <el-form-item label="照片" prop="photo">
      <el-upload
        action="#"
        list-type="picture-card"
        :on-change="fileChange"
        :auto-upload="false"
        :file-list="ruleForm.fileList"
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
      <el-button type="primary" @click="submitForm">{{
        router.currentRoute.value.params.id ? "修改" : "新增"
      }}</el-button>
      <el-button @click="resetForm">清空</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup>
import { setdoctor, iddoctor, newdoctor } from "../../api/Experts.js";
import { useRouter, useRoute } from "vue-router";
import { ref, toRaw, onMounted, reactive } from "vue"
const imageUrl = ref("");
let router = useRouter();
const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const formSize = ref("default");
const ruleFormRef = ref();
const route = useRoute();
const rule = reactive({});
const ruleForm = reactive({
  from: {
    groupId:'',
    team: "",
    department: "",
    position: "",
    photo: "",
    onlineTime: "",
    unit: "",
    desc1: "",
    id: "",
    img: "",
    name: "",
  },
  fileList: [],
});
//图片回显
onMounted(async () => {
  //rule =ruleForm
  let a = toRaw(router.currentRoute.value?.params.id);
  // console.log(a);
  if (a) {
    let a = String(toRaw(router.currentRoute.value.params.id));
    //根据id获取医生信息
    let data = await iddoctor(a);
    // console.log(data.data[0].team);
    let { team, department, position, photo, onlineTime, unit, desc1, id } =
      data.data[0];
    console.log(team);
    ruleForm.from.team = team;
    (ruleForm.from.department = department),
      (ruleForm.from.position = position),
      (ruleForm.from.photo = photo),
      (ruleForm.from.onlineTime = onlineTime),
      (ruleForm.from.unit = unit),
      (ruleForm.from.desc1 = desc1);
    ruleForm.from.id = id;
    console.log(ruleForm.from.photo);
    let url = ruleForm.from.photo ? ruleForm.from.photo : "";
    ruleForm.fileList.push({ name: ruleForm.from.name, url });
  }
});
const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}));
//点击清空
function resetForm() {
  ruleForm.from.team = "";
  ruleForm.from.department = "";
  ruleForm.from.position = "";
  ruleForm.from.photo = "";
  ruleForm.from.onlineTime = "";
  ruleForm.from.unit = "";
  ruleForm.from.desc1 = "";
  ruleForm.fileList=[]
}
// 缩略图删除
const handleRemove = (uploadFile) => {
  ruleForm.fileList = [];
  console.log(uploadFile);
};
//点击放大功能
const handlePictureCardPreview = (file) => {
  console.log(file);
  dialogImageUrl.value = file.url;
  dialogVisible.value = true;
};
//
//上传图片的内容
const fileChange = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url;
  //Raw才是真正的文件地址
  ruleForm.from.photo=uploadFile.raw
};
//上传图片
async function submitForm() {
   let id = toRaw(router.currentRoute.value?.params.id);
  let groupId = String(toRaw(router.currentRoute.value.params?.groupId));
  if (id) {
    ruleForm.from.id=id
    let formdata=new FormData()
    for(let k in ruleForm.from){
      console.log(k);
      formdata.append(k,ruleForm.from[k])
      console.log(formdata);
    } 
    await setdoctor(formdata)
  } else if (groupId) {
    ruleForm.from.groupId=groupId
    let formdata=new FormData()
    for(let k in ruleForm.from){
      console.log(k);
      formdata.append(k,ruleForm.from[k])
      console.log(formdata);
    }  
     await newdoctor(formdata)
   }
  router.go(-1);
}

</script>
<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
