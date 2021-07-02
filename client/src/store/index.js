import { createStore } from 'vuex'; 
import createPersistedState from 'vuex-persistedstate';
import { NewNetworkModule } from './NewNetwork';
import { UserModule } from './User';


export default createStore({
  state: {},

  // Mutations are functions that effect the STATE.
  mutations: {},

  // Actions are functions that you call throughout your application that call murations.
  actions: {},

  modules: {
    NewNetwork: NewNetworkModule,
    User: UserModule
  },

  plugins:[
    createPersistedState()
  ]

})