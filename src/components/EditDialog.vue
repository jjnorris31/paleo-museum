<template>
  <v-dialog v-model="deleteDialogActive"
            width="600px"
            class="full-height">
    <v-row no-gutters
           style="background-color: white; height: 100%"
           class="pt-6 px-7">
      <v-col cols="12" class="d-flex no-gutters flex-wrap">
        <h1 class="mb-1 headline font-weight-medium col-12">{{title}}</h1>
        <div class="grey--text col-12 mb-4">{{subtitle}}</div>
        <div class="col-12 justify-end mb-6 d-flex no-gutters flex-wrap">
          <v-btn color="secondary"
                 dark
                 class="mr-2"
                 outlined
                 @click="closeDeleteConfirmation()"
                 style="border-width: 2px"
                 height="40px">Cancelar</v-btn>
          <v-btn color="error"
                 dark
                 class="ml-2"
                 @click="deleteAction"
                 elevation="4"
                 height="40px">Borrar</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-dialog>
</template>

<script>
export default {
  name: "EditDialog",
  props: ['title', 'subtitle', 'deleteAction', 'active'],
  data: () => {
    return {
      deleteDialogActive: false,
    }
  },
  computed: {
    dialogActive: {
      set: function(newVal) {
        this.deleteDialogActive = newVal;
      },
      get: function() {
        return this.deleteDialogActive;
      }
    }
  },
  methods: {
    closeDeleteConfirmation() {
      this.deleteAction = false;
    }
  }
}
</script>

<style scoped>

</style>