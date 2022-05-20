const getDefaultState = () => {
    return {
        server: {},
        userInfoCredentials: {},
        userInfoDetails: {},
        nodes: {data: [], changedFromUser: false},
        networks: {data: [], changedFromUser: false},
        topologies: {data: [], changedFromUser: false},
        saveNodeConfigAction: null,
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
                if(state.nodes.data[i]._id == val.data._id){
                    state.nodes.data[i] = val.data
                }
            }
            state.nodes.changedFromUser = val.changedFromUser
        },
        addNode(state,val){
            state.nodes.data.push(val);
        },
        deleteNode(state,val){
            state.nodes.data.splice(state.nodes.data.indexOf(state.nodes.data.find(node => node.interfaces.find(inter => inter.ip_address.value.includes(val+'/')))), 1);
            state.nodes.changedFromUser = true
        },
        updateNodeInterfaceStatus(state, val){
            const node = state.nodes.data.find(node => node._id === val.id)
            node.interfaces.find(inter => inter.interface.value === val.if).link_status.value = val.adminStatus
            node.interfaces.find(inter => inter.interface.value === val.if).protocol_status.value = val.operStatus
            state.nodes.changedFromUser = val.changedFromUser
        },

        setSaveNodeConfigAction(state, val){
            state.saveNodeConfigAction = {node: val._id}
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
            state.topologies.data = saveElement(state.topologies.data, val.data)
            state.topologies.changedFromUser = val.changedFromUser
        },
        deleteTopology(state,val){
            const index = state.topologies.data.indexOf(state.topologies.data.find(topo => topo._id == val.id))
            if(index >= 0)
                state.topologies.data.splice(index, 1);
            state.topologies.changedFromUser = val.changedFromUser
        },
        updateTopology(state,val){
            let node = state.topologies.data.find(topology => topology._id == val.id).nodes.find(node => node.id == val.node.id)
            node.x = val.node.x
            node.y = val.node.y
            state.topologies.changedFromUser = true
        },
        updateTopologyFull(state,val){
            state.topologies.data = saveElement(state.topologies.data, val)
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

        setUserInfoCredentials(state,val){
            state.userInfoCredentials = val
        },

        setUserInfoDetails(state,val){
            state.userInfoDetails = val
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
        updateNodeInterfaceStatus({commit}, val){
            commit('updateNodeInterfaceStatus', val)
        },
        setSaveNodeConfigAction({commit}, val){
            commit('setSaveNodeConfigAction', val)
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

        setUserInfoCredentials({ commit },val){
            commit('setUserInfoCredentials', val)
        },

        setUserInfoDetails({ commit },val){
            commit('setUserInfoDetails', val)
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
        getSaveNodeConfigAction(state){
            return state.saveNodeConfigAction
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
        },
        getUserInfoCredentials(state){
            return state.userInfoCredentials
        },
        getUserInfoDetails(state){
            return state.userInfoDetails
        }
    }
}

function saveElement(elements, updatedElement){
    let foundElFlag = false
    elements = elements.map(element => {
        if(element._id == updatedElement._id){
            foundElFlag = true
            element = updatedElement
        }
        return element
    })
    if(!foundElFlag)
        elements = elements.map(element => {
            if(element._id == undefined){
                foundElFlag = true
                element = updatedElement
            }
            return element
        })
    if(!foundElFlag)
        elements.push(updatedElement)

    return elements
}