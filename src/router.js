import Vue from 'vue'
import Router from 'vue-router'

import layout from './views/layout/layout'
import Home from './views/Home'
/* system */
import system from './views/system/system'
import role from './views/system/role'
import index from './views/system/index'

Vue.use(Router)

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
          component: system
        },
        {
          path: '/layout/role',
          component: role
        },
        {
          path: '/layout/index',
          component: index
        }
      ]
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/',
      redirect: '/home'
    }
  ]
})

export default router