const vueTemplate =  (componentName) => {
    return `/**
* Author        : let_shirochiki
* CreateDate    : ${new Date()}
* ComponentName : ${componentName}
* lastEditTime  : 
* FilePath      : /src/views/${componentName}/index.vue
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
    <div class="${componentName.trim().replace(componentName[0], componentName[0].toLocaleLowerCase())}">
        ${componentName}页面
    </div>
</template>
<style lang="scss" scoped>
@use 'style.scss';
</style>`};
const scssTemplate = (componentName) => {
    return `/**
* Author        : let_shirochiki
* CreateDate    : ${new Date()}
* ComponentName : ${componentName}
* lastEditTime  : 
* FilePath      : /src/views/${componentName}/index.scss
*/
@use '/src/styles/flex.scss';
@use '/src/styles/global.scss';
$bgColor: #{var(--primary-color-r),var(--primary-color-g),var(--primary-color-b)};
.${componentName.trim().replace(componentName[0], componentName[0].toLocaleLowerCase())} {
    color: #585858;
}`};

const tsRulesTemplate = (componentName) => {
    return `/**
* Author        : let_shirochiki
* CreateDate    : ${new Date()}
* ComponentName : ${componentName}
* lastEditTime  : 
* FilePath      : /src/views/${componentName}/${componentName.toLocaleLowerCase()}.d.ts
*/`};

module.exports = {
    vueTemplate,
    scssTemplate,
    tsRulesTemplate,
}