<template>
  <!-- <a-input @change="handleChange" /> -->
  <a-select
      style="width: 100%"
      v-bind="$attrs"
      :value="value"
      showSearch
      @focus="focusHandle()"
      @change="(val, data) => changeHandle(val, data)"
      @search="(val) => searchHandle(val)"
      @popupScroll="(e) => popupScrollHandle(e)"
  >
    <a-select-option
        v-for="(item, index) in options"
        :key="index"
        :label="item._text_"
        :item="item"
        :value="item._value_"
    >{{ item._text_ }}
    </a-select-option>
  </a-select>
</template>
<script setup>
import {postCust} from "@/utils/request/request";
import {get, post} from "@/utils/request/hwrequest";
import {ref, useAttrs, watch} from "vue";

const emits = defineEmits(["update:value", "onChange"]);
const attrs = useAttrs();
const options = ref([]);
const props = defineProps({
  value: "",
});
const postMap = {
  post: post,
  postCust: postCust,
  get: get
}
const pageConfig = {
  pageSize: 10,
  pageNo: 1,
  isOver: false,
}
initOptionList();


function initOptionList() {
  let event = attrs._optionsConfig?.event || ['mounted'];
  if (event.includes('mounted')) {
    requestEnumerationFun();
  }
}

function requestEnumerationFun(filter = {}) {

  const config = attrs._optionsConfig || {};
  let reqFun = config.post || 'post';
  postMap[reqFun](`${config.url}/${pageConfig.pageSize}/${pageConfig.pageNo}`, {
    params: {
      isNeedTotal: true,
      filter,
      sorts: [
        {
          sort: "DESC",
          orderBy: "createTime",
        },
      ],
    },
  }).then(({data = []}) => {
    if (pageConfig.pageNo == 1) {
      options.value = [];
    }
    let dt = computedSelectOption(
        data,
        attrs._optionsConfig?.optionValue || "alias",
        attrs._optionsConfig?.optionText || "name"
    );
    options.value = [...options.value, ...dt];
    if (dt.length < pageConfig.pageSize) {
      pageConfig.isOver = true;
    }
  })
}

function computedSelectOption(data, value = "value", text = "text") {
  if (Array.isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      let val = "";
      let txt = "";
      if (value.includes("{{")) {
        val = render(value, data[i]);
      }
      if (text.includes("{{")) {
        txt = render(text, data[i]);
      }
      data[i]._value_ = val || data[i][value];
      data[i]._text_ = txt || data[i][text];
    }
    return data;
  }
  return []
}

function render(template, person) {
  let reg = /{{(.*?)}}/g;
  let res = template.replace(reg, (item, key) => {
    return person[key];
  });
  return res;
}

// watch(
//   () => attrs.form,
//   () => {
//     if (attrs._watched) {
//       return;
//     }
//     clearTimeout(timer1);
//     timer1 = setTimeout(() => {
//       formatSelectOptionsHandle1(this.$attrs);
//     }, 100);
//   }
// );
function focusHandle() {
}

function changeHandle(val, data) {
  emits("update:value", val);
  emits("onChange", val, data);
  if (attrs.hasOwnProperty("_beLink")) {
    attrs.form[attrs._beLink] = undefined;
  }
  if (attrs.hasOwnProperty("_padField")) {
    let obj = data.item;
    console.log(obj);
    for (let i in attrs._padField) {
      console.log(i);
      attrs.form[i] = obj[attrs._padField[i]];
    }
  }
}

function searchHandle() {
}

function popupScrollHandle() {
  if (pageConfig.isOver) {
    return;
  }
  pageConfig.pageNo++;
  requestEnumerationFun();
}
</script>
