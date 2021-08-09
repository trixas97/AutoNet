export const NewNetworkModule = {
    namespaced: true,

    state: {
        nodes: [],
        networks: [],
        finishedScan: true,
    },

    // Mutations are functions that effect the STATE.
    mutations: {
        setFinishedScan(state,val){
            state.finishedScan = val;
        },
        addNode(state,val){
            state.nodes.push(val);
        },
        deleteNode(state,val){
            state.nodes.splice(val, 1);
        },
        addNetwork(state,val){
            state.networks.push(val);
        },
        deleteNetwork(state){
            state.networks.pop();
        }
    },

    // Actions are functions that you call throughout your application that call murations.
    actions: {
        setFinishedScan({ commit }, val){
            commit('setFinishedScan', val);
        },
        addNode({ commit }, val){
            commit('addNode', val);
        },
        deleteNode({ commit },val){
            commit('deleteNode', val);
        },
        addNetwork({ commit }, val){
            commit('addNetwork', val);
        },
        deleteNetwork({ commit }){
            commit('deleteNetwork');
        },
    },

    getters: {
        getNetworks(state) {
            return state.networks
        },
        getNodes(state){
            return state.nodes
        }
    }
    
}