<template>
  <v-container fluid>
    <v-row no-gutters
           justify="center"
           class="white">

      <!-- begins main overlay -->
      <museum-overlay :overlay-active="overlayActive"
                      :text="overlayText">
      </museum-overlay>
      <!-- ends main overlay -->

      <!-- begin dialog -->
      <v-dialog v-model="formDialogActive"
                fullscreen
                transition="dialog-bottom-transition"
                hide-overlay
                class="full-height">
        <v-row no-gutters
               style="background-color: white; height: 100%; position: relative"
               class="pt-15 pl-15">
          <div style="height: 40px; position: absolute; left: 0"
               class="d-flex align-center ml-4">
            <v-btn icon
                   @click="isEditingItem ? closeEditItem() : closeNewItem()">
              <v-icon color="rgba(0, 0, 0, 0.87)" size="32">mdi-close</v-icon>
            </v-btn>
          </div>
          <v-col cols="6">
            <h1 class="mb-6 text-h4 font-weight-medium" v-if="isAddingItem">Nueva localidad</h1>
            <h1 class="mb-6 text-h4 font-weight-medium" v-if="isEditingItem">Editar localidad</h1>
            <v-form ref="specieForm"
                    lazy-validation
                    class="d-flex no-gutters flex-wrap">

              <!-- begin basic information -->
              <div class="col-12 text-h6">
                Información básica
              </div>
              <div class="d-flex no-gutters">

                <!-- begins fields -->
                <div class="d-flex flex-wrap no-gutters"
                     style="min-width: 973px">

                  <div class="row-form-container">

                    <!-- begins idl -->
                    <div>
                      <div class="input-label">
                        Identificador
                      </div>
                      <v-text-field outlined
                                    type="text"
                                    counter
                                    maxlength="30"
                                    placeholder="JAL-CHAP-005"
                                    v-model="location.idl"
                                    dense>
                      </v-text-field>
                    </div>
                    <!-- ends idl -->

                    <!-- begins nombre -->
                    <div>
                      <div class="input-label">
                        Nombre
                      </div>
                      <v-text-field outlined
                                    counter
                                    maxlength="30"
                                    type="text"
                                    :rules="[stdRules]"
                                    placeholder="Chapala"
                                    v-model="location.nombre"
                                    dense>
                      </v-text-field>
                    </div>
                    <!-- ends nombre -->

                    <!-- begins estatus legal -->
                    <div>
                      <div class="input-label">
                        Estatus legal
                      </div>
                      <v-text-field outlined
                                    counter
                                    maxlength="30"
                                    type="text"
                                    :rules="[stdRules]"
                                    placeholder="Terreno federal"
                                    v-model="location.estatuslegal"
                                    dense>
                      </v-text-field>
                    </div>
                    <!-- ends estatus legal -->

                  </div>

                  <div class="row-form-container">

                    <!-- begins fecha de datacion -->
                    <div>
                      <div class="input-label">
                        Fecha de datación
                      </div>
                      <v-menu
                        v-model="birthdayPicker"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            outlined
                            :value="formattedDate"
                            dense
                            placeholder="01-01-1999"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          locale="es-419"
                          @input="birthdayPicker = false"
                          v-model="location.fechadedatacion"
                          :allowed-dates="allowedDates"
                        ></v-date-picker>
                      </v-menu>
                    </div>
                    <!-- begins fecha de datacion -->

                    <!-- begins edad absoluta -->
                    <div>
                      <div class="input-label">
                        Edad absoluta
                      </div>
                      <v-text-field outlined
                                    counter
                                    maxlength="100"
                                    type="text"
                                    :rules="[stdRules]"
                                    placeholder="7500 +- 500"
                                    v-model="location.edadabsoluta"
                                    dense>
                      </v-text-field>
                    </div>
                    <!-- ends edad absoluta -->

                    <!-- begins ruta acceso -->
                    <div>
                      <div class="input-label">
                        Ruta acceso
                      </div>
                      <v-text-field outlined
                                    counter
                                    maxlength="100"
                                    type="text"
                                    :rules="[stdRules]"
                                    placeholder="Carretera Chapala"
                                    v-model="location.rutaacceso"
                                    dense>
                      </v-text-field>
                    </div>
                    <!-- ends ruta acceso -->
                  </div>

                  <div class="row-form-container">

                    <!-- begins era -->
                    <div>
                      <div class="input-label">
                        Era
                      </div>
                      <v-text-field outlined
                                    type="text"
                                    counter
                                    maxlength="30"
                                    placeholder="Cenozoico"
                                    v-model="location.era"
                                    dense>
                      </v-text-field>
                    </div>
                    <!-- ends era -->

                    <!-- begins periodo -->
                    <div>
                      <div class="input-label">
                        Periodo
                      </div>
                      <v-text-field outlined
                                    counter
                                    maxlength="30"
                                    type="text"
                                    :rules="[stdRules]"
                                    placeholder="Cuaternario"
                                    v-model="location.periodo"
                                    dense>
                      </v-text-field>
                    </div>
                    <!-- ends periodo -->

                    <!-- begin formacion -->
                    <div>
                      <div class="input-label">
                        Formación
                      </div>
                      <v-text-field outlined
                                    counter
                                    maxlength="30"
                                    type="text"
                                    :rules="[stdRules]"
                                    placeholder="Chapala"
                                    v-model="location.formacion"
                                    dense>
                      </v-text-field>
                    </div>
                    <!-- ends formacion -->

                  </div>

                  <!-- begin geologia -->
                  <div style="width: 100%">
                    <div class="input-label">
                      Geología
                    </div>
                    <v-textarea outlined
                                counter
                                maxlength="250"
                                height="80px"
                                type="text"
                                placeholder="Aquí va algo importante..."
                                v-model="location.geologia"
                                dense>
                    </v-textarea>
                  </div>
                  <!-- ends geologia -->

                  <div class="row-form-container">

                    <!-- begins vegetacion -->
                    <div>
                      <div class="input-label">
                        Vegetación
                      </div>
                      <v-text-field outlined
                                    type="text"
                                    counter
                                    maxlength="30"
                                    placeholder="Matorral xerófilo"
                                    v-model="location.vegetacion"
                                    dense>
                      </v-text-field>
                    </div>
                    <!-- ends vegetacion -->


                  </div>


                </div>
                <!-- ends fields -->

              </div>
              <!-- ends basic information -->

            </v-form>
            <div class="d-flex justify-center my-5 no-gutters"
                 style="width: 973px">
              <div class="col-5 d-flex justify-center">
                <v-btn color="secondary"
                       dark
                       class="mr-2"
                       outlined
                       @click="isEditingItem ? closeEditItem() : closeNewItem()"
                       style="border-width: 2px"
                       height="40px">Cancelar</v-btn>
                <v-btn color="secondary"
                       dark
                       v-if="isAddingItem"
                       class="ml-2"
                       elevation="4"
                       @click="saveLocation()"
                       height="40px">Guardar localidad
                </v-btn>
                <v-btn color="secondary"
                       dark
                       v-if="isEditingItem"
                       class="ml-2"
                       @click="editDialogActive = true"
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
      <v-dialog v-model="deleteDialogActive"
                width="600px"
                class="full-height">
        <v-row no-gutters
               style="background-color: white; height: 100%"
               class="pt-6 px-7">
          <v-col cols="12" class="d-flex no-gutters flex-wrap">
            <h1 class="mb-1 headline font-weight-medium col-12">Borrado de especie</h1>
            <div class="grey--text col-12 mb-4">¿Estás seguro de borrar esta especie?</div>
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
                     @click="deleteItem()"
                     elevation="4"
                     height="40px">Borrar</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-dialog>

      <!-- ends delete dialog -->

      <!-- begin edit dialog -->
      <v-dialog v-model="editDialogActive"
                width="600px"
                class="full-height">
        <v-row no-gutters
               style="background-color: white; height: 100%"
               class="pt-7 px-7">
          <v-col cols="12">
            <h1 class="mb-1 headline font-weight-medium">Edición de pieza</h1>
            <p class="grey--text">¿Estás seguro de guardar los cambios?</p>
            <div class="col-12 d-flex justify-end mb-2 no-gutters">
              <div class="col-5 d-flex no-gutters">
                <v-btn color="secondary"
                       dark
                       class="mr-2"
                       outlined
                       @click="editDialogActive = false"
                       style="border-width: 2px"
                       height="40px">Cancelar</v-btn>
                <v-btn color="error"
                       dark
                       class="ml-2"
                       @click="updateLocation()"
                       elevation="4"
                       height="40px">Editar</v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-dialog>
      <!-- ends edit dialog -->

      <!-- begins error snackbar -->
      <v-snackbar v-model="errorActive"
                  :color="colorSnackbar"
                  timeout="3000">
        {{errorText}}
      </v-snackbar>
      <!-- ends error snackbar -->

      <v-dialog v-model="individualDialog"
                v-if="locationSelected !== null"
                width="700px">
        <v-card height="100%"
                style="position: relative">
          <v-img src="../assets/images/not_found.svg"
                 height="225px"
                 gradient="35deg, rgba(0,0,0,0.7035014689469538) 0%, rgba(234,242,23,0) 100%"
                 class="mb-4"
                 cover>
            <div style="position: absolute; bottom: 0; left: 4px">
              <v-card-title class="white--text text-h3">
                {{ locationSelected.idl }}
              </v-card-title>
              <v-card-subtitle class="white--text text-h6">
                {{ locationSelected.nombre }}
              </v-card-subtitle>
            </div>
          </v-img>
          <v-card-text>
            <v-row no-gutters class="mx-4">
              <v-col cols="12"
                     class="text-h6 mt-4 mb-2"
                     style="color: rgba(0, 0, 0, 0.87)">Información general</v-col>

              <!-- begins first row -->
              <v-col cols="12"
                     class="subtitle-1  d-flex flex-wrap no-gutters ml-2"
                     style="color: rgba(0, 0, 0, 0.87)">
                <div class="col-4">{{ getFormattedData(locationSelected.estatuslegal) }}</div>
                <div class="col-4">{{ dateToDisplay(locationSelected.fechadedatacion) }}</div>
                <div class="col-4">{{ getFormattedData(locationSelected.edadabsoluta) }}</div>
              </v-col>
              <v-col cols="12"
                     class="caption font-italic d-flex flex-wrap no-gutters mb-4 ml-2">
                <div class="col-4">Estatus legal</div>
                <div class="col-4">Fecha de datación</div>
                <div class="col-4">Edad absoluta</div>
              </v-col>
              <!-- ends first row -->

              <!-- begins second row -->
              <v-col cols="12"
                     class="subtitle-1  d-flex flex-wrap no-gutters ml-2"
                     style="color: rgba(0, 0, 0, 0.87)">
                <div class="col-4">{{ getFormattedData(locationSelected.rutaacceso) }}</div>
                <div class="col-4">{{ getFormattedData(locationSelected.era) }}</div>
                <div class="col-4">{{ getFormattedData(locationSelected.periodo) }}</div>
              </v-col>
              <v-col cols="12"
                     class="caption font-italic d-flex flex-wrap no-gutters mb-4 ml-2">
                <div class="col-4">Ruta acceso</div>
                <div class="col-4">Era</div>
                <div class="col-4">Periodo</div>
              </v-col>
              <!-- ends second row -->

              <!-- begins third row -->
              <v-col cols="12"
                     class="subtitle-1  d-flex flex-wrap no-gutters ml-2"
                     style="color: rgba(0, 0, 0, 0.87)">
                <div class="col-4">{{ getFormattedData(locationSelected.formacion) }}</div>
                <div class="col-8">{{ getFormattedData(locationSelected.geologia) }}</div>
              </v-col>
              <v-col cols="12"
                     class="caption font-italic d-flex flex-wrap no-gutters mb-4 ml-2">
                <div class="col-4">Formación</div>
                <div class="col-8">Geología</div>
              </v-col>
              <!-- ends third row -->

              <!-- begins four row -->
              <v-col cols="12"
                     class="subtitle-1  d-flex flex-wrap no-gutters ml-2"
                     style="color: rgba(0, 0, 0, 0.87)">
                <div class="col-4">{{ getFormattedData(locationSelected.vegetacion) }}</div>
              </v-col>
              <v-col cols="12"
                     class="caption font-italic d-flex flex-wrap no-gutters mb-4 ml-2">
                <div class="col-4">Vegetación</div>
              </v-col>
              <!-- ends four row -->

            </v-row>
          </v-card-text>
        </v-card>
      </v-dialog>


      <!-- begin table -->
      <v-col cols="12"
             class="main-container mb-9 rounded px-12 mt-12">
        <v-row no-gutters
               justify="center">

          <v-col cols="12">
            <v-row no-gutters>
              <v-col cols="12"
                     style="position: relative;"
                     class="d-flex align-end justify-end no-gutters align-start">

                <!-- begins title-->
                <h2 class="text-h4 font-weight-medium"
                    style="position: absolute; left: 0; margin-bottom: 26px">Localidades</h2>
                <!-- ends title-->


                <!-- begins search input -->
                <div style="width: 250px">
                  <div class="input-label">
                    Búsqueda
                  </div>
                  <v-text-field outlined
                                @keyup.enter="searchSpecie()"
                                placeholder="JAL-CHAP-005"
                                v-model="filterOptions.search.pattern"
                                append-icon="mdi-magnify"
                                class="mr-2"
                                dense>
                  </v-text-field>
                </div>
                <!-- ends search input -->

                <!-- begins search columns -->
                <div style="width: 300px" class="mx-2">
                  <div class="input-label">
                    Buscar en
                  </div>
                  <v-select
                    v-model="filterOptions.search.columns"
                    :items="headersNoDisabled"
                    multiple
                    color="secondary"
                    item-value="value"
                    outlined
                    dense>
                    <template v-slot:selection="{ item, index }">
                      <div v-if="filterOptions.search.columns.length === headers.length">
                        <span v-if="index === 0">Todas las columnas</span>
                      </div>
                      <div v-else>
                        <v-chip v-if="index === 0" small>
                          <span>{{ item.text }}</span>
                        </v-chip>
                        <span v-if="index === 1"
                              class="grey--text caption">(+{{ filterOptions.search.columns.length - 1 }} others)</span>
                      </div>
                    </template>
                  </v-select>
                </div>
                <!-- ends search columns -->


                <!-- begins add new item button -->
                <v-btn height="40px"
                       depressed
                       outlined
                       class="ml-2"
                       style="margin-bottom: 26px; border-width: 2px"
                       @click="openNewItem()"
                       color="primary">Añadir localidad
                </v-btn>
                <!-- ends add new item button -->
              </v-col>


              <!-- begins columns select -->
              <v-col cols="12">
                <div>
                  <div class="input-label">
                    Columnas mostradas
                  </div>
                  <v-combobox
                    v-model="tableColumnsSelected"
                    :items="headers"
                    dense
                    hint="Máximo 7 columnas"
                    persistent-hint
                    return-object
                    outlined
                    height="40px"
                    multiple
                    hide-selected
                    chips>
                    <template v-slot:selection="{ attrs, item, select, selected }">
                      <v-chip
                        :color="!item.disabled ? 'primary' : ''"
                        v-bind="attrs"
                        class="my-1"
                        :input-value="selected"
                        :close="!item.disabled"
                        small
                        :disabled="item.disabled"
                        @click="select"
                        @click:close="removeColumn(item)">
                        <span>{{ item.text }}</span>
                      </v-chip>
                    </template>
                  </v-combobox>
                </div>
              </v-col>
              <!-- ends columns select -->

              <v-col cols="12"
                     class="mb-4">
                <v-data-table
                  :server-items-length="totalSpecies"
                  @click:row="openIndividualItem"
                  height="600px"
                  fixed-header
                  :items-per-page="25"
                  :options.sync="locationOptions"
                  :loading="loadingTable"
                  loader-height="4"
                  item-key="nombrecientifico"
                  loading-text="Reuniendo las especies"
                  :headers="tableColumnsToRender"
                  :items="species">
                  <template v-slot:item.actions="{item}">
                    <v-menu
                      bottom
                      left>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          dark
                          icon
                          v-bind="attrs"
                          v-on="on">
                          <v-icon color="grey">mdi-dots-vertical</v-icon>
                        </v-btn>
                      </template>
                      <v-list flat dense>
                        <v-list-item-group>
                          <v-list-item @click="openEditForm(item)">
                            <v-list-item-title>Editar</v-list-item-title>
                          </v-list-item>
                          <v-list-item @click="openDeleteConfirmation(item)">
                            <v-list-item-title>Eliminar</v-list-item-title>
                          </v-list-item>
                        </v-list-item-group>
                      </v-list>
                    </v-menu>
                  </template>
                  <template v-slot:item.idl="{item}" >
                    <NoDataTableField :field="item.idl"></NoDataTableField>
                  </template>
                  <template v-slot:item.nombre="{item}" >
                    <NoDataTableField :field="item.nombre"></NoDataTableField>
                  </template>
                  <template v-slot:item.estatuslegal="{item}">
                    <NoDataTableField :field="item.estatuslegal"></NoDataTableField>
                  </template>
                  <template v-slot:item.fechadedatacion="{item}">
                    <NoDataTableField :field="dateToDisplay(item.fechadedatacion)"></NoDataTableField>
                  </template>
                  <template v-slot:item.edadabsoluta="{item}">
                    <NoDataTableField :field="item.edadabsoluta"></NoDataTableField>
                  </template>
                  <template v-slot:item.rutaacceso="{item}">
                    <NoDataTableField :field="item.rutaacceso"></NoDataTableField>
                  </template>
                  <template v-slot:item.era="{item}">
                    <NoDataTableField :field="item.era"></NoDataTableField>
                  </template>
                  <template v-slot:item.periodo="{item}">
                    <NoDataTableField :field="item.periodo"></NoDataTableField>
                  </template>
                  <template v-slot:item.formacion="{item}">
                    <NoDataTableField :field="item.formacion"></NoDataTableField>
                  </template>
                  <template v-slot:item.geologia="{item}">
                    <NoDataTableField :field="item.geologia"></NoDataTableField>
                  </template>
                  <template v-slot:item.vegetacion="{item}">
                    <NoDataTableField :field="item.vegetacion"></NoDataTableField>
                  </template>
                </v-data-table>
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
import NoDataTableField from "@/components/NoDataTableField";
import {mapGetters} from 'vuex'
import {addQueryParameters} from '@/misc/util';
import overlayController from "@/mixins/overlayController";
import MuseumOverlay from "@/components/MuseumOverlay";
import formatText from "@/misc/formatText";
import snackbarNotification from "@/mixins/snackbarNotification";
import deleteDialogController from "@/mixins/deleteDialogController";
import {stdRules, requiredRules} from "@/misc/rules";
import moment from "moment";

