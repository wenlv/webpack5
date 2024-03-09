import axios from 'axios';

if (process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = 'http://localhost:9000';
} else if (process.env.NODE_ENV === 'production') {
    axios.defaults.baseURL = 'http://localhost:9000';
}

axios.create({
    timeout: 30000, // 30s
    headers: {
        get: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            //
        },
        post: {
            'Content-Type': 'application/json;charset=utf-8',
            //
        },
    },
});
//
axios.interceptors.request.use(
    (config) => config,
    (error) => Promise.error(error),
);
//
axios.interceptors.response.use((response) => {
    // 200
    console.log("response------axios");
    console.log(response);
    //
    if (response.status === 200) {
        // if (response.data.code === 511) {
        //     //
        // } else if (response.data.code === 510) {
        //     //
        // } else {
        //     return Promise.resolve(response);
        // }
        return Promise.resolve(response);
    }
    return Promise.reject(response)
}, (error) => {
    console.log("err------axios");
    if (error?.response?.status) {
        //
        //
        return Promise.reject(error.response)
    }
    return Promise.reject(error);
});
// get
export default function httpGet({
    url,
    params = {},
}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params,
        }).then((res) => {
            console.log("res---get");
            console.log(res);
            resolve(res.data)
        }).catch((err) => {
            reject(err)
        })
    })
}
// post
// post
export function httpPost({
    url, data = {}, params = {}, responseType, headers,
}) {
    return new Promise((resolve, reject) => {
        axios({
            url,
            method: 'post',
            transformRequest: [(_data) => {
                let ret = ''
                if (_data) {
                    const arr = Object.keys(_data);
                    arr.forEach((v) => {
                        ret += `${encodeURIComponent(v)}=${encodeURIComponent(_data[v])}&`
                    })
                }

                return ret
            }],
            //
            data,
            // url
            params,
            responseType,
            // headers,
            headers,
        }).then((res) => {
            console.log("res---post");
            console.log(res);
            resolve(res.data)
        }).catch((err) => {
            console.log("err---post");
            console.log(err);
            reject(err)
        })
    })
}
