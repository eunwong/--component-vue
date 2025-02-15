<template>
  <div>
    <a-cascader
      style="width: 100%"
      v-bind="$attrs"
      v-model:value="childSelectedValue"
      :options="options"
      @focus="handleFocus"
    />
  </div>
</template>
<script setup>
import { ref, useAttrs, computed, watch } from "vue";
import fetchMap from "@/components/NForm/util/requestData.js";
const attrs = useAttrs();
// const props = defineProps({
//   value: {},
// });
const emits = defineEmits(["update:value"]);
const options = ref([]);
const valueText = () => attrs.fieldNames?.value || "value";
const childSelectedValue = computed({
  get() {
    if (Array.isArray(attrs.value)) {
      let arr = attrs.value.map((item) => {
        return [item];
      });
      getTreeIds(options.value, arr);

      return arr;
    } else if (attrs.value) {
      let val = getTreeId(options.value, attrs.value);
      console.log("get1", val);

      return val;
    }
    return attrs.value;
  },
  set(val) {
    console.log("set", JSON.stringify(val));
    const arr = formatValue(val);
    emits("update:value", arr);
  },
});

formatSelectOptionsHandle('mounted');

function handleFocus(){
  formatSelectOptionsHandle('focus');
}

function formatSelectOptionsHandle(e) {
  const n = attrs._optionsConfig;
  if (n && n.api && (n.event || !n.event)) {
    if (
      (!n.event || n.event.includes(e)) &&
      (!attrs._link || attrs.form[attrs._link])
    ) {
      getOptionsDataPage(n.api, attrs);
    }
    return;
  }
}

function getOptionsDataPage(api, attr) {
  let param = attr.params || {};
  let p = attr.formParams || {};
  if (Array.isArray(p)) {
    p.forEach((item) => {
      param[item] = attrs.form[item];
    });
  }
  fetchMap[api]({...attrs.form })
    .then((list) => {
      options.value = list;
    })
    .catch((err) => {
      console.error(err);
    });
}

function getTreeIds(tree, val, parentId = "") {
  for (var i = 0; i < tree.length; i++) {
    tree[i].parentId = parentId;
    if (tree[i].children && tree[i].children.length > 0) {
      getTreeIds(tree[i].children, val, tree[i][valueText()]);
    }
    val.forEach((item) => {
      if (tree[i][valueText()] === item[0]) {
        const pVal = tree[i]["parentId"];
        if (pVal) {
          item.unshift(pVal);
        }
      }
    });
  }
}
function getTreeId(tree, id) {
  for (let i in tree) {
    if (tree[i][valueText()] == id) {
      return [tree[i][valueText()]];
    }
    if (tree[i].children) {
      let node = getTreeId(tree[i].children, id);
      if (node !== undefined) {
        // 追加父节点
        node.unshift(tree[i][valueText()]);
        return node;
      }
    }
  }
}
function formatValue(val) {
  let arr = undefined;
  if (val) {
    if (Array.isArray(val[0])) {
      arr = val.map((item) => item[item.length - 1]);
    } else {
      arr = val[val.length - 1];
    }
  }
  return arr;
}
</script>
