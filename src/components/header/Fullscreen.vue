<!-- //全屏 -->
<template>
    <el-icon v-if="isFullscreen" @click="toggle">
        <SwitchButton />
    </el-icon>
    <el-icon v-else @click="toggle">
        <FullScreen />
    </el-icon>
</template>

<script setup>
import { useFullscreen } from '@vueuse/core';
const { isFullscreen, enter, exit, toggle } = useFullscreen();
// console.log("@@",isFullscreen,enter);
</script>

<style lang="scss" scoped>
</style>