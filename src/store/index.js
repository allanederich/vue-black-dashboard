import Vue from 'vue';
import Vuex from 'vuex';

import createPersistedState from 'vuex-persistedstate';
import Cookies from 'js-cookie';

Vue.use(Vuex);

const getDefaultState = () => ({
  user: {}
});

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) =>
          Cookies.get(key, {
            domain: process.env.VUE_APP_DOMAIN,
            path: '/',
          }),
        setItem: (key, value) =>
          Cookies.set(key, value, {
            expires: 1,
            secure: false,
            domain: process.env.VUE_APP_DOMAIN,
            path: '/',
          }),
        removeItem: (key) =>
          Cookies.remove(key, {
            domain: process.env.VUE_APP_DOMAIN,
            path: '/',
          }),
      },
    }),
  ],
  state: getDefaultState(),
  getters: {
    getUser: (state) => state.user
  },
  mutations: {
    SET_USER: (state, user) => {
      state.user = user;
    },
    RESET: (state) => {
      Object.assign(state, getDefaultState());
    }
  },
  actions: {
    join: ({ commit }, { user }) => {
      commit('SET_USER', user);
    },
    logout: ({ commit }) => {
      commit('RESET', '');
    },
  },
});
