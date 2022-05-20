import io from 'socket.io-client';
import store from '../store';
import { watch } from 'vue';
import _ from "lodash";
import { updateTraffic } from './storeService'

export const sockets = () => {
    store.dispatch('Socket/setSocketReady', false);
    const { serverUrl } = require('@/services/api.js');

    let socket = io(serverUrl);

    let initFlag = {
        nodes: false, 
        networks: false,
        topologies: false,
        links: false
    }

    // Init data after sockets connection
    socket.on('connect', () => {
        socket.emit('initUser', store.getters['User/getUsername']);
        store.dispatch('User/setSocket', socket.id);
        store.dispatch('Socket/setSocketReady', true);
    });
    // Listener to receive user data (nodes, topologies...) changes
    socket.on(store.getters['User/getUsername'], (msg) => {
        switch(msg.type){
            case 'userData':
                store.dispatch('UserData/setNodes', { data: msg.data.nodes, changedFromUser: false });
                store.dispatch('UserData/setTopologies', msg.data.topologies);
                store.dispatch('UserData/setLinks', msg.data.links);
                store.dispatch('UserData/setNetworks', msg.data.networks);
                msg.data.server.users = msg.data.users
                store.dispatch('UserData/setServer', msg.data.server)
                store.dispatch('UserData/setUserInfoCredentials', {username: msg.data.userInfo.username})
                store.dispatch('UserData/setUserInfoDetails', {firstname: msg.data.userInfo.name, surname: msg.data.userInfo.surname, email: msg.data.userInfo.email})
                break;
            case 'topologies':
                //code
                break;
            case 'topology':
                if(msg.method != 'delete')
                    store.dispatch('UserData/updateTopologyFull', msg.res.data)
                else 
                    store.dispatch('UserData/deleteTopology', {id: msg.res.data, changedFromUser: false});
                break;
            case 'nodes':
                store.dispatch('UserData/setNodes', { data: msg.node, changedFromUser: false });
                break;
            case 'node':
                store.dispatch('UserData/setNode', {data: msg.data, changedFromUser: false});
                break;
            case 'links':
                //code
                break;
            case 'networks':
                //code
                break;
            case 'network':
                if(msg.method == 'delete')
                    store.dispatch('UserData/deleteNetwork', msg.network)
                break
            case 'traffic':
                updateTraffic(msg.data)
                break; 
            case 'node-interface-status':
                store.dispatch('UserData/updateNodeInterfaceStatus', {...msg.data, changedFromUser: false })
                break;
        }
    })
    


    watch(() => _.cloneDeep(store.getters['UserData/getNodes']), (nodes) => { 
        console.log('watch change from sockets Nodes');
        if(initFlag.nodes && nodes.changedFromUser){
            if(nodes != null){
                socket.emit('nodes', {nodes: nodes.data, user: store.getters['User/getUsername']});
            }
        }
        else
            initFlag.nodes = true
    })

    watch(() => _.cloneDeep(store.getters['UserData/getNetworks']), (networks, prev) => { 
        if(initFlag.networks && store.getters['UserData/getNetworksFull'].changedFromUser){
            if(networks != null){
                if(networks.length < prev.length) {
                    socket.emit('networks', { user: store.getters['User/getUsername'], network: prev.find(net => !networks.find(netNew => netNew._id == net._id)).ipNetwork.value, method:'delete'})
                }else
                    socket.emit('networks', {networks: networks, user: store.getters['User/getUsername']});
            }
        }
        else
            initFlag.networks = true
    })


    watch(() => _.cloneDeep(store.getters['UserData/getTopologies']), (topos,prev) => { 
        if(initFlag.topologies && store.getters['UserData/getTopologiesFull'].changedFromUser){
            if(topos.length > prev.length){
                socket.emit('topology', { user: store.getters['User/getUsername'], name: topos[topos.length-1].name, nodes:topos[topos.length-1].nodes, method:'new'})
            }else if(topos.length < prev.length) {
                socket.emit('topology', { user: store.getters['User/getUsername'], id: prev.find(topo => !topos.find(topoDel => topo._id === topoDel._id))._id, method:'delete'})
            }else{
                for (let i=0; i < topos.length; i++){
                    if(topos[i] != prev[i]) {
                        socket.emit('topology', {topology: topos[i], user: store.getters['User/getUsername'], method: 'update'})
                    }
                }
            }
        }else
            initFlag.topologies = true
    })   


    // For console device live stream - watch user actions and emit
    watch(() => store.getters['Socket/getConsoleDataEmit'], (data) => {
        if(data != null){
            data.socket = store.state.User.socket;
            socket.emit('consoleData', data);
            store.dispatch('Socket/setConsoleDataEmit', null);
        }
    })

    watch(() => store.getters['UserData/getSaveNodeConfigAction'], (data) => {
        if(data != null){
            socket.emit('save-config', {node: data.node, user: store.getters['User/getUsername']});
        }
    })

    watch(() => store.getters['UserData/getUserInfoCredentials'], (data) => {
        if(data != null){
            socket.emit('save-user_credentials', {user: store.getters['User/getUsername'], username: data.username, password: data.password});
        }
    })

    watch(() => store.getters['UserData/getUserInfoDetails'], (data) => {
        if(data != null){
            socket.emit('save-user_details', {user: store.getters['User/getUsername'], firstname: data.firstname, surname: data.surname, email: data.email});
        }
    })
    

    // For console device live stream - listener 
    socket.on('consoleData',(data) => {
        console.log(data);
        store.dispatch('Socket/setConsoleDataListen', data);
    });

    return socket;
}