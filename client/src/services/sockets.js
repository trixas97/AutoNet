import io from 'socket.io-client';
import store from '../store';
import {  watch } from 'vue';

// const axios = require('axios').default;
export const sockets = () => {
    // const store = useStore();
    store.dispatch('Socket/setSocketReady', false);
    const { serverUrl } = require('@/services/api.js');

    let socket = io(serverUrl);
    socket.on('connect', () => {
        console.log('TRIOXAS  ' + socket.id);
        store.dispatch('User/setSocket', socket.id);
        store.dispatch('Socket/setSocketReady', true);
    });


    watch(() => store.getters['Socket/getConsoleDataEmit'], (data) => {
        if(data != null){
            data.socket = store.state.User.socket;
            console.log('TRIXAKIS   ' + data.socket);
            socket.emit('consoleData', data);
            console.log('EMIITTT');
            store.dispatch('Socket/setConsoleDataEmit', null);
        }
    })

    
    socket.on('consoleData',(data) => {
        console.log(data);
        store.dispatch('Socket/setConsoleDataListen', data);
    });

    return socket;
}