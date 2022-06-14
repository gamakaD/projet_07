<template>
    <div class="home">
        <LogginRegisterForm />
    </div>
</template>

<script>
import LogginRegisterForm from "../components/LogginRegisterForm.vue";
export default {
    components: {
        LogginRegisterForm
    }
}
</script>

<style scoped>
.home{
    height: 100vh;
    display: flex;
    align-items: center;
}
</style>