const formatText = {
	data: () => {
		return {
		}
	},
	methods: {
		getFormattedData(text) {
			return text ? text : 'Sin datos'
		},
		getFmtEmptyField(property) {
			return property === '' || !property ? null : property;
		},
	}
}

export default formatText;