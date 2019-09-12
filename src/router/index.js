import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/views/layout/layout'

/* 导入route */
import home from './home'
import system from './system'
import advertise from './advertise'
import university from './university'
import work from './work'

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
        ...work,
        ...system,
        ...advertise,
        ...university
      ]
    },
    ...home
  ]
})
export default router