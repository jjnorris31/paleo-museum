<template>
  <v-container fluid>
    <v-row no-gutters
           justify="center"
           class="white">
      <!-- begin dialog -->
      <v-dialog v-model="dialog"
                fullscreen
                transition="dialog-bottom-transition"
                hide-overlay
                class="full-height">
        <v-row no-gutters
               style="background-color: white; height: 100%"
               class="pt-15 pl-15">
          <v-col cols="6">
            <h1 class="mb-6 text-h4 font-weight-medium">Nueva pieza</h1>
            <v-form ref="piece-form"
                    class="d-flex no-gutters flex-wrap">

              <!-- begin basic information -->
              <div class="col-12 text-h6">
                Información básica
              </div>
              <div class="d-flex flex-wrap row--dense">

                <!-- begin INAH number -->
                <div class="col-4">
                  <div class="input-label">
                    No. de registro INAH
                  </div>
                  <v-text-field outlined
                                :rules="stdRules"
                                type="text"
                                placeholder="XXX-X-0000"
                                v-model="piece.inahRecNum"
                                dense>
                  </v-text-field>
                </div>
                <!-- begin INAH number -->

                <!-- begin anatomical element -->
                <div class="col-4">
                  <div class="input-label">
                    Elemento anatómico
                  </div>
                  <v-text-field outlined
                                placeholder="Mandíbula"
                                :rules="nameRules"
                                type="text"
                                v-model="piece.anatoElement"
                                dense>
                  </v-text-field>
                </div>
                <!-- begin anatomical element -->

                <!-- begin income form -->
                <div class="col-4">
                  <div class="input-label">
                    Forma de ingreso
                  </div>
                  <v-text-field outlined
                                type="text"
                                :rules="nameRules"
                                placeholder="Legal"
                                v-model="piece.incomeForm"
                                dense>
                  </v-text-field>
                </div>
                <!-- begin income form -->

                <!-- begin status -->
                <div class="col-4">
                  <div class="input-label">
                    Estado
                  </div>
                  <v-text-field outlined
                                type="text"
                                :rules="nameRules"
                                placeholder="Buen estado"
                                v-model="piece.status"
                                dense>
                  </v-text-field>
                </div>
                <!-- ends status -->

                <!-- begin description -->
                <div class="col-4">
                  <div class="input-label">
                    Descripción
                  </div>
                  <v-text-field outlined
                                type="text"

                                :rules="stdRules"
                                placeholder="Pieza muy rara"
                                v-model="piece.description"
                                dense>
                  </v-text-field>
                </div>
                <!-- ends description -->

                <!-- begin dating -->
                <div class="col-4">
                  <div class="input-label">
                    Datación
                  </div>
                  <v-text-field outlined
                                type="text"

                                :rules="stdRules"
                                placeholder="10.000 B.C."
                                v-model="piece.dating"
                                dense>
                  </v-text-field>
                </div>
                <!-- ends dating -->

              </div>
              <!-- ends basic information -->

              <!-- begin taxonomic -->
              <div class="col-12 text-h6">
                Taxonomía
              </div>
              <div class="d-flex flex-wrap row--dense">

                <!-- begin specie -->
                <div class="col-4">
                  <div class="input-label">
                    Especie
                  </div>
                  <v-autocomplete outlined
                                  :items="getSpecies"
                                  item-value="nombrecientifico"
                                  placeholder="ESPECIE 1"
                                  item-text="nombrecientifico"
                                  v-model="piece.specie"
                                  dense>
                  </v-autocomplete>
                </div>
                <!-- ends specie -->

                <!-- begin collection -->
                <div class="col-4">
                  <div class="input-label">
                    Colección
                  </div>
                  <v-autocomplete outlined
                                  :items="getCollections"
                                  item-value="idc"
                                  placeholder="COLECCIÓN 1"
                                  item-text="nombre"
                                  v-model="piece.idCollection"
                                  dense>
                  </v-autocomplete>
                </div>
                <!-- ends collection -->

                <!-- begin taxonomic notes -->
                <div class="col-4">
                  <div class="input-label">
                    Notas taxónomicas
                  </div>
                  <v-text-field outlined
                                :rules="stdRules"
                                placeholder="Nota increíble"
                                v-model="piece.taxoStatNote"
                                dense>
                  </v-text-field>
                </div>
                <!-- ends taxonomic notes -->

                <!-- begin taxonomic notes -->
                <div class="col-4">
                  <div class="input-label">
                    Estado taxonómico
                  </div>
                  <v-text-field outlined
                                :rules="nameRules"
                                placeholder="Estado increíble"
                                v-model="piece.taxoStat"
                                dense>
                  </v-text-field>
                </div>
                <!-- ends taxonomic notes -->

                <!-- begin institution -->
                <div class="col-4">
                  <div class="input-label">
                    Institución
                  </div>
                  <v-select outlined
                            :items="getInstitutions"
                            item-text="nombre"
                            item-value="idi"
                            placeholder="INSTITUCIÓN 1"
                            v-model="piece.idInstitute"
                            dense>
                  </v-select>
                </div>
                <!-- ends institution -->

                <!-- begin institution -->
                <div class="col-4">
                  <div class="input-label">
                    Localidad
                  </div>
                  <v-select outlined
                            :items="getLocalities"
                            item-text="nombre"
                            item-value="idl"
                            placeholder="LOCALIDAD 1"
                            v-model="piece.idLocality"
                            dense>
                  </v-select>
                </div>
                <!-- ends institution -->
              </div>
              <!-- ends taxonomic -->

              <!-- begin location -->
              <div class="col-12 text-h6">
                Ubicación
              </div>
              <div class="d-flex flex-wrap row--dense"
                   style="width: 100%">
                <!-- begin country -->
                <div class="col-4">
                  <div class="input-label">
                    País
                  </div>
                  <v-autocomplete outlined
                                  :items="locations"
                                  item-value="pais"
                                  placeholder="MEXICO"
                                  item-text="pais"
                                  v-model="countrySltd"
                                  dense>
                  </v-autocomplete>
                </div>
                <!-- ends country -->

                <!-- begin state -->
                <div class="col-4">
                  <div class="input-label">
                    Entidad federativa
                  </div>
                  <v-autocomplete outlined
                                  :items="states"
                                  item-value="estado"
                                  :disabled="states.length === 0"
                                  placeholder="JALISCO"
                                  item-text="estado"
                                  v-model="stateSltd"
                                  :loading="states.length === 0 && countrySltd !== ''"
                                  dense>
                  </v-autocomplete>
                </div>
                <!-- ends state -->

                <!-- begin state -->
                <div class="col-4">
                  <div class="input-label">
                    Municipio
                  </div>
                  <v-autocomplete outlined
                                  item-text="municipio"
                                  :disabled="municipalities.length === 0"
                                  item-value="idu"
                                  :items="municipalities"
                                  placeholder="ZAPOPAN"
                                  v-model="piece.idLocation"
                                  :loading="municipalities.length === 0 && stateSltd !== ''"
                                  dense>
                  </v-autocomplete>
                </div>
                <!-- ends state -->

                <!-- begin long -->
                <div class="col-4">
                  <div class="input-label">
                    Longitud
                  </div>
                  <v-text-field outlined
                                :rules="decimalRules"
                                v-model="piece.lon"
                                validate-on-blur
                                type="number"
                                placeholder="123"
                                dense>
                  </v-text-field>
                </div>
                <!-- ends long -->

                <!-- begin lat -->
                <div class="col-4">
                  <div class="input-label">
                    Latitud
                  </div>
                  <v-text-field outlined
                                type="number"
                                :rules="decimalRules"
                                v-model="piece.lat"
                                placeholder="456"
                                dense>
                  </v-text-field>
                </div>
                <!-- ends lat -->

              </div>
              <!-- ends location -->



            </v-form>
            <div class="col-12 d-flex justify-center mb-5 no-gutters">
              <div class="col-5 d-flex">
                <v-btn color="secondary"
                       dark
                       class="mr-2"
                       outlined
                       @click="getFmtPiece(piece)"
                       style="border-width: 2px"
                       height="40px">Cancelar</v-btn>

                <v-btn color="secondary"
                       dark
                       class="ml-2"
                       elevation="4"
                       height="40px">Guardar pieza</v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-dialog>
      <!-- ends dialog -->

      <!-- begin header -->
      <v-col cols="12"
             class="mt-12 mb-4 px-12">
        <v-row no-gutters>
          <v-col cols="8">
            <h2 class="text-h4 font-weight-medium">Vista general</h2>
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
                    v-if="!dialog"
                    height="400px"
                    :headers="tableColumnsSelected"
                    :items="desserts"
                    :items-per-page="10">
                </v-data-table>
              </v-col>
              <v-col cols="12">
                <v-btn height="40px"
                       depressed
                       elevation="4"
                       @click="dialog = true"
                       color="secondary">Añadir pieza</v-btn>
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
import {mapGetters} from 'vuex'
import {stdRules, nameRules, decimalRules} from "@/misc/rules";

