<!-- test -> 表格2-->
<template>
    <div class="table-tree">
        <p-table-tree :tree-data="treeData" @selectedKeys="selectedKeys"></p-table-tree>
        <p-table
            :columns="columns2.data"
            :func="getList"
            table-id="table02"
            :checkbox="true"
            @selectCheckboxs="selectCheckboxs"
        >
            <!-- 搜索组件-->
            <template #search>
                <table-search v-model:formModel="form"></table-search>
            </template>

            <template #opts>
                <a-button type="primary" @click="handleAdd">新增</a-button>
                <a-button @click="handleDels"> 批量删除</a-button>
            </template>

            <!--自定义操作-->
            <template #handle="scope">
                <div class="table-btn">
                    <a-button @click="handleLook(scope.value)"> 查看</a-button>
                    <a-button type="primary" @click="handleEdit(scope.value)"> 编辑</a-button>
                    <a-button type="primary" ghost @click="handleAuthoriz(scope.value)">
                        <i class="iconfont icon-31shezhi"> </i> 租户授权
                    </a-button>
                    <a-button v-if="!scope.value.status" type="primary" @click="handleAudit(scope.value)">
                        审核
                    </a-button>
                    <a-button v-if="scope.value.status" @click="handleAudited(scope.value)"> 已审核</a-button>

                    <a-popconfirm
                        title="确定删除此条数据吗?"
                        ok-text="确定"
                        cancel-text="取消"
                        @confirm="handleDel(scope.value)"
                        @cancel="cancelDel"
                    >
                        <a-button type="primary" danger> 删除</a-button>
                    </a-popconfirm>
                </div>
            </template>
        </p-table>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, onMounted } from 'vue';
import TableSearch from '@/views/test/component/table-search.vue';
import { PTable, PTableTree } from 'avic-common';
import { Modal, message } from 'ant-design-vue';
import ajax from '@/api/ajax';

let form = ref({});

const columns2 = reactive({
    data: [
        {
            title: '租户编码2',
            dataIndex: 'id',
            ellipsis: true,
            width: 200,
        },
        {
            title: '租户名称2',
            dataIndex: 'name',
            ellipsis: true,
            width: 200,
        },
        {
            title: '来源2',
            dataIndex: 'originPlain',
        },
        {
            title: '创建时间2',
            dataIndex: 'createdDate',
        },
        {
            title: '租户管理员',
            dataIndex: 'adminName',
            ellipsis: true,
        },
        {
            title: '管理员电话',
            dataIndex: 'mobile',
            ellipsis: true,
        },
        {
            title: '操作',
            dataIndex: 'handle',
            width: 420,
            fixed: 'right',
        },
    ],
});

onMounted(() => {
    getTreeData();
});

const getList = async ({ pageNumber, pageSize }: any) => {
    // let params = {
    //     pageNumber: pageNumber || 1,
    //     pageSize: pageSize || 10,
    //     ...form.value,
    // };
    // const res: any = await ajax.fetch.testList(params);
    // if (res?.success) {
    //     return res.data;
    // }
    const data = {
        page: 1,
        total: 10,
        totalPage: 10,
        records: 98,
        rows: [
            {
                id: '915316192611139585',
                name: 'aaa',
                fullName: '猪八戒第二个公司',
                type: 2,
                createdDate: '2023-10-27 16:20:52',
                adminName: '猪八戒',
                realName: '猪八戒',
                adminUid: '915315467776688128',
                mobile: '15204641041',
                status: 2,
                originPlain: 'supplier',
                originPlainDesc: '供应商端',
            },
            {
                id: '915219130531971073',
                name: '中航金网-QC',
                fullName: 'AVIC INTL - Violet Test',
                type: 2,
                createdDate: '2023-10-27 09:55:10',
                adminName: '猪猪',
                realName: '猪猪',
                adminUid: '915215569223942144',
                mobile: '13287654321',
                status: 2,
                originPlain: 'supplier',
                originPlainDesc: '供应商端',
            },
            {
                id: '914974187372675072',
                name: '中航金网009900',
                fullName: null,
                type: 4,
                createdDate: '2023-10-26 17:41:51',
                adminName: '厦门',
                realName: '厦门',
                adminUid: '914974187418812416',
                mobile: '15688990767',
                status: 2,
                originPlain: 'oper',
                originPlainDesc: '运营端',
            },
            {
                id: '914973266987188224',
                name: 'adasdads',
                fullName: null,
                type: 3,
                createdDate: '2023-10-26 17:38:12',
                adminName: '天天',
                realName: '天天',
                adminUid: '914973268358725632',
                mobile: '17899675432',
                status: 2,
                originPlain: 'oper',
                originPlainDesc: '运营端',
            },
            {
                id: '914972191211126784',
                name: 'qwwqwqqqqqqqqq',
                fullName: null,
                type: 3,
                createdDate: '2023-10-26 17:33:55',
                adminName: '市东北部',
                realName: '市东北部',
                adminUid: '914972191374704640',
                mobile: '18977897890',
                status: 2,
                originPlain: 'oper',
                originPlainDesc: '运营端',
            },
            {
                id: '914968972070223873',
                name: '中航金网-QC',
                fullName: 'AVIC INTL - Violet Test',
                type: 2,
                createdDate: '2023-10-26 17:21:08',
                adminName: 'VioletZhu',
                realName: 'VioletZhu',
                adminUid: '914968182261809152',
                mobile: '13187654321',
                status: 2,
                originPlain: 'supplier',
                originPlainDesc: '供应商端',
            },
            {
                id: '914960359243120641',
                name: '中航金网-QC',
                fullName: 'AVIC INTL - Violet Test',
                type: 2,
                createdDate: '2023-10-26 16:46:54',
                adminName: '猪猪',
                realName: '猪猪',
                adminUid: '914929363630161920',
                mobile: '13087654321',
                status: 2,
                originPlain: 'supplier',
                originPlainDesc: '供应商端',
            },
            {
                id: '914576491507875840',
                name: '验收测试',
                fullName: null,
                type: 1,
                createdDate: '2023-10-25 15:21:33',
                adminName: 'vv',
                realName: 'vv',
                adminUid: '914576491541430272',
                mobile: '15204641022',
                status: 2,
                originPlain: 'oper',
                originPlainDesc: '运营端',
            },
            {
                id: '914564288906002432',
                name: '等等',
                fullName: null,
                type: 1,
                createdDate: '2023-10-25 14:33:04',
                adminName: 'ff',
                realName: 'ff',
                adminUid: '914564288956334080',
                mobile: '15204641023',
                status: 2,
                originPlain: 'oper',
                originPlainDesc: '运营端',
            },
            {
                id: '914521863852392448',
                name: '猪八戒第三公司',
                fullName: null,
                type: 1,
                createdDate: '2023-10-25 11:44:29',
                adminName: '小河',
                realName: '小河',
                adminUid: '914521865106489344',
                mobile: '15700980076',
                status: 2,
                originPlain: 'oper',
                originPlainDesc: '运营端',
            },
        ],
    };
    const res = { data: data };
    return res.data;
};

