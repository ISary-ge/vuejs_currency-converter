<template>
	<div class="container">
		<Line
			v-if="loaded"
			:chart-data="chartData"
			:height="400"
			:width="1000"
			:chart-options="{
				responsive: true,
				scales: {
					y: {},
					x: {
						type: 'time',
						time: {
							unit: 'month',
							tooltipFormat: 'MMM DD HH:MM',
						},
					},
				},
			}"
		/>
	</div>
</template>

<script>
import { Line } from "vue-chartjs"
import "chartjs-adapter-moment"
import {
	Chart as ChartJS,
	Title,
	Tooltip,
	Legend,
	LineElement,
	LinearScale,
	PointElement,
	CategoryScale,
	TimeScale,
} from "chart.js"
import { getDataForGraph } from "../api"

ChartJS.register(
	Title,
	Tooltip,
	Legend,
	LineElement,
	LinearScale,
	PointElement,
	CategoryScale,
	TimeScale
)

export default {
	name: "Chart",
	components: { Line },
	props: {
		currency: String,
	},
	data: () => {
		return {
			loaded: false,
			chartData: {
				labels: [
					"January",
					"February",
					"March",
					"April",
					"May",
					"June",
					"July",
				],
				datasets: [
					{
						label: "BTC",
						backgroundColor: "#f87979",
						data: [],
					},
				],
			},
		}
	},
	created() {
		!(async () => {
			this.loaded = false
			const data = await getDataForGraph(this.currency, "usd", 14, "hourly")
			this.chartData.datasets[0].data = data.prices.map((el) =>
				Number(el[1].toFixed(2))
			)
			this.chartData.labels = data.prices.map((el) => new Date(el[0]))
			this.chartData.datasets[0].label = this.currency
			this.loaded = true
		})()
	},
	methods: {},
	watch: {
		currency() {
			!(async () => {
				this.loaded = false
				const data = await getDataForGraph(this.currency, "usd", 14, "hourly")
				this.chartData.datasets[0].data = data.prices.map((el) =>
					Number(el[1].toFixed(2))
				)
				this.chartData.labels = data.prices.map((el) => new Date(el[0]))
				this.chartData.datasets[0].label = this.currency
				this.loaded = true
			})()
		},
	},
}
</script>

<style scoped lang="css">
.container {
	height: 400px;
	width: 1000px;
	margin: 0 auto;
}
</style>
