<template>
    <div>
        <button v-if="authenticated" @click="logout" class="logout-btn">Deconnexion</button>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    computed: {
        ...mapGetters(['authenticated'])
    },
    methods: {
        ...mapActions({
            logoutAction: 'logout'
        }),
        logout() {
            this.logoutAction()
                .then(() => this.$router.push({ name: 'login' }))
        }
    }
}
</script>

<style scoped>
.logout-btn {
    padding: .15rem;
    background-color: rgb(220, 19, 19);
    border: 3px solid;
    border-radius: .2rem;
    color: var(--secondary-clr);
}

.logout-btn:hover {
    background-color: rgb(244, 2, 2);
}
</style>