export default {
  name: "Locations",
  mixins: [overlayController,
    deleteDialogController,
    formatText,
    snackbarNotification],
  components: {
    MuseumOverlay,
    NoDataTableField
  },
  data: () => {
    return {
      birthdayPicker: false,
      stdRules,
      menu: false,
      requiredRules,
      filterOptions: {
        search: {
          pattern: '',
          columns: [
            'idl',
            'nobre',
            'estatuslegal',
            'fechadedatacion',
            'edadabsoluta',
            'rutaacceso',
            'era',
            'periodo',
            'formacion',
            'geologia',
            'vegatacion',
          ],
        }
      },
      headers: [
        {
          text: 'Identificador',
          disabled: true,
          align: 'start',
          sortable: true,
          value: 'idl',
        },
        {
          text: 'Nombre',
          align: 'start',
          sortable: true,
          value: 'nombre',
        },
        {
          text: 'Estatus legal',
          align: 'start',
          disabled: true,
          sortable: false,
          value: 'estatuslegal',
        },
        {
          text: 'Fecha de datación',
          disabled: true,
          align: 'start',
          sortable: false,
          value: 'fechadedatacion',
        },
        {
          text: 'Edad absoluta',
          align: 'start',
          sortable: false,
          value: 'edadabsoluta',
        },
        {
          text: 'Ruta acceso',
          align: 'start',
          sortable: false,
          value: 'rutaacceso',
        },
        {
          text: 'Era',
          align: 'start',
          sortable: false,
          value: 'era',
        },
        {
          text: 'Periodo',
          align: 'start',
          sortable: false,
          value: 'periodo',
        },
        {
          text: 'Formación',
          align: 'start',
          disabled: true,
          sortable: false,
          value: 'formacion'
        },
        {
          text: 'Geología',
          align: 'start',
          disabled: true,
          sortable: false,
          value: 'geologia'
        },
        {
          text: 'Vegetación',
          align: 'start',
          disabled: true,
          sortable: false,
          value: 'vegetacion'
        },
      ],
      tableColumnsSelected: [
        {
          text: 'Identificador',
          disabled: true,
          align: 'start',
          sortable: true,
          value: 'idl',
        },
        {
          text: 'Nombre',
          align: 'start',
          sortable: true,
          value: 'nombre',
        },
        {
          text: 'Estatus legal',
          align: 'start',
          disabled: true,
          sortable: false,
          value: 'estatuslegal',
        },
        {
          text: 'Fecha de datación',
          disabled: true,
          align: 'start',
          sortable: false,
          value: 'fechadedatacion',
        },
        {
          text: 'Edad absoluta',
          align: 'start',
          sortable: false,
          value: 'edadabsoluta',
        },
      ],
      tableColumnsToRender: [],
      loadingTable: false,
      locationOptions: {},
      species: [],
      totalSpecies: 0,
      locationSelected: null,
      individualDialog: false,
      deleteDialogActive: false,
      itemToDelete: null,
      location: {
        idl: '',
        nombre: '',
        estatuslegal: '',
        fechadedatacion: '',
        edadabsoluta: '',
        rutaacceso: '',
        era: '',
        periodo: '',
        formacion: '',
        geologia: '',
        vegetacion: ''
      },
    }
  },
  computed: {
    formattedDate() {
      return moment(this.location.fechadedatacion).format('DD-MM-YYYY');
    },
    headersNoDisabled() {
      return this.headers.map(x => {
        x.disabled = false
        return x;
      })
    },
    ...mapGetters(
      ['token']
    ),
    searchPattern() {
      return this.filterOptions.search.pattern;
    },
  },
  watch: {
    menu (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
    /**
     * Watcher to always set the action's column to the end
     * of the table
     */
    tableColumnsSelected: {
      handler: function (val) {
        if (val.length > 6) {
          this.$nextTick(() => this.tableColumnsSelected.pop())
        }
        this.tableColumnsToRender = [...this.tableColumnsSelected];
        this.tableColumnsToRender.push(
          {
            text: 'Acciones',
            align: 'center',
            disabled: true,
            sortable: false,
            value: 'actions'
          })
      },
      immediate: true,
    },
    locationOptions: {
      handler() {
        this.getLocationsFromDatabase();
      },
      deep: true
    },
    /**
     * Watcher to set all the pieces when the search field
     * is empty
     */
    async searchPattern(val) {
      if (val === '') {
        this.setOverlayText('Regresando todo a su lugar');
        this.showOverlay();
        await this.getLocationsFromDatabase();
        this.closeOverlay();
      }
    },
  },
  methods: {
    allowedDates(val) {
      return moment(val).isBefore(moment());
    },
    dateToDisplay(date) {
      return moment(date).format('DD-MM-YYYY')
    },
    /**
     * Opens the edit form
     * @params item - The item to be modified
     */
    async openEditForm(item) {
      this.setEditItem(item);
      this.setOverlayText('Abriendo localidad');
      this.showOverlay();
      this.closeOverlay();
      this.closeFormDialog();
      this.location = item;
      this.setFormattedDate();
    },
    setFormattedDate() {
      this.location.fechadedatacion = moment(this.location.fechadedatacion).format('YYYY-MM-DD HH:mm:ss');
    },
    /**
     * Open the new item dialog and reset the piece variable
     */
    openNewItem() {
      this.isAddingItem = true;
      this.resetLocation();
      this.closeFormDialog()
      if (this.$refs.specieForm !== undefined) {
        this.$refs.specieForm.reset();
      }
    },
    async saveLocation() {
      if (this.$refs.specieForm.validate()) {
        this.setOverlayText('Guardando localidad');
        this.showOverlay();
        this.processLocation();
        let res = await this.$store.dispatch('saveLocation', this.location);
        if (res.ok) {
          this.showSuccessNotification('La localidad ha sido guardada');
        } else {
          this.showErrorNotification(`¡La localidad no se ha guardado! ERR: ${res.statusText}`)
        }
        this.closeOverlay();
        this.closeNewItem();
        await this.getLocationsFromDatabase();
      }
    },
    async updateLocation() {
      this.editDialogActive = false;
      this.setOverlayText('Actualizando localidad');
      this.showOverlay();
      this.location.fechadedatacion = moment(this.location.fechadedatacion).format();
      let res = await this.$store.dispatch('updateLocation', this.location);
      if (res.ok) {
        this.locationOptions.page = 1;
        this.totalSpecies = 25;
        this.showSuccessNotification('¡La localidad ha sido actualizada!');
      } else {
        this.showErrorNotification(`¡La localidad no se ha actualizado! ERR: ${res.statusText}`)
      }
      this.closeOverlay();
      this.closeEditItem();
      await this.getLocationsFromDatabase();
    },
    /**
     * Process the specie to change the empty fields to null
     */
    processLocation() {
      this.location.idl = this.getFmtEmptyField(this.location.idl);
      this.location.nombre = this.getFmtEmptyField(this.location.nombre);
      this.location.estatuslegal = this.getFmtEmptyField(this.location.estatuslegal);
      this.location.fechadedatacion = moment(this.location.fechadedatacion).format();
      this.location.edadabsoluta = this.getFmtEmptyField(this.location.edadabsoluta);
      this.location.rutaacceso = this.getFmtEmptyField(this.location.rutaacceso);
      this.location.era = this.getFmtEmptyField(this.location.era);
      this.location.periodo = this.getFmtEmptyField(this.location.periodo);
      this.location.formacion = this.getFmtEmptyField(this.location.formacion);
      this.location.geologia = this.getFmtEmptyField(this.location.geologia);
      this.location.vegetacion = this.getFmtEmptyField(this.location.vegetacion);
    },
    /**
     * Erase all the info of the piece selected
     */
    resetLocation() {
      this.location = {
        idl: '',
        nombre: '',
        estatuslegal: '',
        fechadedatacion: moment().format('YYYY-MM-DD HH:mm:ss'),
        edadabsoluta: '',
        rutaacceso: '',
        era: '',
        periodo: '',
        formacion: '',
        geologia: '',
        vegetacion: ''
      }
    },
    /**
     * Opens the delete confirm dialog
     * @param item - The item to delete
     */
    openDeleteConfirmation(item) {
      this.setItemToDelete(item);
      this.deleteDialogActive = true;
    },
    /**
     * Set the item to be deleted
     */
    setItemToDelete(item) {
      this.itemToDelete = item;
    },
    /**
     * Dispatch the action to delete an item in the database
     */
    async deleteItem() {
      this.setOverlayText('Eliminando especie');
      this.showOverlay();
      let res = await this.$store.dispatch('deleteSpecie', this.itemToDelete.nombrecientifico);
      if (res.ok) {
        await this.getLocationsFromDatabase();
        this.showSuccessNotification('La especie ha sido eliminada correctamente');
      } else {
        this.showErrorNotification(`¡La especie no se ha eliminado! ERR: ${res.statusText}`);
      }
      this.closeOverlay();
      this.closeDeleteConfirmation();
      this.resetItemToDelete();
    },
    /**
     * Reset the item to be deleted
     */
    resetItemToDelete() {
      this.itemToDelete = null;
    },
    /**
     * Removes the column when the user
     * click the close icon in the item chip
     * @param item
     */
    removeColumn(item) {
      this.tableColumnsSelected.splice(this.tableColumnsSelected.indexOf(item), 1)
      this.tableColumnsSelected = [...this.tableColumnsSelected]
    },
    /**
     * Opens individual item dialog
     */
    async openIndividualItem(value) {
      this.locationSelected = value;
      this.setOverlayText('Abriendo pieza');
      this.showOverlay();
      this.closeOverlay();
      this.individualDialog = true;
    },
    /**
     * Get the species from the database
     * @returns {Promise<void>}
     */
    async getLocationsFromDatabase() {
      const {page, sortBy, sortDesc} = this.locationOptions;
      this.loadingTable = true;
      let query = addQueryParameters({
        offset: (25 * (page - 1)),
        orderby: sortBy.length === 0 ? false : {
          column: 'idl',
          direction: sortDesc[0] ? 'DESC' : 'ASC',
        },
        search: this.filterOptions.search.pattern === '' ? false : {
          pattern: this.filterOptions.search.pattern,
          columns: this.filterOptions.search.columns
        }
      });

      await fetch('http://localhost:3000/forward', {
        headers: new Headers({
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }),
        method: 'POST',
        body: JSON.stringify({
          table: `localidad/${query}`,
          options: {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        })
      }).then(res => res.json()).then(res => {
        if (res.hasMore) {
          // calculating the pagination
          this.totalSpecies = ((25 * (page + 1)));
        } else {
          this.totalSpecies = (25 * page);
        }
        this.species = res.items;
      }).catch(err => {
        console.log(err);
      });
      this.loadingTable = false;
    },
    /**
     * Search the given text in the database
     * @returns {Promise<void>}
     */
    async searchSpecie() {
      this.setOverlayText('Buscando algo increíble');
      this.showOverlay();
      this.locationOptions.page = 1;
      this.totalSpecies = 25;
      if (this.filterOptions.search.pattern !== '') {
        clearTimeout(this.timeout);
        // timeout to delay the search after the user ends typing
        this.timeout = setTimeout(async () => {
          let query = addQueryParameters(this.filterOptions);
          await fetch('http://localhost:3000/forward', {
            headers: new Headers({
              'Authorization': `Bearer ${this.token}`,
              'Content-Type': 'application/json'
            }),
            method: 'POST',
            body: JSON.stringify({
              table: `especie/${query}`,
              options: {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json'
                }
              }
            })
          }).then(res => res.json()).then(res => {
            this.species = res.items;
          }).catch(err => {
            console.log(err);
          }).finally(() => (this.closeOverlay()));
        }, 1000);
      }
    },
  }
}
</script>

<style scoped>

</style>