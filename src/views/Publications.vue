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
            <h1 class="mb-6 text-h4 font-weight-medium" v-if="isAddingItem">Nueva publicación</h1>
            <h1 class="mb-6 text-h4 font-weight-medium" v-if="isEditingItem">Editar publicación</h1>
            <v-form ref="publicationForm"
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

                    <!-- begins nombre -->
                    <div>
                      <div class="input-label">
                        Nombre
                      </div>
                      <v-text-field outlined
                                    maxlength="30"
                                    type="text"
                                    :rules="[requiredRules]"
                                    placeholder="Publicación 1"
                                    v-model="publication.nombre"
                                    dense>
                      </v-text-field>
                    </div>
                    <!-- ends nombre -->

                    <!-- begins anopublicacion -->
                    <div>
                      <div class="input-label">
                        Año de Publicación
                      </div>
                      <v-text-field outlined
                                    type="text"
                                    :rules="[requiredRules, numberRules]"
                                    placeholder="1990"
                                    v-model="publication.anopublicacion"
                                    dense>
                      </v-text-field>
                    </div>
                    <!-- ends anopublicacion -->

                    <!-- begins editorial -->
                    <div>
                      <div class="input-label">
                        Editorial
                      </div>
                      <v-text-field outlined
                                    type="text"
                                    maxlength="30"
                                    placeholder="Editorial 1"
                                    v-model="publication.editorial"
                                    dense>
                      </v-text-field>
                    </div>
                    <!-- begins editorial -->

                  </div>

                  <div class="row-form-container">

                    <!-- begins url -->
                    <div>
                      <div class="input-label">
                        URL
                      </div>
                      <v-text-field outlined
                                    maxlength="150"
                                    type="text"
                                    placeholder="https://ejemplo.com"
                                    v-model="publication.url"
                                    dense>
                      </v-text-field>
                    </div>
                    <!-- ends url -->

                    <!-- begin persona -->
                    <div>
                      <div class="input-label">
                        Persona
                      </div>
                      <div class="d-flex align-start">
                        <v-autocomplete outlined
                                        :rules="[requiredRules]"
                                        cache-items
                                        :disabled="isEditingItem"
                                        :loading="loadingPersons"
                                        :items="personItems"
                                        :search-input.sync="searchPerson"
                                        hide-no-data
                                        placeholder="Juan Pérez"
                                        v-model="publication.idp"
                                        item-text="nombrespila"
                                        item-value="idp"
                                        dense>
                        </v-autocomplete>
                      </div>
                    </div>
                    <!-- ends persona -->

                  </div>

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
                       @click="savePublication()"
                       height="40px">Guardar publicación
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
            <h1 class="mb-1 headline font-weight-medium col-12">Borrado de publicación</h1>
            <div class="grey--text col-12 mb-4">¿Estás seguro de borrar esta publicación?</div>
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
            <h1 class="mb-1 headline font-weight-medium">Edición de publicación</h1>
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
                       @click="updatePublication()"
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
                v-if="publicationSelected !== null"
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
                {{publicationSelected.nombre}}
              </v-card-title>
              <v-card-subtitle class="white--text text-h6">
                {{publicationSelected.anopublicacion}}
              </v-card-subtitle>
            </div>
          </v-img>
          <v-card-text>
            <v-row no-gutters class="mx-4">
              <v-col cols="12"
                     class="text-h6 mt-4 mb-2"
                     style="color: rgba(0, 0, 0, 0.87)">Publicación</v-col>

              <!-- begins first row -->
              <v-col cols="12"
                     class="subtitle-1  d-flex flex-wrap no-gutters ml-2"
                     style="color: rgba(0, 0, 0, 0.87)">
                <div class="col-4">{{getFormattedData(publicationSelected.editorial)}}</div>
                <div class="col-8">{{getFormattedData(publicationSelected.url)}}</div>
              </v-col>
              <v-col cols="12"
                     class="caption d-flex flex-wrap no-gutters mb-4 ml-2">
                <div class="col-4">Editorial</div>
                <div class="col-8">URL</div>
              </v-col>
              <!-- ends first row -->

              <!-- begins second row -->
              <v-col cols="12"
                     class="subtitle-1 d-flex flex-wrap no-gutters ml-2"
                     style="color: rgba(0, 0, 0, 0.87)">
                <div class="col-4">{{getFormattedData(publicationSelected.nombrespila)}}</div>
              </v-col>
              <v-col cols="12"
                     class="caption d-flex flex-wrap no-gutters mb-4 ml-2">
                <div class="col-4">Autor</div>
              </v-col>
              <!-- ends second row -->

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
                    style="position: absolute; left: 0; margin-bottom: 26px">Publicaciones</h2>
                <!-- ends title-->


                <!-- begins search input -->
                <div style="width: 300px">
                  <div class="input-label" style="margin-left: 33px">
                    Búsqueda
                  </div>
                  <v-text-field outlined
                                @keyup.enter="searchPublication()"
                                placeholder="Publicación 1"
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
                    color="secondary"
                    item-value="value"
                    outlined
                    dense>
                    <template v-slot:selection="{ item, index }">
                      <div v-if="filterOptions.search.columns.length === headers.length">
                        <span v-if="index === 0">Todas las columnas</span>
                      </div>
                      <div v-else>
                        <v-chip v-if="index === 0" small class="primary">
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
                       style="margin-bottom: 26px; border-width: 2px"
                       @click="openNewItem()"
                       color="primary">Añadir publicación
                </v-btn>
                <!-- ends add new item button -->
              </v-col>

              <v-col cols="12"
                     class="mb-4">
                <v-data-table
                  :server-items-length="totalPublications"
                  @click:row="openIndividualItem"
                  height="600px"
                  fixed-header
                  :items-per-page="25"
                  :options.sync="publicationOptions"
                  :loading="loadingTable"
                  loader-height="4"
                  item-key="nombrecientifico"
                  loading-text="Reuniendo las publicaciones"
                  :headers="tableColumnsToRender"
                  :items="publications">
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
                  <template v-slot:item.idpub="{item}" >
                    <NoDataTableField :field="item.idpub"></NoDataTableField>
                  </template>
                  <template v-slot:item.nombre="{item}" >
                    <NoDataTableField :field="item.nombre"></NoDataTableField>
                  </template>
                  <template v-slot:item.anopublicacion="{item}">
                    <NoDataTableField :field="item.anopublicacion"></NoDataTableField>
                  </template>
                  <template v-slot:item.editorial="{item}">
                    <NoDataTableField :field="item.editorial"></NoDataTableField>
                  </template>
                  <template v-slot:item.url="{item}">
                    <NoDataTableField :field="item.url"></NoDataTableField>
                  </template>
                  <template v-slot:item.idp="{item}">
                    <NoDataTableField :field="item.idp"></NoDataTableField>
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
import {stdRules, requiredRules, numberRules, emailRules} from "@/misc/rules";


