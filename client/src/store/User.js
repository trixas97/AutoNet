
const getDefaultState = () => {
    return {
        username: null,
        token: null,
        socket: null
    }
}

export const UserModule = {

    namespaced: true,
    
    state: getDefaultState(),

    mutations: {
        setToken(state, value) { 
            state.token = value 
        },
        setSocket(state, val){
            state.socket = val;
        },
        setUsername(state, val){
            state.username = val;
        },
        resetState (state) {
            Object.assign(state, getDefaultState())
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
        },
        resetState ({ commit }) {
            commit('resetState')
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