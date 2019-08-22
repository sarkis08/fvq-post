import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'

import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'

import FormAlert from './components/shared/FormAlert'

// Register Global Component
Vue.component('form-alert', FormAlert)

Vue.use(VueApollo)

// Setup ApolloCleint
export const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',

  // include auth token with requests made to backend
  fetchOptions: {
    credentials: 'include'
  },

  request: operation => {
    // if no token with key of 'token' in localStorage, add it
    if (!localStorage.token) {
      localStorage.setItem('token', '')
    }

    // operation adds the token to an authorization header, which is sent to backend
    operation.setContext({
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
  },
  onError: ({ graphQLErrors, networkError }) => {
    if (networkError) {
      console.log('[networkError]', networkError);

    }

    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        console.dir(err);

        if (err.name === "AuthenticationError") {
          // set auth error in state (to show in snackbar)
          store.commit('setAuthError', err)

          // signout user (to clear token)
          store.dispatch('signoutUser')
        }
      }
    }
  }
})

const apolloProvider = new VueApollo({
  defaultClient: client
})


Vue.config.productionTip = false

new Vue({
  apolloProvider,
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    // execute getCurrentUser query
    this.$store.dispatch('getCurrentUser');
  },
}).$mount('#app')
