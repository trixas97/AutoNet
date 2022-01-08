<template>
  <q-layout view="lHh Lpr lFf" class="layout">

    <NavBar v-if="$route.name != 'Login' && !visibleComponent " @openDrawer="changeStateDrawer"/>

    <q-drawer show-if-above side="left" :width="250" v-if="visibleComponent" elevated class="bg-navbar" >
      <Drawer :showImg="true"/>
    </q-drawer>

    <q-drawer show-if-above v-model="visibleDrawer" side="left" :width="250" v-if="visibleDrawer" elevated overlay class="bg-navbar" >
      <Drawer :showImg="false" @closeDrawer="changeStateDrawer"/>
    </q-drawer>

    <q-page-container class="layout" >
      <router-view/>
    </q-page-container>


  </q-layout>
</template>

<script>
import { ref } from 'vue'
import NavBar from '@/components/NavBar.vue'
import Drawer from '@/components/Drawer.vue'
import { sockets } from '@/services/sockets.js';
import store from '@/store';
import routes from '@/router/routes.js'
import { useRoute } from 'vue-router';

export default {
  name: 'LayoutDefault',

  components: {
    NavBar,
    Drawer
  },

  setup () {
    const route = useRoute();
    if (store.state.User.token != null)
      sockets();
    return {
      leftDrawerOpen: ref(false),
      route
    }
  },

  methods: {
    changeStateDrawer(val){
      this.leftDrawerOpen = val
    }
  },
  computed:{
    visibleComponent(){
      let flag;
      try{
        flag = routes.find(element => element.name == this.route.name).devname.includes('home') ? true : false
      }catch{
        flag = false
      }
      return flag;
    },

    visibleDrawer(){
      if(!this.visibleComponent && this.leftDrawerOpen)
        return true
      else 
        return false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/quasar.variables.scss";
  .layout {
    height: 100%;
  }
</style>
