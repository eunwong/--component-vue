<template>
  <div style="padding: 50px 80px 30px 40px; width: 100vw; height: 100vh">
    <BaseTableCURD
      :config="config1"
      :data="data"
      :tableData="{
        loading,
        data,
        pagination,
      }"
      @submit="formSubmit"
      @paging="pagingLoad"
      @search="searchLoad"
    >
      <template #handleArea>
        <!-- data-action:from:打开form表单 
                         data-from:form表达配置字段标识符

                         dels:'删除选择行'
                     
        -->

        <a-button data-action="from" data-from="a" type="primary" @click="addHandler">新增</a-button>
        <a-button data-action="dels" data-from="a" type="primary" @click="editHandler">删除</a-button>
      </template>
      <template #T-HANDLER="{ row, rowIndex }"> 
        <a-button data-action="from" data-from="e" type="link" @click="addHandler">修改</a-button>
        <a-button data-action="del"  type="link" @click="editHandler">删除</a-button>
      </template>
    </BaseTableCURD>
  </div>
   <QDrawerForm v-bind="DrawerConfig" v-model:visible="DrawerConfig.visible"  :tableLoading="loading" >
    <!-- <template #yl0belongProject_formItem>
      <div>formitem</div>
    </template> -->
    <template #yl0belongProject>
      <div>input</div>
    </template>
   </QDrawerForm>
</template>
<script setup>
import BaseTableCURD from "@/components/QTable/BaseTableCURD.vue";
import { config } from "./config.js";
import { reactive, ref } from "vue";
import { Yl0CustomQueryAgent } from "@/api/index.js";
import { useTable } from "./useTable.js";
import { useForm } from "./useForm.js";
const config1 = ref(config());
const DrawerConfig = reactive({
  title: "新增",
  visible: false,
  width: 800,
  build:config1,
  use: "a",
});

const { data, loading, pagination, pagingLoad, searchLoad } = useTable(
  Yl0CustomQueryAgent,
  {
    className: "Yl0BranchFactoryStatisticRate",
    queryArgs: {
      attrSet: ["*"],
      condition: [
        { key: "yl0factory", compare: "like" },
        { key: "yl0equCode", compare: "like" },
        { key: "yl0equName", compare: "like" },
        { key: "yl0year", compare: "eq" },
        { key: "yl0monthly", compare: "eq" },
        { key: "yl0daily", compare: "eq" },
        { key: "yl0belongProject", compare: "eq" },
      ],
      page: { pageSize: "${pageSize}", pageNo: "${pageNo}" },
      sort: { sortBy: "createAt", sortOrder: "desc" },
    },
  }
);
const { formSubmit } = useForm(pagingLoad);

function addHandler(){
  DrawerConfig.visible = true;
  DrawerConfig.use = "add";
  DrawerConfig.title = "新增";
}
function editHandler(){
  DrawerConfig.visible = true;
  DrawerConfig.use = "e";
  DrawerConfig.title = "编辑";
}

</script>
<style lang="less" scoped></style>

<!-- const exampleObj = {
  className: "Yl0BranchFactoryStatisticRate",
  queryArgs: {
      condition: [
          { key: "yl0factory", value: "#{searchValue}" },
          { key: "yl0equCode", compare: "like" },
          { key: "yl0equName", compare: "like" },
          "#{searchParams}",
      ],
      page: { pageSize: "${pageSize}", pageNo: "${pageNo}" },
      sort: { sortBy: "createAt", sortOrder: "desc" },
  },
};

const aaa = {
  searchValue: { value: "YL003", compare: "like" },
  searchParams: [
      { key: "yl0year", value: "2024", compare: "eq" },
      { key: "yl0monthly", value: "07", compare: "eq" },
      { key: "yl0daily", compare: "eq" },
      { key: "yl0belongProject", compare: "eq" },
  ],
  pageNo: 1,
  pageSize: 15,
}; 


{
  "className": "Yl0BranchFactoryStatisticRate",
  "queryArgs": {
    "condition": [
      {"key": "yl0factory","value": "YL003","compare": "like"},
      {"key": "yl0equCode","compare": "like"},
      {"key": "yl0equName","compare": "like"},
      {"key": "yl0year","value": "2024","compare": "eq"},
      {"key": "yl0monthly","value": "07","compare": "eq"},
      {"key": "yl0daily", "compare": "eq"},
      {"key": "yl0belongProject","compare": "eq"}
    ],
    "page": {"pageSize": 15,"pageNo": 1
    },
    "sort": {"sortBy": "createAt", "sortOrder": "desc"
    }
  }
}
-->
