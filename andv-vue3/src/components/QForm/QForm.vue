<template>
  <a-form
    :model="formData"
    v-bind="{ ...defaultformModelAttr, ...formModelAttr }"
    name="nest-messages"
    ref="formRef"
  >
    <a-row :gutter="24">
      <template v-for="opt in buildData" :key="opt.field">
        <a-col v-bind="formatElementAttr(opt.colAttr)">
          <template v-if="slots[`${opt.field}_formItem`]">
            <slot
              :name="`${opt.field}_formItem`"
              :form="formData"
              :field="opt.field"
              :config="opt"
              :use="use"
            ></slot>
          </template>
          <QFormItem
            v-else
            :form="formData"
            :config="opt"
            :field="opt.field"
            :use="use"
          >
            <template v-if="slots[opt.field]" #[opt.field]="record">
              <slot :name="opt.field" v-bind="record"></slot>
            </template>
          </QFormItem>
        </a-col>
      </template>
      <slot name="searchBtnSlot"></slot>
    </a-row>
  </a-form>
</template>
<script setup>
import { useSlots, ref, reactive, markRaw, watch } from "vue";
import QFormItem from "./QFormItem.vue";
import { deepClone } from "./util/utils.js";

const props = defineProps({
  formModelAttr: {
    type: Object,
    default() {
      return {};
    },
  },
  build: {
    type: Array,
    required: true,
  },
  form: {
    type: Object,
    default() {
      return {};
    },
  },
  use: {
    type: String,
    default: "a",
  },
  defaultSpan: {
    type: Number,
    default: 8,
  },
});
const emits = defineEmits(["update:form"]);
const formRef = ref(null);

const defaultformModelAttr = reactive({
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
});

const slots = useSlots() || reactive({});

function formatElementAttr(attr = {}) {
  const defaultAttr = {
    span: 8,
    span_s: 6,
  };
  const attrs = deepClone({ ...defaultAttr, ...attr });
  for (let key in attrs) {
    const keys = key.split("_");
    if (keys.length === 2 && keys[1] === props.use) {
      attrs[keys[0]] = attrs[key];
      delete attrs[key];
    }
  }
  return attrs;
}

function cpmputSpanAttrEnevt(attr = {}) {
  if (attr.hasOwnProperty(`span_${props.use}`)) {
    return attr[`span_${props.use}`];
  }
  if (props.use === "s") {
    return 6;
  }
  if (!attr || !attr.span) {
    return props.defaultSpan;
  }
  return attr.span;
}

const formData = ref({});
const buildData = markRaw([]);

watch(
  [() => props.use, () => props.form],
  () => {
    dialogOpenedEvent();
  },
  {
    immediate: true,
  }
);

function dialogOpenedEvent() {
  let paramsCache = {};
  const config = props.build.filter((item) => {
    paramsCache[item.field] = undefined;
    return item.scope && item.scope.includes(props.use);
  });
  buildData.splice(0, buildData.length, ...config);
  const form = JSON.parse(JSON.stringify(props.form || {}));
  paramsCache = { ...paramsCache, ...form };
  formData.value = paramsCache;
}

function onSubmit() {
  return new Promise((resolve, reject) => {
    formRef.value
      .validate()
      .then(() => {
        resolve(JSON.parse(JSON.stringify(formData.value)));
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function onSubmitSync(callback, failCallback) {
  formRef.value
    .validate()
    .then(() => {
      callback(JSON.parse(JSON.stringify(formData.value)));
    })
    .catch((err) => {
      failCallback(err);
    });
}

function resetForm() {
  formRef.value.resetFields();
}

defineExpose({ onSubmit, resetForm, onSubmitSync });
</script>
