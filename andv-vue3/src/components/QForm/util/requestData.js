// import {post} from "@/utils/request/hwrequest";
// import {postCust} from "@/utils/request/request";
//
// export default {
//     factoryModelTree: async () => {
//         const res = await postCust("/library/factoryModel/findTree", {
//             params: {
//                 isNeedTotal: true,
//                 sorts: [
//                     {
//                         sort: "DESC",
//                         orderBy: "createTime",
//                     },
//                 ],
//             },
//         });
//         const tree = [
//             {
//                 id: "601775288216457216",
//                 modelName: "北京能科瑞元数字技术有限公司",
//                 children: res.list,
//             },
//         ];
//         return tree;
//     },
//     displayStoreTree: async (params) => {
//         console.log(params);
//         const template = {
//             "joiner": "and",
//             "conditions": [
//                 {
//                     conditionName: "id",
//                     conditionValues: [],
//                     proxyField:'storeId',
//                     ignoreStr: false,
//                     operator: "like",
//                 },
//             ]
//         };
//         const filter = searchParams(template,params);
//         const {list = []} = await postCust("/warehouseDef/findTree", {
//             "params": {
//                 "isNeedTotal": true,
//                 "filter": filter,
//                 "sorts": [
//                     {
//                         "sort": "DESC",
//                         "orderBy": "createTime"
//                     }
//                 ]
//             }
//         });
//         return list;
//     },
// };
//
//
// function filterFactories(obj, searchForm = {}) {
//     if (Array.isArray(obj.conditions)) {
//         for (let i = 0; i < obj.conditions.length; i++) {
//             let item = obj.conditions[i];
//             if (item.conditions) {
//                 filterFactories(item, searchForm);
//             } else {
//                 let value =
//                     searchForm[item.proxyField] || searchForm[item.conditionName];
//                 if (value) {
//                     item.conditionValues = [value];
//                     delete item.proxyField;
//                 } else {
//                     obj.conditions.splice(i, 1);
//                     i--;
//                 }
//             }
//         }
//     }
// }
//
// function searchParams(filterTemplate = {}, searchForm = {}) {
//     const template = JSON.parse(JSON.stringify(filterTemplate));
//     filterFactories(template, searchForm);
//     return template;
// }
