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
    component: adver => require(['@/views/home/work'], adver)
  },
  {
    path: '/home/listshow',
    component: homelistshow => require(['@/components/homelistshow'], homelistshow)
  }
]