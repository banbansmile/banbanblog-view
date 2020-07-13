import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


let service = axios.create({
    baseURL: 'http://www.banbansmile.com/',
    //baseURL: 'http://127.0.0.1:8066',
    timeout: 30000,
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
})

service.defaults.withCredentials = true

service.interceptors.request.use(
    config => {
        NProgress.start()

        let token = localStorage.getItem('banbanblogtoken')
        if (token) {
            config.headers['token'] = token
        }

        return config
    },
    error => {
        NProgress.error()
        console.log(error)
        Promise.reject(error)
    }
)


service.interceptors.response.use(
    response => {
        NProgress.done();
        const res = response.data;
        return res
    },
    error => {
        NProgress.done()

        window.location = "#/login";

        return Promise.reject(error)
    }
)


export default service