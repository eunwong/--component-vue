<template>
  <div class="n_table">
    <div class="table_content">
      <VxeTable
        ref="xTable"
        height="100%"
        :column-config="{ resizable: true }"
        v-bind="$attrs"
        auto-resize
        class="mytable-scrollbar"
        @checkbox-all="selectAllChangeEvent"
        @checkbox-change="selectChangeEvent"
      >
        <template v-for="item in sortColumns">
          <VxeColumn
            v-if="item.checked"
            v-bind="mapColumns[item.field]"
            :key="item.field"
          >
            <template
              v-for="(value, key, index) in filterSlot(item.field)"
              :key="key + index"
              #[getSlotScope(key)]="rowData"
            >
              <slot :name="key" v-bind="rowData"></slot>
            </template>
          </VxeColumn>
        </template>
      </VxeTable>
    </div>
    <div class="pagination" v-if="pagination">
      <a-pagination
        v-bind="{ ...defaultPagination, ...pagination }"
        @change="paginationChange"
        @showSizeChange="showSizeChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, useSlots, useAttrs, watch, computed } from "vue";
import { VXETable, VxeTable, VxeColumn } from "vxe-table";
import { VxeIcon, VxeLoading } from "vxe-pc-ui";
import "vxe-table/styles/cssvar.scss";
import zhCN from "vxe-pc-ui/lib/language/zh-CN";
VXETable.setI18n("zh-CN", zhCN);
VXETable.setLanguage("zh-CN");
VXETable.component(VxeIcon);
VXETable.component(VxeLoading);

// 导入主题变量，也可以重写主题变量
/**rowData:
 * row,//行数据
 * rowIndex,//行数
 * $rowIndex,//行数
 * column,//列的配置信息
 * columnIndex,//列数
 *  $columnIndex,//列数
 * _columnIndex,//列数
 */

const emit = defineEmits([
  "paging",
  "update:current",
  "update:pageSize",
  "checkboxAll",
  "checkboxChange",
]);
const xTable = ref(null);
const props = defineProps({
  // 表格列配置
  columns: {
    type: Array,
    default: () => [],
  },
  sortColumns: {
    type: Array,
    default: () => [],
  },
  pagination: {
    type: [Object, Boolean],
    default() {
      return {};
    },
  },
});

const mapColumns = computed(() => {
  return props.columns.reduce((res, item) => {
    if (item?.width && !item.fixedWidth) {
      item.minWidth = item.width / 2;
      item.maxWidth = item.width * 3;
    }
    res[item.field] = item;
    return res;
  }, {});
});

const attrs = useAttrs();

// const isTargetAvailable = ref(false);

function paginationChange(current, pageSize) {
  emit("paging", { current, pageSize });
}

function showSizeChange(e) {
  console.log(arguments);
}

// onMounted(() => {
//   isTargetAvailable.value = true;
// });

const defaultPagination = ref({
  current: 1,
  pageSize: 10,
  total: 0,
  showTotal: (total) => `共 ${total} 条`,
  showSizeChanger: true,
  showQuickJumper: true,
  pageSizeOptions: ["15", "30", "50", "100"],
});

function getSlotScope(key) {
  const arr = key.split("_");
  if (arr[1]) {
    return arr[1];
  }
  return "default";
}

const slots = useSlots() || {};

function filterSlot(field) {
  // 过滤掉不需要的插槽
  let need = {};
  for (let key in slots) {
    if (
      slots.hasOwnProperty(key) &&
      (field === key || key.startsWith(`${field}_`))
    ) {
      need[key] = slots[key];
    }
  }
  return need;
}

watch(
  () => attrs.checkboxConfig,
  (newVal) => {
    if (newVal && Array.isArray(newVal.checkRowKeys)) {
      checkboxCheckedRows(newVal.checkRowKeys);
    }
  },
  {
    deep: true,
  }
);
watch(
  () => attrs.radioConfig,
  (newVal) => {
    radioCheckedRows(newVal?.checkRowKey);
  },
  {
    deep: true,
  }
);

function checkboxCheckedRows(value = []) {
  let rows = attrs.data.filter((item) => {
    const key = attrs.rowConfig?.keyField || undefined;
    return value.includes(item[key]);
  });
  xTable.value.clearCheckboxRow();
  if (value.length) {
    xTable.value.setCheckboxRow(rows, true);
  }
}

function radioCheckedRows(value = "") {
  const key = attrs.rowConfig?.keyField || undefined;
  let rows = attrs.data.filter((item) => {
    return value.includes(item[key]);
  });
  rows = rows.pop();
  xTable.value.clearRadioRow();
  if (value) {
    xTable.value.setRadioRow(rows);
  }
}

function selectAllChangeEvent(e) {
  selectChangeEvent(
    {
      data: attrs.data,
      ...e,
    },
    true
  );
}

function selectChangeEvent(e, flag = false) {
  const { data, records } = e;
  const select = [];
  console.log(e);
  const key = attrs.rowConfig?.keyField || undefined;
  records.forEach((element) => {
    select.push((key && element[key]) || data.indexOf(element));
  });
  if (flag) {
    emit("checkboxAll", select, e);
  }
  emit("checkboxChange", select, e);
}
</script>

<style lang="less" scoped>
.vxe-table {
  --vxe-ui-font-color: #000;
  --vxe-ui-table-header-font-color: #000;
  --vxe-ui-table-column-padding-default: 10px 0;
  --vxe-ui-table-border-color: #f0f0f0;
  --vxe-ui-font-size-small: 14px;
  --vxe-ui-font-size-mini: 13px;
  --vxe-ui-font-size-medium: 15px;
}
.n_table {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  // gap: 10px;
  .table_content {
    flex-grow: 1;
    flex-shrink: 0;
    overflow: hidden;
    height: 0;
  }
  :deep(.vxe-table--border-line) {
    border-width: 0px;
  }
}

.pagination {
  padding: 10px;
  display: flex;
  flex-shrink: 0;
  // flex-basis: 0;
  // height: 40px;
  // overflow: hidden;
  justify-content: flex-end;
  //   .ant-pagination {
  //     margin-left: auto;
  //   }
}

::-webkit-scrollbar-button {
  display: none;
}
::-webkit-scrollbar {
  width: 8px !important;
  height: 8px !important;
}

::-webkit-scrollbar-track {
  border-radius: 8px !important;
  background: transparent !important;
}

::-webkit-scrollbar-thumb {
  border-radius: 8px !important;
  background: #ddd !important;
}

::-webkit-scrollbar-thumb:hover {
  background: #ccc !important;
}

::-webkit-scrollbar-thumb:active {
  background: #999 !important;
}
</style>
