import axios from "axios";

const request = axios.create({
	baseURL: 'http://localhost:8081', 
    timeout: 5000
})

// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    let user=localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):{}//获取登录时存放的user对象信息
    config.headers['token'] =user.token // 设置请求头
  
    if(config.url === '/user/register') {
        // 如果url为/user/register则移除 token header
        delete config.headers['token'];
    } else {
        // 添加 token header
        config.headers['token'] = localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")).token : '';
    }
    return config
}, error => {
    console.log(error)
    return Promise.reject(error)
});

// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
    response => {
        let res = response.data;
        // 如果是返回的文件
        if (response.config.responseType === 'blob') {
            return res
        }
        // 兼容服务端返回的字符串数据
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }
        return res;
    },
    error => {
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)

export default request
