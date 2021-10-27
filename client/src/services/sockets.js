import io from 'socket.io-client';
import store from '../store';
import {  watch } from 'vue';

export const sockets = () => {
    store.dispatch('Socket/setSocketReady', false);
    const { serverUrl } = require('@/services/api.js');

    let socket = io(serverUrl);

    // Init data after sockets connection
    socket.on('connect', () => {
        console.log('TRIOXAS  ' + socket.id);
        socket.emit('initUser', store.getters['User/getUsername']);
        store.dispatch('User/setSocket', socket.id);
        store.dispatch('Socket/setSocketReady', true);
    });

    // Listener to receive user data (nodes, topologies...) changes
    socket.on(store.getters['User/getUsername'], (msg) => {
        console.log("Listeeennnn Userrr");
        switch(msg.type){
            case 'userData':
                //code
                break;
            case 'topologies':
                //code
                break;
            case 'nodes':
                //code
                break;
            case 'links':
                //code
                break;
            case 'networks':
                //code
                break; 
        }
        console.log(msg.data);
    })



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