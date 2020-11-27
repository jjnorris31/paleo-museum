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
            <h1 class="mb-6 text-h4 font-weight-medium" v-if="isAddingItem">Nuevo almacenamiento</h1>
            <h1 class="mb-6 text-h4 font-weight-medium" v-if="isEditingItem">Editar almacenamiento</h1>
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

                    <!-- begins nombre cientifico -->
                    <div>
                      <div class="input-label">
                        Identificador
                      </div>
                      <v-text-field outlined
                                    :disabled="isEditingItem"
                                    type="text"
                                    maxlength="30"
                                    :rules="[requiredRules, numberRules]"
                                    placeholder="100"
                                    v-model="storage.ida"
                                    dense>
                      </v-text-field>
                    </div>
                    <!-- ends nombre cientifico -->

                    <!-- begins genero -->
                    <div>
                      <div class="input-label">
                        Edificio
                      </div>
                      <v-text-field outlined
                                    maxlength="30"
                                    type="text"
                                    :rules="[stdRules]"
                                    placeholder="Edificio 1"
                                    v-model="storage.edificio"
                                    dense>
                      </v-text-field>
                    </div>
                    <!-- ends genero -->

                    <!-- begins clase -->
                    <div>
                      <div class="input-label">
                        Estantes
                      </div>
                      <v-text-field outlined
                                    type="text"
                                    maxlength="3"
                                    placeholder="1"
                                    v-model="storage.estante"
                                    dense>
                      </v-text-field>
                    </div>
                    <!-- ends clase -->

                  </div>

                  <div class="row-form-container">

                    <!-- begins reino -->
                    <div>
                      <div class="input-label">
                        Número de anaquel
                      </div>
                      <v-text-field outlined
                                    type="text"
                                    :rules="[numberRules]"
                                    placeholder="1"
                                    v-model="storage.numanaquel"
                                    dense>
                      </v-text-field>
                    </div>
                    <!-- begins reino -->
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
                       @click="saveStorage()"
                       height="40px">Guardar almacenamiento
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
            <h1 class="mb-1 headline font-weight-medium col-12">Borrado de almacenamiento</h1>
            <div class="grey--text col-12 mb-4">¿Estás seguro de borrar este almacenamiento?</div>
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
            <h1 class="mb-1 headline font-weight-medium">Edición de almacenamiento</h1>
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
                       @click="updateStorage()"
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
                v-if="storageSelected !== null"
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
                {{ storageSelected.ida }}
              </v-card-title>
              <v-card-subtitle class="white--text text-h6">
                {{ storageSelected.edificio }}
              </v-card-subtitle>
            </div>
          </v-img>
          <v-card-text>
            <v-row no-gutters class="mx-4">
              <v-col cols="12"
                     class="text-h6 mt-4 mb-2"
                     style="color: rgba(0, 0, 0, 0.87)">Almacenamiento</v-col>

              <!-- begins first row -->
              <v-col cols="12"
                     class="subtitle-1  d-flex flex-wrap no-gutters ml-2"
                     style="color: rgba(0, 0, 0, 0.87)">
                <div class="col-4">{{ getFormattedData(storageSelected.estante) }}</div>
                <div class="col-4">{{ getFormattedData(storageSelected.numanaquel) }}</div>
              </v-col>
              <v-col cols="12"
                     class="caption d-flex flex-wrap no-gutters mb-4 ml-2">
                <div class="col-4">Estante</div>
                <div class="col-4">Número de anaquel</div>
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
                    style="position: absolute; left: 0; margin-bottom: 26px">Almacenamiento</h2>
                <!-- ends title-->


                <!-- begins search input -->
                <div style="width: 300px">
                  <div class="input-label" style="margin-left: 33px">
                    Búsqueda
                  </div>
                  <v-text-field outlined
                                @keyup.enter="searchStorage()"
                                placeholder="Edificio sur"
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
                       color="primary">Añadir almacenamiento
                </v-btn>
                <!-- ends add new item button -->
              </v-col>

              <v-col cols="12"
                     class="mb-4">
                <v-data-table
                  :server-items-length="totalSpecies"
                  @click:row="openIndividualItem"
                  height="600px"
                  fixed-header
                  :items-per-page="25"
                  :options.sync="storageOptions"
                  :loading="loadingTable"
                  loader-height="4"
                  item-key="ida"
                  loading-text="Abriendo los almacenes"
                  :headers="tableColumnsToRender"
                  :items="storages">
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
                  <template v-slot:item.ida="{item}" >
                    <NoDataTableField :field="item.ida"></NoDataTableField>
                  </template>
                  <template v-slot:item.edificio="{item}" >
                    <NoDataTableField :field="item.edificio"></NoDataTableField>
                  </template>
                  <template v-slot:item.estante="{item}" >
                    <NoDataTableField :field="item.estante"></NoDataTableField>
                  </template>
                  <template v-slot:item.numanaquel="{item}">
                    <NoDataTableField :field="item.numanaquel"></NoDataTableField>
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
import {stdRules, requiredRules, numberRules} from "@/misc/rules";


