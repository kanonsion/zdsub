export default[
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
]