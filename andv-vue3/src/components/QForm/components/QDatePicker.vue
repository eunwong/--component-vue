<template>
  <a-date-picker class="w-full" :value="value" v-bind="$attrs" :disabled-date="disabledDate" @change="onChange" />
</template>

<script setup>
import moment from 'moment';
const emits = defineEmits(['change:value']);
const props = defineProps({
  value: {
    type: String,
  },
});
function onChange(date) {
  console.log(date);
  emits('change:value', date);
}
const attrs = useAttrs();
function disabledDate(val) {
  const svalue = val.valueOf();
  let flag = false;
  let start = 0;
  let end = Infinity;
  if (attrs._start) {
    if (typeof attrs._start === 'string' && attrs.form[attrs._start]) {
      const a = moment(attrs.form[attrs._start], 'YYYY-MM-DD');
      start = a.valueOf();
    } else if (attrs._start.$L) {
      start = attrs._start.valueOf();
    }
  }
  if (attrs._end) {
    if (typeof attrs._end === 'string' && attrs.form[attrs._end]) {
      const a = moment(attrs.form[attrs._end], 'YYYY-MM-DD');
      end = a.valueOf();
    } else if (attrs._end.$L) {
      end = attrs._end.valueOf();
    }
  }
  if (svalue < start || end < svalue) {
    flag = true;
  }
  return flag;
}
</script>

<style></style>
