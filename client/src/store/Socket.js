export const SocketModule = {

    namespaced: true,
    
    state:{
        consoleData: null
    },

    mutations: {
        setConsoleData(state, val){
            state.consoleData = val;
        }
    },

    actions: {
        setConsoleData(context, value) {  
            context.commit('setConsoleData', value);
        }
    },

    getters: {
        getConsoleData(state) {
            return state.consoleData;
        }
    }
}