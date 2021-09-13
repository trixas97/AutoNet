export const SocketModule = {

    namespaced: true,
    
    state:{
        socketReady: false,
        consoleDataEmit: null,
        consoleDataListen: null
    },

    mutations: {
        setConsoleDataEmit(state, val){
            state.consoleDataEmit = val;
        },
        setConsoleDataListen(state, val){
            state.consoleDataListen = val;
        },
        setSocketReady(state, val){
            state.socketReady = val;
        }
    },

    actions: {
        setConsoleDataEmit(context, value) {  
            context.commit('setConsoleDataEmit', value);
        },
        setConsoleDataListen(context, value) {  
            context.commit('setConsoleDataListen', value);
        },
        setSocketReady(context, value) {
            context.commit('setSocketReady', value);
        }
    },

    getters: {
        getConsoleDataEmit(state) {
            return state.consoleDataEmit;
        },
        getConsoleDataListen(state) {
            return state.consoleDataListen;
        },
        getSocketReady(state){
            return state.socketReady;
        }
    }
}