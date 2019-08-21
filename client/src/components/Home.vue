<template>

  <v-container
    text-xs-center
    v-if="posts"
  >
    <v-layout row>
      <v-dialog
        v-model="loading"
        persistent
        fullscreen
      >
        <v-container fill-height>
          <v-layout
            row
            justify-center
            align-center
          >
            <v-progress-circular
              indeterminate
              :size="50"
              :width="5"
              color="primary"
            ></v-progress-circular>
          </v-layout>
        </v-container>
      </v-dialog>
    </v-layout>

    <v-carousel
      cycle
      height="400"
      hide-delimiter-background
      show-arrows-on-hover
      v-if="!loading && posts.length > 0"
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
import { networkInterfaces } from "os";
import { mapGetters } from "vuex";

export default {
  name: "home",
  created() {
    this.handleCarouselPosts();
  },
  computed: {
    ...mapGetters(["loading", "posts"])
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