export default {
  name: "Dashboard",
  data: () => ({
    tab: null,
    stdRules,
    decimalRules,
    nameRules,
    items: [
      'Pieza', 'Especie', 'Persona', 'Almacenamiento',
    ],
    locations: null,
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
    info: '',
    piece: {
      inahRecNum: '',
      anatoElement: '',
      incomeForm: '',
      status: '',
      description: '',
      dating: '',
      state: '',
      municipality: '',
      lon: '',
      lat: '',
      taxoStat: '',
      taxoStatNote: '',
      specie: '',
      idCollection: '',
      idInstitute: '',
      idLocality: '',
      idLocation: '',
    }, // a new piece to be saved
    countries: [],
    states: [],
    municipalities: [],
    countrySltd: '',
    stateSltd: '',
    institutions: [],
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
  }),
  computed: {
    storeLocations() {
      return this.$store.getters.locations;
    },
    ...mapGetters(
        ['states',
          'getCollections',
          'getInstitutions',
          'getSpecies',
          'getPieces',
          'getLocalities']
    ),
  },
  watch: {
    storeLocations: {
      handler: function (val) {
        this.locations = val;
      },
      immediate: true,
    },
    async countrySltd(val) {
      console.log(val);
      let states =  await this.$store.dispatch('retrieveStates', val);
      this.states = Array.from(new Set(states));
    },
    async stateSltd(val) {
      let payload = {
        country: this.countrySltd,
        state: val,
      }
      let muns =  await this.$store.dispatch('retrieveMun', payload);
      this.municipalities = Array.from(new Set(muns));
    },
  },
  async mounted() {
    await this.$store.dispatch('retrieveLocations');
    await this.$store.commit('SET_STATES');
    await this.$store.dispatch('retrieveInst');
    await this.$store.dispatch('retrieveColl');
    await this.$store.dispatch('retrieveLocl');
    await this.$store.dispatch('retrieveSpecies');
    await this.$store.dispatch('retrievePieces');
  },
  methods: {
    async postPiece(fmtPiece) {
     let res = await this.$store.dispatch('postPiece', fmtPiece);
     console.log(res);
    },
    async getFmtPiece(piece) {
      let fmtPiece = {
        "imagen": '',
        'nregistroinah': piece.inahRecNum,
        'elematomico': piece.anatoElement,
        'formaingreso': piece.incomeForm,
        'estatus': piece.status,
        'descripcion': piece.description,
        'datacion': piece.dating,
        'notasesttaxo': piece.taxoStatNote,
        'estatustaxonomico': piece.taxoStat,
        'longitud': parseFloat(piece.lon),
        'latitud': parseFloat(piece.lat),
        'idc': Number(piece.idCollection),
        'nombrecientifico': piece.specie,
        'idi': Number(piece.idInstitute),
        'idu': Number(piece.idLocation),
        'idl': Number(piece.idLocality),
      };
      console.log(fmtPiece);
      await this.postPiece(fmtPiece);
    },
  }
}
</script>npm

<style scoped>

div + .museum-input:focus {
  color: darkred;
}

</style>
