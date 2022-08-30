<template>
  <div class="box">
    
    <div class="left">
      <div @click="changeMenuList" class="changeMenuBtn">
        <el-icon v-show="!$store.state.asideStore.isCollapse">
          <Fold />
        </el-icon>
        <el-icon v-show="$store.state.asideStore.isCollapse">
          <Expand />
        </el-icon>
      </div>
      <!-- 面包屑组件 -->
      <Breadcrumb />
    </div>

    <div class="right">
      <el-icon>
        <Search />
      </el-icon>
      <!-- 全屏组件 -->
      <div class="Fullscreen">
        <Fullscreen />
      </div>
      <!-- 下拉框组件 -->
      <Dropdown></Dropdown>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
//引入面包屑
import Breadcrumb from "@/components/header/Breadcrumb.vue";
// 引入下拉菜单
import Dropdown from "@/components/header/Dropdown.vue";
// 引入全屏
import Fullscreen from "@/components/header/Fullscreen.vue";
const store = useStore();

function changeMenuList() {
  console.log(store.state.asideStore.isCollapse);
  store.commit("changeMenu");
}
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  justify-content: space-between;
}

.left {
  display: flex;
  width: 260px;
  height: 56px;
  justify-content: space-between;
  align-items: center;
  font-size: 22px;
  .el-breadcrumb {
    width: 200px;
  }
}

.right {
  display: flex;
  width: 150px;
  height: 56px;
  // line-height: 69px;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  margin-right: 30px;
}
.Fullscreen,
.changeMenuBtn {
  display: inline-block;
  vertical-align: middle;
  width: 56px;
  height: 56px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.Fullscreen:hover,
.changeMenuBtn:hover {
  color: #409eff;
  background-color: #f5f5f5;
  transition: all 0.3s;
}
</style>