<template>
	<div class="container">
		<Pie
			v-if="loaded"
			:chart-data="chartData"
			:height="600"
			:width="600"
			:chart-options="{
				responsive: true,
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

export default {
	name: "PieChart",
	components: { Pie },
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
						backgroundColor: ["#41B883", "#E46651", "#00D8FF"],
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
	height: 600px;
	width: 600px;
	margin: 0 auto;
}
</style>
