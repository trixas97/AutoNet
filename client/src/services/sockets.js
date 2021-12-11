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
        console.log(msg);
        switch(msg.type){
            case 'userData':
                store.dispatch('UserData/setNodes', { data: msg.data.nodes, changedFromUser: false });
                store.dispatch('UserData/setTopologies', msg.data.topologies);
                store.dispatch('UserData/setLinks', msg.data.links);
                store.dispatch('UserData/setNetworks', msg.data.networks);
                break;
            case 'topologies':
                //code
                break;
            case 'nodes':
                store.dispatch('UserData/setNodes', msg.nodes);
                break;
            case 'node':
                console.log(msg);
                store.dispatch('UserData/setNode', msg.node);
                break;
            case 'links':
                //code
                break;
            case 'networks':
                //code
                break; 
            case 'traffic':
                updateTraffic(msg.data)
                break; 
        }
    })
    


    watch(() => _.cloneDeep(store.getters['UserData/getNodes']), (nodes) => { 
        console.log('watch change from sockets');
        if(initFlag.nodes && nodes.changedFromUser){
            if(nodes != null){
                socket.emit('nodes', {nodes: nodes.data, user: store.getters['User/getUsername']});
            }
        }
        else
            initFlag.nodes = true
    })


    // watch(() => _.cloneDeep(store.getters['UserData/getTopologies']), (topos,prev) => { 
    //     console.log('watch change from sockets');
    //     console.log(prev);
    //     console.log(topos);
    //     topos.map(topo => {
    //         if(topo === prev)
    //     })
    //     // if(initFlag.nodes && nodes.changedFromUser){
    //     //     if(nodes != null){
    //     //         socket.emit('nodes', {nodes: nodes.data, user: store.getters['User/getUsername']});
    //     //     }
    //     // }
    //     // else
    //     //     initFlag.nodes = true
    // })


    // For console device live stream - watch user actions and emit
    watch(() => store.getters['Socket/getConsoleDataEmit'], (data) => {
        if(data != null){
            data.socket = store.state.User.socket;
            socket.emit('consoleData', data);
            store.dispatch('Socket/setConsoleDataEmit', null);
        }
    })

    // For console device live stream - listener 
    socket.on('consoleData',(data) => {
        console.log(data);
        store.dispatch('Socket/setConsoleDataListen', data);
    });

    return socket;
}