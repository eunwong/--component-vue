<template>
  <a-textarea :value="value" v-bind="$attrs" @change="handleChange" />
</template>

<script setup>
const props = defineProps({
  value: {
    type: [String, Number],
  },
});
const emits = defineEmits(["change:value"]);
function handleChange(e) {
  emits("change:value", e.target.value);
}
</script>

<style></style>
