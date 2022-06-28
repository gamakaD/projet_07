<template>
    <div class="container">
        <GoBack />
        <div v-for="post in posts">
            <PostCard :post="post" v-on:getId="deletePost($event)"/>
        </div>
    </div>
</template>

<script>
import PostCard from "@/components/PostCard.vue"
import GoBack from "@/components/GoBackBtn.vue" 
import axios from "axios"

export default {
    data() {
        return {
            posts: null
        }
    },
    components: {
        PostCard,
        GoBack,
    },
    methods: {
        async getUserPosts() {
            const id = this.$route.params.id
            const response = await axios.get('/admin/user/' + id, {
                headers: {
                    'role': this.$store.getters.role
                }
            })
            this.posts = response.data
        },
        deletePost(val) {
            let i = this.posts.map(item => item._id).indexOf(val)
            this.posts.splice(i, 1)
        },
    },
    async created() {
        this.getUserPosts()
    }
}
</script>

<style scoped> 
.container {
    display: flex;
    flex-direction: column;
    gap: .5rem
}
</style>