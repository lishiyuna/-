<!-- 面包屑组件 -->
<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="item in $route.meta.Breadcrumb" :key="item" :to="{ path: '/' }"
      >{{ item }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import {watchEffect} from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
// watchEffect(()=>{
//   console.log('面包屑route',{...route});
// })
</script>

<style lang="scss" scoped>
</style>