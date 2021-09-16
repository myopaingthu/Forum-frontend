<template >
    <div>
        <v-btn
            class="mx-2"
            fab
            small
            :color="color"
            @click="makeBestReply"
        > 
            <v-icon dark>
                mdi-checkbox-marked-circle-outline
            </v-icon>
        </v-btn> 
    </div>
</template>
<script>
export default {
    props:['content'],
    data(){
        return {
            is_best_reply:this.content.is_best_reply,
        }
    },
    computed:{
        color(){
            return this.is_best_reply ? 'green' : 'green lighten-4';
        }
    },
    methods: {
        makeBestReply(){
            this.is_best_reply ? this.delete() : this.store();
            this.is_best_reply = !this.is_best_reply;
        },
        store() {
            this.$axios.post(`/replies/${this.content.id}/bestReply`);
        },
        delete() {
            this.$axios.delete(`/replies/${this.content.id}/bestReply`);
        }
    }
}
</script>
<style>
    
</style>