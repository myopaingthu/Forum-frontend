<template>
  <v-card>
        <v-toolbar color="indigo" dark dense class="mt-2">
            <v-toolbar-title>Categories</v-toolbar-title>
        </v-toolbar>

        <v-list>
            <v-list-item-group
                v-model="selectedItem"
                color="primary"
            >
                <v-list-item v-for="(category,index) in categories" :key="category.id">
                    <v-list-item-content>
                        <v-list-item-title  @click="show(index)">
                                {{category.name}}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
  </v-card>
</template>

<script>
export default {
    data(){
        return {
            selectedItem: "",
            categories:{}
        }
    },
    created(){
        this.$axios.get('/categories')
        .then(res => this.categories = res.data.data)
        .catch(error => console.log(error));
    },
    methods: {
        show(index) {
            console.log(index);
        }
    }
}
</script>

<style>
</style>