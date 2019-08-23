import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'

import { client as apolloClient } from './main'

import { GET_BLOGS, ADD_BLOG, SIGNIN_USER, SIGNUP_USER, GET_CURRENT_USER } from './queries'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    blogs: [],
    user: null,
    loading: false,
    error: null,
    authError: null
  },
  mutations: {
    setBlogs: (state, payload) => {
      state.blogs = payload;
    },
    setUser: (state, payload) => {
      state.user = payload;
    },
    setLoading: (state, payload) => {
      state.loading = payload;
    },
    setError: (state, payload) => {
      state.error = payload;
    },
    setAuthError: (state, payload) => {
      state.authError = payload;
    },
    clearUser: state => (state.user = null),
    clearError: state => (state.error = null)
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

    getBlogs: ({ commit }) => {
      // set loading when true
      commit('setLoading', true)

      // use ApolloClient to fire getBlogs query
      apolloClient
        .query({
          query: GET_BLOGS
        }).then(({ data }) => {
          // Get data from actions t state via mutations
          // commit passes daata from actions along to mutation functions
          commit('setBlogs', data.getBlogs);

          commit('setLoading', false);

        })
        .catch(err => {
          commit('setLoading', false);
          console.error(err);

        })
    },

    addBlog: ({ commit }, payload) => {
      apolloClient
        .mutate({
          mutation: ADD_BLOG,
          variables: payload,

          update: (cache, { data: { addBlog } }) => {
            // First read the query you want to update
            const data = cache.readQuery({ query: GET_BLOGS })

            // Create updated data
            data.getBlogs.unshift(addBlog);

            //Write updated data back to query
            cache.writeQuery({
              query: GET_BLOGS,
              data
            })

          },
          // optimistic response ensures data is added immediately as we specified for the updated function
          optimisticResponse: {
            __typename: 'Mutation',
            addBlog: {
              __typename: 'Blog',
              _id: -1,
              ...payload
            }
          }
        })
        .then(({ data }) => {
          console.log(data.addBlog);

        })
        .catch(err => {
          console.error(err);

        })
    },

    //Signin User
    signinUser: ({ commit }, payload) => {
      commit('clearError')
      commit('setLoading', true)
      // clear token to prevent errors (if malformed)
      localStorage.setItem('token', '')

      apolloClient
        .mutate({
          mutation: SIGNIN_USER,
          variables: payload
        })
        .then(({ data }) => {
          commit('setLoading', false)

          // Saving / storing our taken in the localstorage
          localStorage.setItem("token", data.signinUser.token)

          // to make sure created method is run in main.js (we run getCurrentUser), reload the page
          router.go();
          // console.log(data.signinUser);

        })
        .catch(err => {
          commit('setLoading', false)

          commit('setError', err);
          console.error(err);

        });
    },

    //Signup User
    signupUser: ({ commit }, payload) => {
      commit('clearError')
      commit('setLoading', true)

      apolloClient
        .mutate({
          mutation: SIGNUP_USER,
          variables: payload
        })
        .then(({ data }) => {
          commit('setLoading', false)

          // Saving / storing our taken in the localstorage
          localStorage.setItem("token", data.signupUser.token)

          // to make sure created method is run in main.js (we run getCurrentUser), reload the page
          router.go();
        })
        .catch(err => {
          commit('setLoading', false)

          commit('setError', err);
          console.error(err);

        });
    },
    signoutUser: async ({ commit }) => {
      // clear user in state
      commit('clearUser');

      // remove token in localStorage
      localStorage.setItem('token', '');

      // end session
      await apolloClient.resetStore();

      // redirect home after user signout 
      router.push('/')
    }

  },
  getters: {
    blogs: state => state.blogs,
    user: state => state.user,
    loading: state => state.loading,
    error: state => state.error,
    authError: state => state.authError
  }
})
