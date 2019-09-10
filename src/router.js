import Vue from 'vue'
import Router from 'vue-router'

import layout from './views/layout/layout'
import Home from './views/Home'
import Login from './views/Login'
/* system */
import system from './views/system/system'
import a from './views/system/system/a'
import b from './views/system/system/b'

import role from './views/system/role'
import index from './views/system/index'
/* school */
import laySchool from './views/university/school'
import schooledit from './views/university/school/edit'
import schoolist from './views/university/school/list'
import schooladd from './views/university/school/add'
/* advertise */
import layadver from './views/advertise/adver'
import adveredit from './views/advertise/adver/edit'
import adverlist from './views/advertise/adver/list'
import adveradd from './views/advertise/adver/add'
/* work */
import layprocess from './views/work/process'
import processedit from './views/work/process/edit'
import processlist from './views/work/process/list'
import processadd from './views/work/process/add'
/* home */
import work from './views/home/work'
import school from './views/home/school'
import process1 from './views/home/process'
import policy from './views/home/policy'
import need from './views/home/need'
import adver from './views/home/adver'
import homelistshow from './components/homelistshow'

Vue.use(Router)

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/layout',
      component: layout,
      children: [
        {
          path: '/layout/role',
          component: system,
          name: '系统管理',
          children: [
            {
              path: '/layout/role/a',
              component: a,
              name: '系统管理'
            },
            {
              path: '/layout/role/b',
              component: b,
              name: '系统管理'
            },
          ],
          redirect: '/layout/role/a'
        },
        {
          path: '/layout/manager',
          component: role,
          name: '角色管理'
        },
        {
          path: '/layout/index',
          component: index
        },
        /* school */
        {
          path: '/layout/school',
          component: laySchool,
          name: '学校管理',
          children: [
            {
              path: '/layout/school/list',
              component: schoolist,
              name: '学校管理',
            },
            {
              path: '/layout/school/add',
              component: schooladd,
              name: '学校管理',
            },
            {
              path: '/layout/school/edit/:id',
              component: schooledit,
              name: '学校管理',
            },
          ],
          redirect: '/layout/school/list'
        },
        /* adver */
        {
          path: '/layout/adver',
          component: layadver,
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
          ],
          redirect: '/layout/adver/list'
        },
        /* process */
        {
          path: '/layout/process',
          component: layprocess,
          name: '路线管理',
          children: [
            {
              path: '/layout/process/list',
              component: processlist,
              name: '路线管理',
            },
            {
              path: '/layout/process/add',
              component: processadd,
              name: '路线管理',
            },
            {
              path: '/layout/process/edit/:id',
              component: processedit,
              name: '路线管理',
            },
          ],
          redirect: '/layout/process/list'
        }
      ]
    },
    /*  */
    {
      path: '/home',
      component: Home,
    },
    {
      path: '/',
      redirect: '/home'
    },
    /*  */
    {
      path: '/login',
      component: Login
    },
    /* home */
    {
      path: '/home/work',
      component: work
    },
    {
      path: '/home/school',
      component: school
    },
    {
      path: '/home/process',
      component: process1
    },
    {
      path: '/home/policy',
      component: policy
    },
    {
      path: '/home/need',
      component: need
    },
    {
      path: '/home/adver',
      component: adver
    },
    {
      path: '/home/listshow',
      component: homelistshow
    },
  ]
})

/* router.beforeEach((to, from, next)=>{
  
}) */

export default router