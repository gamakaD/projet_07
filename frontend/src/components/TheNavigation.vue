<template>
        <nav v-if="authenticated" class="navbar active-link">
            <ul class="nav__ul">
                <li>
                    <router-link :to="{ name: 'welcome' }" class="nav__link">
                        Welcome
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'dashboard' }" class="nav__link">
                        Dashboard
                    </router-link>
                </li>
                <li v-if="role === 'admin'">
                    <router-link :to="{ name: 'adminboard' }" class="nav__link">
                        Adminboard
                    </router-link>
                </li>
                <li>
                    <logout />
                </li>
            </ul>
        </nav>
</template>

<script>
import logout from '@/components/LogoutBtn.vue'
export default {
    components: {
        logout
    },
    computed: {
        role() {
            return this.$store.getters['role']
        },
        authenticated() {
            return this.$store.getters['authenticated']
        }
    }
}
</script>

<style scoped>

.navbar {
    display: flex;
    margin: 1rem auto;
}



.navbar ul {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1.5rem;
}

.navbar ul:nth-child() {
    border-right: 1px solid;
}

.nav__link {
    color: var(--secondary-clr);
    font-weight: 600;
}

.nav__link:hover {
    color: aqua;
}

.active-link {
   color: aqua; 
}

@media (max-width: 600px) {
    .navbar ul {
        flex-direction: column;
        gap: .5rem;
    }
}
</style>