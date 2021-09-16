<template>
    <div class="text-xs-center mr-2 mb-2">
        <v-menu offset-y>
            <template v-slot:activator="{ on }">
            <v-btn
                dark
                icon
                :color="color"
                v-on="on"
            >
                <v-icon>mdi-bell</v-icon>{{unreadCount}}
            </v-btn>
            </template>
            <v-list>
                <v-list-item v-for="item in unread" :key="item.id">
                    <router-link :to="item.path">
                        <v-list-item-title @click="readIt(item)">{{item.question}}</v-list-item-title>
                    </router-link>
                </v-list-item>
                <v-divider></v-divider>

                <v-list-item v-for="item in read" :key="item.id">
                    <v-list-item-title>{{item.question}}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            read: {},
            unread: {},
            unreadCount: 0,
            sound: "http://soundbible.com/mp3/glass_ping-Go445-1207030150.mp3"
        };
    },
    created() {
        this.getNotifications();
        
        Echo.private('App.Models.User.' + this.userId).notification(notification => {
        this.playSound();
        this.unread.unshift(notification);
        this.unreadCount++;
        });
    },
    methods: {
        playSound() {
        let alert = new Audio(this.sound);
        alert.play();
        },
        getNotifications() {
        this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
        this.$axios
            .post("/notifications")
            .then(res => {
            this.read = res.data.data.read;
            this.unread = res.data.data.unread;
            this.unreadCount = res.data.data.unread.length;
            })
            .catch(error => console.log(error));
        },
        readIt(notification) {
            this.$axios.post("/markAsRead", { id: notification.id }).then(res => {
                this.unread.splice(notification, 1);
                this.read.unshift(notification);
                this.unreadCount--;
            });
        }
    },
    computed: {
        color() {
            return this.unreadCount > 0 ? "red" : "red lighten-4";
        },
        ...mapGetters(["token", "userId"]),
    }
}
</script>
<style>
    
</style>