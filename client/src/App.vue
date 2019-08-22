<template>
  <v-app class="App">
    <v-progress-linear
      :active="loading"
      :indeterminate="loading"
      absolute
      top
      color="deep-purple accent-4"
    ></v-progress-linear>
    <Navbar />
    <!--App Content-->
    <main>
      <!-- Auth Snackbar -->
      <v-snackbar
        v-model="authSnackbar"
        color="success"
        top
        right
        :timeout="5000"
      >
        <v-icon class="mr-3">check_circle</v-icon>
        <h3>You logged in!</h3>
        <v-btn
          dark
          text
          @click="authSnackbar = false"
        >Close</v-btn>
      </v-snackbar>

      <!-- Auth Error Snackbar -->
      <v-snackbar
        v-if="authError"
        v-model="authErrorSnackbar"
        color="warning"
        buttom
        left
        :timeout="5000"
      >
        <v-icon class="mr-3">cancel</v-icon>
        <h3>{{authError.message}}</h3>
        <v-btn
          dark
          text
          to="/signin"
        >Signin</v-btn>
      </v-snackbar>

      <v-container class="mt-1">
        <transition name="fade">
          <router-view />

        </transition>

      </v-container>
    </main>
    <Footer />
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { mapGetters } from "vuex";

export default {
  name: "App",
  data() {
    return {
      loading: false,
      authSnackbar: false,
      authErrorSnackbar: false
    };
  },
  computed: {
    ...mapGetters(["user", "authError"])
  },
  watch: {
    user(newValue, oldValue) {
      // If we had no value for user before, show snackbar

      if (oldValue === null) {
        this.authSnackbar = true;
      }
    },

    authError(value) {
      // if auth error is not null, show auth error snackbar
      if (value !== null) {
        this.authErrorSnackbar = true;
      }
    }
  },
  components: {
    Navbar,
    Footer
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-property: all;
  transition-duration: 0.25s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
  transform: translateX(-25px);
}
</style>
