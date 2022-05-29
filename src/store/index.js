import { createStore } from "vuex"
import { getPrices } from "../api"

export default createStore({
	state() {
		return {
			currencies: [
				{ id: "bitcoin", label: "BTC", price: null },
				{ id: "ethereum", label: "ETH", price: null },
				{ id: "usd", label: "USD", price: 1 },
			],
			baseValue: "usd",
			activeCurrency: "bitcoin",
		}
	},
	mutations: {
		updatePrices(state, payload) {
			console.log(payload)
			state.currencies = [...payload]

			console.log(state)
		},
		switchGraphCur(state, payload) {
			state.activeCurrency = payload
		},
	},
	actions: {
		async getNewPrices({ commit, state }) {
			commit("updatePrices", await getPrices(state.currencies, state.baseValue))
		},
		switchGraphCur({ commit }, cur) {
			commit("switchGraphCur", cur)
		},
	},
	modules: {},
})
