<template>
    <div class="mt-3">
      <v-card>
          <v-card-title>
              <div class="headline">{{data.user}}</div>
              <div class="ml-2">said {{data.created_at}}</div>
              <v-spacer></v-spacer>
                <v-btn
                    class="mx-2"
                    fab
                    small
                    color="green"
                    v-if="bestReply"
                > 
                <v-icon dark>
                    mdi-checkbox-marked-circle-outline
                </v-icon>
                </v-btn>
              <best-reply v-if="ownQuestion" :content = "data"></best-reply>
              <like-index :content = "data"></like-index>
          </v-card-title>
          <v-divider></v-divider>

          <edit 
          v-if="editing"
          :reply=data
          :index=index
          ></edit>

          <v-card-text v-else v-html="reply"></v-card-text>

        <v-divider></v-divider>
        <div v-if="!editing">
            <v-card-actions v-if="own">
              <v-btn icon small @click="edit">
                  <v-icon color="orange">mdi-circle-edit-outline</v-icon>
              </v-btn>
              <v-btn icon small @click="destroy">
                  <v-icon color="red">mdi-delete</v-icon>
              </v-btn>
            </v-card-actions>
        </div>
      </v-card>
    </div>
</template>
<script>
import LikeIndex from "../Likes/LikeIndex";
import Edit from "./Edit";
import BestReply from "../BestReplies/BestReply";
import { mapGetters } from "vuex";
export default {
    props:['data','index'],
    components:{Edit, LikeIndex, BestReply},
    data() {
        return {
            editing: false,
            beforeEditReplyBody:'',
            bestReply: false
        }
    },
    computed: {
        own() {
            return this.data.user_id == this.userId;
        },
        
        reply() {
            return md.parse(this.data.reply);
        },
        ownQuestion() {
            return this.data.user_id != this.userId && this.data.question_user == this.userId;
        },
        // bestieReply() {
        //     return this.data.is_best_reply && this.data.question_user != this.userId;
        // },
        ...mapGetters(["userId"]),
    },
    created() {
        this.listen();
        this.bestReply = this.data.is_best_reply && this.data.question_user != this.userId;
    },
    methods: {
        destroy(){
            EventBus.$emit('deleteReply', this.index);
        },
        edit(){
            this.editing = true;
            this.beforeEditReplyBody = this.data.reply;
        },
        listen(){
            EventBus.$on('replyCancelEditing',(reply, index)=>{
                this.editing = false;
                if(reply !== this.data.reply && index == this.index){
                    this.data.reply = this.beforeEditReplyBody;
                    this.beforeEditReplyBody = '';
                }
            });
            Echo.channel('BestReplyChannel')
                .listen('BestReplyEvent', (e) => {
                    if (this.data.id == e.id)
                        e.type == 1 ? this.bestReply =  true : this.bestReply =  false;
                });
        }
    }
}
</script>
<style>
    
</style>