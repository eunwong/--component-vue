// src/hooks/useTable.js
import { ref, reactive, nextTick } from "vue";

/**
 * 
 * @param {*} requestFun 
 * @param {*} paramTemplate 
 * @param {*} options  {immediate: false// 是否立即请求
 * 
 * }
 * @returns 
 */

export function useTable(requestFun, paramTemplate, options) {
  const defaultOptions = {
    immediate: false, // 是否立即请求,
  };
  const opts = deepMerge(defaultOptions, options);
  const data = ref([{}]);
  const loading = ref(false);
  let searchParams = {};
  const pagination = reactive({
    current: 1,
    pageSize: 15,
    total: 0,
  });

  function fetchTable() {
    loading.value = true;
    const params = formatParams(paramTemplate, {
      pageSize: pagination.pageSize,
      pageNo: pagination.current,
      searchParams,
    });
    requestFun(params)
      .then(({ data: res }) => {
        data.value = res?.data&&[{}];
        pagination.total = res?.total;
      })
      .finally(() => {
        loading.value = false;
      });
  }
  function pagingLoad(config) {
    const { current, pageSize } = config;
    pagination.current = current;
    pagination.pageSize = pageSize;
    fetchTable();
  }

  function stopLoad() {
    loading.value = true;
    nextTick(()=>{
      loading.value= false;
      nextTick(()=>{
        loading.value = true;
        nextTick(()=>{
          loading.value = false;
        })
      })
    })
  }

  function searchLoad(params) {
    searchParams = params;
    pagingLoad({ current: 1, pageSize: pagination.pageSize });
  }

  function deepMerge(...objects) {
    const result = {};
    for (const obj of objects) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === "object" && obj[key] !== null) {
            // 如果值是对象，则递归合并
            result[key] = deepMerge(result[key] || {}, obj[key]);
          } else {
            // 如果值不是对象，直接赋值
            result[key] = obj[key];
          }
        }
      }
    }
    return result;
  }
  if (!opts.immediate) {
    fetchTable();
  }

  function formatParams(paramTemplate, paramsObj) {
    const template = JSON.parse(JSON.stringify(paramTemplate));
    function traverseObject(obj, callback) {
      if (Array.isArray(obj)) {
        obj.forEach((item, index) => {
          if (typeof item === "object" && item !== null) {
            traverseObject(item, callback);
          } else {
            callback(obj, index, item);
          }
        });
      } else {
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            if (typeof value === "object" && value !== null) {
              traverseObject(value, callback);
            } else {
              callback(obj, key, value);
            }
          }
        }
      }
    }

    traverseObject(template, (obj, key, value) => {
      if (typeof value === "string") {
        let match = value.match(/^\$\{(\w+)\}/);
        if (match && paramsObj[match[1]]) {
          obj[key] = paramsObj[match[1]];
          return;
        }
        match = value.match(/^\#\{(\w+)\}/);
        if (match) {
          if (Array.isArray(obj)) {
            obj.splice(key, 1);
            obj.push(...paramsObj[match[1]]);
          } else if (typeof obj === "object" && obj !== null) {
            delete obj[key];
            Object.assign(obj, paramsObj[match[1]]);
          }
        }
      }
    });
    return template; // 返回处理后的对象
  }

  return {
    data,
    loading,
    pagination,
    pagingLoad,
    searchLoad,
    fetchTable,
    stopLoad,
  };
}
