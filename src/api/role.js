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

// 添加角色
export const AddRole = data => {
  return request({
    url: '/api/admin/system/roles',
    method: 'post',
    data,
  })
}

// 编辑角色
export const EditRole = (id, data) => {
  return request({
    url: `/api/admin/system/roles/${id}`,
    method: 'put',
    data,
  })
}

// 删除角色
export const DeleteRole = id => {
  return request({
    url: `/api/admin/system/roles/${id}`,
    method: 'delete',
  })
}
