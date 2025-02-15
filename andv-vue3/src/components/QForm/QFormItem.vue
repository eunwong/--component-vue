<template>
  <a-form-item
    :label="config['title']"
    v-bind="config['formItemAttr']"
    :name="field"
    :rules="computedRules(config['formItemAttr'])"
  >
    <template v-if="slots[field]">
      <slot
        :name="field"
        :form="form"
        :field="field"
        :config="{
          ...config['inputAttr'],
          disabled: computedDisabled(config['inputAttr'], form),
        }"
      ></slot>
    </template>
    <component
      v-else
      :is="componentsMap[config['inputType'] || QInput]"
      v-model:value="form[field]"
      v-bind="config['inputAttr']"
      :form="form"
      :disabled="computedDisabled(config['inputAttr'], form)"
      :placeholder="computedPlaceholder(config)"
    ></component>
  </a-form-item>
</template>
<script setup>
import { ref, useSlots, markRaw } from "vue";
import QInput from "./components/QInput.vue";
import QRangePicker from "./components/QRangePicker.vue";
import QTimeRangePicker from "./components/QTimeRangePicker.vue";
import QSwitch from "./components/QSwitch.vue";
// import QSelectLOV from "./components/QSelectLOV.vue";
import QTextarea from "./components/QTextarea.vue";
import QInputNumber from "./components/QInputNumber.vue";
import QDatePicker from "./components/QDatePicker.vue";
import QSelectFetch from "./components/QSelectFetch.vue";

const slots = useSlots();
const props = defineProps({
  config: {
    type: Object,
    required: true,
  },
  form: {
    type: Object,
    required: true,
  },
  field: {
    type: String,
    required: true,
  },
  use: {
    type: String,
    required: true,
  },
});
const componentsMap = markRaw({
  qInput: QInput,
  qRangePicker: QRangePicker,
  qTimeRange: QTimeRangePicker,
  qSwitch: QSwitch,
  // nSelectLOV: QSelectLOV,
  qNumber: QInputNumber,
  qDate: QDatePicker,
  qSelectFetch: QSelectFetch,
  qTextarea: QTextarea,
});

function computedPlaceholder(opt) {
  if (opt["inputAttr"] && opt["inputAttr"]["placeholder"]) {
    return opt["inputAttr"]["placeholder"];
  }
  if (["nTimeRangePicker"].includes(opt["inputType"])) {
    return [`开始${opt.title || "时间"}`, `结束${opt.title || "时间"}`];
  }
  let tip = "请输入";
  if (["nSelect", "nDate", "nTimeRangePicker"].includes(opt["inputType"])) {
    tip = "请选择";
  }
  return `${tip}${opt["title"]}`;
}

function computedDisabled(opt = {}, form) {
  if (opt.hasOwnProperty(`disabled_${props.use}`)) {
    return opt[`disabled_${props.use}`];
  }
  if (opt._link && !form[opt._link]) {
    return true;
  }
  if (props.use === "s") {
    return false;
  }
  return opt.disabled || false;
}

function computedRules(opt = {}) {
  if (props.use === "s") {
    return [];
  }
  for (let i in opt.rules) {
    if (opt.rules[i].hasOwnProperty("customValidation")) {
      let f = opt.rules[i].customValidation(this.form);
      delete opt.rules[i].customValidation;
      opt.rules[i].validator = f;
    }
  }
  return opt.rules;
}
</script>
