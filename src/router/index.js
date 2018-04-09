import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/views/home'
import Notfound from '@/views/404'
import Tree from '@/views/tree'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/home',
      name: 'HomePage',
      component: Home
    },
    {
      path: '/tree',
      name: 'Tree',
      component: Tree
    },
    {
      path: '*',
      component: Notfound
    }
  ]
})
