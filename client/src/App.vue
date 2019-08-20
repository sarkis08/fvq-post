<template>
  <v-app class="App">
    <Navbar />
    <!--App Content-->
    <main>
      <v-container class="mt-3">
        <router-view />

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
  components: {
    Navbar,
    Footer
  }
};
</script>
