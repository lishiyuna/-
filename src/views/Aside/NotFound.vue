<template>
  <div class="errPage">
    <div>
      <!-- lottie动画 -->
      <lottie-player
        src="https://assets5.lottiefiles.com/packages/lf20_4qhciwpm.json" 
        background="transparent"
        speed="1"
        style="width: 380px; height: 300px"
        loop
        autoplay
      ></lottie-player>
      <div class="info">抱歉，您访问的页面不存在。</div>
      <div class="goback">
        <el-button @Click="goBack">返回上一页</el-button>
        <el-button type="primary" @Click="goHome"> 返回首页 </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function goHome() {
  router.push("/homepage");
}

function goBack() {
  router.go(-1);
}
</script>

<style lang="scss" scoped>
.errPage {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 20px;
  box-sizing: border-box;

  .info {
    text-align: center;
    font-size: 16px;
    padding: 20px 0;
    color: #999;
  }

  .goback {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>