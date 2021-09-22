<template>
  <v-app>
    <v-main>
      <Toolbar/>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import Toolbar from './components/Toolbar.vue';

export default {
  name: 'App',

  components: {
    Toolbar
  },

  data: () => ({
    //
  }),

  computed: {
    ...mapGetters(["token"]),
  },

  created() {
   
  },
};
</script>
 

