export const UserDataModule = {
    
    namespaced: true,

    state: {
        nodes: {data: [], changedFromUser: false},
        networks: {data: [], changedFromUser: false},
        topologies: {data: [], changedFromUser: false},
        links: []
    },

    mutations: {
        setNodes(state, val){
            state.nodes = val
        },
        setNode(state, val){
            for(let i=0; i < state.nodes.data.length; i++){
                if(state.nodes.data[i]._id == val._id){
                    state.nodes.data[i] = val
                }
            }
        },
        addNode(state,val){
            state.nodes.data.push(val);
        },
        deleteNode(state,val){
            state.nodes.data.splice(val, 1);
        },


        setNetworks(state, val){
            state.networks.data = val
        },
        addNetwork(state,val){
            state.networks.data.push(val);
        },
        deleteNetwork(state,val){
            state.networks.data.splice(val, 1);
        },


        setTopologies(state, val){
            state.topologies.data = val
        },
        addTopology(state,val){
            state.topologies.data.push(val.data);
            state.topologies.changedFromUser = val.changedFromUser
        },
        deleteTopology(state,val){
            state.topologies.data.splice(state.topologies.data.indexOf(state.topologies.data.find(topo => topo.name = val)), 1);
            state.topologies.changedFromUser = true
        },
        updateTopology(state,val){
            let node = state.topologies.data.find(topology => topology._id == val.id).nodes.find(node => node.id == val.node.id)
            node.x = val.node.x
            node.y = val.node.y
            state.topologies.changedFromUser = true
        },
        updateTopologyFull(state,val){
            for(let i=0; i < state.topologies.data.length; i++){
                if(state.topologies.data[i]._id == val._id){
                    state.topologies.data[i] = val
                }
            }
            state.topologies.changedFromUser = false
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
        setNode({ commit }, val){
            commit('setNode', val)
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
        deleteTopology({ commit }, val){
            commit('deleteTopology', val);
        },
        updateTopology({ commit }, val){
            commit('updateTopology', val)
        },
        updateTopologyFull({ commit },val){
            commit('updateTopologyFull', val)
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
        getNodesById: (state) => async (ids) => {
            return state.nodes.find(node => node._id.includes(ids))
        },
        getNetworks(state) {
            return state.networks.data
        },
        getNetworkByIp: (state) => (ip) => {
            return state.networks.data.find(network => network.ipNetwork.value === ip)
        },
        getNetworksFull(state) {
            return state.networks
        },
        getTopologies(state){
            return state.topologies.data
        },
        getTopologiesFull(state){
            return state.topologies
        },
        getTopology: (state) => (name) => {
            return state.topologies.data.find(topo => topo.name === name)
        },
        getTopologyNodes: (state) => (name) => {
            try{
                return state.nodes.data.filter(node => state.topologies.data.find(topo => topo.name === name).nodes.find(nodeTopo => nodeTopo.id === node._id))
            }catch{
                return []
            }
        },
        getLinks(state){
            return state.links
        }
    }
}