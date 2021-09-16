<template>
      <v-container>
        <v-card
            class="mx-auto pa-3"
            max-width="400"
            >
            <v-form @submit.prevent="signup">
                <v-text-field
                label="Name"
                v-model="form.name"
                type="text"
                required
                ></v-text-field>
                <v-alert type="error" dense v-if="errors.name">
                    {{errors.name[0]}}
                </v-alert>
                
                
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
                
                <v-text-field
                label="Password"
                v-model="form.password_confirmation"
                type="password"
                required
                ></v-text-field>

                <v-btn
                color="green"
                type="submit"
                class="mr-2"
                >Sign Up</v-btn>

                <router-link to="/login">
                    <v-btn color="blue">Login</v-btn>
                </router-link>
            </v-form>
        </v-card>
    </v-container>
</template>
<script>

export default {
    name: 'Register',

    data(){
        return {
            form :{ 
                name:null,
                email:null,
                password:null,
                password_confirmation:null
            },
            errors:{},
            data:" ",
        }
    },
    created(){
        if(true){
            // this.$router.push({name:'forum'})
        }
    },
    methods:{
        signup(){
            this.$axios.post('/register',this.form)
                .then(res => {
                    this.data = res.data.data;
                    this.$store
                        .dispatch("setToken", this.data)
                })
                .then(() => {
                    this.$router.push({ name: "QuestionIndex" });
                })
                .catch(error => this.errors = error.response.data.errors )
        }
    } 
}
</script>
<style>
    
</style>