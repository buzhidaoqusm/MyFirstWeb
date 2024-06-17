import request from '@/utils/request.js'
import {useTokenStore} from '@/stores/token.js'

export const userListService = ()=>{
    // const tokenStore = useTokenStore();
    // return request.post('/test', {Headers:{'Authorization':tokenStore.token}})
    return request.post('/test')
}