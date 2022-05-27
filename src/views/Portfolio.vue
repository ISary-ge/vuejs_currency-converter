<template>
	<div>Portfolio</div>
	<p>Баланс: {{ totalBalance }} $</p>
	<ul>
		<li>биток</li>
		<li>эфирчик</li>
		<li>доллар</li>
	</ul>
	<p>Диаграмма распределния:</p>

	<PieChart v-if="isLoaded" :labels="labels" :dataset="dataset" />

	<input type="number" v-model="inputCur" />
	<button @click="addToBalance" :disabled="inputCur == 0">Добавить коин</button>
	<button @click="subFromBalance" :disabled="inputCur == 0">Отнять коин</button>
	<select v-model="selectedCur">
		<option value="bitcoin">биток</option>
		<option value="usd">доллар</option>
		<option value="ethereum">эфир</option>
	</select>
	<p>Последние транзакции</p>
	<ul>
		<li v-for="(transaction, index) in lastTransactions" :key="index">
			{{ index }} == {{ transaction }}
		</li>
	</ul>
</template>

<script>
import PieChart from "@/components/PieChart.vue"
import { mapState } from "vuex"
// import { getPrices } from "../api"
export default {
	name: "Potfolio",
	components: { PieChart },
	data() {
		return {
			isLoaded: false,
			balance: [
				{
					id: "bitcoin",
					amount: 2,
				},
				{
					id: "ethereum",
					amount: 130,
				},
				{
					id: "usd",
					amount: 12000,
				},
			],
			selectedCur: "bitcoin",
			baseValue: "usd",
			inputCur: 0,
			lastTransactions: [],
		}
	},
	created() {
		const lastTransactionsFromLS = localStorage.getItem("transactions")
		if (lastTransactionsFromLS) {
			this.lastTransactions.push(...JSON.parse(lastTransactionsFromLS))
			console.log(this.lastTransactions)
		}
		const balanceFromLS = localStorage.getItem("cryptoBalance")
		if (balanceFromLS) {
			this.balance = JSON.parse(balanceFromLS)
			console.log(this.balance)
		}
		this.isLoaded = true
	},
	methods: {
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
		addToBalance() {
			this.balance.find((item) => item.id == this.selectedCur).amount +=
				this.inputCur
			this.lastTransactions.push(
				`+ ${this.inputCur} ${this.selectedCur} (${
					this.currencies.find((item) => item.id == this.selectedCur).price *
					this.inputCur
				} $)`
			)
			localStorage.setItem(
				"transactions",
				JSON.stringify(this.lastTransactions)
			)
			localStorage.setItem("cryptoBalance", JSON.stringify(this.balance))
		},
		subFromBalance() {
			this.balance.find((item) => item.id == this.selectedCur).amount -=
				this.inputCur
			this.lastTransactions.push(
				`- ${this.inputCur} ${this.selectedCur} (${
					this.currencies.find((item) => item.id == this.selectedCur).price *
					this.inputCur
				} $)`
			)
			localStorage.setItem(
				"transactions",
				JSON.stringify(this.lastTransactions)
			)
			localStorage.setItem("cryptoBalance", JSON.stringify(this.balance))
		},
	},
	computed: {
		...mapState(["currencies"]),
		totalBalance() {
			return this.balance.reduce((sum, val) => {
				return this.formatPrice(
					Number(
						sum +
							val.amount *
								this.currencies.find((item) => item.id == val.id).price
					)
				)
			}, 0)
		},
		labels() {
			return this.currencies.map((elem) => elem.id)
		},
		dataset() {
			const res = this.balance.map((elem) => {
				const res =
					elem.amount * this.currencies.find((item) => item.id == elem.id).price
				return res
			})
			return res
		},
	},
}
</script>

<style lang="scss" scoped></style>
