import axios  from './axios';

const apis = {
    user: {
        postLogout: '/api/sys/logout',
        userInfo: '/api/sys/user/info',
    },
    fetch: {
        testList: '/oper-api/config/institutions/fetch',
        formFetch: '/oper-api/config/institutions/fetch',
    },
};

//特殊接口  - 例 接口域名和项目域名不同
// 上传图片 - 公用接口
export const pupload = (params: any, onProcess: any) => {
    return axios.request({
        url: import.meta.env.VITE_APP_URL + '/oper-api/oss/upload',
        method: 'post',
        // @ts-ignore
        formData: true,
        data: params,
        onUploadProgress(progressEvent: any) {
            onProcess && onProcess(progressEvent.progress * 100);
        },
    });
};

export default apis;
