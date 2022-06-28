<template>
    <div class="dashboard">
        <PostForm />
    </div>
    <section class="post-container">
        <div v-for="post in posts">
            <PostCard :post="post" v-on:getId="deletePost($event)" />
        </div>
    </section>
</template>

<script>
import PostForm from '@/components/PostForm.vue'
import PostCard from '@/components/PostCard.vue'
import axios from 'axios'

export default {
    data() {
        return {
            posts: null
        }
    },
    components: { PostForm, PostCard },
    computed: {
        token() {
            return this.$store.getters.token
        }
    },
    methods: {
        async postData() {
            const response = await axios.get('posts/user', {
                headers: {
                    'Authorization': 'Bearer ' + this.token
                }
            })
            this.posts = await response.data
        },
        deletePost(val) {
            let i = this.posts.map(item => item._id).indexOf(val)
            this.posts.splice(i, 1)
        },
    },
    async created() {
        this.postData()
    }
}
</script>


<style scoped>
.post-container {
    display: flex;
    flex-direction: column;
    gap: .7rem;
}
</style>