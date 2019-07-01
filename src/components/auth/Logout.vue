<template>

</template>

<script>
	export default {
		name: 'Logout',
		created() {
			this.$store.dispatch('destroyToken')
				.then(response => {
					this.$router.push({name: 'login'})
				}).catch(error => {
				if (error.response) {
					this.handleErrors(error.response)
				}
				this.$router.push({name: 'login'})
			})
		},
	}
</script>

<style scoped>
</style>
