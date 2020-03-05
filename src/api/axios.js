import axios from "axios"
import router from "@/router/index.js"
import store from "@/store/index.js"
import { Toast } from 'vant';
/** 
 * 提示函数 
 * 显示2秒后关闭
 */
const tip = msg => {
    Toast({
        message: msg,
        duration: 1000
    })
};

/** 
 * 请求失败后的错误统一处理 
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
    // 状态码判断
    switch (status) {
        case 404:
            Toast('请求的资源不存在！');
            break;
        case 500:
            Toast('服务器错误！');
            break;
        default:
            console.log(other);
    }
};

// 创建axios实例
var instance = axios.create({
    timeout: 300000,
    baseURL: process.env.VUE_APP_BASEPORT
});
// 设置post请求头
// instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
instance.defaults.headers.post['Content-Type'] = 'application/json';

// http request 拦截器
instance.interceptors.request.use(
    config => {
    },
    error => {
        return Promise.reject(error)
    }
);

// http response 拦截器
instance.interceptors.response.use(
    // 请求成功
    res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
    error => {
        const {
            response
        } = error;
        if (response) {
            // 请求已发出，但是不在2xx的范围 
            errorHandle(response.status, response.data.message);
        } else {
            // 处理断网的情况
            // eg:请求超时或断网时，更新state的network状态
            // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
            if (!window.navigator.onLine) {
                Toast('网络错误！');
            } else {

            }
            return Promise.reject(error);
        }
    }
);
export default instance;