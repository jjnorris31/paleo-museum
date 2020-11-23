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
		},
		showErrorNotification(text) {
			this.setNotificationText(text);
			this.setNotificationType('error')
			this.setNotificationActive();
		},
		showSuccessNotification(text) {
			this.setNotificationText(text);
			this.setNotificationType('success')
			this.setNotificationActive();
		},
	}
}

export default snackbarNotification;