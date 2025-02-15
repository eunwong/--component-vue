// api.js
import axios from "axios";

// 创建 Axios 实例
const api = axios.create({
  baseURL: "https://lzos-pub.cloud.rysaas.cn", // 替换为你的 API 基础路径
  timeout: 10000, // 请求超时时间
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么，例如添加 token
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.token = `5b3e67405599447ebd935d4e6563f2c7`;
    }
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      // 处理不同状态码的错误
      switch (error.response.status) {
        case 401:
          // 未授权，跳转到登录页面
          console.log("未授权，跳转到登录页面");
          break;
        case 403:
          // 权限不足
          console.log("权限不足");
          break;
        case 500:
          // 服务器错误
          console.log("服务器错误");
          break;
        default:
          break;
      }
    }
    return Promise.reject(error);
  }
);

// GET 请求
export const get = async (url, params = {}) => {
  try {
    return await api.get(url, { params });
  } catch (error) {
    console.error(`GET ${url} Error:`, error);
    throw error;
  }
};

// POST 请求（FormData 参数）
export const postForm = async (url, formData) => {
  try {
    return await api.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.error(`POST ${url} (FormData) Error:`, error);
    throw error;
  }
};

// POST 请求（JSON 参数）
export const postJSON = async (url, jsonData) => {
  try {
    return await api.post(url, jsonData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(`POST ${url} (JSON) Error:`, error);
    throw error;
  }
};

export default api;
