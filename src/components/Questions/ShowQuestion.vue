<template>
    <v-card>
        <v-container fluid>
            <v-card-title>
                <div>
                    <div class="headline">
                        {{data.title}}
                    </div>
                    <span class="grey--text">{{data.user}} said {{data.created_at}}</span>
                </div>
                <v-spacer></v-spacer>
                <v-btn color="teal" dark>{{replyCount}} Replies</v-btn>
            </v-card-title>

            <v-card-text v-html="body"></v-card-text>

            <v-card-actions v-if="own">
                <v-btn icon small @click="edit">
                    <v-icon color="orange">mdi-circle-edit-outline</v-icon>
                </v-btn>
                <v-btn icon small @click="destroy">
                    <v-icon color="red">mdi-delete</v-icon>
                </v-btn>
            </v-card-actions>
        </v-container>
    </v-card>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    props:['data'],
    data(){
        return {
            replyCount:this.data.reply_count
        }
    },
    computed:{
        body() {
            return md.parse(this.data.body);
        },
        own() {
            return this.data.user_id == this.userId;
        },
        ...mapGetters(["userId"]),
    },
    methods:{
        destroy(){
            this.$axios.delete(`/questions/${this.data.slug}`)
            .then(res => this.$router.push('/questions'))
            .catch(error => console.log(error.response.data));
        },
        edit(){
            EventBus.$emit('startEditing');
        }
    }
}
</script>
<style scoped>
    
</style>