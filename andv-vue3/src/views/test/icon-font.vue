<!-- icon -> icon-font -->
<template>
    <div class="icon-font">
        <i class="iconfont zhjw-gl-icon-book"></i>
        <i class="iconfont zhjw-gl-icon-set"></i>

        <svg class="icon" aria-hidden="true">
            <use :xlink:href="'#' + 'zhjw-tiaodongshenqing'"></use>
        </svg>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, onUnmounted, reactive, ref } from 'vue';

onUnmounted(() => {});
</script>
<style lang="less" scoped>
.icon-font {
    background: #ffffff;
}
</style>
