<template>
    <div>
      <v-btn icon @click="likeIt">
          <v-icon :color="color">mdi-heart</v-icon> {{count}}
      </v-btn>
    </div>
</template>
<script>
export default {
    props:['content'],
    data(){
        return {
            liked:this.content.liked,
            count:this.content.like_count
        }
    },
    computed:{
        color(){
            return this.liked ? 'red' : 'red lighten-4';
        }
    },
    created() {
        Echo.channel('likeChannel')
            .listen('LikeEvent', (e) => {
                if(this.content.id == e.id){
                    e.type== 1 ? this.count ++ : this.count --;
                }
            });
    },
    methods: {
        likeIt(){
                this.liked ? this.decr() : this.incr();
                this.liked = !this.liked;
        },
        incr(){
            this.$axios.post(`/replies/${this.content.id}/likes`)
            .then(res => this.count ++);
        },
        decr(){
            this.$axios.delete(`/replies/${this.content.id}/likes`)
            .then(res => this.count --);
        }
    }
}
</script>
<style>
    
</style>