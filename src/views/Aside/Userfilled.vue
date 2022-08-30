<template>
  <div class="box">
    <!-- <div class="left">
        <img src="../../assets/shopLogo2.png" alt="">
        <p>超级管理员</p>
        <p>海纳百川，有容乃大</p>
    </div>
    <div class="right"></div> -->
    <img src="../../assets/个人中心.png" alt="">
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
import { addAdmin, editAdmin, getAdmin } from "@/api/admin";
const store = useStore();
let adminName = store.state.userStore.adminName.name;
adminName = adminName[0].toUpperCase() + adminName.substr(1);
console.log(adminName);

</script>


<style lang="scss" scoped>
.box {
  background: hsl(0deg, 0%, 96%);
  width: 100%;
  display: flex;
  justify-content: space-around;
  .left{
    width: 350px;
    height: 630px;
    background: #fff;
    img{
        height: 30px;
        width: 30px;
    }
  }

  .right{
    width: 350px;
    height: 630px;
    background: #fff;
  }
}
</style>