<template>
	<p v-if="isLoaded" class="text-center text-3xl text-primary font-semibold">
		Balance : $ {{ totalBalance.toLocaleString() }}
	</p>

	<div class="flex justify-content-center">
		<InputText
			v-model="inputCur"
			v-bind:disabled="!isLoaded"
			type="number"
			class="p-inputtext-sm"
		/>
		<Button
			label="+"
			class="p-button-text"
			@click="addToBalance"
			:disabled="inputCur == 0"
		/>
		<Button
			label="-"
			@click="subFromBalance"
			class="p-button-text"
			:disabled="inputCur == 0"
		/>
		<Dropdown
			v-model="selectedCur"
			:options="currencies"
			optionLabel="id"
			optionValue="id"
			:placeholder="selectedCur"
			class="p-dropdown-sm"
		/>
	</div>
	<div class="budget flex flex-column-sm mt-8">
		<div>
			<p class="text-center text-xl text-primary font-semibold">
				Last Transactoins:
			</p>

			<DataTable
				:value="lastTransactions"
				stripedRows
				responsiveLayout="scroll"
				class="p-datatable-sm"
				:paginator="true"
				:rows="10"
				sortField="date"
				:sortOrder="-1"
			>
				<Column field="operation" header="Operation"></Column>
				<Column field="currency" header="Currency"></Column>
				<Column field="amount" header="Amount"></Column>
				<Column field="date" header="Date" :sortable="true"></Column>
			</DataTable>
		</div>
		<PieChart
			v-if="isLoaded"
			:labels="labels"
			:dataset="dataset"
			class="align-self-start ml-auto"
		/>
	</div>
</template>

<script>
import PieChart from "@/components/Charts/PieChart.vue"
import { mapState } from "vuex"
import DataTable from "primevue/datatable"
import Column from "primevue/column"
import InputText from "primevue/inputtext"
import Dropdown from "primevue/dropdown"
export default {
	name: "Potfolio",
	components: { PieChart, DataTable, Column, InputText, Dropdown },
	data() {
		return {
			isLoaded: false,
			balance: [
				{
					id: "bitcoin",
					amount: 0,
				},
				{
					id: "ethereum",
					amount: 7,
				},
				{
					id: "usd",
					amount: 11289,
				},
			],
			selectedCur: "bitcoin",
			baseValue: "usd",
			inputCur: 0,
			lastTransactions: [
				{
					operation: "arrival",
					currency: "bitcoin",
					amount: 1,
					date: "29.05.2022",
				},
				{
					operation: "outlay",
					currency: "bitcoin",
					amount: 1,
					date: "29.05.2022",
				},
				{
					operation: "arrival",
					currency: "ethereum",
					amount: 11.25,
					date: "28.05.2022",
				},
				{
					operation: "arrival",
					currency: "usd",
					amount: 11289,
					date: "27.05.2022",
				},
			],
		}
	},
	created() {
		const lastTransactionsFromLS = localStorage.getItem("transactions")
		if (lastTransactionsFromLS) {
			this.lastTransactions.push(...JSON.parse(lastTransactionsFromLS))
		}
		const balanceFromLS = localStorage.getItem("cryptoBalance")
		if (balanceFromLS) {
			this.balance = JSON.parse(balanceFromLS)
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
			this.balance.find((item) => item.id == this.selectedCur).amount += Number(
				this.inputCur
			)
			this.lastTransactions.push({
				operation: "income",
				currency: this.selectedCur,
				amount: this.inputCur,
				date: new Date().toLocaleDateString(),
			})
			console.log(this.balance)
			localStorage.setItem(
				"transactions",
				JSON.stringify(this.lastTransactions)
			)
			localStorage.setItem("cryptoBalance", JSON.stringify(this.balance))
			this.inputCur = 0
		},
		subFromBalance() {
			this.balance.find((item) => item.id == this.selectedCur).amount -=
				this.inputCur
			this.lastTransactions.push({
				operation: "outlay",
				currency: this.selectedCur,
				amount: this.inputCur,
				date: new Date().toLocaleDateString(),
			})
			localStorage.setItem(
				"transactions",
				JSON.stringify(this.lastTransactions)
			)
			localStorage.setItem("cryptoBalance", JSON.stringify(this.balance))
			this.inputCur = 0
		},
	},
	computed: {
		...mapState(["currencies"]),
		totalBalance() {
			return this.formatPrice(
				this.balance.reduce((sum, val) => {
					return (
						sum +
						val.amount * this.currencies.find((item) => item.id == val.id).price
					)
				}, 0)
			)
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

<style lang="scss" scoped>
@media screen and (max-width: 900px) {
	.budget {
		flex-direction: column !important;
		.container {
			order: -1;
			margin-left: unset !important;
			align-self: center !important;
		}
	}
}
</style>
