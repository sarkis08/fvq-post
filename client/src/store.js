import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'

import { client as apolloClient } from './main'

import { GET_POSTS, SIGNIN_USER, SIGNUP_USER, GET_CURRENT_USER } from './queries'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: [],
    user: null,
    loading: false
  },
  mutations: {
    setPosts: (state, payload) => {
      state.posts = payload;
    },
    setUser: (state, payload) => {
      state.user = payload;
    },
    setLoading: (state, payload) => {
      state.loading = payload;
    }
  },
  actions: {

    getCurrentUser: ({ commit }) => {
      commit('setLoading', true);
      apolloClient.query({
        query: GET_CURRENT_USER
      })
        .then(({ data }) => {
          commit('setLoading', false);
          // Add user data to state
          commit('setUser', data.getCurrentUser)
          console.log(data.getCurrentUser)
        })
        .catch(err => {
          commit('setLoading', false);
          console.error(err);

        });
    },

    getPosts: ({ commit }) => {
      // set loading when true
      commit('setLoading', true)

      // use ApolloClient to fire getPosts query
      apolloClient
        .query({
          query: GET_POSTS
        }).then(({ data }) => {
          // Get data from actions t state via mutations
          // commit passes daata from actions along to mutation functions
          commit('setPosts', data.getPosts);

          commit('setLoading', false);

        })
        .catch(err => {
          commit('setLoading', false);
          console.error(err);

        })
    },

    //Signin User
    signinUser: ({ commit }, payload) => {
      apolloClient
        .mutate({
          mutation: SIGNIN_USER,
          variables: payload
        })
        .then(({ data }) => {
          // Saving / storing our taken in the localstorage
          localStorage.setItem("token", data.signinUser.token)

          // to make sure created method is run in main.js (we run getCurrentUser), reload the page
          router.go();
          // console.log(data.signinUser);

        })
        .catch(err => {
          console.error(err);

        });
    }

  },
  getters: {
    posts: state => state.posts,
    user: state => state.user,
    loading: state => state.loading
  }
})
