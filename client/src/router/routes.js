import NewNetworkAuto from '@/views/NewNetworkAuto.vue'
import NewNetworkManual from '@/views/NewNetworkManual.vue'
import SaveDevices from '@/views/SaveDevices.vue'
import Topology from '@/views/Topology.vue'
import Login from '@/views/Login.vue'
import Device from '@/views/Device.vue'
import Home from '@/views/Dashboard/Home.vue'
import Traffic from '@/views/Dashboard/Traffic.vue'
import Protocols from '@/views/Dashboard/Protocols.vue'
import Topologies from '@/views/Dashboard/Topologies.vue'
import Devices from '@/views/Dashboard/Devices.vue'
import Networks from '@/views/Dashboard/Networks.vue'
import Profile from '@/views/Dashboard/Profile.vue'


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
    },
    {
      path: '/protocols',
      name: 'Protocols',
      devname: 'homeProtocols',
      component: Protocols
    },
    {
      path: '/devices',
      name: 'Devices',
      devname: 'homeDevices',
      component: Devices
    },
    {
      path: '/topologies',
      name: 'Topologies',
      devname: 'homeTopologies',
      component: Topologies
    },
    {
      path: '/networks',
      name: 'Networks',
      devname: 'homeNetworks',
      component: Networks
    },
    {
      path: '/profile',
      name: 'Profile',
      devname: 'homeProfile',
      component: Profile
    }
  
  ]

  export default routes;