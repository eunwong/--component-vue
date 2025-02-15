import axios  from './axios';
import apis from '@/api/api';

type axiosParamsType = (url: string) => { method: string; formData?: boolean };

type RecursiveObject<T> = T extends string ? never : T extends object ? T : never;

type APIValues<TModel> = {
    [Key in keyof TModel]: TModel[Key] extends RecursiveObject<TModel[Key]>
        ? APIValues<TModel[Key]>
        : <T = any, U = any>(param?: T, options?: any) => Promise<U>;
};

const getAxiosParams: axiosParamsType = (url: string) => {
    if (/^post/.test(url)) {
        // post
        return { method: 'post' };
    } else if (/^form/.test(url)) {
        // json
        return { method: 'post', formData: true };
    } else {
        return { method: 'get' }; // get
    }
};

const getAjax = (urlkey: string, url: string) => {
    const axiosParams = getAxiosParams(urlkey);
    return (data: any) =>
        axios.request({
            url: import.meta.env.VITE_APP_URL + url,
            data,
            ...axiosParams,
        });
};

const loop = (api: any) => {
    const result: any = {};
    Object.keys(api).forEach((key: string) => {
        if (typeof api[key] !== 'object') {
            result[key] = getAjax(key, api[key]);
        } else {
            result[key] = loop(api[key]);
        }
    });
    return result;
};

const ajax = loop(apis);

export default ajax as APIValues<typeof apis>;
