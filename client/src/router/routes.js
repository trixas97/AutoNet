import NewNetworkAuto from '@/views/NewNetworkAuto.vue'
import NewNetworkManual from '@/views/NewNetworkManual.vue'
import SaveDevices from '@/views/SaveDevices.vue'
import Topology from '@/views/Topology.vue'
import Login from '@/views/Login.vue'
import Device from '@/views/Device.vue'
import Home from '@/views/Home.vue'
import Traffic from '@/views/Traffic.vue'

const routes = [
    {
      path: '/',
      name: 'Dashboard',
      devname: 'homeDashboard',
      component: Home
    },
    {
      path: '/autoScan',
      name: 'AutoScanNetwork',
      devname: 'autoScan',
      component: NewNetworkAuto
    },
    {
      path: '/manualScan',
      name: 'ManualScanNetwork',
      devname: 'manualScan',
      component: NewNetworkManual
    },
    {
      path: '/saveDevices',
      name: 'SaveDevices',
      devname: 'saveDevices',
      component: SaveDevices
    },
    {
      path: '/topology',
      name: 'Topology',
      devname: 'topology',
      component: Topology
    },
    {
      path: '/login',
      name: 'Login',
      devname: 'login',
      component: Login
    },
    {
      path: '/device',
      name: 'Device',
      devname: 'device',
      component: Device
    },
    {
      path: '/traffic',
      name: 'Traffic',
      devname: 'homeTraffic',
      component: Traffic
    }
  
  ]

  export default routes;