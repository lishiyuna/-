<template>
  <!-- logo -->
  <div class="logo">
    <div :class="{ smLogo: $store.state.asideStore.isCollapse }">
      <img src="../assets/shopLogo2.png" alt="" />
    </div>
  </div>
  <!-- menu菜单 -->
  <el-menu
    class="el-menu-vertical-demo"
    :default-active="$route.fullPath"
    :collapse="$store.state.asideStore.isCollapse"
    router
    background-color="rgb(48, 65, 86)"
    text-color="#fff"
  >
    <!-- 首页 -->
    <el-menu-item index="/homepage">
      <el-icon><Setting /></el-icon>
      <span>首页</span>
    </el-menu-item>
    <template v-for="menusItem in menus" :key="menusItem.id">
      <!-- 单极菜单 -->
      <el-menu-item v-if="!menusItem.children || menusItem.children.length==0" :index="menusItem.url">
        <el-icon v-if="menusItem.icon"><component :is="menusItem.icon" /></el-icon>
        <span>{{ menusItem.title }}</span>
      </el-menu-item>
      <!-- 多级菜单 -->
      <el-sub-menu v-else :index="menusItem.url || menusItem.id + ''">
        <template #title>
          <!-- icon图标 -->
          <el-icon><component :is="menusItem.icon" /></el-icon>
          <span>{{ menusItem.title }}</span>
        </template>
        <!-- 子菜单 -->
        <el-menu-item
          v-for="item in menusItem.children"
          :index="item.url"
          :key="item.id"
          >{{ item.title }}
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const store = useStore();
const router = useRouter();
let menus = computed(() => store.state.userStore.menus);
console.log(menus);
// let pagePath = ref(router.currentRoute._rawValue.path);
// $route.fullPath 当前页面的路径
// console.log(pagePath);
</script>

<style lang="scss" scoped>
.is-active {
  background: #ffffff;
  color: #0c8aff;
}

.el-menu {
  background-color: rgb(48, 65, 86);
  color: #fff;
  border: none;
}

.logo {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;

  img {
    width: 40px;
  }
}

.smLogo {
  width: 45px;
  height: 45px;
  border: 2px solid #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -5px;

  img {
    width: 20px;
    height: 20px;
  }
}
</style>