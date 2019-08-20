<template>

  <v-container
    text-xs-center
    v-if="posts"
  >
    <v-carousel
      cycle
      height="400"
      hide-delimiter-background
      show-arrows-on-hover
    >
      <v-carousel-item
        v-for="post in posts"
        :key="post._id"
        :src="post.imageUrl"
      >
        <h2 id="carousel-title">{{post.title}} </h2>
      </v-carousel-item>
    </v-carousel>
  </v-container>

</template>

<script>
import { gql } from "apollo-boost";
import { networkInterfaces } from "os";

export default {
  name: "home",
  created() {
    this.handleCarouselPosts();
  },
  computed: {
    posts() {
      return this.$store.getters.posts;
    }
  },
  methods: {
    handleCarouselPosts() {
      // reach out Vuex store, fire action that get posts carousel
      this.$store.dispatch("getPosts");
    }
  }
};
</script> 

<style scoped>
#carousel-title {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 5px 5px 0 0;
  padding: 0.5em;
  margin: 0 auto;
  bottom: 50px;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
