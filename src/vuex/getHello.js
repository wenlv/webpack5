import { httpPost } from '../common/https';

export default function getHelloApi(params) {
    return httpPost({ url: '/api/hello', params });
}
