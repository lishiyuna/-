<template>
  <div class="content">
    <div class="top_box">
      <el-row :gutter="20">
        <el-col :span="14"
          ><div class="grid-content ep-bg-white">
            <span class="title">个人信息</span>
            <el-divider />
            <div class="userinfo_desc">
              <div class="left_box">
                <div class="block">
                  <el-avatar size="large" :src="state.avatar" />
                </div>
                <el-upload
                  ref="upload"
                  class="upload-demo"
                  action="#"
                  :limit="1"
                  :on-change="fileChange"
                  :auto-upload="false"
                >
                  <template #trigger>
                    <p class="update">点击更换头像</p>
                  </template>
                </el-upload>
              </div>
              <div class="right_box">
                <p>上午好，{{state.username}}，生活变得再糟糕，也不妨碍我变得更好！</p>
                <div class="nsd" style="marginTop: 20px">
                  <p 
                    >昵称：<span>{{ state.nicheng }}</span></p
                  >
                  <p>身份：<span>管理员</span></p>
                  <p>登录时间：<span>{{state.formTime}}</span></p>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content ep-bg-white">
            <el-carousel :interval="4000" type="card" height="200px">
              <el-carousel-item v-for="item in imgList" :key="item">
                <img :src="item" alt="" />
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="yx_box">
      <el-row>
        <el-col :span="24">
          <div class="grid-content ep-bg-purple-dark">
            <span class="title">营销推荐</span>
            <el-divider />
            <el-row :gutter="20">
              <el-col :span="6"
                ><div class="grid-content ep-bg-green">
                  <p>优惠券</p>
                  <br />
                  <p>现金券、折扣券、营销必备</p>
                </div></el-col
              >
              <el-col :span="6"
                ><div class="grid-content ep-bg-red">
                  <p>优惠券</p>
                  <br />
                  <p>现金券、折扣券、营销必备</p>
                </div></el-col
              >
              <el-col :span="6"
                ><div class="grid-content ep-bg-purple">
                  <p>优惠券</p>
                  <br />
                  <p>现金券、折扣券、营销必备</p>
                </div></el-col
              >
              <el-col :span="6"
                ><div class="grid-content ep-bg-yellow">
                  <p>优惠券</p>
                  <br />
                  <p>现金券、折扣券、营销必备</p>
                </div></el-col
              >
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="user_box">
      <el-row>
        <el-col :span="24"
          ><div class="grid-content ep-bg-purple-dark">
            <span class="title">更新信息</span>
            <el-divider />
            <div>
              <p class="ertitle">基本信息</p>
              <el-form
                ref="ruleFormRef"
                :model="ruleForm"
                status-icon
                :rules="rules"
                label-width="120px"
                class="demo-ruleForm"
              >
                <el-form-item label="昵称" prop="nickname">
                  <el-input
                    v-model="state.userInfo.nickname"
                    type="text"
                    autocomplete="off"
                  />
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input
                    v-model="state.userInfo.email"
                    type="email"
                    autocomplete="off"
                  />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm(ruleFormRef)"
                    >更新个人信息</el-button
                  >
                </el-form-item>
              </el-form>
            </div>
            <div>
              <p class="ertitle">账号安全</p>

              <div class="pass_box">
                <div class="passwordEdit">
                  <p>账户密码</p>
                  <p class="current">当前密码强度：强</p>
                </div>

                <div class="xiugai">
                 
                  <el-link type="primary" :underline="false" @click="gotoPassword">立即修改</el-link>
                </div>
              </div>
              <el-divider />
            </div></div
        ></el-col>
      </el-row>
    </div>

    <!-- <div class="userinfo">
      <div class="demo-basic--circle">
        <div class="block">
          <el-avatar size="large" :src="state.userInfo.user_pic" />
        </div>
      </div>
      <el-upload
        ref="upload"
        class="upload-demo"
        action="#"
        :limit="1"
        :on-change="fileChange"
        :auto-upload="false"
      >
        <template #trigger>
          <p class="update">点击更换头像</p>
        </template>
      </el-upload>
      <div class="desc">
        <p>
          用户名：<span>{{ state.userInfo.username }}</span>
        </p>
        <p>
          昵称：<span>{{ state.userInfo.nickname }}</span>
        </p>
        <p>
          email：<span>{{ state.userInfo.email }}</span>
        </p>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { editAvatar, editUserinfo, getUserinfo } from "../api/profile";
import { useRoute, useRouter } from "vue-router";
import { reactive, ref } from "vue";
import parseTime from "../hooks/parseTime";
import { FormInstance } from "element-plus";
import { getLbt } from "@/api/lbt";

const route = useRoute();
const router = useRouter();
const value = ref(new Date());