//tree
const treeData = ref();
const getTreeData = async () => {
    // let params = {
    // };
    // const res: any = await ajax.fetch.treeData(params);
    // if (res?.success) {
    //     return res.data;
    // }
    treeData.value = [
        {
            title: '公司名称',
            key: '0-0',
            children: [
                {
                    title: 'parent 0-0',
                    key: '0-0-0',
                    children: [
                        {
                            title: 'leaf',
                            key: '0-0-0-0',
                        },
                        {
                            title: 'leaf',
                            key: '0-0-0-1',
                        },
                        {
                            title: 'leaf',
                            key: '0-0-0-2',
                        },
                    ],
                },
                {
                    title: 'parent 0-1',
                    key: '0-0-1',
                    children: [
                        {
                            title: 'leaf',
                            key: '0-0-1-0',
                        },
                    ],
                },
                {
                    title: 'parent 0-2',
                    key: '0-0-2',
                    children: [
                        {
                            title: 'leaf',
                            key: '0-0-2-0',
                        },
                        {
                            title: 'leaf',
                            key: '0-0-2-1',
                        },
                    ],
                },
            ],
        },
        {
            title: '公司名称',
            key: '1-0',
            children: [
                {
                    title: 'parent 1-0',
                    key: '1-0-0',
                    children: [
                        {
                            title: 'leaf',
                            key: '1-0-0-0',
                        },
                        {
                            title: 'leaf',
                            key: '1-0-0-1',
                        },
                        {
                            title: 'leaf',
                            key: '1-0-0-2',
                        },
                    ],
                },
                {
                    title: 'parent 1-1',
                    key: '1-0-1',
                    children: [
                        {
                            title: 'leaf',
                            key: '1-0-1-0',
                        },
                    ],
                },
                {
                    title: 'parent 1-2',
                    key: '1-0-2',
                    children: [
                        {
                            title: 'leaf',
                            key: '1-0-2-0',
                            children: [
                                {
                                    title: 'leaf',
                                    key: '1-0-2-0-0',
                                },
                                {
                                    title: 'leaf',
                                    key: '1-0-2-1-1',
                                },
                            ],
                        },
                        {
                            title: 'leaf',
                            key: '1-0-2-1',
                        },
                    ],
                },
            ],
        },
    ];
};
const emitsSelectedKeys = ref();
const selectedKeys = (value: any) => {
    console.log('搜索值', value);
    emitsSelectedKeys.value = value;
};

//二级页
//新增
const handleAdd = () => {};
//查看
const handleLook = (row: any) => {
    console.log('查看', row);
};
//编辑
const handleEdit = (row: any) => {
    console.log('编辑', row);
};
//授权
const handleAuthoriz = (row: any) => {
    console.log('授权', row);
};
//审核
const handleAudit = (row: any) => {
    console.log('审核', row);
};
//已审核
const handleAudited = (row: any) => {
    console.log('已审核', row);
};
// 删除
const handleDel = (row: any) => {
    console.log('删除', row);
};
//行取消删除
const cancelDel = () => {
    console.log('行取消删除');
};
//指量删除
const handleDels = (row: any) => {
    if (!selectedData.value?.rowKeys?.length) return message.error('请选择要删除的数据');
    Modal.confirm({
        title: '批量删除',
        icon: '',
        content: '确定要删除选中的数据吗？',
        onOk() {
            console.log('删除的数据', selectedData.value?.rowKeys);
            message.success('删除成功');
        },
        onCancel() {
            message.info('已取消删除');
        },
    });
};

//多选框
const selectedData: any = ref({});
const selectCheckboxs = (val: object) => {
    selectedData.value = val;
};
</script>
<style lang="less" scoped>
.table-tree {
    display: flex;
    justify-content: left;
    width: 100%;
    margin-top: 10px;
    .p-table {
        flex: 1;
        width: 100%;
    }
    :deep(.ant-tree) {
        margin-top: 24px;
        .ant-tree-title {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .ant-tree-node-content-wrapper.ant-tree-node-selected {
            background-color: var(--ant-primary-1);
        }
    }
}
</style>
