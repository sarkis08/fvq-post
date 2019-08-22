<template>
  <v-container
    text-center
    mt-3
    pt5
  >

    <!-- Signin Title -->
    <v-layout
      row
      wrap
    >
      <v-flex
        xs12
        sm6
        offset-sm3
      >
        <h2>Welcome Back!</h2>
      </v-flex>
    </v-layout>

    <v-layout>
      <v-flex
        xs12
        sm6
        lg4
        offset-sm3
        offset-lg4
      >

        <flex v-if="error">
          <form-alert :message="error.message">
          </form-alert>
        </flex>

        <v-card class="elevation-12">
          <v-toolbar
            color="primary"
            dark
            flat
          >
            <v-toolbar-title>Signup form</v-toolbar-title>
            <div class="flex-grow-1"></div>
          </v-toolbar>
          <v-card-text>
            <v-form
              ref="form"
              v-model="valid"
              :lazy-validation="lazy"
              @submit.prevent="handleSigninUser"
            >

              <v-text-field
                :rules="usernameRules"
                v-model="username"
                prepend-icon="person"
                label="Username"
                type="text"
              ></v-text-field>

              <v-text-field
                :rules="passwordRules"
                v-model="password"
                prepend-icon="lock"
                label="Password"
                type="password"
              ></v-text-field>
              <v-btn
                :disabled="!valid || loading"
                :loading="loading"
                color="accent"
                block
                type="submit"
              >Signin
                <span class="custom-loader">
                </span>
              </v-btn>
              <br>
              <p>You don't have an account?
                <router-link to="/signup">Signup</router-link>
              </p>

            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Signin",
  data() {
    return {
      lazy: false,
      valid: true,
      username: "",
      password: "",

      usernameRules: [
        // Check if username empty, min 4 char and max 10 char
        username => !!username || "Username required!",
        username => (username || "").length >= 4 || "Min 4 characters",
        username => (username || "").length <= 10 || "Max 10 characters"
      ],
      passwordRules: [
        password => !!password || "Password required!",
        password =>
          (password || "").length >= 6 || "Provide atleast 6 characters"
      ]
    };
  },
  computed: {
    ...mapGetters(["user", "error", "loading"])
  },
  watch: {
    user(value) {
      // if user value changes from object, redirect to home page

      if (value) {
        this.$router.push("/");
      }
    }
  },
  methods: {
    handleSigninUser() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("signinUser", {
          username: this.username,
          password: this.password
        });
      }
    }
  }
};
</script>

<style>
/** Custom loader **/
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>