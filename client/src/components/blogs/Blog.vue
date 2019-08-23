<template>
  <v-container
    v-if="getBlog"
    flexbox
    center
  >
    <v-card hover>
      <v-list-item>
        <v-btn
          icon
          large
          v-if="user"
        >
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-list-item-content>
          <v-list-item-title class="headline">{{getBlog.title}}</v-list-item-title>
          <v-list-item-subtitle> {{getBlog.likes}} LIKES</v-list-item-subtitle>
        </v-list-item-content>
        <v-spacer></v-spacer>
        <v-icon
          @click="goToPreviewPage"
          color="info"
        >arrow_back</v-icon>

      </v-list-item>

      <v-img
        @click="toggleImageDialog"
        :src="getBlog.imageUrl"
        height="60vh"
      ></v-img>

      <!-- Enlarge Blog Image -->
      <v-dialog v-model="dialog">
        <v-card>
          <v-img
            :src="getBlog.imageUrl"
            height="500px"
          />
        </v-card>
      </v-dialog>
      <v-card-text>
        <h4>{{getBlog.description}}</h4>
      </v-card-text>

      <v-card-actions>
        <span
          v-for="(category, index) in getBlog.categories"
          :key="index"
        >
          <v-chip
            class="mb-3"
            color="accent"
            text-color="white"
          >{{category}}</v-chip>
        </span>

      </v-card-actions>
    </v-card>

    <!-- Message Input -->

    <v-form
      class="mt-3"
      v-if="user"
      @submit.prevent="handleAddBlogMessage"
    >
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="messageBody"
              outlined
              clearable
              label="Add Message"
              type="text"
            >
              <template v-slot:append>
                <v-fade-transition leave-absolute>
                  <v-progress-circular
                    v-if="loading"
                    size="24"
                    color="info"
                    indeterminate
                  ></v-progress-circular>
                </v-fade-transition>
                <v-btn
                  style="top: -7px"
                  offset-y
                  icon
                  ripple
                  color="default"
                  type="submit"
                  @click:append-outer="handleAddBlogMessage"
                >
                  <v-icon>send</v-icon>
                </v-btn>
              </template>

            </v-text-field>
          </v-col>

        </v-row>
      </v-container>
    </v-form>

    <!-- Messages -->
    <v-list subheader>
      <v-subheader>Recent Messages ({{getBlog.messages.length}})</v-subheader>

      <v-list-item
        v-for="message in getBlog.messages"
        :key="message._id"
      >
        <v-list-item-avatar>
          <v-img :src="message.messageUser.avatar"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <p>{{message.messageBody}}</p>
          <v-list-item-title v-text="message.messageDate"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-icon>
          <v-icon :color="message.active ? 'deep-purple accent-4' : 'grey'">chat_bubble</v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list>

  </v-container>
</template>

<script>
import { GET_BLOG, ADD_BLOG_MESSAGE } from "../../queries";
import { mapGetters } from "vuex";

export default {
  name: "Blog",
  props: ["blogId"],

  data() {
    return {
      dialog: false,
      messageBody: "",
      message: null
    };
  },

  computed: {
    ...mapGetters(["user", "loading"])
  },

  apollo: {
    getBlog: {
      query: GET_BLOG,
      variables() {
        return {
          blogId: this.blogId
        };
      }
    }
  },

  methods: {
    handleAddBlogMessage() {
      const variables = {
        messageBody: this.messageBody,
        userId: this.user._id,
        blogId: this.blogId
      };
      this.$apollo
        .mutate({
          mutation: ADD_BLOG_MESSAGE,
          variables,
          update: (cache, { data: { addBlogMessage } }) => {
            const data = cache.readQuery({
              query: GET_BLOG,
              variables: {
                blogId: this.blogId
              }
            });
            data.getBlog.messages.unshift(addBlogMessage);
            cache.writeQuery({
              query: GET_BLOG,
              variables: {
                blogId: this.blogId
              },
              data
            });
          }
        })
        .then(({ data }) => {
          console.log(data.addBlogMessage);
          this.loading = true;
          this.messageBody = "Sending message ...";
          setTimeout(() => {
            this.loading = false;
            this.messageBody = "Message Sent!";
          }, 2000);
        })
        .catch(err => console.error(err));
    },
    goToPreviewPage() {
      this.$router.go(-1);
    },

    toggleImageDialog() {
      if (window.innerWidth > 500) {
        this.dialog = !this.dialog;
      }
    }
  }
};
</script>