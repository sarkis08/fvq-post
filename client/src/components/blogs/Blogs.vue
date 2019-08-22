<template>
  <v-container v-if="infiniteScrollBlogs">
    <div
      v-for="blog in infiniteScrollBlogs.blogs"
      :key="blog._id"
    >
      <img
        :src="blog.imageUrl"
        alt=""
        height="100px"
      >
      <h3>{{ blog.title }}</h3>
    </div>
    <v-btn
      @click="showMoreBlogs"
      v-if="showMoreEnabled"
    >Fetch More</v-btn>
  </v-container>
</template>

<script>
import { INFINITE_SCROLL_BLOGS } from "../../queries";

const pageSize = 2;

export default {
  name: "Blogs",
  data() {
    return {
      pageNum: 1,
      showMoreEnabled: true
    };
  },

  apollo: {
    infiniteScrollBlogs: {
      query: INFINITE_SCROLL_BLOGS,
      variables: {
        pageNum: 1,
        pageSize
      }
    }
  },
  methods: {
    showMoreBlogs() {
      this.pageNum += 1;

      // fetch more data and transform original results
      this.$apollo.queries.infiniteScrollBlogs.fetchMore({
        variables: {
          // pageNum increase by 1
          pageNum: this.pageNum,
          pageSize
        },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          const newBlogs = fetchMoreResult.infiniteScrollBlogs.blogs;
          const hasMore = fetchMoreResult.infiniteScrollBlogs.hasMore;

          this.showMoreEnabled = hasMore;

          return {
            infiniteScrollBlogs: {
              __typename: prevResult.infiniteScrollBlogs.__typename,

              // Merge previous blogs with new blogs
              blogs: [...prevResult.infiniteScrollBlogs.blogs, ...newBlogs],
              hasMore
            }
          };
        }
      });
    }
  }
};
</script>