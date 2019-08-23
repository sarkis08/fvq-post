<template>

  <v-container
    text-xs-center
    v-if="blogs"
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
      v-if="!loading && blogs.length > 0"
    >
      <v-carousel-item
        style="cursor: pointer"
        v-for="blog in blogs"
        :key="blog._id"
        :src="blog.imageUrl"
        @click.native="gotToBlog(blog._id)"
      >
        <h2 id="carousel-title">{{blog.title}} </h2>
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
    this.handleCarouselBlogs();
  },
  computed: {
    ...mapGetters(["loading", "blogs"])
  },
  methods: {
    handleCarouselBlogs() {
      // reach out Vuex store, fire action that get blogs carousel
      this.$store.dispatch("getBlogs");
    },
    gotToBlog(blogId) {
      this.$router.push(`/blog/${blogId}`);
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
