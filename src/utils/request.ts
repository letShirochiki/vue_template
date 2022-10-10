
import router from '../router';
import { ElMessage, ElMessageBox } from 'element-plus';
interface ResponseValOption {
    code?: number,
    data: any,
    msg: string,
    count?: number,
}

const request = (method: string, url: string , params?: any,isBolb?: boolean): Promise<ResponseValOption|Blob> => {
    return new Promise<ResponseValOption|Blob>((resolve,reject) => {
        const xhr: XMLHttpRequest = new XMLHttpRequest();
        if(XMLHttpRequest) {
            // IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
            // xhr = new XMLHttpRequest();
        } else {
            // xhr=new ActiveXObject('Microsoft.xhr');
        }
        xhr.onreadystatechange = () => {
            switch(xhr.readyState) {
                case 0 :
                    // console.log('请求未初始化')
                break;
                case 1 :
                    // console.log('服务器连接已建立')
                break;
                case 2 :
                    // console.log('请求已接收')
                break;
                case 3 :
                    // console.log('请求处理中')
                break;
                case 4 :
                    const getRes = () => {
                        const resObj = typeof(xhr.response) === 'string' ? JSON.parse(xhr.response) : xhr.response
                        const {code,data, msg, count } = resObj;
                        switch(code) {
                            case 200:
                                resolve(resObj);
                                break;
                            case 500:
                                ElMessage.error(msg);
                                reject(resObj);
                                break;
                            case 201:
                                console.log('token过期');
                                break;
                            default:
                                // 进了这里说明就尼玛不是个obj 或者错误信息 先处理不是obj的
                                resolve({
                                    code: 200,
                                    data: resObj,
                                    msg: '获取数据成功',
                                });
                                break;
                        }
                    }
                    if(xhr.status === 200 && !(xhr.response instanceof Blob)) {
                        getRes();
                    } else if(xhr.response instanceof Blob) {
                        if(xhr.response.type === 'application/json') {
                            const getData = async () => {
                                resolve(JSON.parse(await xhr.response.text()));
                            };
                            getData();
                        } else {
                            resolve(xhr.response as Blob);
                        }
                    } else {
                        ElMessage.error('请求异常')
                        reject();
                    }
                break;
            }
        }
        xhr.open(method,`/api${url}`.trim(),true);
        if(isBolb) {
            xhr.responseType = 'blob'
        } else {
            xhr.responseType = 'json';
        }
        // 类别不是FormData类型的需要添加请求头为json
        if(!(params instanceof FormData)) {
            xhr.setRequestHeader('Content-Type','application/json');
        }
        xhr.send(params??null);
    })
}


export default class Request {
    public static get(url: string, params?: any): Promise<ResponseValOption> {
        let stringParams = '';
        if(params) {
            Object.keys(params).forEach((key,index,arr) => {
                if(params[key] !== undefined) {
                    stringParams += index === arr.length - 1 ? key + '=' + params[key] : key + '=' + params[key] + '&';
                }
            });
        }
        const requestUrl = params ? url + '?' + stringParams : url;
        return request('get',requestUrl) as Promise<ResponseValOption>;
    }
    public static getBlob(url: string, params?: any): Promise<Blob> {
        let stringParams = '';
        if(params) {
            Object.keys(params).forEach((key,index,arr) => {
                stringParams += index === arr.length - 1 ? key + '=' + params[key] : key + '=' + params[key] + '&';
            });
        }
        const requestUrl = params ? url + '?' + stringParams : url;
        return request('get',requestUrl,{},true) as Promise<Blob>;
    }
    public static postBlob(url: string, params?: any): Promise<Blob> {
        return (params ? request('post',url,JSON.stringify(params),true) : request('post',url,true)) as Promise<Blob>;
    }
    public static post(url: string, params?: any): Promise<ResponseValOption> {
        return (params ? request('post',url,JSON.stringify(params)) : request('post',url)) as Promise<ResponseValOption>;
    }

    public static formData(url: string, params?: any): Promise<ResponseValOption> {
        return (params ? request('post',url,params) : request('post',url)) as Promise<ResponseValOption>;
    }

    public static put(url: string, params?: any): Promise<ResponseValOption> {
        return (params ? request('put',url,JSON.stringify(params)) : request('put',url)) as Promise<ResponseValOption>;
    }

    public static delete(url: string, params?: any): Promise<ResponseValOption> {
        let stringParams = '';
        if(params) {
            Object.keys(params).forEach((key,index,arr) => {
                if(Array.isArray(params[key])) {
                    let paramsVal = '';
                    params[key].forEach((val: any,i: number,a: any[]) => {
                        paramsVal += i === a.length-1?`${key}[${i}]=${JSON.stringify(val)}`:`${key}[${i}]=${JSON.stringify(val)}&`
                    });
                    stringParams += paramsVal;
                } else if(params[key].toString() === '[object Object]') {
                    stringParams += `${key}=${JSON.stringify(params[key])}`
                } else {
                    stringParams += `${key}=${params[key]}`;
                }
                if(index !== arr.length - 1) {
                    stringParams += '&';
                }
                // 判断是不是最后一位
            });
        }
        const requestUrl = params ? url + '?' + stringParams : url;
        return request('delete',requestUrl) as Promise<ResponseValOption>;
    }
}
