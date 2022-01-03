import axios from 'axios';
import { getCookie } from '../shared/Cookie';
// console.log(getCookie('authorization'));
const TOCKEN = getCookie('authorization');
const instance = axios.create({
  baseURL: 'http://13.124.242.158',
  // baseURL: 'http://13.209.76.178',
  timeout: 3000,
  headers: {
    // 베어러 부분 중첩되는거 삭제 필요
    authorization: `${TOCKEN}`,
    'content-type': 'application/json;charset=UTF-8',
    accept: 'application/json',
  },
});

//interceptors를 POST요청 가지고 결과 값을 캐치해서 return.
instance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  },
);

//interceptors를 GET요청 가지고 결과 값을 캐치해서 return.
instance.interceptors.response.use(
  response => {
    const res = response;
    return res;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  },
);

export default instance;
