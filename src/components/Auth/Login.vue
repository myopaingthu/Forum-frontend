<template>
        <v-container>
        <v-card
            class="mx-auto pa-3"
            max-width="400"
            >
            <v-form @submit.prevent="login">

            <v-text-field
            label="E-mail"
            v-model="form.email"
            type="email"
            required
            ></v-text-field>
            <v-alert type="error" dense v-if="errors.email">
                {{errors.email[0]}}
            </v-alert>

            <v-text-field
            label="Password"
            v-model="form.password"
            type="password"
            required
            ></v-text-field>
            <v-alert type="error" dense v-if="errors.password">
                {{errors.password[0]}}
            </v-alert>

            <v-btn
            color="green"
            type="submit"
            class="mr-2"
            >Login</v-btn>

            <router-link to="/register">
                <v-btn color="blue">Sign Up</v-btn>
            </router-link>
        </v-form>
        </v-card>
    </v-container>
</template>
<script>
// import { mapGetters } from "vuex";
export default {
    name: 'Login',

    data(){
        return {
            form :{
                email:null,
                password:null
            },
            errors: {},
            data:" ",
        }
    },
    //  computed: {
    //     ...mapGetters(["token"]),
    // },
    created() {
        // if(User.loggedIn()){
        //     this.$router.push({name:'forum'})
        // }
    },
      methods:{
        login(){
            this.$axios.post('/login',this.form)
            .then(res => {
                this.data = res.data.data;
                this.$store
                    .dispatch("setToken", this.data)
                    .then(() => {
                    this.$router.push({ name: "QuestionIndex" });
                    })
                     .catch(err => {
                    this.errors = err.response.data.errors;
                    });
                })
            .catch((error) => {
                this.errors = error.response.data.errors;
                });
        }
    } 
}
</script>
<style>
    
</style>