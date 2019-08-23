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

        <v-flex>
          <h2 class="primary--text">Add Blog</h2>
        </v-flex>
        <v-form
          v-model="valid"
          ref="form"
          :lazy-validation="lazy"
          @submit.prevent="handleAddBlog"
        >
          <v-text-field
            v-model="title"
            label="Blog Title"
            :rules="titleRules"
            type="text"
            required
          ></v-text-field>

          <v-text-field
            v-model="imageUrl"
            label="Image URL"
            :rules="imageRules"
            type="text"
            required
          ></v-text-field>

          <!-- Image Preview -->
          <v-layout row>
            <v-flex xs12>
              <img
                :src="imageUrl"
                height="250px"
              >
            </v-flex>
          </v-layout>

          <!-- Categories Select -->
          <v-select
            :rules="categoryRules"
            v-model="categories"
            label="Select Categories"
            :items="['Art', 'Food', 'Furniture', 'Education', 'Travel', 'Photography', 'Techology']"
            multiple
            required
          ></v-select>

          <!-- Description Field -->
          <v-textarea
            v-model="description"
            label="Blog Description"
            :rules="descRules"
            type="text"
            required
            col="12"
          ></v-textarea>
          <br>
          <v-btn
            class="mr-4"
            :disabled="!valid || loading"
            :loading="loading"
            color="primary"
            type="submit"
          >submit</v-btn>

        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AddBlog",

  data() {
    return {
      lazy: true,
      valid: true,
      title: "",
      imageUrl: "",
      categories: [],
      description: "",

      titleRules: [title => !!title || "Title require!"],
      imageRules: [imageUrl => !!imageUrl || "Image URL require!"],
      categoryRules: [
        categories => categories.length >= 1 || "Atleast on category is require"
      ],
      descRules: [description => !!description || "Description require!"]
    };
  },
  computed: {
    ...mapGetters(["loading", "user"])
  },
  methods: {
    handleAddBlog() {
      if (this.$refs.form.validate()) {
        // add blog action

        this.$store.dispatch("addBlog", {
          title: this.title,
          imageUrl: this.imageUrl,
          categories: this.categories,
          description: this.description,
          createdId: this.user._id
        });

        this.$router.push("/");
      }
    }
  }
};
</script>