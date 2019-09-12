export default[
  {
    path: '/layout/manager',
    component: manager => require(['@/views/system/manager'],manager),
    name: '角色管理',
    children: [
      {
        path: '/layout/manager/list',
        component: list => require(['@/views/system/manager/list'],list),
        name: '角色管理',
      },
      {
        path: '/layout/manager/add',
        component: add => require(['@/views/system/manager/add'],add),
        name: '角色管理',
      },
      {
        path: '/layout/manager/edit/:id',
        component: edit => require(['@/views/system/manager/edit'],edit),
        name: '角色管理',
      },
      {
        path: '/layout/manager/look/:id',
        component: look => require(['@/views/system/manager/look'],look),
        name: '角色管理'
      },
    ],
    redirect: '/layout/manager/list'
  }
]