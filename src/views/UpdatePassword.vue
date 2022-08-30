<template>
  <div class="content">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input v-model.number="ruleForm.oldPwd" />
      </el-form-item>
      <el-form-item label="新密码" prop="pass">
        <el-input v-model="ruleForm.newPwd" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="确认新密码" prop="checkPass">
        <el-input
          v-model="ruleForm.checkPass"
          type="password"
          autocomplete="off"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)"
          >Submit</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { FormInstance } from "element-plus";
import { useRoute, useRouter } from "vue-router";
import { editPassword } from "../api/profile";

const ruleFormRef = ref();
const router = useRouter();

const checkAge = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("Please input the oldPassword"));
  }
  setTimeout((rule, value, callback) => {
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

const validatePass = (rule, value, callback) => {
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
const validatePass2 = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("Please input the password again"));
  } else if (value !== ruleForm.newPwd) {
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
  formEl.validate(async(valid) => {
    if (valid) {
      const oldP = ruleForm.oldPwd;
      const newP = ruleForm.newPwd;
      let res = await editPassword(oldP,newP);
      console.log(res);
      router.push('/login')
    } else {
      console.log("error submit!");
      return false;
    }
  });
};
</script>

<style lang="scss" scoped>
.content {
  width: 100vw;
  height: 100vh;
  padding: 20px 0;
  display: flex;
  justify-content: center;
}
</style>
