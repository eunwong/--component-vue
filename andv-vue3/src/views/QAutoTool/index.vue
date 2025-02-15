<template>
  <div class="buttons">
    <a-space>
      <a-button type="primary" @click="addRow">新增行</a-button>
      <a-button type="primary" @click="open = true">设计</a-button>
    </a-space>
  </div>
  <div>
    <a-table :data-source="config">
      <a-table-column key="title" title="字段名">
        <template #default="{ record }">
          <a-input
            class="inputStyle"
            v-model:value="record.title"
            placeholder="请输入字段名"
          ></a-input>
        </template>
      </a-table-column>
      <a-table-column key="field" title="字段">
        <template #default="{ record }">
          <a-input
            class="inputStyle"
            v-model:value="record.field"
            placeholder="请输入字段"
          ></a-input>
        </template>
      </a-table-column>
      <a-table-column key="scope" title="作用域">
        <template #default="{ record }">
          <a-select
            class="inputStyle"
            v-model:value="record.scope"
            mode="tags"
            style="width: 100%"
            placeholder="选择作用域"
            @change="handleChange"
          >
            <a-select-option
              v-for="(item, index) in options"
              :value="index"
              :key="index"
              >{{ item }}</a-select-option
            >
          </a-select>
        </template>
      </a-table-column>
    </a-table>
  </div>
  <a-drawer height="96%" placement="bottom" :open="open" @close="onClose">
    <template #closeIcon></template>
    <template #title>
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane v-for="(item, index) in options" :key="index" :tab="item">
        </a-tab-pane>
      </a-tabs>
    </template>
    <div></div>
  </a-drawer>
</template>
<script setup>
import { ref } from "vue";
const open = ref(false);
const activeKey = ref("table");
const onClose = () => {
  open.value = false;
};
const options = ref({
  table: "表格",
  add: "新增",
  edit: "编辑",
  search: "查询",
});

function addRow() {
  config.value.push({
    title: "",
    field: "",
    scope: [],
  });
}
const handleChange = (value) => {
  console.log(value[value.length - 1]);
};

const columns = [
  {
    title: "字段名",
    dataIndex: "title",
  },
  {
    title: "字段",
    dataIndex: "field",
  },
  {
    title: "作用域",
    dataIndex: "scope",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
  },
  {
    title: "Action",
    key: "action",
  },
];
const config = ref([
  {
    title: "姓名",
    field: "name",
    scope: [],
  },
]);
</script>
<style lang="less" scoped>
.ant-tabs {
  margin-bottom: -17px;
  :deep(.ant-tabs-nav) {
    margin-bottom: 0px;
  }
}
.inputStyle {
  margin: -6px 0;
}
</style>
