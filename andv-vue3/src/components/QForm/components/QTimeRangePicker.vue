<template>
  <a-time-range-picker
    style="width: 100%"
    :value="value"
    v-bind="$attrs"
    @change="(val) => onChange(val, $attrs._formFields)"
  />
</template>
<!-- :disabled-time="disabledRangeTime" -->

<script setup>
const emits = defineEmits(["change:value"]);
const props = defineProps({
  value: {
    type: Array,
  },
  form: {
    type: Object,
    required: true,
  },
});
function onChange(val, formFields = []) {
  formFields.forEach((item, index) => {
    props.form[item] = val && val[index];
  });
  emits("change:value", val);
}

function range(start, end) {
  const result = [];

  for (let i = start; i < end; i++) {
    result.push(i);
  }

  return result;
}

const disabledRangeTime = (_, type) => {
  console.log(_);
  if (type === "start") {
    return {
      disabledHours: () => range(0, 60).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56],
    };
  }
  return {
    disabledHours: () => range(0, 60).splice(20, 4),
    disabledMinutes: () => range(0, 31),
    disabledSeconds: () => [55, 56],
  };
};
</script>

<style></style>
