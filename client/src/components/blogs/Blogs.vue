<template>
  <v-container
    fluid
    grid-list-md
  >

    <!-- Blog Cards -->
    <v-layout
      row
      wrap
      v-if="infiniteScrollBlogs"
    >
      <v-flex
        xs12
        sm6
        v-for="blog in infiniteScrollBlogs.blogs"
        :key="blog._id"
      >
        <v-card hover>
          <v-img
            :src="blog.imageUrl"
            height="30vh"
            lazy
            @click.native="gotToBlog(blog._id)"
          ></v-img>

          <v-card-title>
            <div>{{blog.title}}</div>

          </v-card-title>

          <v-card-actions>
            &nbsp;&nbsp;<span class="grey--text subtitle-1">{{blog.likes}} likes - {{blog.messages.length}} comment(s)</span>
            <div class="flex-grow-1"></div>
            <v-btn
              icon
              @click="show = !show"
            >
              <v-icon>{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
            </v-btn>
          </v-card-actions>

          <!-- Blog Creator -->

          <v-slide-y-transition>
            <v-list-item
              class="gray
              dark-1"
              v-show="show"
            >
              <v-list-item-avatar>
                <v-img
                  class="elevation-6"
                  :src="blog.createdBy.avatar"
                ></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title class="primary--text">{{blog.createdBy.username}}</v-list-item-title>
                <v-list-item-subtitle class="font-weight-thin">Added {{blog.createdDate}}</v-list-item-subtitle>
              </v-list-item-content>

              <v-row
                justify="end"
                align="center"
              >
                <v-btn
                  icon
                  ripple
                >
                  <v-icon color="grey lighten-1">info</v-icon>
                </v-btn>
              </v-row>
            </v-list-item>
          </v-slide-y-transition>
        </v-card>
      </v-flex>
    </v-layout>

    <!-- Fetch More Button -->
    <v-layout
      v-if="showMoreEnabled"
      column
    >
      <v-flex xs12>
        <v-layout
          justify-center
          row
        >
          <v-btn
            color="info"
            @click="showMoreBlogs"
          >Fetch More</v-btn>
        </v-layout>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
import { INFINITE_SCROLL_BLOGS } from "../../queries";

const pageSize = 2;

export default {
  name: "Blogs",
  data() {
    return {
      show: false,
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
    },
    gotToBlog(blogId) {
      this.$router.push(`/blog/${blogId}`);
    }
  }
};
</script>