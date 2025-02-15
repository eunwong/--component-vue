<template>
  <a-switch v-model:checked="ivalue" v-bind="$attrs" />
</template>

<script setup>
import { computed } from "vue";
const emits = defineEmits(["update:value"]);
const props = defineProps({
  value: {
    type: [String, Number, Boolean],
  },
});

let ivalue = computed({
  get() {
    return props.value;
  },
  set(value) {
    emits("update:value", value);
  },
});
</script>

<style></style>
