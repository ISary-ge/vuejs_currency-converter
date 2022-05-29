<template>
	<div class="container">
		<Skeleton
			v-if="!loaded"
			animation="animate-width 1000ms linear"
			shape="circle"
			height="100%"
		/>
		<Pie
			v-if="loaded"
			:chart-data="chartData"
			:height="600"
			:width="600"
			:chart-options="{
				borderColor: '#5EEAD4',
				backgroundColor: 'rgb(33 102 212 / 60%)',
				responsive: true,
				datasets: {
					pie: {},
				},
				plugins: {
					legend: {
						position: 'bottom',
						align: 'center',
						labels: {
							boxWidth: 20,
							font: {
								family: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`,
							},
							color: 'rgba(255, 255, 255, 0.87)',
							usePointStyle: true,
						},
					},
					title: {
						display: true,
						text: 'Budget Distrubition',
						color: 'rgba(94,234,212,1)',
						font: {
							family: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`,
							size: 17,
							weight: 600,
						},
					},
					tooltip: {
						borderColor: 'rgba(0,212,255,1)',
						borderWidth: 1,
						displayColors: false,
						backgroundColor:
							'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(94,234,212,1) 62%, rgba(0,212,255,1) 100%)',
					},
				},
			}"
		/>
	</div>
</template>

<script>
import { Pie } from "vue-chartjs"
import {
	Chart as ChartJS,
	Title,
	Tooltip,
	Legend,
	ArcElement,
	CategoryScale,
} from "chart.js"
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)
import Skeleton from "primevue/skeleton"

export default {
	name: "PieChart",
	components: { Pie, Skeleton },
	props: {
		labels: Array,
		dataset: Array,
	},
	data: () => {
		return {
			loaded: false,
			chartData: {
				labels: [],
				datasets: [
					{
						backgroundColor: ["#5EEAD4", "#EF9F51", "#00D8FA"],
						data: [],
					},
				],
			},
		}
	},
	created() {
		this.loaded = false
		this.chartData.labels = [...this.labels]
		this.chartData.datasets[0].data = [...this.dataset]
		this.loaded = true
	},
	watch: {
		labels() {
			this.loaded = false
			this.chartData.labels = [...this.labels]
			this.loaded = true
		},
		dataset() {
			this.loaded = false
			this.chartData.datasets[0].data = [...this.dataset]
			this.loaded = true
		},
	},
}
</script>

<style scoped lang="css">
.container {
	max-height: 400px;
	max-width: 400px;
}
</style>
