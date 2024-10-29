/*
 * @Descripttion:
 * @version:
 * @Date: 2021-04-20 11:06:21
 * @LastEditors: huzhushan@126.com
 * @LastEditTime: 2021-04-21 09:36:55
 * @Author: huzhushan@126.com
 * @HomePage: https://huzhushan.gitee.io/vue3-element-admin
 * @Github: https://github.com/huzhushan/vue3-element-admin
 * @Donate: https://huzhushan.gitee.io/vue3-element-admin/donate/
 */
import request from '@/utils/request'
import { TOKEN } from '@/pinia/modules/app'
import { getItem } from '@/utils/storage'

// 登录接口
export const Login = data => {
  return request({
    url: '/api/admin/system/index/login',
    method: 'post',
    data,
  })
}

// 获取登录用户信息
export const GetUserinfo = () => {
  const tokenObject = getItem(TOKEN)
  return request({
    url: `/api/admin/system/index/userinfo?token=${tokenObject.token}`,
    method: 'get',
  })
}
