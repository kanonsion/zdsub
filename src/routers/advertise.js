import adver from '@/views/advertise/adver'
import adverlist from '@/views/advertise/adver/list'
import adveradd from '@/views/advertise/adver/add'
import adveredit from '@/views/advertise/adver/edit'
import adverlook from '@/views/advertise/adver/look'
import enterName from '@/views/advertise/enterName'

export default [
  {
    path: '/layout/adver',
    component: adver,
    name: '人才引进',
    children: [
      {
        path: '/layout/adver/list',
        component: adverlist,
        name: '人才引进',
      },
      {
        path: '/layout/adver/add',
        component: adveradd,
        name: '人才引进',
      },
      {
        path: '/layout/adver/edit/:id',
        component: adveredit,
        name: '人才引进',
      },
      {
        path: '/layout/adver/look/:id',
        component: adverlook,
        name: '人才引进',
      }
    ],
    redirect: '/layout/adver/list'
  },
  {
    path: '/layout/enterName',
    component: enterName,
    name: '援藏人员',
  }
]