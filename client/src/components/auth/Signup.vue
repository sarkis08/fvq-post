<template>
  <v-container
    class="fill-height"
    fluid
    text-center
  >
    <v-layout>
      <v-flex
        xs12
        sm6
        lg4
        offset-sm3
        offset-lg4
      >
        <!-- Error Alert -->
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
              @submit.prevent="handleSignupUser"
            >
              <v-text-field
                :rules="usernameRules"
                label="Username"
                v-model="username"
                prepend-icon="person"
                type="text"
              ></v-text-field>

              <v-text-field
                :rules="emailRules"
                label="Email"
                v-model="email"
                prepend-icon="mail"
                type="text"
              ></v-text-field>

              <v-text-field
                :rules="passwordRules"
                label="Password"
                v-model="password"
                prepend-icon="lock"
                type="password"
              ></v-text-field>

              <v-text-field
                :rules="confirm_passwordRules"
                label="Confirm Password"
                v-model="confirm_password"
                prepend-icon="lock"
                type="password"
              ></v-text-field>
              <br>
              <v-btn
                :disabled="!valid || loading"
                :loading="loading"
                block
                color="primary"
                type="submit"
              >Signup
                <span class="custom-loader">
                </span>
              </v-btn>
              <br>
              <p>Already have an account?
                <router-link to="/signin">Signin</router-link>
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
  name: "Signup",
  data() {
    return {
      lazy: false,
      valid: true,
      username: "",
      email: "",
      password: "",
      confirm_password: "",

      usernameRules: [
        // Check if username empty, min 4 char and max 10 char
        username => !!username || "Username required!",
        username => (username || "").length >= 4 || "Min 4 characters",
        username => (username || "").length <= 10 || "Max 10 characters"
      ],
      emailRules: [
        email => !!email || "Required.",
        email => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(email) || "Invalid e-mail.";
        }
      ],
      passwordRules: [
        password => !!password || "Password required!",
        password =>
          (password || "").length >= 6 || "Provide atleast 6 characters"
      ],
      confirm_passwordRules: [
        confirm_password => !!confirm_password || "Confirm password required!",

        confirm_password =>
          this.password !== confirm_password ? "Password don't match!" : false
      ]
    };
  },
  watch: {
    user(value) {
      // if user value changes from object, redirect to home page

      if (value) {
        this.$router.push("/");
      }
    }
  },
  computed: {
    ...mapGetters(["error", "loading", "user"])
  },
  methods: {
    handleSignupUser() {
      if (this.$refs.form.validate()) {
        // signup user action
        this.$store.dispatch("signupUser", {
          username: this.username,
          email: this.email,
          password: this.password
        });
      }
    }
  }
};
</script>