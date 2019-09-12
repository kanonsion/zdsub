import Vue from 'vue'
import Router from 'vue-router'

import layout from '@/views/layout/layout'
import Login from '@/views/Login'

/* 导入route */
import home from './home'
import system from './system'
import advertise from './advertise'
import university from './university'
import work from './work'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/layout',
      component: layout,
      children: [
        ...work,
        ...system,
        ...advertise,
        ...university
      ]
    },
    ...home,
    {
      path: '/login',
      component: Login,
    }
  ]
})
export default router