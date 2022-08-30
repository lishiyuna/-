<template>
  <el-scrollbar>
    <div class="scrollbar-flex-content">
      <el-tag
        v-for="(tag, index) in tags"
        :key="tag.name"
        class="mx-1"
        :closable="!!index"
        :type="tag.type"
        disable-transitions
        :effect="tag.path == $route.fullPath ? 'dark' : 'plain'"
        :style="{ marginLeft: index ? '5px' : '0px' }"
        @click="goPage(tag.path)"
        @close="handleClose(index)"
      >
        {{ tag.name }}
      </el-tag>
    </div>
  </el-scrollbar>
</template>

<script setup>
import { reactive, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
let tags = reactive([]);

watchEffect(() => {
  // console.log("历史tags", { ...route });
  const hasTag = tags.find((item) => item.path == route.fullPath);
  // console.log(hasTag);
  if (!hasTag) {
    tags.push({
      name: route.meta.title,
      path: route.fullPath,
    });
  }
});
// 点击tag跳转路由
function goPage(path) {
  router.push(path);
}

// 关闭tag
function handleClose(idx) {
  tags.splice(idx, 1);
  if (tags.length > 1) {
    router.push(tags[idx - 1].path);
  }
}
</script>

<style lang="scss" scoped>
.scrollbar-flex-content {
  display: flex;
}
.el-scrollbar{
  width:100%;
  height: 30px;
  margin:-10px 0 5px 0;
}
.el-tag{
    cursor: pointer;
}
</style>