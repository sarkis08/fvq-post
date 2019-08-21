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
export default {
  name: "App",
  data() {
    return {
      loading: false
    };
  },
  components: {
    Navbar,
    Footer
  }
};
</script>

<style scoped>
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
