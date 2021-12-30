import Vue      from 'vue'
import Vuex     from 'vuex'
import getters    from './getters'
Vue.use(Vuex);
export default new Vuex.Store({
    getters,
    state    : {
        loadings:false,
    },
    mutations: {
        setLoadings(state,value){
            state.loadings = value;
        }
    },
    actions  : {}
})