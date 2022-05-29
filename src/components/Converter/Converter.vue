<template>
	<div class="converter flex justify-content-around p-4">
		<div>
			<InputText
				@input="calculate"
				v-model="val"
				v-bind:disabled="!isLoaded"
				type="number"
			/>
			<Dropdown
				@change="calculate"
				v-model="from"
				:options="currencies"
				optionLabel="id"
				:placeholder="from.id"
			/>
		</div>
		<span
			class="text-3xl align-self-center ml-2 mr-2 cursor-pointer text-primary pi pi-arrows-h"
			@click="switchInputs"
		></span>
		<div>
			<InputText
				@input="calculate"
				v-model="res"
				v-bind:disabled="!isLoaded"
				type="number"
			/>
			<Dropdown
				@change="calculate"
				v-model="to"
				:options="currencies"
				optionLabel="id"
				:placeholder="to.id"
			/>
		</div>
	</div>
</template>

<script>
import InputText from "primevue/inputtext"
import Dropdown from "primevue/dropdown"
import { mapState } from "vuex"
export default {
	name: "Converter",
	components: { InputText, Dropdown },
	data() {
		return {
			isLoaded: false,
			val: null,
			from: { id: "bitcoin", price: null },
			to: { id: "usd", price: null },
			res: 0,
		}
	},
	created() {
		this.isLoaded = true
	},
	computed: { ...mapState(["currencies"]) },
	methods: {
		switchInputs() {
			let temp = this.from
			this.from = this.to
			this.to = temp
			temp = this.val
			this.val = Number(this.res)
			this.res = temp
			this.calculate()
		},
		formatPrice(price) {
			if (price === "-") {
				return price
			}
			return price > 1
				? price.toFixed(2) % 1 == 0
					? Math.floor(price.toFixed(2))
					: price.toFixed(2)
				: price.toPrecision(2)
		},
		calculate() {
			const val = this.val
			console.log(this.from)
			const fromPrice = this.currencies.find((elem) => elem.id == this.from.id)
			const ToPrice = this.currencies.find((elem) => elem.id == this.to.id)
			this.res = this.formatPrice((val * fromPrice.price) / ToPrice.price)
		},
	},
}
</script>

<style lang="css">
.converter {
	box-shadow: rgb(33 102 212 / 60%) 0px 7px 25px;
}
</style>