const imgList = reactive([])
async function getlist1() {
  let res = await getLbt();
  res.records.forEach((item) => {
    imgList.push(item.img);
  });
}
getlist1();

const state = reactive({
  userInfo: {
    nickname: "",
    email: "",
  },
  formTime:'',
  username:'',
  avatar: "",
  nicheng: "",
  pageID:''
});

function gotoPassword(){
  router.push("/updatePassword/" + state.pageID);
}
const loginTime = localStorage.getItem('LOGINTIME');
// // console.log(localStorage.getItem('LOGINTIME'));
state.formTime = parseTime(1661743856198,'{y}-{m}-{d} {h}:{i}:{s}')
console.log(state.formTime);

let userId = route.params.id;
async function getlist(userId) {
  try {
    let res = await getUserinfo(userId);
    state.userInfo.nickname = res.data.nickname;
    state.userInfo.email = res.data.email;
    state.avatar = res.data.user_pic;
    state.username = res.data.username;
    state.nicheng = res.data.nickname;
    state.pageID = res.data.id
    console.log(state.userInfo);
  } catch (error) {
    console.log(error);
  }
}
getlist();
const dialogImageUrl = ref("");
const dialogVisible = ref(false);

const fileChange = async (uploadFile) => {
  dialogImageUrl.value = uploadFile.url;
  //Raw才是真正的文件地址
  state.avatar = uploadFile.raw;
  console.log(state.avatar);
  // 使用FormData提交数据！
  let formdata = new FormData();
  formdata.append("avatar", state.avatar);
  console.log(formdata);
  let res = await editAvatar(formdata);
  console.log(res);
  location.reload();
};

const ruleFormRef = ref();

const checkAge = (value) => {
  if (!value) {
    return callback(new Error("Please input the age"));
  }
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      callback(new Error("Please input digits"));
    } else {
      if (value < 18) {
        callback(new Error("Age must be greater than 18"));
      } else {
        callback();
      }
    }
  }, 1000);
};

const validatePass = (value) => {
  if (value === "") {
    callback(new Error("Please input the password"));
  } else {
    if (ruleForm.checkPass !== "") {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("checkPass", () => null);
    }
    callback();
  }
};
const validatePass2 = (value) => {
  if (value === "") {
    callback(new Error("Please input the password again"));
  } else if (value !== ruleForm.pass) {
    callback(new Error("Two inputs don't match!"));
  } else {
    callback();
  }
};

const ruleForm = reactive({
  oldPwd: "",
  newPwd: "",
  checkPass: "",
});

const rules = reactive({
  oldPwd: [{ validator: validatePass, trigger: "blur" }],
  checkPass: [{ validator: validatePass2, trigger: "blur" }],
  newPwd: [{ validator: checkAge, trigger: "blur" }],
});

const submitForm = (formEl) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      try {
        console.log(formEl);
        console.log(state.userInfo);
        let res = await editUserinfo(state.userInfo);
        location.reload();
        console.log(res);
      } catch (error) {}
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style lang="scss" scoped>
.content {
  background-color: #f7f7f7;
  height: 100vh;
}
.right_box {
  margin-left: 20px;
  .nsd{

    p{
      color: #999;
      font-size: 12px;
      margin-top: 10px;
      span{
        color: #000;
        font-size: 14px;
      }
    }
  }
}
.ep-bg-white {
  height: 230px;
}
.yx_box {
  margin-top: 20px;
}
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.pass_box {
  padding: 0 20px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  .passwordEdit {
    margin-top: 20px;
    .current {
      margin-top: 10px;
      font-size: 12px;
      color: #999;
    }
  }
  .xiugai {
    line-height: 60px;
  }
}

.el-col {
  border-radius: 4px;
}
.ertitle {
  font-size: 14px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  padding: 10px;
  background-color: #fff;
}
.ep-bg-green {
  color: #fff;
  font-size: 12px;
  background-color: #48d18d;
}
.ep-bg-red {
  color: #fff;
  font-size: 12px;
  background-color: #f95959;
}
.ep-bg-purple {
  color: #fff;
  font-size: 12px;
  background-color: #91a0f4;
}
.ep-bg-yellow {
  color: #fff;
  font-size: 12px;
  background-color: #febb50;
}
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.upload-demo {
  text-align: center;
}

::v-deep(.el-upload-list) {
  display: none;
}
.userinfo_desc {
  display: flex;
  // height: 200px;
  .upload-demo {
    margin-left: 10px;
    text-align: left;
  }
  .update {
    text-align: left;
    font-size: 12px;
    color: #999;
    cursor: pointer;
  }
  .desc {
    margin-top: 20px;
    margin-left: 30px;
  }
}
.el-avatar--large {
  --el-avatar-size: 100px;
}

.user_box {
  margin-top: 20px;
  .el-form-item {
    width: 400px;
  }
}
</style>
