import Vue from 'vue'
import Router from 'vue-router'

import layout from './views/layout/layout'
import Home from './views/Home'
import Login from './views/Login'
/* system */
import system from './views/system/system'
import role from './views/system/role'
import index from './views/system/index'
/* school */
import laySchool from './views/school/school'
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
          path: '/layout/system',
          component: system,
          name: '系统管理'
        },
        {
          path: '/layout/role',
          component: role,
          name: '角色管理'
        },
        {
          path: '/layout/index',
          component: index
        },
        {
          path: '/layout/school',
          component: laySchool
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
      path:'/home/listshow',
      component:homelistshow
    },
  ]
})

/* router.beforeEach((to, from, next)=>{
  
}) */

export default router