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
            <h1 class="mb-6 text-h4 font-weight-medium" v-if="isAddingItem">Nuevo colector</h1>
            <h1 class="mb-6 text-h4 font-weight-medium" v-if="isEditingItem">Editar colector</h1>
            <v-form ref="collectorForm"
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

                    <!-- begins persona -->
                    <div v-if="isAddingItem">
                      <div class="input-label">
                        Persona
                      </div>
                      <div class="d-flex align-start">
                        <v-autocomplete outlined
                                        :rules="[requiredRules]"
                                        cache-items
                                        :loading="loadingPersons"
                                        :items="personItems"
                                        :search-input.sync="searchPerson"
                                        hide-no-data
                                        placeholder="Juan Pérez"
                                        v-model="collector.idp"
                                        item-text="nombrespila"
                                        item-value="idp"
                                        dense>
                        </v-autocomplete>
                      </div>
                    </div>
                    <!-- ends persona -->

                    <!-- begins persona -->
                    <div v-if="isAddingItem">
                      <div class="input-label">
                        Pieza
                      </div>
                      <div class="d-flex align-start">
                        <v-autocomplete outlined
                                        :rules="[requiredRules]"
                                        cache-items
                                        :loading="loadingPieces"
                                        :items="pieceItems"
                                        :search-input.sync="searchPiece"
                                        hide-no-data
                                        placeholder="MPG-15"
                                        v-model="collector.ncatalogo"
                                        dense>
                        </v-autocomplete>
                      </div>
                    </div>
                    <!-- ends persona -->

                    <!-- begins clase -->
                    <div>
                      <div class="input-label">
                        Fecha
                      </div>
                      <v-text-field outlined
                                    type="text"
                                    :rules="[requiredRules]"
                                    placeholder="10-10-1990"
                                    v-model="collector.fecha"
                                    dense>
                      </v-text-field>
                    </div>
                    <!-- ends clase -->

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
                       @click="saveCollector()"
                       height="40px">Guardar colector
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
            <h1 class="mb-1 headline font-weight-medium col-12">Borrado de colector</h1>
            <div class="grey--text col-12 mb-4">¿Estás seguro de borrar este colector?</div>
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
                       @click="updateCollector()"
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
                v-if="collectorSelected !== null"
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
                {{collectorSelected.nombrecientifico}}
              </v-card-title>
              <v-card-subtitle class="white--text text-h6">
                {{collectorSelected.genero}}
              </v-card-subtitle>
            </div>
          </v-img>
          <v-card-text>
            <v-row no-gutters class="mx-4">
              <v-col cols="12"
                     class="text-h6 mt-4 mb-2"
                     style="color: rgba(0, 0, 0, 0.87)">Clasificación</v-col>

              <!-- begins first row -->
              <v-col cols="12"
                     class="subtitle-1  d-flex flex-wrap no-gutters ml-2"
                     style="color: rgba(0, 0, 0, 0.87)">
                <div class="col-4">{{getFormattedData(collectorSelected.clase)}}</div>
                <div class="col-4">{{getFormattedData(collectorSelected.reino)}}</div>
                <div class="col-4">{{getFormattedData(collectorSelected.orden)}}</div>
              </v-col>
              <v-col cols="12"
                     class="caption font-italic d-flex flex-wrap no-gutters mb-4 ml-2">
                <div class="col-4">Clase</div>
                <div class="col-4">Reino</div>
                <div class="col-4">Orden</div>
              </v-col>
              <!-- ends first row -->

              <!-- begins second row -->
              <v-col cols="12"
                     class="subtitle-1 d-flex flex-wrap no-gutters ml-2"
                     style="color: rgba(0, 0, 0, 0.87)">
                <div class="col-4">{{getFormattedData(collectorSelected.filum)}}</div>
                <div class="col-8">{{getFormattedData(collectorSelected.descripcion)}}</div>
              </v-col>
              <v-col cols="12"
                     class="caption font-italic d-flex flex-wrap no-gutters mb-4 ml-2">
                <div class="col-4">Filum</div>
                <div class="col-8">Descripción</div>
              </v-col>
              <!-- ends second row -->

              <!-- begins third row -->
              <v-col cols="12"
                     class="subtitle-1  d-flex flex-wrap no-gutters ml-2"
                     style="color: rgba(0, 0, 0, 0.87)">
                <div class="col-4">{{getFormattedData(collectorSelected.temporalidad)}}</div>
                <div class="col-4">{{getFormattedData(collectorSelected.clado)}}</div>
                <div class="col-4">{{getFormattedData(collectorSelected.subclado)}}</div>
              </v-col>
              <v-col cols="12"
                     class="caption font-italic d-flex flex-wrap no-gutters mb-4 ml-2">
                <div class="col-4">Temporalidad</div>
                <div class="col-4">Clado</div>
                <div class="col-4">Subclado</div>
              </v-col>
              <!-- ends third row -->

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
                    style="position: absolute; left: 0; margin-bottom: 26px">Colectores</h2>
                <!-- ends title-->


                <!-- begins search input -->
                <div style="width: 250px">
                  <div class="input-label">
                    Búsqueda
                  </div>
                  <v-text-field outlined
                                @keyup.enter="searchCollector()"
                                placeholder="Colector 1"
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
                       color="primary">Añadir colector
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
                  :server-items-length="totalCollectors"
                  @click:row="openIndividualItem"
                  height="600px"
                  fixed-header
                  :items-per-page="25"
                  :options.sync="collectorOptions"
                  :loading="loadingTable"
                  loader-height="4"
                  item-key="idp"
                  loading-text="Reuniendo los colectores"
                  :headers="tableColumnsToRender"
                  :items="collectors">
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
                  <template v-slot:item.nombrecientifico="{item}" >
                    <NoDataTableField :field="item.nombrecientifico"></NoDataTableField>
                  </template>
                  <template v-slot:item.genero="{item}" >
                    <NoDataTableField :field="item.genero"></NoDataTableField>
                  </template>
                  <template v-slot:item.clase="{item}">
                    <NoDataTableField :field="item.clase"></NoDataTableField>
                  </template>
                  <template v-slot:item.reino="{item}">
                    <NoDataTableField :field="item.reino"></NoDataTableField>
                  </template>
                  <template v-slot:item.orden="{item}">
                    <NoDataTableField :field="item.orden"></NoDataTableField>
                  </template>
                  <template v-slot:item.filum="{item}">
                    <NoDataTableField :field="item.filum"></NoDataTableField>
                  </template>
                  <template v-slot:item.temporalidad="{item}">
                    <NoDataTableField :field="item.temporalidad"></NoDataTableField>
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


