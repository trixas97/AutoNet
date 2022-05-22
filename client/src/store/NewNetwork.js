const getDefaultState = () => {
    return {
        nodes: [],
        networks: [],
        finishedScan: true,
        saveDevices: true
    }
}

export const NewNetworkModule = {
    namespaced: true,

    state: getDefaultState(),

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
        saveDevices(state, val){
            state.saveDevices = !state.saveDevices ;
            state.nodes = val.nodes
        },
        deleteNetwork(state){
            state.networks.pop();
        },
        resetState (state) {
            Object.assign(state, getDefaultState())
        },
        updateSaveStatus(state,val){
            const index = state.nodes.findIndex(node => node.ip === val.ip)
            state.nodes[index] = {...state.nodes[index], finished: val.messageState}
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
        saveDevices({ commit }, val){
            commit('saveDevices', val);
        },
        deleteNetwork({ commit }){
            commit('deleteNetwork');
        },
        resetState ({ commit }) {
            commit('resetState')
        },
        updateSaveStatus({ commit }, val){
            commit('updateSaveStatus', val)
        }
    },

    getters: {
        getNetworks(state) {
            return state.networks
        },
        getNodes(state){
            return state.nodes
        },
        getSaveDevices(state){
            return state.saveDevices
        }
    }
    
}