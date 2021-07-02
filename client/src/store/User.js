export const UserModule = {

    namespaced: true,
    
    state:{
        token: null
    },

    mutations: {
        setToken(state, value) { 
            state.token = value 
        }
    },

    actions: {
        setToken(context, value) {  
            context.commit('setToken', value);
        }
    },

    getters: {
        getToken(state) {
            return state.token;
        }
    }
}