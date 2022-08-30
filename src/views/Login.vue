<template>
  <div class="login-box">
    <div class="login-container">
      <div class="formBox">
        <!-- 左侧图片 -->
        <div
          class="form-left-box"
          v-motion
          :initial="{ opacity: 0, x: -100 }"
          :enter="{ opacity: 1, x: 0 }"
          :delay="200"
        >
          <div class="form-left"></div>
        </div>
        <div class="form-container">
          <div class="cnts">
            <!-- 国际化 -->
            <Language />
          </div>
          <div
            class="logo"
            v-motion
            :initial="{ opacity: 0, y: 100 }"
            :enter="{ opacity: 1, y: 0, scale: 1 }"
            :variants="{ custom: { scale: 2 } }"
            :delay="200"
          >
            <img src="../assets/shopLogo2.png" alt="" />
            <p>{{ $t("mallSystemName") }}</p>
          </div>
          <el-form
            ref="loginFormRef"
            :model="loginForm"
            :rules="loginRules"
            class="demo-ruleForm"
            size="large"
            status-icon
            style="width: 100%"
            @keyup.enter="handleLogin"
          >
            <el-form-item
              label=""
              prop="username"
              v-motion
              :initial="{ opacity: 0, y: 100 }"
              :enter="{ opacity: 1, y: 0, transition: { delay: 300 } }"
            >
              <el-input
                v-model="loginForm.username"
                :placeholder="$t('userPlaceholder')"
              >
                <template #prepend>
                  <el-icon>
                    <Avatar />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item
              label=""
              prop="password"
              v-motion
              :initial="{ opacity: 0, y: 100 }"
              :enter="{ opacity: 1, y: 0, transition: { delay: 400 } }"
            >
              <el-input
                type="password"
                show-password
                :placeholder="$t('passPlaceholder')"
                v-model="loginForm.password"
              >
                <template #prepend>
                  <el-icon>
                    <Lock />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
          </el-form>
          <!-- 滑块验证 -->
          <div
            class="mi-captchas"
            v-motion
            :initial="{ opacity: 0, y: 100 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 400 } }"
          >
            <mi-captcha
              ref="captcha"
              width="100%"
              :height="38"
              :radius="6"
              bgColor="#fff"
              textColor="#000"
              :logo="logoImg"
              themeColor="#409eff"
              modalBgColor="#fff"
              @success="captchaSuccess"
            />
          </div>
          <!-- <Slidecheck /> -->
          <!-- 提交表单 -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 100 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 500 } }"
          >
            <el-button
              type="primary"
              @click="handleLogin"
              :loading="btnLoading"
              >{{ $t("signIn") }}</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, toRaw } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
// 引入 ElMessage 组件
import { ElMessage } from "element-plus";
import "element-plus/es/components/message/style/css";
// 引入国际化组件
import Language from "@/components/header/Language.vue";
import { useI18n } from "vue-i18n";

// 访问 .env配置文件中设置的变量
// console.log(process.env.VUE_APP_URL);
// console.log(process.env.VUE_APP_Title);

const router = useRouter();
const store = useStore();
const { t } = useI18n();

// 获取到表单元素
const loginFormRef = ref(null);

// 登录的表单数据
const loginForm = reactive({
  username: "admin1",
  password: "aaaaaa",
});

function captchaSuccess() {
  loginForm.captchaSuccess = true;
}

// 登录按钮的加载loading
const btnLoading = ref(false);

// 登录表单的校验规则
const loginRules = reactive({
  username: [{ required: true, message: t("userError"), trigger: "blur" }],
  password: [
    { required: true, message: t("PWError"), trigger: "blur" },
    { min: 3, max: 8, message: t("PWSubError"), trigger: "blur" },
  ],
});
// 滑块验证
const captcha = ref(null);
const params = reactive({
  verify: { key: null },
});
const initAfter = (res) => {
  if (res?.ret?.code === 200) {
    localStorage.setItem("mi-captcha-key", res?.data?.key);
    params.verify.key = res?.data?.key;
  }
};

// 滑块图片
const logoImg = require("../assets/shopLogo2.png");

// 点击登录按钮，处理登录
async function handleLogin() {
  console.log(111);
  // 1、表单校验
  await loginFormRef.value.validate(async (valid, fields) => {
    if (valid) {
      // 开启loading状态
      btnLoading.value = true;
      try {
        // 滑块验证
        // if (!loginForm.captchaSuccess) {
        //   ElMessage({
        //     showClose: true,
        //     message: "请先验证",
        //     type: "warning",
        //   });
        //   return;
        // }
        await store.dispatch("handleLogin", toRaw(loginForm));
        console.log(222);
        // 登录成功，跳转到首页
        router.push({ name: "home" });
        ElMessage({
          showClose: true,
          message: "登录成功",
          type: "success",
        });
      } catch (error) {
        console.log(error);
      } finally {
        // 不管成功还是失败，都会执行
        btnLoading.value = false;
      }
    } else {
      // 校验不通过
      console.log("error submit!", fields);
    }
  });
}
</script>

<style lang="scss" scoped>
.login-box {
  height: 100%;
  width: 100%;
  position: relative;
  background: url(../assets/bg5.jpg);
  background-repeat: no-repeat;
  background-size: 100vw;
}

.login-container {
  height: 100vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background: rgba(0, 0, 0, 0.4) !important;

  .logo {
    font-size: 22px;
    height: 100px;
    width: 100%;
    padding-bottom: 15px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    img {
      width: 50px;
      height: 50px;
      margin-right: 10px;
    }
  }

  .form-container {
    width: 384px;
    padding: 0 40px 32px 40px;
    height: 400px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    .cnts {
      width: 10px;
      height: 10px;
      float: right;
      margin: 20px -10px;
    }

    .el-form {
      /* vue3中的样式穿透 */
      ::v-deep(.el-form-item__content) {
        margin: 0px !important;
        border: 0 !important;
      }

      .inpBox {
        background-color: #fff;
        width: 450px;
        display: flex;
      }
    }

    .el-button {
      width: 100%;
      margin-top: 20px;
    }
  }

  .formBox {
    width: 670px;
    height: 400px;
    background: #f5f5f5;
    display: flex;
    justify-content: space-between;
    border-radius: 6px;
    overflow: hidden;

    .form-left-box {
      width: 50%;
      height: 100%;

      background: url(../assets/bgleft.jpg);
      background-repeat: no-repeat;
      background-size: 100% 100%;

      .form-left {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3) !important;
      }
    }
  }
}
</style>
