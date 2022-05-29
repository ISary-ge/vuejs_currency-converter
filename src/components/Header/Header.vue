<template>
	<div class="header flex justify-content-center">
		<Icon />
		<Menu />
		<InputSwitch class="hidden align-self-center" />
	</div>
</template>

<script>
import InputSwitch from "primevue/inputswitch"
import Menu from "@/components/Navigation/Menu.vue"
export default {
	name: "Header",
	components: { Menu, InputSwitch },
}
</script>

<style></style>
