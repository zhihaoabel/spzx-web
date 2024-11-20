const Layout = () => import('@/layout/index.vue')
const User = () => import('@/views/system/SystemUser.vue')
const Role = () => import('@/views/system/SystemRole.vue')
const Menu = () => import('@/views/system/SystemMenu.vue')

export default [
  {
    path: '/system',
    component: Layout,
    name: 'system',
    meta: {
      title: 'menu.system',
    },
    icon: 'tools',
    children: [
      {
        path: '/user',
        name: 'user',
        component: User,
        meta: {
          title: 'menu.user',
        },
        icon: 'user',
      },
      {
        path: '/role',
        name: 'role',
        component: Role,
        meta: {
          title: 'menu.role',
        },
        icon: 'avatar',
      },
      {
        path: '/menu',
        name: 'menu',
        component: Menu,
        meta: {
          title: 'menu.menu',
        },
        icon: 'grid',
      },
    ],
  },
]
