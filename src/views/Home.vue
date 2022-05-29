<template>
	<p class="text-center text-3xl text-primary font-semibold">
		Currency Converter
	</p>
	<Converter class="mt-8 mb-8" />
	<div class="line-chart">
		<div class="tabs">
			<Button
				label="BTC"
				:class="[
					{ 'p-button-outlined': activeCurrency == 'bitcoin' },
					{ 'p-button-text': activeCurrency != 'bitcoin' },
				]"
				@click="changeChartCur('bitcoin')"
			/>
			<Button
				label="ETH"
				@click="changeChartCur('ethereum')"
				:class="[
					{ 'p-button-outlined': activeCurrency == 'ethereum' },
					{ 'p-button-text': activeCurrency != 'ethereum' },
				]"
			/>
		</div>
		<LineChart />
	</div>
</template>

<script>
import LineChart from "@/components/Charts/LineChart.vue"
import { mapActions, mapState } from "vuex"
import Converter from "../components/Converter/Converter.vue"
export default {
	name: "Home",
	components: { LineChart, Converter },
	data() {
		return {
			isLoaded: false,
			baseValue: "usd",
		}
	},
	computed: { ...mapState(["activeCurrency"]) },
	created() {
		this.isLoaded = true
	},
	methods: {
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
		changeChartCur(cur) {
			this.switchGraphCur(cur)
		},
	},
}
</script>

<style scoped lang="postcss">
.tabs {
	border-bottom: 3px solid #0b213f;
}
.line-chart {
	max-height: 300px;
	max-width: 800px;
	margin: 0 auto;
	margin-top: 50px;
}
</style>
