import axios from 'axios';
import { ElMessage } from 'element-plus';
import router from '../router'
import { useTokenStore } from '@/stores/token.js';
//定义一个变量,记录公共的前缀  ,  baseURL
const baseURL = '/api';
const instance = axios.create({baseURL})

// 添加请求拦截器
instance.interceptors.request.use(
    config => {
        const tokenStore = useTokenStore();
        const token = tokenStore.token;
        if (token) {
            config.headers['Authorization'] = `${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
//添加响应拦截器
instance.interceptors.response.use(
    result=>{
        if(result.data.code===1){
            return result.data;
        }
        ElMessage.error(result.data.msg?result.data.msg:'服务异常')
        return Promise.reject(result.data)
    },
    err=>{
        if (err.response.status === 401) {
            alert("请先登录！")
            router.push("/user/login");
        }else{
            ElMessage.error("服务异常")
        }
        return Promise.reject(err);//异步的状态转化成失败的状态
    }
);
export default instance;