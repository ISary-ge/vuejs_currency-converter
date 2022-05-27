<template>
	<div class="home">Currency Converter</div>
	<ul>
		<li v-for="currency in currencies" v-bind:key="currency.id">
			{{ currency.id }} == {{ currency.price }}
		</li>
	</ul>
	<input
		@input="calculate"
		v-model="val"
		v-bind:disabled="!isLoaded"
		type="number"
	/>
	<select @change="calculate" id="from" v-model="from">
		<option
			v-for="currency in currencies"
			v-bind:key="currency.id"
			v-bind:value="currency.id"
		>
			{{ currency.id }}
		</option>
	</select>
	<select @change="calculate" id="to" v-model="to">
		<option
			v-for="currency in currencies"
			v-bind:key="currency.id"
			v-bind:value="currency.id"
		>
			{{ currency.id }}
		</option>
	</select>
	<p>{{ res }}</p>
	<div class="tabs">
		<button @click="changeChartCur('bitcoin')">btc</button>
		<button @click="changeChartCur('ethereum')">eth</button>
	</div>
	<Chart :currency="activeCurrency" />
</template>

<script>
import Chart from "@/components/Chart.vue"
import { mapActions, mapState } from "vuex"
// import { getPrices } from "../api"
export default {
	name: "Home",
	components: { Chart },
	data() {
		return {
			isLoaded: false,
			// currencies: [
			// 	{ id: "bitcoin", price: null },
			// 	{ id: "ethereum", price: null },
			// 	{ id: "usd", price: 1 },
			// ],
			baseValue: "usd",
			graphValue: [],
			val: null,
			from: "bitcoin",
			to: "usd",
			res: 0,
		}
	},
	computed: { ...mapState(["currencies", "activeCurrency"]) },
	created() {
		console.log(this.currencies)
		this.isLoaded = true
	},
	methods: {
		//api.js
		...mapActions(["switchGraphCur"]),
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
			const fromPrice = this.currencies.find((elem) => elem.id == this.from)
			const ToPrice = this.currencies.find((elem) => elem.id == this.to)
			this.res = this.formatPrice((val * fromPrice.price) / ToPrice.price)
		},
		changeChartCur(cur) {
			this.switchGraphCur(cur)
		},
	},
}
</script>

<style scoped>
.tabs {
	margin: 30px 0;
}
</style>
