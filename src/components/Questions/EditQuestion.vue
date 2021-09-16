<template>
    <v-container fluid>
      <v-card>
        <v-form @submit.prevent="update">
            
            <v-text-field
                label="Title"
                v-model="form.title"
                type="text"
                required
                ></v-text-field>

                <vue-simplemde v-model="form.body"></vue-simplemde>

                <v-card-actions>
                    <v-btn color="teal" type="submit">
                        Save
                    </v-btn>
                    
                    <v-btn color="red" @click="cancel">
                        Cancel
                    </v-btn>
                </v-card-actions>

        </v-form>
      </v-card>
    </v-container>
</template>
<script>
export default {
    props:['data'],
    data(){
        return {
            form : {
                title : null,
                body : null
            }
        }
    },
    methods:{
        cancel(title, body){
            EventBus.$emit('cancelEditing', title, body);
        },
        update(){
            this.$axios.put(`/questions/${this.form.slug}`,this.form)
            .then(res => this.cancel(this.form.title, this.form.body));
        }
    },
    created(){
        this.form = this.data;
    }
}
</script>
<style scoped>
    
</style>