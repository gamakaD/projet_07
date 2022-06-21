<template>
    <div class="card-container">
        <div class="profile-container">
            <div class="profile-pic-wrapper">
                <img src="@/assets/profil-pic.png" alt="">
            </div>
            <h3>
                {{ user.email }}
            </h3>
        </div>

        <div class="btn-wrapper">
            <button @click="showUserPosts" class="btn">
                Voir les publications
            </button>
            <button @click="banUser" class="btn">
                Bannir
            </button>
        </div>
    </div>
    
</template>

<script>
import axios from 'axios'

export default {
    props: {
        user: { type: Object, required: true},
    },
    methods: {
        async showUserPosts() {
            this.$router.push({name: 'adminpostshow', params: { id: this.$props.user._id}})
        },
        async banUser() {
            await axios.delete('admin/user/' + this.$props.user._id, {
                headers: {
                    'role': this.$store.getters.role
                }
            })
            .then(this.$el.style.display = 'none')
        }
    }
}
</script>

<style scoped>
.card-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: .5rem;
    border-radius: .7rem;
    padding: .4rem;
    background-color: var(--secondary-clr);
}

.profile-container {
    display: flex;
    align-items: center;
    gap: 2rem
}

.profile-pic-wrapper {
    width: 4rem;
    aspect-ratio: 1/1;
    border-radius: .8rem;
    overflow: hidden;
}

.btn-wrapper {
    /* width: 100%; */
    display: flex;
    justify-content: center;
    gap: 1rem;
}

.btn {
    padding: .4rem;
    font-weight: 600;
}

@media (max-width: 600px) {
    .card-container {
        justify-content: center;
    }
    .btn-wrapper {
        width: 100%;
    }
}
</style>