const getDefaultState = () => {
    return {
        server: {},
        nodes: {data: [], changedFromUser: false},
        networks: {data: [], changedFromUser: false},
        topologies: {data: [], changedFromUser: false},
        links: []
    }
}

export const UserDataModule = {
    
    namespaced: true,

    state: getDefaultState(),

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
            state.nodes.data.splice(state.nodes.data.indexOf(state.nodes.data.find(node => node.interfaces.find(inter => inter.ip_address.value.includes(val+'/')))), 1);
            state.nodes.changedFromUser = true
        },


        setNetworks(state, val){
            state.networks.data = val
        },
        addNetwork(state,val){
            state.networks.data.push(val);
        },
        deleteNetwork(state,val){
            if(state.networks.data.find(net => net.ipNetwork.value == val.net)){
                state.networks.data.splice(state.networks.data.indexOf(state.networks.data.find(net => net.ipNetwork.value == val.net)), 1);
                state.networks.changedFromUser = val.deleteFlag
            }
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

        setServer(state, val){
            state.server = val
        },

        resetState (state) {
            Object.assign(state, getDefaultState())
        }
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
        deleteNetwork({ commit }, val){
            commit('deleteNetwork', val);
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
        deleteLink({ commit }, val){
            commit('deleteLink', val);
        },

        setServer({ commit }, val){
            commit('setServer', val)
        },

        resetState ({ commit }) {
            commit('resetState')
        }

    },

    getters: {
        getServer(state){
            return state.server
        },
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