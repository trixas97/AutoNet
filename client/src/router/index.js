import { createRouter, createWebHistory } from 'vue-router'
import NewNetworkAuto from '@/views/NewNetworkAuto.vue'
import NewNetworkManual from '@/views/NewNetworkManual.vue'
import SaveDevices from '@/views/SaveDevices.vue'
import Topology from '@/views/Topology.vue'
import Login from '@/views/Login.vue'
import store from '@/store'


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

router.beforeEach((to, from, next) => {

  if (store.state.User.token != null) {
    (to.path === '/login') ? next('/') : next();
  } else {
    (to.path === '/login') ? next() : next('/login');
  }
  
});

export default router