export default {
  name: "Collectors",
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
      loadingPersons: false,
      personItems: [],
      searchPerson: null,
      loadingPieces: false,
      pieceItems: [],
      searchPiece: null,
      stdRules,
      requiredRules,
      filterOptions: {
        search: {
          pattern: '',
          columns: [
            'idp',
            'ncatalogo',
            'fecha'
          ],
        }
      },
      headers: [
        {
          text: 'IDP',
          disabled: true,
          align: 'start',
          sortable: true,
          value: 'idp',
        },
        {
          text: 'Número de catálogo',
          align: 'start',
          sortable: true,
          value: 'ncatalogo',
        },
        {
          text: 'Fecha',
          align: 'start',
          disabled: true,
          sortable: true,
          value: 'fecha',
        },
      ],
      tableColumnsSelected: [
        {
          text: 'IDP',
          disabled: true,
          align: 'start',
          sortable: true,
          value: 'idp',
        },
        {
          text: 'Número de catálogo',
          disabled: true,
          align: 'start',
          sortable: true,
          value: 'ncatalogo',
        },
        {
          text: 'Fecha',
          align: 'start',
          sortable: true,
          value: 'fecha',
        },
      ],
      tableColumnsToRender: [],
      loadingTable: false,
      collectorOptions: {},
      collectors: [],
      totalCollectors: 0,
      collectorSelected: null,
      individualDialog: false,
      deleteDialogActive: false,
      itemToDelete: null,
      collector: {
        idp: '',
        ncatalogo: '',
        fecha: ''
      },
    }
  },
  computed: {
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
    collectorOptions: {
      handler() {
        this.getCollectorsFromDatabase();
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
        await this.getCollectorsFromDatabase();
        this.closeOverlay();
      }
    },
    searchPerson(newVal) {
      newVal && newVal !== this.collector.idp && this.queryPersons(newVal)
    },
    searchPiece(newVal) {
      newVal && newVal !== this.collector.ncatalogo && this.queryPieces(newVal)
    },
  },
  methods: {
    /**
     * Opens the edit form
     * @params item - The item to be modified
     */
    async openEditForm(item) {
      this.setEditItem(item);
      this.setOverlayText('Abriendo colector');
      this.showOverlay();
      this.closeOverlay();
      this.closeFormDialog();
      this.collector = item;
    },
    /**
     * Open the new item dialog and reset the piece variable
     */
    openNewItem() {
      this.isAddingItem = true;
      this.resetCollector();
      this.closeFormDialog()
      if (this.$refs.collectorForm !== undefined) {
        this.$refs.collectorForm.reset();
      }
    },
    async saveCollector() {
      if (this.$refs.collectorForm.validate()) {
        this.setOverlayText('Guardando colector');
        this.showOverlay();
        this.processCollector();
        let res = await this.$store.dispatch('saveCollector', this.collector);
        if (res.ok) {
          this.showSuccessNotification('La pieza ha sido guardada');
        } else {
          this.showErrorNotification(`¡La pieza no se ha guardado! ERR: ${res.statusText}`)
        }
        this.closeOverlay();
        this.closeNewItem();
        await this.getCollectorsFromDatabase();
      }
    },
    async updateCollector() {
      this.editDialogActive = false;
      this.setOverlayText('Actualizando colector');
      this.showOverlay();
      let res = await this.$store.dispatch('updateCollector', this.collector);
      if (res.ok) {
        this.collectorOptions.page = 1;
        this.totalCollectors = 25;
        this.showSuccessNotification('¡El colector ha sido actualizada!');
      } else {
        this.showErrorNotification(`¡El colector no se ha actualizado! ERR: ${res.statusText}`)
      }
      this.closeOverlay();
      this.closeEditItem();
      await this.getCollectorsFromDatabase();
    },
    /**
     * Process the collector to change the empty fields to null
     */
    processCollector() {
      this.collector.idp = this.getFmtEmptyField(this.collector.idp);
      this.collector.ncatalogo = this.getFmtEmptyField(this.collector.ncatalogo);
      this.collector.fecha = this.getFmtEmptyField(this.collector.fecha);
    },
    /**
     * Erase all the info of the piece selected
     */
    resetCollector() {
      this.collector = {
        nombrecientifico: '',
        genero: '',
        clase: '',
        reino: '',
        orden: '',
        filum: '',
        descripcion: '',
        temporalidad: '',
        clado: '',
        subclado: '',
        latitud: ''
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
      this.setOverlayText('Eliminando colector');
      this.showOverlay();
      let res = await this.$store.dispatch('deleteCollector', this.itemToDelete.idp + ',' + this.itemToDelete.ncatalogo);
      if (res.ok) {
        await this.getCollectorsFromDatabase();
        this.showSuccessNotification('El colector ha sido eliminada correctamente');
      } else {
        this.showErrorNotification(`¡El colector no se ha eliminado! ERR: ${res.statusText}`);
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
      this.collectorSelected = value;
      this.setOverlayText('Abriendo pieza');
      this.showOverlay();
      this.closeOverlay();
      this.individualDialog = true;
    },
    /**
     * Get the collectors from the database
     * @returns {Promise<void>}
     */
    async getCollectorsFromDatabase() {
      const {page, sortBy, sortDesc} = this.collectorOptions;
      this.loadingTable = true;
      let query = addQueryParameters({
        offset: (25 * (page - 1)),
        orderby: sortBy.length === 0 ? false : {
          column: 'idp',
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
          table: `colector/${query}`,
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
          this.totalCollectors = ((25 * (page + 1)));
        } else {
          this.totalCollectors = (25 * page);
        }
        this.collectors = res.items;
      }).catch(err => {
        console.log(err);
      });
      this.loadingTable = false;
    },
    /**
     * Search the given text in the database
     * @returns {Promise<void>}
     */
    async searchCollector() {
      this.setOverlayText('Buscando algo increíble');
      this.showOverlay();
      this.collectorOptions.page = 1;
      this.totalCollectors = 25;
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
              table: `colector/${query}`,
              options: {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json'
                }
              }
            })
          }).then(res => res.json()).then(res => {
            this.collectors = res.items;
          }).catch(err => {
            console.log(err);
          }).finally(() => (this.closeOverlay()));
        }, 1000);
      }
    },
    /**
     * Gets the person items from the database to fill the autocomplete
     * with the user start to typing
     * @param v: the text typed by the user
     */
    queryPersons(v) {
      // Lazily load input items
      this.loadingPersons = true;
      let query = `{"nombrespila": {"$instr":"${v}"}}`;
      fetch('http://localhost:3000/forward', {
        headers: new Headers({
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }),
        method: 'POST',
        body: JSON.stringify({
          table: `persona?q=${query}`,
          options: {
            method: 'GET'
          }
        })
      }).then(res => res.json()).then(res => {
        this.personItems = [];
        res.items.forEach(item => {
          this.personItems.push(item);
        });
      }).catch(err => {
        console.log(err);
      }).finally(() => (this.loadingPersons = false));
    },
    /**
     * Gets the piece items from the database to fill the autocomplete
     * with the user start to typing
     * @param v: the text typed by the user
     */
    queryPieces(v) {
      // Lazily load input items
      this.loadingPieces = true;
      let query = `{"ncatalogo": {"$instr":"${v}"}}`;
      fetch('http://localhost:3000/forward', {
        headers: new Headers({
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }),
        method: 'POST',
        body: JSON.stringify({
          table: `pieza?q=${query}`,
          options: {
            method: 'GET'
          }
        })
      }).then(res => res.json()).then(res => {
        this.pieceItems = [];
        res.items.forEach(item => {
          this.pieceItems.push(item.ncatalogo);
        });
      }).catch(err => {
        console.log(err);
      }).finally(() => (this.loadingPieces = false));
    },
  }
}
</script>

<style scoped>

</style>