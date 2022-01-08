<template>
  <div class="drawer-container">
      <div class="logo-container"><img class="logo q-pt-sm q-pb-sm" v-if="showImg" src="@/assets/logo.svg" alt=""></div>
    
    <q-list class="list">
      <div v-for="(menuItem, index) in menuList" :key="index">
        <q-item  clickable :active="menuItem.label === $route.name" active-class="bg-secondary text-white" @click="clickItem(menuItem.label)" v-ripple>
          <q-item-section avatar >
            <q-icon :name="menuItem.icon" />
          </q-item-section>
          <q-item-section >
            {{ menuItem.label }}
          </q-item-section>
          </q-item>
        </div>
    </q-list>
    <div class="logout-container">
        <q-btn color="negative" push size="md" @click="logout">
            <div class="row items-center no-wrap">
                <q-icon left name="logout" />
                <div class="text-center logout-text">
                    Logout
                </div>
            </div>
        </q-btn>
    </div>
    <div class=" absolute" v-if="!showImg" style="top: 1%; right: -5em">
      <q-btn
        dense
        round
        size="lg"
        color="secondary"
        icon="chevron_left"
        @click="closeDrawer"
      />
    </div>
  </div>
</template>

<script>
import store from '@/store';
const menuList = [
  {
    icon: 'space_dashboard',
    label: 'Dashboard',
    separator: false
  },
  {
    icon: 'account_tree',
    label: 'Networks',
    separator: false
  },
  {
    icon: 'router',
    label: 'Devices',
    separator: false
  },
  {
    icon: 'share',
    label: 'Topologies',
    separator: true
  },
  {
    icon: 'account_circle',
    label: 'Profile',
    separator: false
  }
]

export default {
  props:{
    showImg: {type: Boolean}
  },
  setup () {
    return {
      menuList
    }
  },
  methods:{
    clickItem(value){
      if(value == 'Dashboard') value = '/'
      this.closeDrawer()
      this.$router.push(value);
    },
    logout(){
      store.dispatch('User/resetState')
      store.dispatch('Socket/resetState')
      store.dispatch('NewNework/resetState')
      store.dispatch('UserData/resetState')
      this.$router.push('login'); 
    },
    closeDrawer(){
      this.$emit('closeDrawer', false)
    }
  }
}

</script>

<style lang="scss" scoped>
@import "@/styles/quasar.variables.scss";
.drawer-container{
    color: white;
    display: grid;
    height: 100%;
    grid-template-rows: 0.25fr 1fr 0.1fr;
    grid-template-areas: 
    "logo"
    "list-menu"
    "logout";


    .logo-container{
        grid-area: logo;

        .logo {
            
            width: 15em;
            display: block;
            margin-left: auto;
            margin-right: auto;
            margin-top: 10%;
        }
    }

    .list {
        min-height: 100%;
        grid-area: list-menu;
        font: {
            family: arial;
            weight: bold;
            size: 1.1em;
        }
    }
    
    .logout-container{
        grid-area: logout;
        margin-left: auto;
        margin-right: auto;
        
        .logout-text{
            font-weight: bold;
        }
    }
}
</style>