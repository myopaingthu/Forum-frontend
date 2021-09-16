<template>
     <v-container>
        <v-form @submit.prevent="create">

            <span class="red--text" v-if="errors.title">{{ errors.title[0] }}</span>
            <v-text-field
            label="Title"
            v-model="form.title"
            type="text"
            required
            autocomplete="off"
            ></v-text-field>

            <span class="red--text" v-if="errors.category_id">{{ errors.category_id[0] }}</span>
            <v-select
            :items="categories"
            item-text="name"
            item-value="id"
            v-model="form.category_id"
            label="Category"
            autocomplete
            ></v-select>

            <span class="red--text" v-if="errors.body">{{ errors.body[0] }}</span>
            <vue-simplemde v-model="form.body"></vue-simplemde>

            <v-btn
            color="green"
            type="submit"
            :disabled="disabled"
            >Create</v-btn>
        </v-form>
  </v-container>
</template>
<script>
export default {
    data() {
        return {
            form: {
                title: null,
                category_id: null,
                body: null
            },
            categories: [],
            errors: {}
        };
    },
    created() {
        this.$axios.get("/categories")
            .then(res => (this.categories = res.data.data));
    },
    methods: {
        create() {
        this.$axios
            .post("/questions", this.form)
            .then(res => this.$router.push(res.data.data.path))
            .catch(error => (this.errors = error.response.data.errors));
        }
    },
      computed: {
        disabled() {
            return !(this.form.title && this.form.category_id && this.form.body);
        }
    }
}
</script>
<style scoped>

</style>