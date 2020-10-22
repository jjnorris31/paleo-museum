<template>
  <v-container fluid>
    <v-row no-gutters
           justify="center"
           class="white">
      <!-- begin dialog -->
      <v-dialog v-model="dialog" width="50%">
        <v-row no-gutters style="background-color: white" justify="center" class="pt-5">
          <v-col cols="11">
            <h1 class="mb-1">Nuevo fósil</h1>
            <h4 class="mb-4">Introduce la información requerida</h4>
            <v-form ref="piece-form">
              <div class="input-label">Número de registro INAH</div>
              <v-text-field outlined
                            dense
                            placeholder="example@gmail.com">
              </v-text-field>
              <div class="input-label">Género</div>
              <v-text-field outlined
                            dense
                            placeholder="example@gmail.com">
              </v-text-field>
              <div class="input-label">Clase</div>
              <v-text-field outlined
                            dense
                            placeholder="example@gmail.com">
              </v-text-field>
              <div class="input-label">Descripción</div>
              <v-text-field outlined
                            dense
                            placeholder="example@gmail.com">
              </v-text-field>
              <div class="input-label">Datación</div>
              <v-text-field outlined
                            dense
                            placeholder="example@gmail.com">
              </v-text-field>
            </v-form>
            <div class="col-12 d-flex justify-center mb-5">
              <v-btn class="blue" dark depressed height="40px">Cambiar vista</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-dialog>
      <!-- ends dialog -->

      <!-- begin header -->
      <v-col cols="12"
             class="upper-container mt-12 px-12">
        <v-row no-gutters>
          <v-col cols="8">
            <h2 class="text-h4 font-weight-medium">Vista general</h2>
          </v-col>
          <v-col cols="4" class="d-flex no-gutters justify-end">
            <v-btn height="40px"
                   color="primary"
                   outlined
                   style="border-width: 2px">Nueva pieza</v-btn>
          </v-col>
        </v-row>
      </v-col>
      <!-- ends header -->

      <!-- begin table -->
      <v-col cols="12"
             class="main-container mb-9 rounded px-12">
        <v-row no-gutters
               justify="center">

          <!-- begin title -->
          <v-col cols="12">
            <h3 class="text-h6 museum-text--grey font-weight-medium">Piezas registradas</h3>
          </v-col>
          <!-- ends  title -->

          <v-col cols="12">
            <v-row no-gutters>
              <v-col cols="12"
                     class="d-flex align-end no-gutters mb-2">
                <div style="width: 300px"
                     class="mr-4">
                  <div class="input-label">Columnas</div>
                  <v-select outlined
                            hide-details
                            dense
                            placeholder="No. INAH"
                            multiple
                            return-object
                            item-text="text"
                            v-model="tableColumnsSelected"
                            :items="headers">
                    <template v-slot:selection="{item, index}">
                      <v-chip v-if="index === 0">
                        <span>{{item.text}}</span>
                      </v-chip>
                      <span v-if="index === 1"
                            class="grey--text caption">
                        (+{{tableColumnsSelected.length - 1}} otros)
                      </span>
                    </template>
                  </v-select>
                </div>
                <div style="width: 200px">
                  <div class="input-label ">Búsqueda</div>
                  <v-text-field outlined
                                hide-details
                                placeholder="MPF-985"
                                dense>
                  </v-text-field>
                </div>
              </v-col>
              <v-col cols="12" class="mb-4">
                <v-data-table
                    height="500px"
                    :headers="tableColumnsSelected"
                    :items="desserts"
                    :items-per-page="10">
                </v-data-table>
              </v-col>
              <v-col cols="12">
                <v-btn class=" blue mr-4"
                       dark
                       depressed
                       height="40px">Cambiar vista
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      <!-- ends table -->
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Dashboard",
  data: () => ({
    tab: null,
    items: [
      'Pieza', 'Especie', 'Persona', 'Almacenamiento',
    ],
    tableColumns: [
      'No. INAH',
      'Forma ingreso',
      'Estatus',
      'Descripción',
      'Datación',
      'Notas taxonómicas',
      'Estado taxonómico',
      'Longitud',
      'Nombre científico'
    ],
    tableColumnsSelected: [
      {
        text: 'No. INAH',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: 'Forma ingreso', value: 'calories' },
      { text: 'Ingreso', value: 'fat' },
    ],
    headers: [
      {
        text: 'No. INAH',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: 'Forma ingreso', value: 'calories' },
      { text: 'Ingreso', value: 'fat' },
      { text: 'Estatus', value: 'carbs' },
      { text: 'Notas taxonómicas', value: 'other' },
      { text: 'Datación', value: 'carbs' },
      { text: 'Descripción', value: 'carbs' },
      { text: 'Nombre científico', value: 'carbs' },
      { text: 'Estado taxonómico', value: 'carbs' },
      { text: 'Longitud', value: 'carbs' },

    ],
    desserts: [
      {
        name: 'PXX-10211',
        calories: 'Mammalia',
        fat: 'Dino',
        carbs: 'Martha',
      },
      {
        name: 'PXX-1011',
        calories: 'Mammalia',
        fat: 'Dino',
        carbs: 'Estudiante 2',
      },
      {
        name: 'PXX-10261',
        calories: 'Mammalia',
        fat: 'Dino',
        carbs: 'Ramiro',
      },
      {
        name: 'PXX-1711',
        calories: 'Mammalia',
        fat: 'Dino',
        carbs: 'Bernardo',
      },
      {
        name: 'PXX-1711',
        calories: 'Mammalia',
        fat: 'Dino',
        carbs: 'Bernardo',
      },
      {
        name: 'PXX-10211',
        calories: 'Mammalia',
        fat: 'Dino',
        carbs: 'Martha',
      },
      {
        name: 'PXX-1011',
        calories: 'Mammalia',
        fat: 'Dino',
        carbs: 'Estudiante 2',
      },
      {
        name: 'PXX-10261',
        calories: 'Mammalia',
        fat: 'Dino',
        carbs: 'Ramiro',
      },
      {
        name: 'PXX-1711',
        calories: 'Mammalia',
        fat: 'Dino',
        carbs: 'Bernardo',
      },
      {
        name: 'PXX-1711',
        calories: 'Mammalia',
        fat: 'Dino',
        carbs: 'Bernardo',
      },
    ],
    dialog: false,
  })
}
</script>

<style scoped>

</style>
