const getDefaultState = () => {
    return {
        socketReady: false,
        consoleDataEmit: null,
        consoleDataListen: null
    }
}

export const SocketModule = {

    namespaced: true,
    
    state: getDefaultState(),

    mutations: {
        setConsoleDataEmit(state, val){
            state.consoleDataEmit = val;
        },
        setConsoleDataListen(state, val){
            state.consoleDataListen = val;
        },
        setSocketReady(state, val){
            state.socketReady = val;
        },
        resetState (state) {
            Object.assign(state, getDefaultState())
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
        },
        resetState ({ commit }) {
            commit('resetState')
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