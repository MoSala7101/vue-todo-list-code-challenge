import Vue from 'vue'
import Vuex from 'vuex'
import todosModule from './modules/todos'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        todosModule
    }
})