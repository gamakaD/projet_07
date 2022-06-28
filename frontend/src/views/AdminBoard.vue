<template>
    <div class="container">
        <h2>Hello {{ user }}</h2>
        <div class="btn-wrapper">
            <button @click="getAllUsers" class="large-btn">
                Voir les utilisateurs
            </button>
            <button @click="getAllPosts" class="large-btn">
                Voir toutes les publications
            </button>
        </div>

        <div v-for="user in users">
            <UserCard :user="user" v-if="user.role === 'user'" v-on:getId="deleteUser($event)" />
        </div>
        <div v-for="post in posts">
            <PostCard :post="post" v-on:getId="deletePost($event)" />
        </div>
    </div>

</template>

<script>
import UserCard from '@/components/UserCard.vue'
import PostCard from '@/components/PostCard.vue'
import { mapGetters } from "vuex"
import axios from "axios"

export default {
    data() {
        return {
            users: null,
            posts: null
        }
    },
    components: {
        UserCard,
        PostCard,
    },
    computed: {
        ...mapGetters([
            'user',
            'role'
        ])
    },
    methods: {
        async getAllUsers() {
            const response = await axios.get('/admin', {
                headers: {
                    'role': this.role
                }
            })
            this.users = response.data
            this.posts = null
        },
        async getAllPosts() {
            const response = await axios.get('/posts')
            this.posts = response.data
            this.users = null
        },
        deletePost(val) {
            let i = this.posts.map(item => item._id).indexOf(val)
            this.posts.splice(i, 1)
        },
        deleteUser(val) {
            let i = this.users.map(item => item._id).indexOf(val)
            this.users.splice(i, 1)
        }
    }
}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    gap: .5rem;
}

.btn-wrapper {
    display: flex;
    justify-content: space-around;
}

.large-btn {
    width: 45%;
    margin: 0 auto;
    padding: .5rem;
    background-color: green;
    border: none;
    border-radius: .5rem;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, .5);
}
</style>