export default {
  name: "Storage",
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
      stdRules,
      numberRules,
      requiredRules,
      filterOptions: {
        search: {
          pattern: '',
          columns: [
            'ida',
            'edificio',
            'estante',
            'numanaquel',
          ],
        }
      },
      headers: [
        {
          text: 'Identificador',
          disabled: true,
          align: 'start',
          sortable: true,
          value: 'ida',
        },
        {
          text: 'Edificio',
          disabled: true,
          align: 'start',
          sortable: true,
          value: 'edificio',
        },
        {
          text: 'Estante',
          align: 'start',
          sortable: true,
          value: 'estante',
        },
        {
          text: 'Número de anaquel',
          align: 'start',
          disabled: true,
          sortable: false,
          value: 'numanaquel',
        },
      ],
      tableColumnsSelected: [
        {
          text: 'Identificador',
          disabled: true,
          align: 'start',
          sortable: true,
          value: 'ida',
        },
        {
          text: 'Edificio',
          disabled: true,
          align: 'start',
          sortable: true,
          value: 'edificio',
        },
        {
          text: 'Estante',
          align: 'start',
          sortable: true,
          value: 'estante',
        },
        {
          text: 'Número de anaquel',
          align: 'start',
          disabled: true,
          sortable: false,
          value: 'numanaquel',
        },
      ],
      tableColumnsToRender: [],
      loadingTable: false,
      storageOptions: {},
      storages: [],
      totalSpecies: 0,
      storageSelected: null,
      individualDialog: false,
      deleteDialogActive: false,
      itemToDelete: null,
      storage: {
        ida: '',
        edificio: '',
        estante: '',
        numanaquel: '',
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
    storageOptions: {
      handler() {
        this.getStorageFromDatabase();
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
        await this.getStorageFromDatabase();
        this.closeOverlay();
      }
    },
  },
  methods: {
    /**
     * Opens the edit form
     * @params item - The item to be modified
     */
    async openEditForm(item) {
      this.setEditItem(true);
      this.setOverlayText('Abriendo especie');
      this.showOverlay();
      this.closeOverlay();
      this.closeFormDialog();
      this.storage = item;
    },
    /**
     * Open the new item dialog and reset the piece variable
     */
    openNewItem() {
      this.isAddingItem = true;
      this.resetSpecie();
      this.closeFormDialog()
      if (this.$refs.specieForm !== undefined) {
        this.$refs.specieForm.reset();
      }
    },
    async saveStorage() {
      if (this.$refs.specieForm.validate()) {
        this.setOverlayText('Guardando almacenamiento');
        this.showOverlay();
        this.processStorage();
        let res = await this.$store.dispatch('saveStorage', this.storage);
        if (res.ok) {
          this.showSuccessNotification('El almacenamiento ha sido guardado');
        } else {
          this.showErrorNotification(`¡El almacenamiento no se ha guardado! ERR: ${res.statusText}`)
        }
        this.closeOverlay();
        this.closeNewItem();
        await this.getStorageFromDatabase();
      }
    },
    async updateStorage() {
      this.editDialogActive = false;
      this.setOverlayText('Actualizando almacenamiento');
      this.showOverlay();
      let res = await this.$store.dispatch('updateStorage', this.storage);
      if (res.ok) {
        this.storageOptions.page = 1;
        this.totalSpecies = 25;
        this.showSuccessNotification('¡El almacenamiento ha sido actualizado!');
      } else {
        this.showErrorNotification(`¡El almacenamiento no se ha actualizado! ERR: ${res.statusText}`)
      }
      this.closeOverlay();
      this.closeEditItem();
      await this.getStorageFromDatabase();
    },
    /**
     * Process the specie to change the empty fields to null
     */
    processStorage() {
      this.storage.ida = this.getFmtEmptyField(Number(this.storage.ida));
      this.storage.edificio = this.getFmtEmptyField(this.storage.edificio);
      this.storage.estante = this.getFmtEmptyField(Number(this.storage.estante));
      this.storage.numanaquel = this.getFmtEmptyField(Number(this.storage.numanaquel));
    },
    /**
     * Erase all the info of the piece selected
     */
    resetSpecie() {
      this.storage = {
        ida: '',
        edificio: '',
        estante: '',
        numanaquel: '',
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
      this.setOverlayText('Eliminando almacenamiento');
      this.showOverlay();
      let res = await this.$store.dispatch('deleteStorage', this.itemToDelete.ida);
      if (res.ok) {
        await this.getStorageFromDatabase();
        this.showSuccessNotification('El almacenamiento ha sido eliminado correctamente');
      } else {
        this.showErrorNotification(`¡El almacenamiento no ha sido eliminado! ERR: ${res.statusText}`);
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
      this.storageSelected = value;
      this.setOverlayText('Abriendo almacenamiento');
      this.showOverlay();
      this.closeOverlay();
      this.individualDialog = true;
    },
    /**
     * Get the species from the database
     * @returns {Promise<void>}
     */
    async getStorageFromDatabase() {
      const {page, sortBy, sortDesc} = this.storageOptions;
      this.loadingTable = true;
      let query = addQueryParameters({
        offset: (25 * (page - 1)),
        orderby: sortBy.length === 0 ? false : {
          column: 'ida',
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
          table: `almacenamiento/${query}`,
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
        this.storages = res.items;
      }).catch(err => {
        console.log(err);
      });
      this.loadingTable = false;
    },
    /**
     * Search the given text in the database
     * @returns {Promise<void>}
     */
    async searchStorage() {
      this.setOverlayText('Buscando algo increíble');
      this.showOverlay();
      this.storageOptions.page = 1;
      this.totalSpecies = 25;
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
              table: `almacenamiento/${query}`,
              options: {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json'
                }
              }
            })
          }).then(res => res.json()).then(res => {
            this.storages = res.items;
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