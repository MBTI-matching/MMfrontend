import { getCookie } from './Cookie';

export const isLogin = () => getCookie('authorization');
