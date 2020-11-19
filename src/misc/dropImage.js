const dropImage = {
  data: () => {
    return {
      photoFile: null, // profile picture to upload
    }
  },
  methods: {
    /**
     * Add some classes to the image file input when the user
     * leaves this area
     */
    dropPhotoFile(event) {
      event.preventDefault();
      // console.log("DROP DROP DROP")
      this.$refs.photoInput.files = event.dataTransfer.files;
      this.photoFile = this.$refs.photoInput.files[0];
      event.currentTarget.classList.remove('secondary');
      event.currentTarget.classList.remove('white--text');
      event.currentTarget.classList.add('primary--text');
    },
    /**
     * Add some classes to the image file input when the user
     * enters in this area
     */
    dragPhotoFile(event) {
      event.preventDefault();
      // console.log("DRAG DRAG DRAG");
      if (!event.currentTarget.classList.contains('secondary')) {
        event.currentTarget.classList.add('secondary');
        event.currentTarget.classList.add('white--text');
        event.currentTarget.classList.remove('primary--text');
      }
    },
    /**
     * Add some classes to the image file input when the user
     * leaves this area
     */
    leavePhotoFile(event) {
      // console.log("LEAVE LEAVE LEAVE")
      event.currentTarget.classList.remove('secondary');
      event.currentTarget.classList.remove('white--text');
      event.currentTarget.classList.add('primary--text');
    },
    /**
     * Listen any click event for the image file input
     * @param event
     */
    onFileSelected(event) {
      if (this.fileSizeInMb(event.target.files[0]) < 2048) {
        this.photoFile = event.target.files[0];
      }
    },
    /**
     * Get the size in MB of any image file
     * @param file
     * @returns {number}
     */
    fileSizeInMb(file) {
      return file.size / 1024 / 1024;
    },
  }
}

export default dropImage;