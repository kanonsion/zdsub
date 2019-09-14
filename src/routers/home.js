export default[
  {
    path: '/',
    redirect: '/home'
  },
  {
    path:'*',
    component: e404 => require(['@/views/404'],e404)
  },
  {
    path: '/home',
    component: Home => require(['@/views/Home'], Home)
  },
  {
    path: '/home/work',
    component: work => require(['@/views/home/work'], work)
  },
  {
    path: '/home/school',
    component: school => require(['@/views/home/school'], school)
  },
  {
    path: '/home/process',
    component: process1 => require(['@/views/home/process'], process1)
  },
  {
    path: '/home/policy',
    component: policy => require(['@/views/home/policy'], policy)
  },
  {
    path: '/home/need',
    component: need => require(['@/views/home/need'], need)
  },
  {
    path: '/home/adver',
    component: adver => require(['@/views/home/adver'], adver)
  },
  {
    path: '/home/work/show',
    component: workshow => require(['@/views/home/workshow'], workshow)
  },
  {
    path: '/home/need/show',
    component: needshow => require(['@/views/home/needshow'], needshow)
  },
  {
    path: '/home/process/show',
    component: processshow => require(['@/views/home/processshow'], processshow)
  },
  {
    path: '/home/school/show',
    component: schoolshow => require(['@/views/home/schoolshow'], schoolshow)
  },
  {
    path: '/home/adver/show',
    component: advershow => require(['@/views/home/advershow'], advershow)
  },
]