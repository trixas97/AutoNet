import Vue from 'vue'
import VueRouter from 'vue-router'
import NewNetworkAuto from '../views/NewNetworkAuto.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/autoScan',
    name: 'AutoScanNetwork',
    component: NewNetworkAuto
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
