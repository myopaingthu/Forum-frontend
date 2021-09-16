<template>
     <div class="mt-4">
        <v-form @submit.prevent="submit">
            <vue-simplemde v-model="form.body"></vue-simplemde>
            <v-btn type="submit" color="green" :disabled="disabled">Reply</v-btn>
        </v-form>
    </div>
</template>
<script>
export default {
    props:['questionSlug'],
    data() {
        return {
            form: {
                body: null
            },
        }
    },
    methods: {
        submit(){
            this.$axios.post(`/questions/${this.questionSlug}/replies`, this.form)
            .then(res => {
                this.form.body = '';
                EventBus.$emit('newReply', res.data.data);
                window.scrollTo(0,0);
            })
            .catch(error => (console.log(error)));
        }
    },
    computed: {
        disabled() {
        return !this.form.body;
        }
    }
}
</script>
<style scoped>
    
</style>