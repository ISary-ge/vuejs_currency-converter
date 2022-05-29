<template>
	<Skeleton
		v-if="!loaded"
		animation="animate-width 1000ms linear"
		shape="rectangle"
		width="100%"
		height="300px"
	/>
	<Chart
		type="line"
		v-if="loaded"
		:height="height"
		:width="width"
		:data="chartData"
		:options="{
			height: 300,
			hoverMode: 'index',
			stacked: false,
			responsive: true,
			datasets: {
				line: {
					borderColor: '#5EEAD4',
					borderWidth: 2,
					pointRadius: 2,
				},
			},
			plugins: {
				legend: false,
				tooltip: {
					borderColor: '#5EEAD4',
					borderWidth: 1,
					displayColors: false,
					backgroundColor:
						'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(94,234,212,1) 62%, rgba(0,212,255,1) 100%)',
					callbacks: {
						label: (context) => {
							return (
								context.dataset.label +
								': $' +
								context.parsed.y.toLocaleString()
							)
						},
					},
				},
				title: {
					display: true,
					text: this.activeCurrency.toUpperCase(),
					color: '#5EEAD4',
					align: 'start',
				},
			},
			scales: {
				y: {
					grid: {
						color: 'rgb(33 102 212 / 15%)',
					},

					ticks: {
						maxTicksLimit: 7,
						callback: (value, index, ticks) => {
							return '$' + value.toLocaleString()
						},
						font: {
							family: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`,
						},
					},
				},
				x: {
					type: 'time',
					time: {
						stepSize: 2,
					},
					title: {
						display: true,
						text: 'Time',
						color: '#5EEAD4',
					},
				},
			},
		}"
	/>
</template>

<script>
import "chartjs-adapter-moment"
import { getDataForGraph } from "../../api"
import Chart from "primevue/chart"
import Skeleton from "primevue/skeleton"
import { mapState } from "vuex"

export default {
	name: "LineChart",
	components: { Chart, Skeleton },
	// props: {
	// 	activeCurrency: String,
	// },
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
			height: 300,
			width: 700,
		}
	},
	created() {
		!(async () => {
			const data = await getDataForGraph(
				this.activeCurrency,
				"usd",
				14,
				"hourly"
			)
			this.chartData.datasets[0].data = data.prices.map((el) =>
				Number(el[1].toFixed(2))
			)
			this.chartData.labels = data.prices.map((el) => new Date(el[0]))
			this.chartData.datasets[0].label = this.activeCurrency
			this.loaded = true
		})()
	},
	methods: {},
	computed: { ...mapState(["activeCurrency"]) },
	watch: {
		activeCurrency() {
			!(async () => {
				this.loaded = false
				const data = await getDataForGraph(
					this.activeCurrency,
					"usd",
					14,
					"hourly"
				)
				this.chartData.datasets[0].data = data.prices.map((el) =>
					Number(el[1].toFixed(2))
				)
				this.chartData.labels = data.prices.map((el) => new Date(el[0]))
				this.chartData.datasets[0].label = this.activeCurrency
				this.loaded = true
			})()
		},
	},
}
</script>

<style scoped lang="css">
.line-chart {
	max-height: 300px;
	max-width: 800px;
	margin: 0 auto;
}
</style>
