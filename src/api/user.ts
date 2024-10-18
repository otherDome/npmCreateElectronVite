import { get } from '../requeset/methods'
export interface UserRequest{
    pageNum?:number,
    pageSize?:number,
 }
 
export  function userRequest(params: UserRequest) {
   return get('/api/users', { params }); //测试接口
}
