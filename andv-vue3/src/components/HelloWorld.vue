<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <a-config-provider
      :theme="{
        algorithm: theme.compactAlgorithm,
        ...style,
      }"
    >
      <a-space wrap>
        <a-button type="primary" @click="clickHandler">Primary Button</a-button>
        <a-button>Default Button</a-button>
        <a-button type="dashed">Dashed Button</a-button>
        <a-button type="text">Text Button</a-button>
        <a-button type="link">Link Button</a-button>
      </a-space>
    </a-config-provider>
  </div>
</template>
<script setup>
import { theme } from "ant-design-vue";
import { ref } from "vue";
const msg = "Hello World";
import style1 from "@/assets/style/config/style1.json";
import style2 from "@/assets/style/config/style2.json";
console.log(style1);
const style = ref(style1);
function clickHandler() {
  style.value = style2;
}
</script>

<style lang="less" scoped>
h1 {
  font-size: 2em;
  text-align: center;
  color: #42b983;
}
</style>
