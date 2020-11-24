const deleteDialogController = {
	data: () => {
		return {
			deleteDialogActive: false,
			editDialogActive: false,
			formDialogActive: false,
			isEditingItem: false,
			isAddingItem: false,
		}
	},
	methods: {
		/**
		 * Closes the delete confirm dialog
		 */
		closeDeleteConfirmation() {
			this.deleteDialogActive = false;
		},
		setEditItem(isEdit) {
			this.isEditingItem = isEdit;
		},
		/**
		 * Closes the form dialog
		 */
		closeFormDialog() {
			this.formDialogActive = true;
		},
		/**
		 * Closes the new item dialog and reset the piece variable
		 */
		closeNewItem() {
			this.isAddingItem = false;
			this.openFormDialog();
		},
		/**
		 * Opens the form dialog
		 */
		openFormDialog() {
			this.formDialogActive = false;
		},
		/**
		 * Closes the edit piece dialog and reset the piece variable
		 */
		closeEditItem() {
			this.isEditingItem = false;
			this.openFormDialog();
		},
	}
}

export default deleteDialogController;