<template>
  <v-row style="background-color: lightgray" no-gutters justify="center">
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
    <v-col cols="12" class="upper-container mb-9 d-flex align-center">
      <div class="col-8 ml-2 grey--text text--darken-3">
        <h2>Dashboard</h2>
      </div>
    </v-col>
    <v-col cols="11"
           class="main-container mb-9 rounded">
      <v-row no-gutters justify="center">
        <v-col cols="12">
          <h3 class="mt-5 ml-4">Consulta de materiales</h3>
        </v-col>
        <v-col cols="11">
          <v-row no-gutters>
            <!-- tabs -->
            <v-col cols="12">
              <v-tabs center-active color="blue"
                      v-model="tab"
                      background-color="transparent">
                <v-tab
                    v-for="item in items"
                    :key="item"
                >
                  {{ item }}
                </v-tab>
              </v-tabs>
            </v-col>
            <!-- end of tabs -->
            <v-col cols="12" class="d-flex justify-end align-end no-gutters mb-2">
              <v-btn class="mr-4 primary" dark depressed height="40px" @click="dialog = true">Añadir especie</v-btn>
              <div style="width: 200px" class="mr-4">
                <div class="input-label ">Selecciona</div>
                <v-select outlined
                          hide-details
                          dense
                          placeholder="Clase">
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
              <v-tabs-items v-model="tab">
                <v-tab-item
                    v-for="item in items"
                    :key="item">
                  <v-row no-gutters style="height: 300px">
                    <v-col cols="12"
                           style="background-color: lightgray">
                      <v-data-table
                          height="300px"
                          :headers="headers"
                          :items="desserts"
                          :items-per-page="5"
                      ></v-data-table>
                    </v-col>
                  </v-row>
                </v-tab-item>
              </v-tabs-items>
            </v-col>
            <v-col cols="12">
              <v-btn class=" blue mr-4" dark depressed height="40px">Cambiar vista</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Dashboard",
  data: () => ({
    tab: null,
    items: [
      'Pieza', 'Especie', 'Persona', 'Almacenamiento',
    ],
    headers: [
      {
        text: 'No. de catálogo',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: 'Género', value: 'calories' },
      { text: 'Especie', value: 'fat' },
      { text: 'Persona', value: 'carbs' },
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

    ],
    dialog: false,
  })
}
</script>

<style scoped>

</style>
