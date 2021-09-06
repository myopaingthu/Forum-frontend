<template>
  <v-toolbar color="indigo" dark>
    <v-toolbar-title>
      <router-link class="white--text" style="text-decoration: none; color: white;" to="/">Ask For Ans</router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <!-- <app-notification v-if="loggedIn"></app-notification> -->
    <div class="hidden-sm-and-down">
      <router-link 
        v-for="item in items"
        :key="item.title"
        :to="item.to"
        v-if="item.show"
        class="mr-3"
        style="text-decoration: none;
        color: white;">
        {{item.title}}
      </router-link>

      <v-menu v-if="isLoggedIn" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            dark
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-btn 
              class="mx-2"
              icon 
              @click="logOut">
               Log out 
            </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-toolbar>
</template>

<script>
import store from "../store";
// import AppNotification from "./AppNotification";
export default {
    name: 'Toolbar',
//   components: { AppNotification },
  data() {
    return {
      isLoggedIn: "",
      items: [
        { title: "Forum", to: "/questions", show: true },
        { title: "Ask Question", to: "/ask", show: store.getters.isLoggedIn },
        { title: "Category", to: "/categories", show: store.getters.isLoggedIn },
        { title: "Login", to: "/login", show: !store.getters.isLoggedIn },
        { title: "Register", to: "/register", show: !store.getters.isLoggedIn }
      ],
      userName: "",
    };
  },
  created() {
    this.isLoggedIn = store.getters.isLoggedIn;
  },
  methods: {
    logOut() {
      console.log("log out");
      this.$axios.post('/logout')
        .then(() => {
            this.$store
                .dispatch("destroyToken")
                .then(() => {
                this.$router.push({ name: "Welcome" });
                })
                  .catch(err => {
                console.log(err);
                });
        })
        .catch((error) => {
            // this.errors = error.response.data.errors;
            console.log(error);
        });
    },
  }
};
</script>

<style scoped>

</style