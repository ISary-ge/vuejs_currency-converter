<template>
	<Header />
	<router-view />
</template>

<script>
import { mapActions } from "vuex"
import Header from "@/components/Header/Header.vue"
export default {
	components: { Header },
	created() {
		this.$store.dispatch("getNewPrices")
	},
	methods: {
		...mapActions(["getNewPrices"]),
	},
}
</script>
<style lang="scss">
#app {
	max-width: 1140px;
	margin: 0 auto;
}

#nav {
	padding: 30px;
	&::-webkit-scrollbar {
		width: 0;
	}

	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>
