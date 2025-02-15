<template>
  <a-input-number style="width: 100%" :value="value" v-bind="$attrs" @change="handleChange" />
</template>

<script setup>
const props = defineProps({
  value: {
    type:Number,
  },
});
const emits = defineEmits(["change:value"]);
function handleChange(e) {
  emits("change:value", e);
}
</script>

<style></style>
