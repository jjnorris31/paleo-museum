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
            <h1 class="mb-6 text-h4 font-weight-medium" v-if="isAddingItem">Nuevo experto</h1>
            <h1 class="mb-6 text-h4 font-weight-medium" v-if="isEditingItem">Editar experto</h1>
            <v-form ref="preparatorForm"
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
                    <div>
                      <div class="input-label">
                        Persona
                      </div>
                      <div class="d-flex align-start">
                        <v-autocomplete outlined
                                        :disabled="isEditingItem"
                                        :rules="[requiredRules]"
                                        cache-items
                                        :loading="loadingPersons"
                                        :items="personItems"
                                        :search-input.sync="searchPerson"
                                        hide-no-data
                                        placeholder="Juan Pérez"
                                        v-model="expert.idp"
                                        item-text="nombrespila"
                                        item-value="idp"
                                        dense>
                        </v-autocomplete>
                      </div>
                    </div>
                    <!-- ends persona -->

                    <!-- begins persona -->
                    <div>
                      <div class="input-label">
                        Pieza
                      </div>
                      <div class="d-flex align-start">
                        <v-autocomplete outlined
                                        :rules="[requiredRules]"
                                        cache-items
                                        :disabled="isEditingItem"
                                        :loading="loadingPieces"
                                        :items="pieceItems"
                                        :search-input.sync="searchPiece"
                                        hide-no-data
                                        placeholder="MPG-15"
                                        v-model="expert.ncatalogo"
                                        dense>
                        </v-autocomplete>
                      </div>
                    </div>
                    <!-- ends persona -->

                    <!-- begins fecha -->
                    <div>
                      <div class="input-label">
                        Fecha
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
                            :rules="[requiredRules]"
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
                          v-model="expert.fecha_mov"
                          :allowed-dates="allowedDates"
                        ></v-date-picker>
                      </v-menu>
                    </div>
                    <!-- begins fecha -->

                    </div>

                  <div class="row-form-container">

                    <!-- begins tipo de experto -->
                    <div>
                      <div class="input-label">
                        Tipo de experto
                      </div>
                      <div class="d-flex align-start">
                        <v-select outlined
                                  :rules="[requiredRules]"
                                  cache-items
                                  :items="expertTypes"
                                  hide-no-data
                                  v-model="expert.tipo"
                                  dense>
                        </v-select>
                      </div>
                    </div>
                    <!-- ends tipo de experto  -->

                  </div>


                    <!-- begin description -->
                  <div style="width: 100%">
                    <div class="input-label">
                      Descripción
                    </div>
                    <v-textarea outlined
                                counter
                                maxlength="200"
                                height="80px"
                                type="text"
                                placeholder="Aquí va algo importante..."
                                v-model="expert.descripcion"
                                dense>
                    </v-textarea>
                  </div>
                  <!-- ends description -->

                  </div>
                <!-- ends fields -->

              </div>
              <!-- ends basic information -->

            </v-form>
            <div class="d-flex justify-center my-5 no-gutters"
                 style="width: 973px">
              <div class="col-5 d-flex justify-center">
                <v-btn color="#C9875E"
                       class="mr-2"
                       outlined
                       @click="isEditingItem ? closeEditItem() : closeNewItem()"
                       style="border-width: 2px"
                       height="40px">Cancelar</v-btn>
                <v-btn color="primary"
                       v-if="isAddingItem"
                       class="ml-2"
                       elevation="4"
                       @click="saveExpert()"
                       height="40px">Guardar experto
                </v-btn>
                <v-btn color="primary"
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
            <h1 class="mb-1 headline font-weight-medium col-12">Borrado de experto</h1>
            <div class="grey--text col-12 mb-4">¿Estás seguro de borrar este experto?</div>
            <div class="col-12 justify-end mb-6 d-flex no-gutters flex-wrap">
              <v-btn color="#C9875E"
                     class="mr-2"
                     outlined
                     @click="closeDeleteConfirmation()"
                     style="border-width: 2px"
                     height="40px">Cancelar</v-btn>
              <v-btn color="primary"
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
            <h1 class="mb-1 headline font-weight-medium">Edición de experto</h1>
            <p class="grey--text">¿Estás seguro de guardar los cambios?</p>
            <div class="col-12 d-flex justify-end mb-2 no-gutters">
              <div class="col-5 d-flex no-gutters">
                <v-btn color="#C9875E"
                       class="mr-2"
                       outlined
                       @click="editDialogActive = false"
                       style="border-width: 2px"
                       height="40px">Cancelar</v-btn>
                <v-btn color="primary"
                       class="ml-2"
                       @click="updateExpert()"
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
                v-if="expertSelected !== null"
                width="700px">
        <v-card height="100%"
                style="position: relative">
          <v-img src="../assets/images/not_found.png"
                 height="225px"
                 position="bottom center"
                 class="mb-4"
                 cover>
            <div style="position: absolute; bottom: 0; left: 4px">
              <v-card-title class="white--text text-h3">
                {{ expertSelected.nombrespila }}
              </v-card-title>
              <v-card-subtitle class="white--text text-h6">
                {{ expertSelected.ncatalogo }}
              </v-card-subtitle>
            </div>
          </v-img>
          <v-card-text>
            <v-row no-gutters class="mx-4">
              <v-col cols="12"
                     class="text-h6 mt-4 mb-2"
                     style="color: rgba(0, 0, 0, 0.87)">Datos</v-col>

              <!-- begins first row -->
              <v-col cols="12"
                     class="subtitle-1  d-flex flex-wrap no-gutters ml-2"
                     style="color: rgba(0, 0, 0, 0.87)">
                <div class="col-4">{{ dateToDisplay(expertSelected.fecha_mov) }}</div>
                <div class="col-8">{{ getFormattedData(expertSelected.descripcion) }}</div>
              </v-col>
              <v-col cols="12"
                     class="caption font-italic d-flex flex-wrap no-gutters mb-4 ml-2">
                <div class="col-4">Fecha</div>
                <div class="col-8">Descripción</div>
              </v-col>
              <!-- ends first row -->

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
                    style="position: absolute; left: 0; margin-bottom: 26px">Expertos</h2>
                <!-- ends title-->


                <!-- begins search input -->
                <div style="width: 300px">
                  <div class="input-label" style="margin-left: 33px">
                    Búsqueda
                  </div>
                  <v-text-field outlined
                                @keyup.enter="searchExpert()"
                                placeholder="9865"
                                v-model="filterOptions.search.pattern"
                                append-icon="mdi-magnify"
                                class="mr-2"
                                dense>
                    <template v-slot:prepend>
                      <v-tooltip left>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon v-on="on" v-bind="attrs">mdi-help-circle</v-icon>
                        </template>
                        <span>Presiona enter para buscar</span>
                      </v-tooltip>
                    </template>
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
                    :menu-props="{offsetY: true,
                              origin: 'center center',
                              transition: 'slide-y-transition',
                              contentClass: 'text--secondary'}"
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
                       class="ml-2"
                       style="margin-bottom: 26px"
                       @click="openNewItem()"
                       color="primary">Añadir experto
                </v-btn>
                <!-- ends add new item button -->
              </v-col>

              <v-col cols="12"
                     class="mb-4">
                <v-data-table
                  :server-items-length="totalExperts"
                  @click:row="openIndividualItem"
                  height="600px"
                  fixed-header
                  :items-per-page="25"
                  :options.sync="expertOptions"
                  :loading="loadingTable"
                  loader-height="4"
                  item-key="idp"
                  loading-text="Llamando a los expertos"
                  :headers="tableColumnsToRender"
                  :items="experts">
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
                  <template v-slot:item.idp="{item}" >
                    <NoDataTableField :field="item.idp"></NoDataTableField>
                  </template>
                  <template v-slot:item.ncatalogo="{item}" >
                    <NoDataTableField :field="item.ncatalogo"></NoDataTableField>
                  </template>
                  <template v-slot:item.fecha_mov="{item}">
                    <NoDataTableField :field="dateToDisplay(item.fecha_mov)"></NoDataTableField>
                  </template>
                  <template v-slot:item.tipo="{item}">
                    <v-chip :color="getExpertColorByType(item.tipo)" small dark>
                      {{item.tipo}}
                    </v-chip>
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
  name: "Experts",
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
      loadingPersons: false,
      personItems: [],
      searchPerson: null,
      loadingPieces: false,
      pieceItems: [],
      searchPiece: null,
      expertTypes: ['Preparador', 'Determinador', 'Colector'],
      stdRules,
      requiredRules,
      filterOptions: {
        search: {
          pattern: '',
          columns: [
            'idp',
            'ncatalogo',
            'fecha_mov',
            'tipo'
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
          value: 'fecha_mov',
        },
        {
          text: 'Tipo',
          align: 'center',
          disabled: true,
          sortable: true,
          value: 'tipo',
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
          value: 'fecha_mov',
        },
        {
          text: 'Tipo',
          align: 'center',
          disabled: true,
          sortable: true,
          value: 'tipo',
        },
      ],
      isEditingItem: false,
      isAddingItem: false,
      tableColumnsToRender: [],
      loadingTable: false,
      expertOptions: {},
      experts: [],
      totalExperts: 0,
      expertSelected: null,
      individualDialog: false,
      deleteDialogActive: false,
      itemToDelete: null,
      expert: {
        idp: '',
        ncatalogo: '',
        tipo: 'Preparador',
        fecha_mov: '',
        descripcion: ''
      },
    }
  },
  computed: {
    formattedDate() {
      return moment(this.expert.fecha_mov).format('DD-MM-YYYY');
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
    expertOptions: {
      handler() {
        this.getExpertsFromDatabase();
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
        await this.getExpertsFromDatabase();
        this.closeOverlay();
      }
    },
    searchPerson(newVal) {
      newVal && newVal !== this.expert.idp && this.queryPersons(newVal)
    },
    searchPiece(newVal) {
      newVal && newVal !== this.expert.ncatalogo && this.queryPieces(newVal)
    },
  },
  methods: {
    /**
     * Sets the state items to be displayed in the state's list
     */
    setPersonItems(persons) {
      this.personItems = persons;
    },
    setPersonIdp(id) {
      this.expert.idp = id;
    },
    /**
     * Sets the state items to be displayed in the state's list
     */
    setPieceItems(pieces) {
      this.pieceItems = pieces;
    },
    setFormattedDate() {
      this.expert.fecha_mov = moment(this.expert.fecha_mov).format('YYYY-MM-DD HH:mm:ss');
    },
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
      this.setEditItem(true);
      this.setOverlayText('Abriendo experto');
      this.showOverlay();
      let personResponse = await this.$store.dispatch('getPersonById', item.idp);
      personResponse = await personResponse.json();
      this.setPersonItems([personResponse]);
      this.setPersonIdp(personResponse.idp);
      this.setPieceItems([item.ncatalogo]);
      this.closeOverlay();
      this.closeFormDialog();
      this.expert = item;
      this.expert.tipo = 'Preparador';
      this.setFormattedDate();
    },
    /**
     * Open the new item dialog and reset the piece variable
     */
    openNewItem() {
      this.isAddingItem = true;
      this.resetExpert();
      this.closeFormDialog()
      if (this.$refs.preparatorForm !== undefined) {
        this.$refs.preparatorForm.reset();
      }
    },
    async saveExpert() {
      if (this.$refs.preparatorForm.validate()) {
        this.setOverlayText('Guardando experto');
        this.showOverlay();
        this.processExpert();
        let res = await this.$store.dispatch('saveExpert', this.expert);
        if (res.ok) {
          this.showSuccessNotification('El experto ha sido guardado');
        } else {
          this.showErrorNotification(`¡La experto no se ha guardado! ERR: ${res.statusText}`)
        }
        this.closeOverlay();
        this.closeNewItem();
        await this.getExpertsFromDatabase();
      }
    },
    async updateExpert() {
      this.editDialogActive = false;
      this.setOverlayText('Actualizando experto');
      this.showOverlay();
      this.processExpert();
      let res = await this.$store.dispatch('updateExpert', this.expert);
      if (res.ok) {
        this.expertOptions.page = 1;
        this.totalExperts = 25;
        this.showSuccessNotification('¡El experto ha sido actualizado!');
      } else {
        this.showErrorNotification(`¡El experto no se ha actualizado! ERR: ${res.statusText}`)
      }
      this.closeOverlay();
      this.closeEditItem();
      await this.getExpertsFromDatabase();
    },
    /**
     * Process the preparator to change the empty fields to null
     */
    processExpert() {
      this.expert.idp = this.getFmtEmptyField(this.expert.idp);
      this.expert.ncatalogo = this.getFmtEmptyField(this.expert.ncatalogo);
      this.expert.fecha_mov = moment(this.expert.fecha_mov).format();
      this.expert.descripcion = this.getFmtEmptyField(this.expert.descripcion);
    },
    /**
     * Erase all the info of the piece selected
     */
    resetExpert() {
      this.expert = {
        idp: '',
        ncatalogo: '',
        fecha_mov: moment().format('YYYY-MM-DD HH:mm:ss'),
        tipo: 'Preparador',
        descripcion: ''
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
      this.setOverlayText('Eliminando experto');
      this.showOverlay();
      let res = await this.$store.dispatch('deleteExpert', this.itemToDelete);
      if (res.ok) {
        await this.getExpertsFromDatabase();
        this.showSuccessNotification('El experto ha sido eliminado correctamente');
      } else {
        this.showErrorNotification(`¡El experto no se ha eliminado! ERR: ${res.statusText}`);
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
      this.expertSelected = value;
      this.setOverlayText('Abriendo experto');
      this.showOverlay();
      let personResponse = await this.$store.dispatch('getPersonById', value.idp);
      personResponse = await personResponse.json();
      this.expertSelected.nombrespila = personResponse.nombrespila;
      this.closeOverlay();
      this.individualDialog = true;
    },
    /**
     * Get the preparators from the database
     * @returns {Promise<void>}
     */
    async getExpertsFromDatabase() {
      const {page, sortBy, sortDesc} = this.expertOptions;
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
          table: `experto/${query}`,
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
          this.totalExperts = ((25 * (page + 1)));
        } else {
          this.totalExperts = (25 * page);
        }
        this.experts = res.items;
      }).catch(err => {
        console.log(err);
      });
      this.loadingTable = false;
    },
    /**
     * Search the given text in the database
     * @returns {Promise<void>}
     */
    async searchExpert() {
      this.setOverlayText('Buscando algo increíble');
      this.showOverlay();
      this.expertOptions.page = 1;
      this.totalExperts = 25;
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
              table: `experto/${query}`,
              options: {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json'
                }
              }
            })
          }).then(res => res.json()).then(res => {
            this.experts = res.items;
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
    getExpertColorByType(type) {
      switch (type) {
        case 'Preparador':
          return '#54BF00';
        case 'Determinador':
          return '#262261';
        case 'Colectores':
          return '#00A4E1';
      }
    },
  }
}
</script>

<style scoped>

</style>
