<template>
  <!-- begin main overlay -->
  <v-overlay v-model="overlayActive"
             opacity=".70"
             z-index="205">
    <v-row no-gutters>
      <v-col cols="12"
             class="d-flex justify-center">
        <v-progress-circular width="4"
                             size="64"
                             indeterminate
                             color="white">
        </v-progress-circular>
      </v-col>
      <v-col cols="12"
             class="text-h6 text-center mt-2">
        <div>{{text}}</div>
      </v-col>
    </v-row>
  </v-overlay>
  <!-- ends search overlay -->
</template>

<script>
export default {
  name: "MuseumOverlay",
  props: ['overlayActive', 'text'],
  data: () => {
    return {

    }
  }
}
</script>

<style scoped>

</style>