<template>
    <div>
        <reply 
        v-for="(reply,index) in content" 
        :key="reply.id"
        :index=index
        :data="reply"></reply>
    </div>
</template>
<script>
import Reply from "./Reply";
import { mapGetters } from "vuex";
export default {
    props:['question'],
    data() {
        return{
            content:this.question.replies
        }
    },
    components:{Reply},
    created() {
        this.listen()
    },
      computed: {
        ...mapGetters(["userId"]),
    },
    methods:{
        listen(){
            EventBus.$on('newReply',(reply) => {
                this.content.unshift(reply);
            });
            EventBus.$on('deleteReply',(index) => {
                this.$axios.delete(`/replies/${this.content[index].id}`)
                .then(res => {
                    this.content.splice(index,1);
                });
            });
            Echo.private('App.Models.User.' + this.userId)
                .notification((notification) => {
                    this.content.unshift(notification.reply);
            });
            Echo.channel('deleteReplyChannel')
            .listen('DeleteReplyEvent',(e) => {
                for(let index = 0; index < this.content.length; index++){
                    if(this.content[index].id == e.id){
                        this.content.splice(index,1)
                    }
                }
            });
        }
    }
}
</script>
<style>
    
</style>