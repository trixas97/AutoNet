import io from 'socket.io-client';
import { useStore } from 'vuex';
import {  watch } from 'vue';

const axios = require('axios').default;
export const sockets = () => {
    const store = useStore();

    const { serverUrl } = require('@/services/api.js');

    let socket = io(serverUrl);
    socket.on('connect', () => {
        store.dispatch('User/setSocket', socket.id);
        const req = {
            method: 'get',
            url: 'http://192.168.1.7:5000/api/console',
            params: {
                ip: '192.168.78.133',
                socket: socket.id,
                username: 'trixas',
                password: 'trixas'
            }
        }
            axios(req)
                .then(response => { console.log(response); })
                .catch(error => { console.log(error); });
    });


    watch(() => store.getters['Socket/getConsoleData'], (count) => {
        console.log(count);
    })

    
    socket.on('consoleData',(data) => {
        console.log('consoleData' + data);
    });

    return socket;
}