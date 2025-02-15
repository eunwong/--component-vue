import axios from 'axios';
import { useAxiosStore } from '@/store/axios';
import { message } from 'ant-design-vue';
import router from '../router';
import useLoading from '@/hooks/useLoading';
import * as utils from '@/ts/utils';

const loading = useLoading();

//默认兜底配置
// axios.defaults.baseURL = import.meta.env.VITE_APP_URL;
axios.defaults.baseURL = '';
axios.defaults.timeout = 60000;
axios.defaults.withCredentials = true;
// @ts-ignore
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// request拦截器
axios.interceptors.request.use(
    (config: any) => {
        loading.startLoading();
        // const axiosStore = useAxiosStore();
        // const token = `Bearer ${axiosStore.getToken}`;
        // config.headers['Authorization'] = token || '';
        // config.headers['Access-Control-Allow-Origin'] = '*';

        if (config.formData) {
            // config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            config.headers['Content-Type'] = 'multipart/form-data';
        }
        if (config.method === 'post' || config.method === 'delete') {
        } else {
            config.params = config.data;
        }

        return config;
    },
    (error: any) => {
        console.log(error);
        return Promise.reject(error);
    },
);

// 响应拦截器
axios.interceptors.response.use(
    (res): any => {
        loading.endLoading();
        let msg = '';
        // 未设置状态码则默认成功状态
        const code = res?.data?.code;
        if (+code === 0) {
            return Promise.resolve(res.data);
        } else {
            // @ts-ignore
            msg = res?.data?.message;
            message.error(msg);
            return Promise.resolve(res.data);
        }
    },
    (error: any) => {
        loading.endLoading();
        console.log(error);
        // @ts-ignore
        const msg = obj[error?.response?.status] || '网络存在问题，请稍后重试';
        const code = error.response?.status;
        if (+code === 401 || +code === 1401) {
            utils.login();
        } else {
            message.error(msg);
        }
    },
);

const obj = {
    401: '认证失败，无法访问系统资源',
    403: '当前操作没有权限',
    404: '访问资源不存在',
};

export default axios;
