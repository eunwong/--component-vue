<template>
  <div class="tableContainer">
    <div
      class="tableGroup"
      ref="tableGroup"
      :class="{ fullScreen: fullScreen }"
    >
      <div class="searchArea">
        <slot name="searchArea">
          <QSearchForm :build="config">
            <template
              v-for="(value, name) in slotScoped['slotsS']"
              :key="item"
              #[value.slotName]="slotData"
            >
              <slot :name="name" v-bind="slotData"></slot>
            </template>
          </QSearchForm>
        </slot>
      </div>
       <div class="handleArea">
        <div class="operation" @click="toolsHandlerProxyHanler">
          <a-space>
            <slot name="handleArea" ></slot>
          </a-space>
        </div>
        <div class="tableSetting">
          <ReloadOutlined v-if="refresh" />
          <a-popover v-if="propsDesity" trigger="click" placement="bottom">
            <template #content>
              <div class="density-content">
                <p
                  v-for="item in densityData"
                  :key="item.value"
                  :class="tableSize === item.value ? 'desity-active' : ''"
                  @click="handleDensity(item.value)"
                >
                  {{ item.name }}
                </p>
              </div>
            </template>
            <ColumnHeightOutlined />
          </a-popover>

          <a-popover
            v-if="setting"
            class="line-set"
            title="自定义列表项"
            trigger="click"
            v-model:open="popoverVisible"
          >
            <template #content>
              <CustomColumns
                :columns="tableColumns"
                v-if="true"
                @update="updateColumnsHandler"
              />
            </template>
            <SettingOutlined />
          </a-popover>
          <template v-if="full">
            <FullscreenExitOutlined
              v-if="fullScreen"
              @click="fullScreenHandler"
            />
            <FullscreenOutlined v-else @click="fullScreenHandler" />
          </template>
        </div>
      </div> 
      <div class="tableArea">
        <slot name="tableArea">
          <QTable
            :columns="tableColumns"
            v-bind="tableData"
            :sortColumns="sortColumns"
            :size="tableSize"
            @paging="(e) => emits('paging', e)"
          >
            <template
              v-for="(value, name) in slotScoped['slotsT']"
              :key="item"
              #[value.slotName]="slotData"
            >
              <slot :name="name" v-bind="slotData"></slot>
            </template>
          </QTable>
        </slot>
      </div>
    </div>
  </div>
</template>
<script setup>
import QSearchForm from "@/components/QForm/QSearchForm.vue";
import QDrawerForm from "@/components/QForm/QDrawerForm.vue";
import QTable from "@/components/QTable/QTable.vue";
import CustomColumns from "./unit/CustomColumns.vue";
import {
  computed,
  nextTick,
  onMounted,
  reactive,
  ref,
  useSlots,
  watch,
} from "vue";
import {
  SettingOutlined,
  HolderOutlined,
  ReloadOutlined,
  ColumnHeightOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
} from "@ant-design/icons-vue";

const emits = defineEmits(["paging"]);
const tableGroup = ref(null);
const props = defineProps({
  config: {
    type: Array,
    default: () => [],
  },
  tableData: {
    type: Object,
    default: () => {},
  },
  //显示表格刷新
  refresh: {
    type: Boolean,
    default: true,
  },
  //显示表格紧凑宽松
  propsDesity: {
    type: Boolean,
    default: true,
  },
  //表格列设置
  setting: {
    type: Boolean,
    default: true,
  },
  //表格全屏
  full: {
    type: Boolean,
    default: true,
  },
});

const popoverVisible = ref(true);
onMounted(() => {
  popoverVisible.value = false;
});
const sortColumns = ref([]);
const updateColumnsHandler = (columns) => {
  sortColumns.value = columns;
};

const tableColumns = computed(() => {
  return props.config.filter((item) => {
    return item.scope.includes("t");
  });
});
const fullScreen = ref(false);
const handleDensity = (value) => {
  tableSize.value = value;
};

const slots = useSlots();
const slotScoped = reactive({
  slotsT: {},
  slotsS: {},
  slotsF: {},
});
watch(
  () => slots,
  (val) => {
    for (let key in val) {
      const keys = key.split("-");
      const slotName = keys.pop();
      keys.forEach((scoped) => {
        val[key].slotName = slotName;
        slotScoped["slots" + scoped][key] = val[key];
      });
    }
  },
  {
    immediate: true,
    deep: true,
  }
);

//表格紧凑度
const densityData = ref([
  { name: "宽松", value: "medium" },
  { name: "中等", value: "small" },
  { name: "紧凑", value: "mini" },
]);
const tableSize = ref("small");

function toolsHandlerProxyHanler(e) {
  /**
   * dom绑定数据
   * type:[form,del]
   *
   */

  const dataTarget = e.target.closest(".ant-btn");
  console.log(dataTarget);
}

function fullScreenHandler() {
  const first = tableGroup.value.getBoundingClientRect();
  fullScreen.value = !fullScreen.value;
  nextTick(() => {
    const last = tableGroup.value.getBoundingClientRect();
    const dx = first.x - last.x;
    const dy = first.y - last.y;
    const dw = first.width / last.width;
    const dh = first.height / last.height;
    tableGroup.value.animate(
      [
        {
          transformOrigin: "top left",
          transform: `translate(${dx}px,${dy}px) scale(${dw},${dh})`,
        },
        {
          transformOrigin: "top left",
          transform: "none",
        },
      ],
      {
        duration: 300,
        easing: "cubic-bezier(.075,.82,.165,1)",
      }
    );
  });
}
</script>
<style lang="less" scoped>
.tableContainer {
  width: 100%;
  height: 100%;
}
.tableGroup.fullScreen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
}
.tableGroup {
  width: 100%;
  height: 100%;
  display: flex;
  padding: 20px;
  flex-direction: column;
  .tableArea {
    flex-grow: 1;
    height: 0;
    flex-basis: 0;
    flex-shrink: 0;
  }
}
.handleArea {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  .tableSetting {
    :deep(.ant-popover-inner-content) {
      padding: 10px 6px;
    }
    .anticon {
      width: 16px;
      height: 16px;
      line-height: 16px;
      font-size: 14px;
      margin-left: 10px;
      cursor: pointer;
      color: #666666;
    }
    .anticon:hover {
      font-size: 16px;
      color: #333333;
    }
  }
}
.sortLine {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.ant-popover {
  .ant-popover-title {
    min-width: 140px;
  }

  .ant-popover-inner-content {
  }
}
.density-content {
  margin: -8px -12px;
  p {
    height: 32px;
    line-height: 32px;
    margin: 0;
    padding: 0 16px;
    cursor: pointer;
    &:nth-child(1) {
      font-size: 15px;
    }
    &:nth-child(2) {
      font-size: 14px;
    }
    &:nth-child(3) {
      font-size: 13px;
    }
  }
  p:hover {
    background: #f2f4f7;
  }
  .desity-active {
    background: #e8f0ff;
  }
}
</style>
