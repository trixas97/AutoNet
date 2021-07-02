import { createStore } from 'vuex'; 
import createPersistedState from 'vuex-persistedstate';
import { NewNetworkModule } from './NewNetwork';
import { UserModule } from './User';
import * as Cookies from "js-cookie";

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
    createPersistedState({
      storage: {
        getItem: (key) => Cookies.get(key),
        setItem: (key, value) => Cookies.set(key, value, { secure: true }),
        removeItem: (key) => Cookies.remove(key),
      }
    })
  ]

})