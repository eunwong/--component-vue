<!-- <template>
  <a-select
    showSearch
    :loading="loading"
    class="w-full"
    v-model:value="value"
    v-bind="$attrs"
    @change="(val, data) => changeHandle(val, data, $attrs)"
    :filter-option="filterOption"
  >
    <template v-for="item in lovList.get(_optionsConfig?.lovCode)" :key="item.internalValue">
      <a-select-option v-if="!_optionsConfig.exclude?.includes(item.internalValue)" :value="item.internalValue" :text="item.externalValue">{{
        item.externalValue
      }}</a-select-option>
    </template>
  </a-select>
</template>
<script setup>
import { useLovStore } from '@/store/modules/lov';

const lovStore = useLovStore();
const { lovList } = storeToRefs(lovStore);
const emits = defineEmits(['update:value', 'change']);
const props = defineProps({
  _optionsConfig: {
    type: Object,
    default: () => ({}),
  },
  value: {
    type: [String, Number, Array],
    default: () => undefined,
  },
});
const value = computed({
  get: () => props.value,
  set: val => emits('update:value', val),
});

const loading = ref(false);
onMounted(async () => {
  if (!props._optionsConfig?.lovCode) {
    console.error('lovCode is required');
    return;
  }
  loading.value = true;
  try {
    await lovStore.GetLovByCode(props._optionsConfig?.lovCode);
  } finally {
    loading.value = false;
  }
});

function changeHandle(val, { data }, attr) {
  emits('change', val, data);
  if (attr.hasOwnProperty('_beLink')) {
    attr.form[attr._beLink] = undefined;
  }
  if (attr.hasOwnProperty('_padField')) {
    let obj = data.attrs.item;
    for (let i in attr._padField) {
      attr.form[i] = obj[attr._padField[i]];
    }
  }
}
const filterOption = (input, option) => {
  return option.text.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
</script> -->
