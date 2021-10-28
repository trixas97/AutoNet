export const UserDataModule = {
    
    namespaced: true,

    state: {
        nodes: [],
        networks: [],
        topologies: [],
        links: []
    },

    mutations: {
        setNodes(state, val){
            state.nodes = val
        },
        addNode(state,val){
            state.nodes.push(val);
        },
        deleteNode(state,val){
            state.nodes.splice(val, 1);
        },


        setNetworks(state, val){
            state.networks = val
        },
        addNetwork(state,val){
            state.networks.push(val);
        },
        deleteNetwork(state,val){
            state.networks.splice(val, 1);
        },


        setTopologies(state, val){
            state.topologies = val
        },
        addTopology(state,val){
            state.topologies.push(val);
        },
        deleteTopology(state,val){
            state.topologies.splice(val, 1);
        },


        setLinks(state, val){
            state.links = val
        },
        addLink(state,val){
            state.links.push(val);
        },
        deleteLink(state,val){
            state.links.splice(val, 1);
        },

    },

    actions: {

        setNodes({ commit }, val){
            commit('setNodes', val);
        },
        addNode({ commit }, val){
            commit('addNode', val);
        },
        deleteNode({ commit },val){
            commit('deleteNode', val);
        },


        setNetworks({ commit }, val){
            commit('setNetworks', val);
        },       
        addNetwork({ commit }, val){
            commit('addNetwork', val);
        },
        deleteNetwork({ commit }){
            commit('deleteNetwork');
        },


        setTopologies({ commit }, val){
            commit('setTopologies', val);
        },       
        addTopology({ commit }, val){
            commit('addTopology', val);
        },
        deleteTopology({ commit }){
            commit('deleteTopology');
        },


        setLinks({ commit }, val){
            commit('setLinks', val);
        },       
        addLink({ commit }, val){
            commit('addLink', val);
        },
        deleteLink({ commit }){
            commit('deleteLink');
        },

    },

    getters: {
        getNodes(state){
            return state.nodes
        },
        getNetworks(state) {
            return state.networks
        },
        getTopologies(state){
            return state.topologies
        },
        getLinks(state){
            return state.links
        }
    }
}