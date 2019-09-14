export default [
  {
    path: '/layout/school',
    component: school => require(['@/views/university/school'], school),
    name: '学校管理',
    children: [
      {
        path: '/layout/school/list',
        component: list => require(['@/views/university/school/list'], list),
        name: '学校管理',
      },
      {
        path: '/layout/school/add',
        component: add => require(['@/views/university/school/add'], add),
        name: '学校管理',
      },
      {
        path: '/layout/school/edit/:id',
        component: edit => require(['@/views/university/school/edit'], edit),
        name: '学校管理',
      },
      {
        path: '/layout/school/look/:id',
        component: look => require(['@/views/university/school/look'], look),
        name: '学校管理',
      },
    ],
    redirect: '/layout/school/list'
  },
  {
    path: '/layout/need',
    component: need => require(['@/views/university/need'], need),
    name: '需求管理',
    children: [
      {
        path: '/layout/need/list',
        component: list => require(['@/views/university/need/list'], list),
        name: '需求管理',
      },
      {
        path: '/layout/need/add',
        component: add => require(['@/views/university/need/add'], add),
        name: '需求管理',
      },
      {
        path: '/layout/need/edit/:id',
        component: edit => require(['@/views/university/need/edit'], edit),
        name: '需求管理',
      },
      {
        path: '/layout/need/look/:id',
        component: look => require(['@/views/university/need/look'], look),
        name: '需求管理',
      },
    ],
    redirect: '/layout/need/list'
  }
]