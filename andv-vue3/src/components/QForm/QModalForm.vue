<template>
  <a-modal
    :maskClosable="false"
    :visible="visible"
    :title="title"
    :width="1200"
    @cancel="modalCancelEnevt"
  >
    <QForm ref="nformRef" v-bind="$attrs">
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
        >确 定</a-button
      >
    </template>
  </a-modal>
</template>
<script setup>
import { ref, reactive, onMounted, useSlots } from "vue";
import QForm from "./QForm.vue";
import { watch } from "less";
const slots = useSlots();
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  tableLoading: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "表单",
  },
  formModelAttr: {
    type: Object,
    default: () => {},
  },
});
const emits = defineEmits(["update:visible", "submit", "cancel"]);
const nformRef = ref(null);
const loading = ref(false);

watch(props.tableLoading, (val) => {
  if (!val) {
    loading.value = false;
  }
});

function onSubmitHandler() {
  loading.value = true;
  nformRef.value.onSubmitSync(
    (res) => {
      emits("submit", res, () => {
        loading.value = false;
      });
    },
    (err) => {
      console.log(err);
      loading.value = false;
    }
  );
}
function modalCancelEnevt() {
  nformRef.value.resetForm();
  emits("update:visible", false);
  emits("cancel");
}
</script>
