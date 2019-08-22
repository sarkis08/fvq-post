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

      <v-list-item v-if="this.user">
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
          v-for="item in sideNavItems"
          :key="item.title"
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icons }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <!--Logout Button-->
      <div
        class="pa-2"
        v-if="this.user"
        @click="handleSignoutUser"
      >
        <v-btn
          block
          class="warning"
        >Logout</v-btn>
      </div>
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
        :append-icon-cb="() => {}"
        placeholder="Search..."
        single-line
        append-icon="search"
        color="white"
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>

      <v-btn
        text
        to="/notification"
        v-if="user"
      >
        <v-badge
          overlap
          color="warning"
        >
          <!-- <span slot="badge">0</span> -->
          <v-icon
            large
            color="white darken-1"
          >
            notifications
          </v-icon>
        </v-badge>
      </v-btn>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          text
          rounded
          v-for="item in horizontalNavItems"
          :key="item.title"
          :to="item.link"
        >
          <v-icon
            left
            class="hidden-md-only"
          >{{ item.icons }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>

      <!-- Logout button -->
      <v-btn
        text
        rounded
        v-if="user"
        class="warning hidden-xs-only"
        @click="handleSignoutUser"
      >
        <v-icon
          class="hidden-md-only"
          left
        >exit_to_app</v-icon>
        Logout
      </v-btn>
    </v-toolbar>

  </div>

</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Navbar",
  data() {
    return {
      sideNav: false
    };
  },
  computed: {
    ...mapGetters(["user"]),

    horizontalNavItems() {
      let items = [
        { icons: "lock_open", title: "Sign In", link: "/signin" },
        { icons: "create", title: "Sign Up", link: "/signup" }
      ];

      if (this.user) {
        items = [
          { icons: "chat", title: "View Blogs", link: "/blogs" },
          { icons: "chat", title: "Add Blog", link: "/blog/add" },
          { icons: "dashboard", title: "Dashboard", link: "/dashboard" }
        ];
      }

      return items;
    },

    sideNavItems() {
      let items = [
        { icons: "lock_open", title: "Sign In", link: "/signin" },
        { icons: "create", title: "Sign Up", link: "/signup" }
      ];

      if (this.user) {
        items = [
          { icons: "chat", title: "View Blog", link: "/blogs" },
          { icons: "chat", title: "Create Blog", link: "/blog/add" },
          { icons: "dashboard", title: "Dashboard", link: "/dashboard" }
        ];
      }

      return items;
    }
  },
  methods: {
    handleSignoutUser() {
      this.$store.dispatch("signoutUser");
    },

    toggleSideNav() {
      this.sideNav = !this.sideNav;
    }
  }
};
</script> 