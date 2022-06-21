<template>
    <div>
        <h2>Bienvenue
            <p>
                {{ user }}
            </p>
        </h2>
        <section class="post-container">
            <h3>Voici les dernières News</h3>
            <div v-for="post in posts">
                <PostCard :post="post" />
            </div>
        </section>

    </div>
</template>

<script>
import PostCard from '@/components/PostCard.vue'
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            posts: null
        }
    },
    components: {
        PostCard,
    },
    computed: {
        ...mapGetters(['user', 'role']),
    },
    methods: {
        async postData() {
            const response = await axios.get('posts')
            this.posts = await response.data
        }
    },
    async created() {
        this.postData()
    }
}
</script>

<style scoped>
h2 {
    display: flex;
    flex-wrap: wrap;
    gap: .5rem;
    width: fit-content;
    margin-block: 1rem;
    padding-block: .3rem;
    border-top: 2px solid;
    border-bottom: 2px solid;
    font-size: 1.4rem;
}

h2 p {
    color: var(--primary-clr);
    text-transform: capitalize;
}

.post-container {
    display: flex;
    flex-direction: column;
    gap: .8rem;
}

.post-container h3 {
    width: fit-content;
    border-bottom: 1px solid;
}
</style>