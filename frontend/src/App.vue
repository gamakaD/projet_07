<template>
	<TheHeader />
	<main class="container">
		<router-view :key="$route.path"></router-view>
	</main>
	<TheFooter />
</template>

<script>
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'
export default {
	components: {
		TheHeader,
		TheFooter
	},
}
</script>

<style scoped>
.container {
	min-height: 100vh;
	max-width: 50rem;
	margin: 0 auto;
	padding: .8rem;
}

</style>
