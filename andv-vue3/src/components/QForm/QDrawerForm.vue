<template>
  <a-drawer
    :maskClosable="false"
    :visible="visible"
    :title="title"
    :width="width"
    @close="modalCancelEnevt"
  >
    <QForm ref="nform" v-bind="$attrs" :defaultSpan="24">
      <template v-for="(value, name) in slots" :key="item" #[name]="slotData">
        <slot :name="name" v-bind="slotData"></slot>
      </template>
    </QForm>
    <template #footer>
      <a-button key="back" @click="modalCancelEnevt"> 取 消</a-button>
      <a-button
        key="submit"
        type="primary"
        :loading="loading"
        @click="onSubmitHandler"
        >确 定
      </a-button>
    </template>
  </a-drawer>
</template>
<script setup>
import { ref, reactive, onMounted, useSlots ,watch} from "vue";
import QForm from "./QForm.vue";

const slots = useSlots();
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "表单",
  },
  width: {
    type: [String, Number],
    default: 520,
  },
  tableLoading: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(["update:visible", "submit", "cancel"]);
const nform = ref(null);
const loading = ref(false);
let dbTimer=null;
watch(
 ()=>props.tableLoading,
 val=>{
  if(!val){
    loading.value = false;
    if(dbTimer){
      clearTimeout(dbTimer);
      if(dbTimer !== 'wq'){
        setTimeout(() => {
          dbTimer =null;
        }, 200);
      }
      dbTimer = 'wq';
      return;
    }
    dbTimer = setTimeout(() => {
      modalCancelEnevt();
      dbTimer = null;
    }, 200);
  }
 }
);
function onSubmitHandler() {
  loading.value = true;
  nform.value.onSubmit(
    (res) => {
      emits("submit", res, () => {
        loading.value = false;
      });
    },
    (err) => {
      loading.value = false;
    }
  );
}

function modalCancelEnevt() {
  emits("update:visible", false);
  emits("cancel");
}
</script>
