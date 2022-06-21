<template>
    <section>
        <div class="users-post-container">
            <div class="users-information-wrapper">
                <div class="profile-pic-wrapper">
                    <img src="@/assets/profil-pic.png" alt="">
                </div>
                <h3 class="user-name">
                    {{ post.author }}
                </h3>
            </div>
            <div class="user-post-wrapper">
                <p class="post-content"> {{ post.message }}</p>
                <div v-if="post.imageUrl" class="img-post-wrapper">
                    <img class="img-post" :src="post.imageUrl" alt="">
                </div>
                <div class="card-bottom">
                    <p class="post-datetime">{{ post.createdAt }}</p>
                    <controllerBtn
                        v-if="$route.name === 'dashboard' || $route.name === 'adminpostshow' || $route.name === 'adminboard'"
                        :postId="post._id" />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import controllerBtn from '@/components/ControlerCardBtn.vue'
export default {
    components: {
        controllerBtn,
    },
    props: {
        post: { type: Object, required: true }
    }
}
</script>

<style scoped>
section {
    background-color: var(--secondary-clr);
    margin: 0 auto;
    border-radius: .7rem;
    padding: .5rem;
}

.users-post-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.users-information-wrapper {
    display: flex;
    gap: 1rem;
}

.profile-pic-wrapper {
    width: 4rem;
    aspect-ratio: 1/1;
    border-radius: .8rem;
    overflow: hidden;
}

.user-name {
    align-self: center;
}

.user-post-wrapper {
    padding: .5rem;
    border-radius: .7rem;
    display: flex;
    flex-direction: column;
    gap: .5rem;
    background-color: #fff;
}

.img-post-wrapper {
    width: 100%;
    aspect-ratio: 2/1;
    overflow: hidden;
    border-radius: .7rem;
}

.post-content {
    width: 100%;
    white-space: pre-wrap;
    word-break: break-word;
}

.img-post {
    object-fit: cover;
}

.card-bottom {
    display: flex;
    justify-content: space-between;
    padding-top: .2rem;
    border-top: 1px solid;
}
</style>