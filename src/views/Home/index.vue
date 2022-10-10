/**
* Author        : let_shirochiki
* CreateDate    : Mon Oct 10 2022 17:06:09 GMT+0800 (中国标准时间)
* ComponentName : Home
* lastEditTime  : 
* FilePath      : /src/views/Home/index.vue
*/
<script setup lang = 'ts'>
// core
import { ref, reactive, onMounted, onUnmounted, inject } from 'vue';
// router
import { useRouter, useRoute } from 'vue-router';
// utils
import request from '@/utils/request';
// inject
import { $paginationSizes } from '@/global/provide/config';

const router = useRouter();
const route = useRoute();

onMounted(() => {
    // onMounted
})
onUnmounted(() => {
    // onUnmounted
})
</script>

<template>
    <div class="home">
        Home页面
    </div>
</template>
<style lang="scss" scoped>
@use 'style.scss';
</style>