export default {
  name: "Publications",
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
      stdRules,
      emailRules,
      requiredRules,
      numberRules,
      filterOptions: {
        search: {
          pattern: '',
          columns: [
            'idpub',
            'nombre',
            'anopublicacion',
            'editorial',
            'url',
            'idp',
          ],
        }
      },
      headers: [
        {
          text: 'Nombre',
          align: 'start',
          sortable: true,
          value: 'nombre',
        },
        {
          text: 'Año de publicación',
          align: 'start',
          disabled: true,
          sortable: false,
          value: 'anopublicacion',
        },
        {
          text: 'Editorial',
          disabled: true,
          align: 'start',
          sortable: false,
          value: 'editorial',
        },
        {
          text: 'URL',
          align: 'start',
          sortable: false,
          value: 'url',
        },
        {
          text: 'IDP',
          align: 'start',
          sortable: false,
          value: 'idp',
        },
      ],
      tableColumnsSelected: [
        {
          text: 'Nombre',
          align: 'start',
          sortable: true,
          value: 'nombre',
        },
        {
          text: 'Año de publicación',
          align: 'start',
          disabled: true,
          sortable: false,
          value: 'anopublicacion',
        },
        {
          text: 'Editorial',
          disabled: true,
          align: 'start',
          sortable: false,
          value: 'editorial',
        },
        {
          text: 'URL',
          align: 'start',
          sortable: false,
          value: 'url',
        },
        {
          text: 'IDP',
          align: 'start',
          sortable: false,
          value: 'idp',
        },
      ],
      tableColumnsToRender: [],
      loadingTable: false,
      publicationOptions: {},
      publications: [],
      totalPublications: 0,
      publicationSelected: null,
      individualDialog: false,
      deleteDialogActive: false,
      itemToDelete: null,
      publication: {
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
    publicationOptions: {
      handler() {
        this.getPublicationsFromDatabase();
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
        await this.getPublicationsFromDatabase();
        this.closeOverlay();
      }
    },
    searchPerson(newVal) {
      newVal && newVal !== this.publication.idp && this.queryPersons(newVal)
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
      this.publication.idp = id;
    },
    /**
     * Opens the edit form
     * @params item - The item to be modified
     */
    async openEditForm(item) {
      this.setEditItem(true);
      this.setOverlayText('Abriendo publicación');
      this.showOverlay();
      let personResponse = await this.$store.dispatch('getPersonById', item.idp);
      personResponse = await personResponse.json();
      this.setPersonItems([personResponse]);
      this.setPersonIdp(personResponse.idp);
      this.closeOverlay();
      this.closeFormDialog();
      console.log(item);
      this.publication = item;
    },
    /**
     * Open the new item dialog and reset the piece variable
     */
    openNewItem() {
      this.isAddingItem = true;
      this.resetPublication();
      this.closeFormDialog()
      if (this.$refs.publicationForm !== undefined) {
        this.$refs.publicationForm.reset();
      }
    },
    async savePublication() {
      if (this.$refs.publicationForm.validate()) {
        this.setOverlayText('Guardando publicación');
        this.showOverlay();
        this.processPublication();
        let res = await this.$store.dispatch('savePublication', this.publication);
        if (res.ok) {
          this.showSuccessNotification('La publicación ha sido guardada');
        } else {
          this.showErrorNotification(`¡La publicación no se ha guardado! ERR: ${res.statusText}`)
        }
        this.closeOverlay();
        this.closeNewItem();
        await this.getPublicationsFromDatabase();
      }
    },
    async updatePublication() {
      this.editDialogActive = false;
      this.setOverlayText('Actualizando publicación');
      this.showOverlay();
      let res = await this.$store.dispatch('updatePublication', this.publication);
      if (res.ok) {
        this.publicationOptions.page = 1;
        this.totalPublications = 25;
        this.showSuccessNotification('¡La publication ha sido actualizada!');
      } else {
        this.showErrorNotification(`¡La publication no se ha actualizado! ERR: ${res.statusText}`)
      }
      this.closeOverlay();
      this.closeEditItem();
      await this.getPublicationsFromDatabase();
    },
    /**
     * Process the publication to change the empty fields to null
     */
    processPublication() {
      this.publication.idpub = Math.round(Math.random() * 1000000);
      this.publication.nombre = this.getFmtEmptyField(this.publication.nombre);
      this.publication.anopublicacion = this.getFmtEmptyField(this.publication.anopublicacion);
      this.publication.editorial = this.getFmtEmptyField(this.publication.editorial);
      this.publication.url = this.getFmtEmptyField(this.publication.url);
      this.publication.idp = this.getFmtEmptyField(this.publication.idp);
    },
    /**
     * Erase all the info of the piece selected
     */
    resetPublication() {
      this.publication = {
        idpub: '',
        nombre: '',
        anopublicacion: '',
        editorial: '',
        url: '',
        idp: ''
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
      this.setOverlayText('Eliminando publicación');
      this.showOverlay();
      let res = await this.$store.dispatch('deletePublication', this.itemToDelete.idpub);
      if (res.ok) {
        await this.getPublicationsFromDatabase();
        this.showSuccessNotification('La publicación ha sido eliminada correctamente');
      } else {
        this.showErrorNotification(`¡La publicación no se ha eliminado! ERR: ${res.statusText}`);
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
      this.publicationSelected = value;
      this.setOverlayText('Abriendo pieza');
      this.showOverlay();
      let personResponse = await this.$store.dispatch('getPersonById', value.idp);
      personResponse = await personResponse.json();
      this.publicationSelected.nombrespila = personResponse.nombrespila;
      this.closeOverlay();
      this.individualDialog = true;
    },
    /**
     * Get the publications from the database
     * @returns {Promise<void>}
     */
    async getPublicationsFromDatabase() {
      const {page, sortBy, sortDesc} = this.publicationOptions;
      this.loadingTable = true;
      let query = addQueryParameters({
        offset: (25 * (page - 1)),
        orderby: sortBy.length === 0 ? false : {
          column: 'idpub',
          direction: sortDesc[0] ? 'DESC' : 'ASC',
        },
        search: this.filterOptions.search.pattern === '' ? false : {
          pattern: this.filterOptions.search.pattern,
          columns: this.filterOptions.search.columns
        }
      });

      await fetch('http://129.146.241.105:3000/forward', {
        headers: new Headers({
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }),
        method: 'POST',
        body: JSON.stringify({
          table: `publicacion/${query}`,
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
          this.totalPublications = ((25 * (page + 1)));
        } else {
          this.totalPublications = (25 * page);
        }
        this.publications = res.items;
      }).catch(err => {
        console.log(err);
      });
      this.loadingTable = false;
    },
    /**
     * Search the given text in the database
     * @returns {Promise<void>}
     */
    async searchPublication() {
      this.setOverlayText('Buscando algo increíble');
      this.showOverlay();
      this.publicationOptions.page = 1;
      this.totalPublications = 25;
      if (this.filterOptions.search.pattern !== '') {
        clearTimeout(this.timeout);
        // timeout to delay the search after the user ends typing
        this.timeout = setTimeout(async () => {
          let query = addQueryParameters(this.filterOptions);
          await fetch('http://129.146.241.105:3000/forward', {
            headers: new Headers({
              'Authorization': `Bearer ${this.token}`,
              'Content-Type': 'application/json'
            }),
            method: 'POST',
            body: JSON.stringify({
              table: `publicacion/${query}`,
              options: {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json'
                }
              }
            })
          }).then(res => res.json()).then(res => {
            this.publications = res.items;
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
      fetch('http://129.146.241.105:3000/forward', {
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
  }
}
</script>

<style scoped>

</style>