/**
* Author        : let_shirochiki
* CreateDate    : Tue Oct 11 2022 15:51:05 GMT+0800 (中国标准时间)
* ComponentName : Template
* lastEditTime  : 
* FilePath      : /src/views/Template/index.vue
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
    <div class="template">
        Template页面
    </div>
</template>
<style lang="scss" scoped>
@use 'style.scss';
</style>