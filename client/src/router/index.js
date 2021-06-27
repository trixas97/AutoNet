import { createRouter, createWebHistory } from 'vue-router'
import NewNetworkAuto from '@/views/NewNetworkAuto.vue'
import NewNetworkManual from '@/views/NewNetworkManual.vue'
import SaveDevices from '@/views/SaveDevices.vue'
import Topology from '@/views/Topology.vue'
import Login from '@/views/Login.vue'


const routes = [
  {
    path: '/autoScan',
    name: 'AutoScanNetwork',
    component: NewNetworkAuto
  },
  {
    path: '/manualScan',
    name: 'ManualScanNetwork',
    component: NewNetworkManual
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/saveDevices',
    name: 'SaveDevices',
    component: SaveDevices
  },
  {
    path: '/topology',
    name: 'Topology',
    component: Topology
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
