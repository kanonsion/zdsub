export default [
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
    name: '援藏政策',
    redirect: '/layout/policy/list',
    children: [
      {
        path: '/layout/policy/list',
        component: list => require(['@/views/work/policy/list'], list),
        name: '路线管理',
      },
      {
        path: '/layout/policy/add',
        component: add => require(['@/views/work/policy/add'], add),
        name: '路线管理',
      },
      {
        path: '/layout/policy/edit/:id',
        component: edit => require(['@/views/work/policy/edit'], edit),
        name: '路线管理',
      }
    ]
  },
  /* work */
  {
    path: '/layout/work',
    component: work => require(['@/views/work/work'], work),
    name: '援藏政策',
    redirect: '/layout/work/list',
    children: [
      {
        path: '/layout/work/list',
        component: list => require(['@/views/work/work/list'], list),
        name: '路线管理',
      },
      {
        path: '/layout/work/add',
        component: add => require(['@/views/work/work/add'], add),
        name: '路线管理',
      },
      {
        path: '/layout/work/edit/:id',
        component: edit => require(['@/views/work/work/edit'], edit),
        name: '路线管理',
      }
    ]
  }
]