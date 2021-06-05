import axios from "axios";
import {
    // Form,
    Message,
    // MessageBox
} from "element-ui";
import {
    getToken
} from '@/utils/auth'
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
    // var me = this;
    // 创建axios实例
    // var baseURL = window.ipconfig.ipAddr;
const service = axios.create({
    baseURL: process.env.BASE_API == 'http://82.156.212.43:5000', // api的base_url
    timeout: 150000, // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
    (config) => {
        var token = getToken();
        if (token) {
            config.headers['Authorization'] = token; // 让每个请求携带自定义token 请根据实际情况自行修改
        }
        return config;
    },
    (error) => {
        console.log(error); // for debug
        Promise.reject(error);
    }
);

// respone拦截器
service.interceptors.response.use(
    (response) => {
        if (
            response.config &&
            response.config.url &&
            response.config.url.endsWith("logout")
        ) {
            return response.data;
        }
        const res = response.data;
        if (res.code !== 200) {
            //code为非200是抛错 可结合自己业务进行修改
            Message({
                message: res.message,
                type: "error",
                duration: 3 * 1000,
            });
            return response;
            // return Promise.reject(res)
        } else {
            return response.data;
        }
    },
    (error) => {
        console.log("err" + error); // for debug
        Message({
            message: error.message,
            type: "error",
            duration: 3 * 1000,
        });
        return Promise.reject(error);
    }
);

export default service;