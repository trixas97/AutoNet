export const UserModule = {

    namespaced: true,
    
    state:{
        username: null,
        token: null,
        socket: null
    },

    mutations: {
        setToken(state, value) { 
            state.token = value 
        },
        setSocket(state, val){
            state.socket = val;
        },
        setUsername(state, val){
            state.username = val;
        }
    },

    actions: {
        setToken(context, value) {  
            context.commit('setToken', value);
        },
        setSocket({ commit }, val){
            commit('setSocket', val);
        },
        setUsername({ commit }, val){
            commit('setUsername', val);
        }
    },

    getters: {
        getToken(state) {
            return state.token;
        },
        getUsername(state) {
            return state.username;
        }
    }
}