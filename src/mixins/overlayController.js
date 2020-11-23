const overlayController = {
	data: () => {
		return {
			overlayActive: false,
			overlayText: ''
		}
	},
	methods: {
		setOverlayText(text) {
			this.overlayText = text;
		},
		showOverlay() {
			this.overlayActive = true;
		},
		closeOverlay() {
			this.overlayActive = false;
		},
	}
}

export default overlayController;