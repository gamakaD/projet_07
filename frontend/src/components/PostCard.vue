<template>
    <section>
        <div class="users-post-container">
            <div class="users-information-wrapper">
                <div class="profile-pic-wrapper">
                    <img src="@/assets/profil-pic.png" alt="">
                </div>
                <h3 class="user-name">
                    Nom d'utilisateur
                </h3>
            </div>
            <div class="user-post-wrapper">
                <p class="post-content">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non tempore id ab. Et doloribus exercitationem nesciunt quae autem quisquam obcaecati?</p>
                <div class="img-post-wrapper">
                    <img class="img-post" src="@/assets/background-dashboard.png" alt="">
                </div>
                <p class="post-datetime">lorem date</p>
            </div>
        </div>
    </section>
</template>

<script>
export default {

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
    align-self:center;
}

.user-post-wrapper {
    /* border: 1px solid; */
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

.img-post {
    object-fit: cover;
}
</style>