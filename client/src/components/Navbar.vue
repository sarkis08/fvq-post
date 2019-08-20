<template>
  <div>
    <v-navigation-drawer
      v-model="sideNav"
      absolute
      temporary
    >

      <v-toolbar color="">
        <v-app-bar-nav-icon
          @click="toggleSideNav"
          style="cursor: pointer"
        ></v-app-bar-nav-icon>
        <v-toolbar-title>
          <router-link
            to='/'
            tag="span"
            style="cursor: pointer"
          >
            <h4>Salone Blog</h4>
          </router-link>
        </v-toolbar-title>
      </v-toolbar>

      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>John Leider</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>

        <v-list-item
          v-for="item in horizontalNavItems"
          :key="item.title"
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <!--Logout Button-->
      <template v-slot:append>
        <div class="pa-2">
          <v-btn
            block
            class="warning"
          >Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-toolbar
      fixed
      class="teal"
      dark
    >
      <v-app-bar-nav-icon
        class="hidden-lg-only"
        @click="toggleSideNav"
      ></v-app-bar-nav-icon>

      <v-toolbar-title class="hidden-xs-only">
        <router-link
          to='/'
          tag="span"
          style="cursor: pointer"
        >
          Salone Blog
        </router-link>

      </v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- Search Input -->
      <v-text-field
        flex
        icon="search"
        placeholder="Search ..."
        color="accent"
        single-line
      ></v-text-field>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          text
          rounded
          v-for="item in horizontalNavItems"
          :key="item.title"
          :to="item.link"
        >
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

  </div>

</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      sideNav: false
    };
  },
  computed: {
    horizontalNavItems() {
      return [
        { icons: "chat", title: "Post", link: "/posts" },
        { icons: "lock_open", title: "Sign In", link: "/signin" },
        { icons: "create", title: "Sign Up", link: "/signup" }
      ];
    }
  },
  methods: {
    toggleSideNav() {
      this.sideNav = !this.sideNav;
    }
  }
};
</script> 