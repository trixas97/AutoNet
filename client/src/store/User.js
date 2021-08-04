export const UserModule = {

    namespaced: true,
    
    state:{
        token: null,
        socket: null
    },

    mutations: {
        setToken(state, value) { 
            state.token = value 
        },
        setSocket(state, val){
            state.socket = val;
        }
    },

    actions: {
        setToken(context, value) {  
            context.commit('setToken', value);
        },
        setSocket({ commit }, val){
            commit('setSocket', val);
        }
    },

    getters: {
        getToken(state) {
            return state.token;
        }
    }
}