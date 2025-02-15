<template>
  <div>22</div>
  <a-cascader v-model:value="v" :options="options" />
</template>
<script setup>
import { ref, computed, useAttrs, watch } from "vue";
import fetchMap from "@/components/NForm/util/requestData.js";
const attrs = useAttrs();
const emits = defineEmits(["update:value"]);
const options = ref([
  {
    label: "2",
    value: "602133587264802816",
    children: [
      {
        label: "3",
        value: "602133989938958336",
      },
    ],
  },
]);

const valueText = () => attrs.fieldNames?.value || "value";
const labelText = () => attrs.fieldNames?.label || "label";
const v = ref([]);

// formatSelectOptionsHandle();

function formatSelectOptionsHandle() {
  const n = attrs._optionsConfig;
  if (n && n.api && (n.event || !n.event)) {
    if (
      (!n.event || n.event.includes("mounted")) &&
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
  fetchMap[api]({ ...param })
    .then((res) => {
      options.value = res;
      if (attrs._hasRoot) {
        options.value.unshift({
          [valueText()]: 0,
          [labelText()]: "顶级",
        });
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

watch(
  v,
  (newVal) => {
    console.log(newVal);
  },
  { immediate: true }
);

const childSelectedValue = computed({
  get() {
    console.log(attrs.value);
    if (Array.isArray(attrs.value)) {
      let arr = attrs.value.map((item) => {
        return [item];
      });
      getTreeIds(options.value, arr);
      return arr;
    } else if (attrs.value) {
      let val = getTreeId(options.value, attrs.value);
      return val;
    }
    return attrs.value;
  },
  set(val) {
    console.log("bbb", val);
    const arr = formatValue(val);
    emits("update:value", arr);
  },
});

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
</script>
