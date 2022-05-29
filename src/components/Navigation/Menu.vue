<template>
	<TabMenu :model="items" />
</template>

<script>
import TabMenu from "primevue/tabmenu"
export default {
	name: "Menu",
	components: { TabMenu },
	data() {
		return {
			items: [
				{ label: "Converter", icon: "pi pi-fw pi-percentage", to: "/" },
				{ label: "Portfolio", icon: "pi pi-fw pi-wallet", to: "/portfolio" },
			],
		}
	},
}
</script>

<style></style>
