<template>
  <div class="common-layout">
    <el-container>
      <!-- aside -->
      <el-aside
        :style="{
          width: $store.state.asideStore.isCollapse ? '63px' : '200px',
        }"
      >
        <el-scrollbar
          :wrap-style="{
            background: '#2d3a4b',
          }"
        >
          <Aside></Aside>
        </el-scrollbar>
      </el-aside>
      <el-container>
        <!-- header -->
        <el-header class="header">
          <Header></Header>
        </el-header>
        <el-scrollbar height="700px">
          <el-main>
            <!-- 历史tags记录 -->
            <!-- <Tags></Tags> -->
            <div class="mainBox">
              <!-- main -->
              <router-view v-slot="{ Component }">
                <transition
                  name="fade-transform"
                  mode="out-in"
                  :duration="{ enter: 400, leave: 400 }"
                  appear
                >
                  <!-- 动态组件 -->
                  <!-- <keep-alive> -->
                  <component :is="Component" />
                  <!-- </keep-alive> -->
                </transition>
              </router-view>
            </div>
          </el-main>
        </el-scrollbar>
      </el-container>
    </el-container>
  </div>
</template>


<script setup>
import "element-plus/es/components/message/style/css";
import Aside from "@/components/Aside.vue";
import Header from "@/components/Header.vue";
import Tags from "@/components/Tags.vue";
</script>

<style lang="scss" scoped>
.common-layout {
  width: 100vw;
  height: 100vh;

  .header {
    height: 56px;
    padding: 0;
  }

  .el-main {
    background: hsl(0, 0%, 96%);
    padding: 20px;
    box-sizing: border-box;
    .mainBox {
      background: #fff;
    }
  }

  .el-aside {
    transition: width 0.28s ease-out;
    height: 100vh;
    background-color: rgb(48, 65, 86);

    /* 解决菜单收缩卡顿问题 */
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
  }
}

/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}
.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>