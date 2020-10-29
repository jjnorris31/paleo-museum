<template>
  <v-container fluid>
    <v-row no-gutters
           justify="center"
           class="white">

      <!-- begin dialog -->
      <v-dialog v-model="mainDialog"
                fullscreen
                transition="dialog-bottom-transition"
                hide-overlay
                class="full-height">
        <!-- begins photo dialog overlay -->
        <v-overlay v-model="saveOverlay"
                   absolute>
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
              <div>Guardando pieza</div>
            </v-col>
          </v-row>
        </v-overlay>
        <!-- ends photo dialog overlay -->
        <v-row no-gutters
               style="background-color: white; height: 100%"
               class="pt-15 pl-15">
          <v-col cols="6">
            <h1 class="mb-6 text-h4 font-weight-medium" v-if="newItemActive">Nueva pieza</h1>
            <h1 class="mb-6 text-h4 font-weight-medium" v-if="editActive">Editar pieza</h1>
            <v-form ref="pieceForm"
                    lazy-validation
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
                                v-model="piece.nregistroinah"
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
                                v-model="piece.elematomico"
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
                                v-model="piece.formaingreso"
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
                                v-model="piece.estatus"
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
                                v-model="piece.descripcion"
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
                                v-model="piece.datacion"
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
                  <div class="d-flex align-start">
                    <v-autocomplete outlined
                                    class="pr-1"
                                    :items="getSpecies"
                                    item-value="nombrecientifico"
                                    placeholder="ESPECIE 1"
                                    item-text="nombrecientifico"
                                    v-model="piece.nombrecientifico"
                                    dense>
                    </v-autocomplete>
                    <v-tooltip bottom>
                      <template v-slot:activator="{on, attrs}">
                        <div style="height: 40px" class="d-flex align-center">
                          <v-btn icon
                                 v-on="on"
                                 text
                                 @click="showMessage()"
                                 v-bind="attrs"
                                 rounded>
                            <v-icon>mdi-plus-circle-outline
                            </v-icon>
                          </v-btn>
                        </div>
                      </template>
                      <span>Nueva especie</span>
                    </v-tooltip>
                  </div>
                </div>
                <!-- ends specie -->

                <!-- begin collection -->
                <div class="col-4">
                  <div class="input-label">
                    Colección
                  </div>
                  <div class="d-flex align-start">
                    <v-autocomplete outlined
                                    class="pr-1"
                                    :items="getCollections"
                                    item-value="idc"
                                    placeholder="COLECCIÓN 1"
                                    item-text="nombre"
                                    v-model="piece.idc"
                                    dense>
                    </v-autocomplete>
                    <v-tooltip bottom>
                      <template v-slot:activator="{on, attrs}">
                        <div style="height: 40px" class="d-flex align-center">
                          <v-btn icon
                                 v-on="on"
                                 text
                                 @click="showMessage()"
                                 v-bind="attrs"
                                 rounded>
                            <v-icon>mdi-plus-circle-outline
                            </v-icon>
                          </v-btn>
                        </div>
                      </template>
                      <span>Nueva colección</span>
                    </v-tooltip>
                  </div>
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
                                v-model="piece.notasesttaxo"
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
                                v-model="piece.estatustaxonomico"
                                dense>
                  </v-text-field>
                </div>
                <!-- ends taxonomic notes -->

                <!-- begin institution -->
                <div class="col-4">
                  <div class="input-label">
                    Institución
                  </div>
                  <div class="d-flex align-start">
                    <v-select outlined
                              :items="getInstitutions"
                              item-text="nombre"
                              item-value="idi"
                              class="pr-1"
                              placeholder="INSTITUCIÓN 1"
                              v-model="piece.idi"
                              dense>
                    </v-select>
                    <v-tooltip bottom>
                      <template v-slot:activator="{on, attrs}">
                        <div style="height: 40px" class="d-flex align-center">
                          <v-btn icon
                                 v-on="on"
                                 text
                                 @click="showMessage()"
                                 v-bind="attrs"
                                 rounded>
                            <v-icon>mdi-plus-circle-outline
                            </v-icon>
                          </v-btn>
                        </div>
                      </template>
                      <span>Nueva institución</span>
                    </v-tooltip>

                  </div>
                </div>
                <!-- ends institution -->

                <!-- begin institution -->
                <div class="col-4">
                  <div class="input-label">
                    Localidad
                  </div>
                  <div class="d-flex align-start">
                    <v-select outlined
                              :items="getLocalities"
                              item-text="nombre"
                              class="pr-1"
                              item-value="idl"
                              placeholder="LOCALIDAD 1"
                              v-model="piece.idl"
                              dense>
                    </v-select>
                    <v-tooltip bottom>
                      <template v-slot:activator="{on, attrs}">
                        <div style="height: 40px" class="d-flex align-center">
                          <v-btn icon
                                 v-on="on"
                                 text
                                 @click="showMessage()"
                                 v-bind="attrs"
                                 rounded>
                            <v-icon>mdi-plus-circle-outline
                            </v-icon>
                          </v-btn>
                        </div>
                      </template>
                      <span>Nueva localidad</span>
                    </v-tooltip>
                  </div>

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
                  <div class="d-flex align-start">
                    <v-autocomplete outlined
                                    class="pr-1"
                                    :items="locations"
                                    item-value="pais"
                                    placeholder="MEXICO"
                                    item-text="pais"
                                    v-model="countrySltd"
                                    dense>
                    </v-autocomplete>
                    <v-tooltip bottom>
                      <template v-slot:activator="{on, attrs}">
                        <div style="height: 40px" class="d-flex align-center">
                          <v-btn icon
                                 v-on="on"
                                 text
                                 @click="showMessage()"
                                 v-bind="attrs"
                                 rounded>
                            <v-icon>mdi-plus-circle-outline
                            </v-icon>
                          </v-btn>
                        </div>
                      </template>
                      <span>Nueva ubicación</span>
                    </v-tooltip>
                  </div>
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
                                  v-model="piece.idu"
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
                                v-model="piece.longitud"
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
                                v-model="piece.latitud"
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
                       @click="editActive ? closeEditItem() : closeNewItem()"
                       style="border-width: 2px"
                       height="40px">Cancelar</v-btn>
                <v-btn color="secondary"
                       dark
                       v-if="newItemActive"
                       class="ml-2"
                       elevation="4"
                       @click="postPiece(piece)"
                       height="40px">Guardar pieza
                </v-btn>
                <v-btn color="secondary"
                       dark
                       v-if="editActive"
                       class="ml-2"
                       @click="updatePiece()"
                       elevation="4"
                       height="40px">Guardar cambios
                </v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-dialog>
      <!-- ends dialog -->

      <!-- begin delete dialog -->
      <v-dialog v-model="deleteDialog"
                width="600px"
                class="full-height">
        <!-- begins photo dialog overlay -->
        <v-overlay v-model="deleteOverlay"
                   absolute>
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
              <div>Eliminando pieza</div>
            </v-col>
          </v-row>
        </v-overlay>
        <!-- ends photo dialog overlay -->
        <v-row no-gutters
               style="background-color: white; height: 100%"
               class="pt-7 px-7">
          <v-col cols="12">
            <h1 class="mb-2 text-h6 font-weight-medium">Borrado de registros</h1>
            <p class="grey--text">¿Estás seguro de borrar este registro?</p>
            <div class="col-12 d-flex justify-end mb-5 no-gutters">
              <div class="col-5 d-flex no-gutters">
                <v-btn color="secondary"
                       dark
                       class="mr-2"
                       outlined
                       @click="deleteDialog = false"
                       style="border-width: 2px"
                       height="40px">Cancelar</v-btn>
                <v-btn color="error"
                       dark
                       class="ml-2"
                       @click="deletePiece()"
                       elevation="4"
                       height="40px">Borrar</v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-dialog>
      <!-- ends delete dialog -->

      <!-- begin main overlay -->
      <v-overlay v-model="mainOverlay"
                 absolute>
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
            <div>{{mainOverlayText}}</div>
          </v-col>
        </v-row>
      </v-overlay>
      <!-- ends search overlay -->

      <v-dialog v-model="indivDialog"
                v-if="indItem !== null"
                width="600px">
        <v-card height="100%">
          <v-img src="https://media-cdn.tripadvisor.com/media/photo-m/1280/1a/99/ec/5c/photo3jpg.jpg"
                 height="200px"
                 gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
                 class="mb-4"
                 cover>
            <v-card-title class="white--text text-h4">
              {{indItem.nregistroinah}}
            </v-card-title>
            <v-card-subtitle class="white--text text-h6">
              {{indItem.elematomico}}
            </v-card-subtitle>
          </v-img>
          <v-card-text>
            <v-row no-gutters>
              <v-col cols="6">
                <h6 class="subtitle-1">Forma de ingreso</h6>
                <p>{{indItem.formaingreso}}</p>
              </v-col>
              <v-col cols="6">
                <h6 class="subtitle-1">Estado</h6>
                <p>{{indItem.estatus}}</p>
              </v-col>
              <v-col cols="6">
                <h6 class="subtitle-1">Datación</h6>
                <p>{{indItem.estatus}}</p>
              </v-col>
              <v-col cols="6">
                <h6 class="subtitle-1">Estado taxonómico</h6>
                <p>{{indItem.estatus}}</p>
              </v-col>
              <v-col cols="6">
                <h6 class="subtitle-1">Nombre científico</h6>
                <p>{{indItem.nombrecientifico}}</p>
              </v-col>
              <v-col cols="12">
                <h6 class="subtitle-1">Descripción</h6>
                <p>{{indItem.descripcion}}</p>
              </v-col>
              <v-col cols="12">
                <h6 class="subtitle-1">Notas estado taxonómico</h6>
                <p>{{indItem.notasesttaxo}}</p>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-dialog>

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
                            id="column-select"
                            hide-details
                            dense
                            placeholder="No. INAH"
                            multiple
                            color="warning"
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
                  <div class="input-label">Búsqueda (INAH)</div>
                  <v-text-field outlined
                                hide-details
                                @keyup="searchInDb()"
                                v-model="search"
                                placeholder="Quo sunt"
                                dense>
                  </v-text-field>
                </div>
              </v-col>
              <v-col cols="12"
                     class="mb-4">
                <v-data-table
                    v-if="!mainDialog"
                    show-select
                    @click:row="openIndividualItem"
                    height="400px"
                    v-model="selectedPieces"
                    :loading="getPieces.length === 0 && this.search === ''"
                    loader-height="4"
                    item-key="nregistroinah"
                    loading-text="Desenterrando los fósiles..."
                    :headers="tableColumnsSelected"
                    :items="getPieces"
                    :items-per-page="25">
                  <template v-slot:item.actions="{item}">
                    <v-icon @click.stop="openEditItem(item)">mdi-pencil</v-icon>
                  </template>
                </v-data-table>
              </v-col>
              <v-col cols="12">
                <v-btn height="40px"
                       depressed
                       class="mr-2"
                       elevation="4"
                       @click="openNewItem()"
                       color="secondary">Añadir pieza
                </v-btn>
                <v-btn height="40px"
                       depressed
                       @click="deleteDialog = true"
                       elevation="4"
                       color="error">Borrar pieza
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
import {mapGetters} from 'vuex'
import {stdRules, nameRules, decimalRules} from "@/misc/rules";


