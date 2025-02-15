export function deepClone(value, map = new WeakMap()) {
  // 处理日期类型
  if (value instanceof Date) {
    return new Date(value);
  }
  // 处理正则表达式
  if (value instanceof RegExp) {
    return new RegExp(value);
  }
  // 处理错误对象
  if (value instanceof Error) {
    const error = new Error(value.message);
    error.stack = value.stack;
    return error;
  }
  // 处理Set
  if (value instanceof Set) {
    return new Set(Array.from(value).map((x) => deepClone(x, map)));
  }
  // 处理Map
  if (value instanceof Map) {
    return new Map(
      Array.from(value, ([key, val]) => [key, deepClone(val, map)])
    );
  }
  // 处理ArrayBuffer, Blob, File, ImageData
  if (value instanceof ArrayBuffer) {
    const bufferClone = value.slice(0);
    return bufferClone;
  }
  if (value instanceof Blob) {
    return new Blob([value], { type: value.type });
  }
  if (value instanceof File) {
    return new File([value], value.name, {
      type: value.type,
      lastModified: value.lastModified,
    });
  }
  if (value instanceof ImageData) {
    return new ImageData(value.data.slice(0), value.width, value.height);
  }
  // 处理函数和对象
  if (typeof value === "function" || value instanceof Object) {
    if (map.has(value)) {
      return map.get(value);
    }
    const isArr = Array.isArray(value);
    const clone = isArr ? [] : {};
    map.set(value, clone);
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        clone[key] = deepClone(value[key], map);
      }
    }
    return clone;
  }
  // 基本类型直接返回
  return value;
}
