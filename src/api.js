const API_URL = "https://api.coingecko.com/api/v3"

export const getDataForGraph = async (currency, baseValue, days, interval) => {
	const f = await fetch(
		`${API_URL}/coins/${currency}/market_chart?vs_currency=${baseValue}&days=${days}&interval=${interval}`
	)
	let data = null
	if (!f.ok) {
		return
	} else {
		data = await f.json()
	}

	return data
}

export const getPrices = async (currencies, baseValue) => {
	let result = []
	for (const currency of currencies) {
		if (currency.price !== 1) {
			const f = await fetch(
				`${API_URL}/simple/price?ids=${currency.id}&vs_currencies=${baseValue}`
			)

			const data = await f.json()
			const price = Object.getOwnPropertyDescriptor(
				data[currency.id],
				baseValue
			).value
			result.push({
				id: currency.id,
				price: price,
			})
		} else {
			result.push({
				id: currency.id,
				price: currency.price,
			})
		}
	}
	return result
}
