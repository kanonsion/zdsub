import Vue from 'vue'
import Router from 'vue-router'

import BackHome from './views/BackHome'
import Home from './views/Home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path:'/backhome',
      component:BackHome
    },
    {
      path:'/home',
      component:Home
    },
    {
      path:'/',
      redirect:'/home'
    }
  ]
})
