const snackbarNotification = {
	data: () => {
		return {
			errorActive: false,
			errorText: '',
			colorSnackbar: 'error'
		}
	},
	methods: {
		setNotificationActive() {
			this.errorActive = true;
		},
		setNotificationText(text) {
			this.errorText = text;
		},
		setNotificationType(type) {
			this.colorSnackbar = type;
		}
	}
}

export default snackbarNotification;