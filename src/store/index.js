import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: localStorage.getItem('access_token') || null,
        user: {},
    },
    mutations: {
        setToken(state, data) {
            state.token = data.token;
            state.user = data.user;
        },
        destroyToken(state) {
            state.token = null;
            state.user = null;
        },
    },
    actions: {
        setToken({ commit }, data) {
            localStorage.setItem('access_token', data.token);
            commit('setToken', data);
        },
        destroyToken({ commit }) {
            localStorage.removeItem('access_token');
            commit('destroyToken');
        },
        login({ commit }, credentials) {
            return axios.post("http://127.0.0.1:8000/api/login", credentials).then(( res ) => {
                localStorage.setItem('access_token', res.data.data.token);
                commit("setToken", res.data.data);
            });
        },
    },
    getters: {
        token: (state) => state.token,
        isLoggedIn: (state) => !!state.token,
        userId: (state) => state.user.id,
    },
    plugins: [createPersistedState()],
})