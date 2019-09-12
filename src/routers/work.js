export default[
  {
    path: '/layout/process',
    component: process => require(['@/views/work/process'], process),
    name: '路线管理',
    children: [
      {
        path: '/layout/process/list',
        component: list => require(['@/views/work/process/list'], list),
        name: '路线管理',
      },
      {
        path: '/layout/process/add',
        component: add => require(['@/views/work/process/add'], add),
        name: '路线管理',
      },
      {
        path: '/layout/process/edit/:id',
        component: edit => require(['@/views/work/process/edit'], edit),
        name: '路线管理',
      }
    ],
    redirect: '/layout/process/list'
  },
  /* policy */
  {
    path: '/layout/policy',
    component: policy => require(['@/views/work/policy'], policy),
  }
]