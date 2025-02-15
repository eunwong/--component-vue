<template>
  <div
    v-draggable="[
      columnsConfig,
      {
        animation: 150,
        ghostClass: 'ghost',
      },
    ]"
  >
    <template v-for="(item, index) in columnsConfig" :key="'aaa' + index">
      <p class="sortLine">
        <a-checkbox v-model:checked="item.checked" />
        <holder-outlined style="margin: 0 1px 0 2px" />
        {{ item.title }}
      </p>
    </template>
  </div>
</template>
<script setup>
import { HolderOutlined } from "@ant-design/icons-vue";
import { ref, watch } from "vue";
import { vDraggable } from "vue-draggable-plus";
import { useRoute } from "vue-router";
const props = defineProps({
  columns: {
    type: Array,
    default: () => [],
  },
  tableKey: {
    type: String,
    default: "",
  },
});
const route = useRoute();
const localStorageKey = getKey();
function getKey() {
  useRoute();
  let url = route.path;
  //   let user = JSON.parse(localStorage.getItem("userInfo")) || {};
  let userId = "aa";
  return `columns_${userId}${url}${props.tableKey}`;
}
const columnsConfig = ref([]);
const emit = defineEmits(["update"]);
watch(
  () => props.columns,
  (newVal) => {
    formatColumns();
  },
  { immediate: true }
);

watch(
  () => columnsConfig.value,
  (newVal) => {
    emit("update", newVal);
    localStorage.setItem(localStorageKey, JSON.stringify(newVal));
  },
  { deep: true, immediate: true }
);

function formatColumns() {
  const columnsCfg = localStorage.getItem(localStorageKey);
  const { sortedA, updatedB } = synchronizeArrays(
    props.columns,
    JSON.parse(columnsCfg || "[]")
  );
  columnsConfig.value = updatedB;
}

function synchronizeArrays(A, B) {
  // 创建一个Map来存储A数组中的元素，field，值为对象
  const mapA = new Map(A.map((item) => [item.field, item]));

  // 初始化一个新的A数组，用于存放排序后的元素
  const newA = [];

  // 初始化新的B数组，用于存放更新后的B数组
  const newB = [];

  // 遍历B数组
  for (const item of B) {
    if (mapA.has(item.field)) {
      // 如果A数组中有B数组中的元素，则将该元素加入新的A和B数组
      newA.push(mapA.get(item.field));
      newB.push(item);
      // 将该元素从Map中删除，以便后续处理剩余的元素
      mapA.delete(item.field);
    }
  }

  // 将A数组中剩余的元素添加到新的A和B数组的末尾
  for (const remainingItem of mapA.values()) {
    newA.push(remainingItem);
    newB.push({
      checked: true,
      title: remainingItem.title,
      field: remainingItem.field,
    });
  }

  // 返回更新后的A和B数组
  return { sortedA: newA, updatedB: newB };
}
</script>

<style lang="less" scoped></style>
