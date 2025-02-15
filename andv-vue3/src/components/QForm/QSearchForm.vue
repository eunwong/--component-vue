<template>
  <div class="searchBar">
    <QForm
      class="ant-form-content"
      :class="{ maxHeight: showMore }"
      ref="nformRef"
      v-bind="$attrs"
      use="s"
      :formModelAttr="formModelAttr"
    >
      <template v-for="(value, name) in slots" #[name]="slotData">
        <slot :name="name" v-bind="slotData"></slot>
      </template>
      <template #searchBtnSlot v-if="showSearchBtn">
        <a-form-item class="btnArea" ref="btnArea">
          <a-space>
            <a-button :size="buttonSize" type="primary" @click="onSubmitHandler"
              >搜索</a-button
            >
            <a-button :size="buttonSize" @click="cancelFormHandler"
              >重置</a-button
            >
            <a-button
              v-show="showMoreBtn"
              type="link"
              @click="showMore = !showMore"
              >展开<DownOutlined />
            </a-button>
          </a-space>
        </a-form-item>
      </template>
    </QForm>
  </div>
</template>
<script setup>
import QForm from "./QForm.vue";
import { DownOutlined } from "@ant-design/icons-vue";
import {
  ref,
  useAttrs,
  watch,
  onActivated,
  h,
  useSlots,
  onMounted,
  onUnmounted,
  nextTick,
} from "vue";
const slots = useSlots();
const emits = defineEmits(["search"]);
const props = defineProps({
  filterTemplate: {
    type: Array,
    default: () => [],
  },
  showSearchBtn: {
    type: Boolean,
    default: true,
  },
  buttonSize: {
    type: String,
    default: "middle",
  },
});
const formModelAttr = ref({
  labelCol: { span: "" },
  wrapperCol: { span: "" },
});
const nformRef = ref(null);
const btnArea = ref(null);
const attrs = useAttrs();

watch(
  () => attrs.form,
  (val = {}) => {
    if (Object.keys(val).length) {
      setTimeout(() => {
        cancelFormHandler();
      }, 0);
    }
  },
  { immediate: true }
);

// function filterFactories(obj, searchForm = {}) {
//   if (Array.isArray(obj.conditions)) {
//     for (let i = 0; i < obj.conditions.length; i++) {
//       let item = obj.conditions[i];
//       if (item.conditions) {
//         filterFactories(item, searchForm);
//       } else {
//         let value =
//             searchForm[item.proxyField] || searchForm[item.conditionName];
//         if (value) {
//           item.conditionValues = [value];
//           delete item.proxyField;
//         } else {
//           obj.conditions.splice(i, 1);
//           i--;
//         }
//       }
//     }
//   }
// }

// function searchParams(filterTemplate = {}, searchForm = {}) {
//   const template = JSON.parse(JSON.stringify(filterTemplate));
//   filterFactories(template, searchForm);
//   return template;
// }

function filterFactories(template, searchForm = {}) {
  for (let i = 0; i < template.length; i++) {
    let item = template[i];
    let value = searchForm[item.proxyField] || searchForm[item.key];
    if (value) {
      item.value = value;
      delete item.proxyField;
    } else if (
      item.value === null ||
      item.value === undefined ||
      item.value === ""
    ) {
      template.splice(i, 1);
      i--;
    }
  }
}

function isElementOutOfParent(element, parent) {
  const elementRect = element.getBoundingClientRect();
  const parentRect = parent.getBoundingClientRect();
  return parentRect.top + 10 >= elementRect.top;
}

// onMounted(() => {
//   let parent = nformRef.value.$el.children[0];
//   let children = parent.children;
//   parent.insertBefore(btnArea.value.$el, children[2]);
//   console.log(
//     "isElementOutOfParent",
//     isElementOutOfParent(btnArea.value.$el, nformRef.value.$el)
//   );
// });

let domFormRef = null;
let domParent = null;
let domChildrent = null;
let domBtnArea = null;
let resizeObserver = null;
let sizeTimer = null;
const showMoreBtn = ref(false);
const showMore = ref(false);
const handleWidthChange = (entries) => {
  for (let entry of entries) {
    if (!sizeTimer) {
      sizeTimer = setTimeout(() => {
        positionBtnArea(true);
        sizeTimer = null;
      }, 100);
    }
  }
};

onMounted(() => {
  domFormRef = nformRef.value.$el;
  domParent = domFormRef.children[0];
  domChildrent = parent.children;
  domBtnArea = btnArea.value.$el;
  positionBtnArea(true);
  if (domParent) {
    resizeObserver = new ResizeObserver(handleWidthChange);
    resizeObserver.observe(domParent);
  }
});

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.unobserve(domParent);
    resizeObserver.disconnect();
  }
});

function positionBtnArea(first = false) {
  if (first) {
    showMoreBtn.value = false;
    domParent.appendChild(domBtnArea);
  } else {
    showMoreBtn.value = true;
    const index = Array.from(domParent.children).indexOf(domBtnArea);
    if (index > -1) {
      domParent.insertBefore(domBtnArea, domParent.children[index - 1]);
    }
  }
  nextTick(() => {
    if (isElementOutOfParent(domBtnArea, domFormRef)) {
      return;
    }
    positionBtnArea();
  });
}

function searchParams(filterTemplate = [], searchForm = {}) {
  const template = JSON.parse(JSON.stringify(filterTemplate));
  filterFactories(template, searchForm);
  return template;
}

function onSubmitHandler() {
  nformRef.value.onSubmitSync((res) => {
    let form = JSON.parse(JSON.stringify(attrs.form || {}));
    form = { ...form, ...res };
    if (props.filterTemplate.length) {
      form = searchParams(props.filterTemplate, form);
    }
    emits("search", form);
  });
}

function cancelFormHandler() {
  if (nformRef.value && nformRef.value) {
    nformRef.value.resetForm();
  }
  let form = attrs.form || {};
  if (props.filterTemplate.length) {
    form = searchParams(props.filterTemplate, { ...form });
  }
  emits("search", form);
}
</script>

<style lang="less" scoped>
.searchBar {
  width: 100%;
  background: #f7f9fc;
  border-radius: 2px;
  overflow: hidden;
  padding: 12px 16px 0;
  margin-bottom: 10px;
  border-radius: 4px;
  .ant-form-item {
    border-width: 0px !important;
    background: transparent !important;
  }

  :deep(.ant-form-item) {
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    margin-bottom: 12px;
    background: #fff;
    .ant-form-item-label {
      text-align: right;
      //width: 100px;
      padding-left: 10px;
      max-width: 130px;
      border-right: none;
      //隐藏标题的:
      //> label::after {
      //    content: '';
      //}
    }
    .ant-input {
      border-width: 0px;
    }
  }
}
.btnArea {
  margin-left: auto;
  margin-right: 4px;
}
.ant-form-content {
  max-height: 46px;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  .anticon-down {
    transition: all 0.3s ease-in-out;
    transform: rotate(0deg);
  }
  &.maxHeight {
    max-height: 80vh;
    .anticon-down {
      transform: rotate(180deg);
    }
  }
}
</style>
