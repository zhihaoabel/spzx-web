import request from '@/utils/request'

// 获取角色列表
export const GetRoles = params => {
  return request({
    url: '/api/admin/system/roles',
    method: 'get',
    params: {
      current: params.current,
      pageSize: params.pageSize,
      name: params.name || undefined,
    },
  })
}
