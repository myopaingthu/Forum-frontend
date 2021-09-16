<template>
       <div>
        <vue-simplemde v-model="reply.reply"></vue-simplemde>
        <v-card-actions>
              <v-btn icon small @click="update">
                  <v-icon color="green">mdi-content-save</v-icon>
              </v-btn>
              <v-btn icon small @click="cancel">
                  <v-icon color="black">mdi-cancel</v-icon>
              </v-btn>
          </v-card-actions>
    </div>
</template>
<script>
export default {
    props:['reply', 'index'],
    methods:{
        cancel(reply){
            EventBus.$emit('replyCancelEditing', reply, this.index);
        },
        update(){
            this.$axios.put(`/replies/${this.reply.id}`,{body : this.reply.reply})
            .then(res => this.cancel(this.reply.reply));
        }
    }
}
</script>
<style scoped>
    
</style>