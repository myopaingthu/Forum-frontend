<template>
    <v-container fluid grid-list-md>
        <v-layout row wrap>
        <v-flex xs8>
            <question
                v-for="question in questions"
                :key="question.path"
                :data=question
                ></question>

            <div class="text-xs-center">
            <v-pagination
                v-model="meta.current_page"
                :length="meta.total"
                @input="changePage"
            ></v-pagination>
            </div>
        </v-flex>
        
        <v-flex xs4>
            <v-card>
                <v-toolbar color="indigo" dark dense class="mt-2">
                    <v-toolbar-title>Categories</v-toolbar-title>
                </v-toolbar>

                <v-list>
                    <v-list-item-group
                        v-model="selectedItem"
                        color="primary"
                    >
                    <v-list-item v-for="(category,index) in categories" :key="category.id">
                        <v-list-item-content>
                            <v-list-item-title  @click="show(category.slug)">
                                    {{category.name}}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-card>
        </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import { mapGetters } from "vuex";
import Question from "./Question";
export default {

    data(){
        return {
            questions:{},
            errors: {},
            meta:{},
            selectedItem: "",
            categories:{}
        }
    },
    components:{
        Question
    },
    computed: {
        ...mapGetters(["userId", "token"]),
    },
    created() {
        this.fetchQuestions();
         this.$axios.get('/categories')
        .then(res => this.categories = res.data.data)
        .catch(error => console.log(error));
    },
    methods: {
        fetchQuestions(page){
            this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
            let url = page ? `/questions?page=${page}`: '/questions';
            this.$axios.get(url)
                .then(res => {
                    this.questions = res.data.data;
                    this.meta = res.data.meta;
                    })
                .catch(error => console.log(error.response.data));
        },
        changePage(page){
            this.fetchQuestions(page);
        },
         show(slug) {
            this.$axios.get(`/categories/${slug}`)
                .then(res => {
                    this.questions = res.data.data;
                    this.meta = res.data.meta;
                    })
                .catch(error => console.log(error.response.data));
        }
    } 
}
</script>
<style scoped>
    
</style>