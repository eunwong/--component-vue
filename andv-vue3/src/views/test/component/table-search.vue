<template>
    <p-search-box
        v-model="currentValue"
        @handleReset="handleReset"
        @handleSearching="handleSearching"
    >
        <template #title>
            <!--<p-title :name="'任务筛选'"></p-title>-->
        </template>

        <template #search-item>
            <a-form-item label="项目">
                <a-select ref="select" v-model:value="currentValue.project" placeholder="请选择">
                    <a-select-option v-for="item in searchOptions.project" :value="item?.value">
                        {{ item?.name }}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="任务">
                <a-select ref="select" v-model:value="currentValue.task" placeholder="请选择">
                    <a-select-option v-for="item in searchOptions.task" :value="item?.value">
                        {{ item?.name }}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="测试平台">
                <a-select ref="select" v-model:value="currentValue.platform" placeholder="请选择">
                    <a-select-option v-for="item in searchOptions.platform" :value="item?.value">
                        {{ item?.name }}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="被测软件">
                <a-input v-model:value="currentValue.software" placeholder="请输入被测软件"></a-input>
            </a-form-item>
        </template>
        <!--更多的插槽-->
        <template #senior>
            <a-form-item label="测试版本">
                <a-select ref="select" v-model:value="currentValue.versions" placeholder="请选择">
                    <a-select-option v-for="item in searchOptions.testVersion" :value="item?.value">
                        {{ item?.name }}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="测试人">
                <a-input v-model:value="currentValue.tester" placeholder="请输入测试人"></a-input>
            </a-form-item>
            <a-form-item label="测试时间" class="double">
                <a-range-picker v-model:value="currentValue.date" picker="date" />
            </a-form-item>
        </template>
    </p-search-box>
</template>

<script lang="ts" setup>
import { PSearchBox } from 'avic-common';
import { reactive, ref, watch } from 'vue';
import PTitle from 'avic-common';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');

// 获取 props
const props = defineProps({
    formModel: {
        type: Object,
        default: () => {},
    },
    title: {
        type: String,
        default: '筛选',
    },
});

// 当前的搜索的对象
const currentValue: any = ref();
// 赋值 - 父组件传过来的值
currentValue.value = props.formModel;

const searchOptions: any = reactive({ project: [], task: [], platform: [], testVersion: [] });
searchOptions.project = [
    {
        name: '项目',
        value: 'project',
    },
    {
        name: '项目1',
        value: 'project1',
    },
    {
        name: '项目2',
        value: 'project2',
    },
];
searchOptions.task = [
    { value: 'task', name: '任务' },
    { value: 'task1', name: '任务1' },
    { value: 'task2', name: '任务2' },
];
searchOptions.platform = [
    { value: 'platform', name: '评测平台' },
    { value: 'platform1', name: '评测平台1' },
    { value: 'platform2', name: '评测平台2' },
];
searchOptions.testVersion = [
    { value: 'test', name: '测试集版本' },
    { value: 'test1', name: '测试集版本1' },
    { value: 'test2', name: '测试集版本2' },
];

//测试时间
const emits = defineEmits(['update:formModel']);
watch(
    currentValue,
    (val: any) => {
        emits('update:formModel', val);
    },
    { deep: true },
);

// 重置
function handleReset() {
    currentValue.value = {};
}

// 搜索
const handleSearching = () => {
    if (currentValue?.value?.date) {
        let time = currentValue.value?.date;
        //@ts-ignore
        currentValue.value.dateStart = time[0].$y + '-' + (time[0].$M + 1) + '-' + time[0].$D + ' 00:00:00';
        //@ts-ignore
        currentValue.value.dateEnd = time[1].$y + '-' + (time[1].$M + 1) + '-' + time[1].$D + ' 23:59:59';
    }
    console.log('筛选按钮', currentValue.value);
};
</script>
