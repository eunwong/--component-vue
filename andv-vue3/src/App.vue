<template>
  <a-config-provider
    :locale="zh_CN"
    :theme="{
      algorithm: theme.defaultAlgorithm,
      ...style,
    }"
  >
    <RouterView />
  </a-config-provider>
</template>
<script setup>
// :component-size="'large'"

import { theme } from "ant-design-vue";
const { defaultAlgorithm, darkAlgorithm, compactAlgorithm } = theme;
import { RouterView } from "vue-router";
import { ref } from "vue";
import style1 from "@/assets/style/config/style1.json";
import zh_CN from "ant-design-vue/es/locale/zh_CN";
const style = ref(style1);
</script>

<style lang="less" scoped>
h1 {
  font-size: 2em;
  text-align: center;
  color: #42b983;
}
</style>
