<template>
    <div class="btn-wrapper">
        <button @click="modifyPostRoute" v-if="$route.name === 'dashboard'" class="btn btn-modify">
            modifier
        </button>
        <button @click="deletePost" class="btn btn-danger">
            Supprimer
        </button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: {
        postId: { type: String, required: true },
    },
    computed: {
        token() {
            return this.$store.getters.token
        }
    },
    methods: {
        modifyPostRoute() {
            this.$router.push({ name: 'modifypostshow', params: { id: this.postId } })
        },
        async deletePost() {
            await axios.delete('posts/' + this.postId, {
                headers: {
                    'Authorization': 'Bearer ' + this.token,
                    'role': this.$store.getters.role
                }
            })  
            .then(this.getId()) 
        }, 
        getId() {
            this.$emit('getId', this.postId)
        }
    }
}
</script>

<style scoped>
.btn-wrapper {
    display: flex;
    gap: .8rem;
}

.btn {
    border: none;
    border-radius: .4rem;
    padding: .3rem;
    font-weight: 600;
}

.btn-modify {
    background-color: rgb(38, 38, 158);
}

.btn-danger {
    background-color: red;
}

.btn:hover {
    filter: brightness(80%);
    color: var(--secondary-clr)
}
</style>