export default {
  name: "Dashboard",
  components: {
  },
  data: () => ({
    tab: null,
    stdRules,
    decimalRules,
    nameRules,
    saveOverlay: false,
    deleteOverlay: false,
    items: [
      'Pieza', 'Especie', 'Persona', 'Almacenamiento',
    ],
    search: '',
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
      nregistroinah: '',
      elematomico: '',
      formaingreso: '',
      estatus: '',
      descripcion: '',
      datacion: '',
      estatustaxonomico: '',
      notasesttaxo: '',
      longitud: '',
      latitud: '',
      nombrecientifico: '',
      idc: '',
      idi: '',
      idl: '',
      idu: '',
      imagen: '',
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
        disabled: true,
        align: 'start',
        sortable: true,
        value: 'nregistroinah',
      },
      {
        text: 'Elemento anatómico',
        align: 'start',
        disabled: true,
        sortable: true,
        value: 'elematomico',
      },
      {
        text: 'Forma ingreso',
        disabled: true,
        align: 'start',
        sortable: true,
        value: 'formaingreso',
      },
      {
        text: 'Estatus',
        align: 'start',
        sortable: true,
        value: 'estatus',
      },
      {
        text: 'Descripción',
        align: 'start',
        sortable: true,
        value: 'descripcion',
      },
      {
        text: 'Datación',
        align: 'start',
        sortable: true,
        value: 'datacion',
      },
      {
        text: 'Notas taxonómicas',
        align: 'start',
        sortable: true,
        value: 'notasesttaxo',
      },
      {
        text: 'Estado taxonómico',
        align: 'start',
        sortable: true,
        value: 'estatustaxonomico',
      },
      {
        text: 'Acciones',
        align: 'center',
        sortable: false,
        disabled: true,
        value: 'actions'
      },
    ],
    headers: [
      {
        text: 'No. INAH',
        disabled: true,
        align: 'start',
        sortable: true,
        value: 'nregistroinah',
      },
      {
        text: 'Elemento anatómico',
        align: 'start',
        disabled: true,
        sortable: true,
        value: 'elematomico',
      },
      {
        text: 'Forma ingreso',
        disabled: true,
        align: 'start',
        sortable: true,
        value: 'formaingreso',
      },
      {
        text: 'Estatus',
        align: 'start',
        sortable: true,
        value: 'estatus',
      },
      {
        text: 'Descripción',
        align: 'start',
        sortable: true,
        value: 'descripcion',
      },
      {
        text: 'Datación',
        align: 'start',
        sortable: true,
        value: 'datacion',
      },
      {
        text: 'Notas taxonómicas',
        align: 'start',
        sortable: true,
        value: 'notasesttaxo',
      },
      {
        text: 'Estado taxonómico',
        align: 'start',
        sortable: true,
        value: 'estatustaxonomico',
      },
      {
        text: 'Longitud',
        align: 'start',
        sortable: true,
        value: 'longitud',
      },
      {
        text: 'Latitud',
        align: 'start',
        sortable: true,
        value: 'latitud',
      },
      {
        text: 'Nombre científico',
        align: 'start',
        sortable: true,
        value: 'nombrecientifico'
      },
      {
        text: 'Acciones',
        align: 'center',
        disabled: true,
        sortable: false,
      },
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
    mainDialog: false,
    deleteDialog: false,
    indivDialog: false,
    pieces: [],
    selectedPieces: [],
    timeout: null,
    mainOverlay: false, // page's flag overlay
    mainOverlayText: '', // text page's overlay
    indItem: null,
    editActive: false,
    newItemActive: false,
    editLocation: {},
  }),
  computed: {
    storeLocations() {
      return this.$store.getters.locations;
    },
    ...mapGetters(
        ['getCollections',
          'getInstitutions',
          'getSpecies',
          'getPieces',
          'getLocalities']
    ),
  },
  watch: {
    getPieces: {
      handler: function (val) {
        this.pieces = val;
      },
      immediate: true,
    },
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
    this.showMainOverlay();
    this.setMainOverlayText('Recuperando información...');

    /*await this.$store.dispatch('retrieveLocations');
    await this.$store.commit('SET_STATES');
    await this.$store.dispatch('retrieveInst');
    await this.$store.dispatch('retrieveColl');
    await this.$store.dispatch('retrieveLocl');
    await this.$store.dispatch('retrieveSpecies');
    await this.$store.dispatch('retrievePieces');
    */

    let p1 = this.$store.dispatch('retrieveLocations');
    let p2 = this.$store.commit('SET_STATES');
    let p3 = this.$store.dispatch('retrieveInst');
    let p4 = this.$store.dispatch('retrieveColl');
    let p5 = this.$store.dispatch('retrieveLocl');
    let p6 = this.$store.dispatch('retrieveSpecies');
    let p7 = this.$store.dispatch('retrievePieces');

    /**
     * Handle with a lot of promises!
     * @type {unknown[]}
     */
    let res = await Promise.all([p1, p2, p3, p4, p5, p6, p7]);
    console.log("finished: ", res);
    this.hideMainOverlay();
  },
  methods: {
    showMessage() {
      console.log("messageeeeee");
    },
    openIndividualItem(value) {
      this.indivDialog = true;
      this.indItem = value;
    },
    closeDialog() {
      this.mainDialog = false;
    },
    openDialog() {
      this.mainDialog = true;
    },
    /**
     * Open the new item dialog and reset the piece variable
     */
    openNewItem() {
      this.newItemActive = true;
      this.resetPiece();
      this.openDialog();
      this.$refs.pieceForm.reset();
    },
    /**
     * Closes the new item dialog and reset the piece variable
     */
    closeNewItem() {
      this.newItemActive = false;
      this.closeDialog();
    },
    /**
     * Opens the edit item dialog
     */
    async openEditItem(item) {
      this.editActive = true;
      this.showMainOverlay();
      this.setMainOverlayText('Abriendo pieza...');
      let res = await this.$store.dispatch('retrieveLocationById', item.idu);
      this.setCountrySlt(res.pais);
      this.setStateSlt(res.estado);
      this.hideMainOverlay();
      this.openDialog();
      this.piece = item;
    },
    /**
     * Set the main's overlay text
     * @param: text the text to display in the overlay
     */
    setMainOverlayText(text) {
      this.mainOverlayText = text;
    },
    /**
     * Sets the country selected to display it in the text field
     */
    setCountrySlt(country) {
      this.countrySltd = country;
    },
    /**
     * Sets the state selected to display it in the text field
     */
    setStateSlt(state) {
      this.stateSltd = state;
    },
    /**
     * Closes the edit piece dialog and reset the piece variable
     */
    closeEditItem() {
      this.editActive = false;
      this.closeDialog();
    },
    /**
     * Erase all the info of the piece selected
     */
    resetPiece() {
      this.piece = {
        nregistroinah: '',
        elematomico: '',
        formaingreso: '',
        estatus: '',
        descripcion: '',
        datacion: '',
        estatustaxonomico: '',
        notasesttaxo: '',
        longitud: '',
        latitud: '',
        nombrecientifico: '',
        idc: '',
        idi: '',
        idl: '',
        idu: '',
        imagen: '',
      }
    },
    async postPiece(fmtPiece) {
      this.showSaveOverlay();
      let res = await this.$store.dispatch('postPiece', fmtPiece);
      console.log(res);
      if (res) {
        await this.$store.dispatch('retrievePieces');
        this.hideSaveOverlay();
        this.search = '';
      } else {
        console.log('something has happened!');
        this.hideSaveOverlay();
        this.search = '';
      }
      this.hideMainOverlay();
    },
    async updatePiece() {
      this.showSaveOverlay();
      let res = await this.$store.dispatch('updatePiece', this.piece);
      console.log(res);
      if (res) {
        await this.$store.dispatch('retrievePieces');
      } else {
        console.log('something has happened!');
      }
      this.hideSaveOverlay();
      this.resetSearch();
      this.closeEditItem();
    },
    resetSearch() {
      this.search = '';
    },
    async searchInDb() {
      this.showMainOverlay();
      this.setMainOverlayText('Buscando...');
      if (this.search !== '') {
        clearTimeout(this.timeout);
        // timeout to delay the search after the user ends typing
        this.timeout = setTimeout(async () => {
          let res = await this.$store.dispatch('searchPiece', this.search);
          console.log(res);
          this.hideMainOverlay();
        }, 1000);
        console.log(this.search);
      } else {
        let res = await this.$store.dispatch('retrievePieces');
        console.log(res);
        this.hideMainOverlay();
      }
    },
    /**
     * Show the main overlay
     */
    showMainOverlay() {
      this.mainOverlay = true;
    },
    /**
     * Hide the main overlay
     */
    hideMainOverlay() {
      this.mainOverlay = false;
    },
    /**
     * Show the save's overlay
     * */
    showSaveOverlay() {
      this.saveOverlay = true;
    },
    /**
     * Hide the save's overlay
     */
    hideSaveOverlay() {
      this.saveOverlay = false;
    },
    /**
     * Dispatch the action to delete an item in the database
     * @returns {Promise<void>}
     */
    async deletePiece() {
      this.deleteOverlay = true;
      let res = await this.$store.dispatch('deletePiece', this.selectedPieces[0].nregistroinah);

      if (res === 200) {
        console.log("DELETED: ", res);
        this.deleteDialog = false;
      }
    },
  }
}
</script>npm

<style>


</style>
