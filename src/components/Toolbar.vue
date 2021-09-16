<template>
  <v-toolbar color="indigo" dark>
    <v-toolbar-title>
      <router-link class="white--text" style="text-decoration: none; color: white;" to="/">Ask For Ans</router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <app-notification v-if="isLoggedIn"></app-notification>
    <div class="hidden-sm-and-down">
      <router-link 
        :to="'/questions'"
        v-if="isLoggedIn"
        class="mr-3"
        style="text-decoration: none;
        color: white;">
        Forum
      </router-link>
      <router-link 
        :to="'/ask'"
        v-if="isLoggedIn"
        class="mr-3"
        style="text-decoration: none;
        color: white;">
        Ask Question
      </router-link>
      <router-link 
        :to="'/categories'"
        v-if="isLoggedIn"
        class="mr-3"
        style="text-decoration: none;
        color: white;">
        Category
      </router-link>
      <router-link 
        :to="'/login'"
        v-if="!isLoggedIn"
        class="mr-3"
        style="text-decoration: none;
        color: white;">
        Log In
      </router-link>
      <router-link 
        :to="'/register'"
        v-if="!isLoggedIn"
        class="mr-3"
        style="text-decoration: none;
        color: white;">
        Register
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
// import store from "../store";
import AppNotification from "./AppNotification";
import { mapGetters } from "vuex";
export default {
    name: 'Toolbar',
  components: { AppNotification },
  data() {
    return {
      // isLoggedIn: "",
     
      userName: "",
    };
  },
  // created() {
  //   this.isLoggedIn = store.getters.isLoggedIn;
  // },
  computed: {
        ...mapGetters(["userId", "token", "isLoggedIn"]),
  },
  methods: {
    logOut() {
      this.$axios.post('/logout')
        .then(() => {
          this.$store
            .dispatch("destroyToken")
        })
        .then(() => {
                this.$router.push({ name: "Welcome" });
        })
        .catch((error) => {
            console.log(error);
        });
    },
  }
};
</script>

<style scoped>

</style