export default[
  {
    path: '/layout/adver',
    component: adver => require(['@/views/advertise/adver'], adver),
    name: '人才引进',
    children: [
      {
        path: '/layout/adver/list',
        component: adverlist => require(['@/views/advertise/adver/list'], adverlist),
        name: '人才引进',
      },
      {
        path: '/layout/adver/add',
        component: adveradd => require(['@/views/advertise/adver/add'], adveradd),
        name: '人才引进',
      },
      {
        path: '/layout/adver/edit/:id',
        component: adveredit => require(['@/views/advertise/adver/edit'], adveredit),
        name: '人才引进',
      },
      {
        path: '/layout/adver/look/:id',
        component: adverlook => require(['@/views/advertise/adver/look'], adverlook),
        name: '人才引进',
      }
    ],
    redirect: '/layout/adver/list'
  }
]