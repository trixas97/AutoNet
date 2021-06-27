import { createStore } from 'vuex'; 
import { NewNetworkModule } from './NewNetwork';

export default createStore({
  state: {},

  // Mutations are functions that effect the STATE.
  mutations: {},

  // Actions are functions that you call throughout your application that call murations.
  actions: {},

  modules: {
    NewNetwork: NewNetworkModule
  }

})