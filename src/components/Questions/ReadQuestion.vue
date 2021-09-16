<template>
    <div v-if="question">
        <edit-question
         v-if="editing"
         :data = question
         ></edit-question>

        <show-question
            v-else
            :data = question
            ></show-question>

        <v-container>
            <reply-index :question="question"></reply-index>

            <create v-if="isLoggedIn" :questionSlug="question.slug"></create>
            
        </v-container>
    </div>
</template>
<script>
import ShowQuestion from "./ShowQuestion";
import EditQuestion from "./EditQuestion";
import ReplyIndex from "../Replies/ReplyIndex";
import Create from "../Replies/Create";
import { mapGetters } from "vuex";
export default {
    components:{ShowQuestion, EditQuestion, ReplyIndex, Create},
    data(){
        return {
            question:null,
            editing:false,
            beforeEditQuestionTitle:'',
            beforeEditQuestionBody:''
        }
    },
    created(){
        this.listen();
        this.getQuestion();
    },
    computed: {
        ...mapGetters(["isLoggedIn"]),
    },
    methods:{
        listen(){
            EventBus.$on('startEditing',()=>{
                this.editing = true;
                this.beforeEditQuestionTitle = this.question.title;
                this.beforeEditQuestionBody = this.question.body;
            });
            EventBus.$on('cancelEditing',(title, body)=>{
                this.editing = false;
                if (title !== this.question.title && body !== this.question.body) {
                    this.question.title = this.beforeEditQuestionTitle;
                    this.question.body = this.beforeEditQuestionBody;
                    this.beforeEditQuestionTitle = '';
                    this.beforeEditQuestionBody = '';
                }
            });
        },
        getQuestion(){
            this.$axios.get(`/questions/${this.$route.params.slug}`)
            .then(res => this.question = res.data.data);
        }
    }
}
</script>
<style>
    
</style>