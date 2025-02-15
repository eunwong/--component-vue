<template>
  <a-range-picker
    style="width: 100%"
    :value="value"
    v-bind="$attrs"
    :disabled-date="disabledDate"
    @change="onChange"
  />
</template>

<script setup>
import moment from "moment";

const emits = defineEmits(["change:value"]);
function onChange(val) {
  emits("change:value", val);
}
/*export default {
  name: "NDate", // Avoid using this. See https://codegeex.cn 这里的名字叫做 DatePicker 让你
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    value: "",
  },
  methods: {
    onChange(date) {
      this.$emit("change", date);
    },
    disabledDate(val) {
      const attr = this.$attrs;
      const svalue = val.valueOf();
      let flag = false;
      let start = 0;
      let end = Infinity;
      if (attr._start) {
        if (typeof attr._start === "string" && attr._form[attr._start]) {
          const a = moment(attr._form[attr._start], "YYYY-MM-DD");
          start = a.valueOf();
        } else if (attr._start.$L) {
          start = attr._start.valueOf();
        }
      }
      if (attr._end) {
        if (typeof attr._end === "string" && attr._form[attr._end]) {
          const a = moment(attr._form[attr._end], "YYYY-MM-DD");
          end = a.valueOf();
        } else if (attr._end.$L) {
          end = attr._end.valueOf();
        }
      }
      if (svalue < start || end < svalue) {
        flag = true;
      }
      return flag;
    },
  },
};*/
</script>

<style></style>
