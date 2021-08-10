import io from 'socket.io-client';
import store from '../store';

export const sockets = () => {
    const { serverUrl } = require('@/services/api.js');

    let socket = io(serverUrl);

    socket.on('connect', () => {
        store.dispatch('User/setSocket', socket.id);
    });

    return socket;
}