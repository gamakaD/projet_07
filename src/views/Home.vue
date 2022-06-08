<template>
    <div class="home">
        <LogginRegister/>
    </div>
</template>

<script>
import LogginRegister from "../components/LogginRegister.vue";
export default {
    components: {
        LogginRegister
    }
}
</script>

<style scoped>
.home{
    height: 100vh;
    background-image: url(../assets/background-logginpage.png);
    background-position: center;
    padding-inline: .2rem;
}
</style>