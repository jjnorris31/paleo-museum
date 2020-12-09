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
            <h1 class="mb-6 text-h4 font-weight-medium" v-if="isAddingItem">Nuevo usuario</h1>
            <h1 class="mb-6 text-h4 font-weight-medium" v-if="isEditingItem">Editar usuario</h1>
            <v-form ref="personForm"
                    lazy-validation
                    class="d-flex no-gutters flex-wrap">

              <!-- begin basic information -->
              <div class="col-12 text-h6">
                Credenciales
              </div>

              <div class="d-flex no-gutters justify-space-between"
                   style="min-width: 973px">

                <!-- begins fields -->
                <div class="d-flex flex-wrap no-gutters"
                     style="min-width: 973px">

                  <div class="row-form-container">

                    <!-- begins email -->
                    <div>
                      <div class="input-label">
                        Correo electrónico
                      </div>
                      <v-text-field outlined
                                    type="text"
                                    :rules="[requiredRules, emailRules]"
                                    maxlength="30"
                                    placeholder="test@example.com"
                                    v-model="user.email"
                                    dense>
                      </v-text-field>
                    </div>
                    <!-- ends email -->

                    <!-- begins nombre -->
                    <div>
                      <div class="input-label">
                        Nombre
                      </div>
                      <v-text-field outlined
                                    :rules="[requiredRules, stdRules]"
                                    maxlength="30"
                                    type="text"
                                    placeholder="Rafael777"
                                    v-model="user.nombre"
                                    dense>
                      </v-text-field>
                    </div>
                    <!-- ends nombre -->

                    <!-- begins contraseña -->
                    <div>
                      <div class="input-label">
                        Contraseña
                      </div>
                      <v-text-field outlined
                                    :rules="[requiredRules]"
                                    maxlength="30"
                                    type="text"
                                    placeholder="*********"
                                    v-model="user.password"
                                    dense>
                      </v-text-field>
                    </div>
                    <!-- ends contraseña -->



                  </div>
                  <div class="row-form-container">

                    <!-- begins contraseña -->
                    <div style="max-width: 317px">
                      <div class="input-label">
                        Tipo de usuario
                      </div>
                      <v-select
                        v-model="user.tipo"
                        :items="userTypes"
                        item-text="text"
                        value="value"
                        color="secondary"
                        item-value="value"
                        outlined
                        dense>
                      </v-select>
                    </div>
                    <!-- ends contraseña -->
                  </div>
                </div>
                <!-- ends fields -->
                <!-- ends basic information -->
              </div>

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
                       @click="saveUser()"
                       height="40px">Guardar usuario
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
            <h1 class="mb-1 headline font-weight-medium col-12">Borrado de usuario</h1>
            <div class="grey--text col-12 mb-4">¿Estás seguro de borrar a este usuario?</div>
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
            <h1 class="mb-1 headline font-weight-medium">Edición de persona</h1>
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
                       @click="updatePerson()"
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
                v-if="userSelected !== null"
                width="700px">
        <v-card height="100%"
                style="position: relative">
          <v-img src="../assets/images/not_found.png"
                 height="225px"
                 gradient="35deg, rgba(0,0,0,0.7035014689469538) 0%, rgba(234,242,23,0) 100%"
                 class="mb-4"
                 position="bottom center"
                 cover>
            <div style="position: absolute; bottom: 0; left: 4px">
              <v-card-title class="white--text text-h3">
                {{ userSelected.nombre }}
              </v-card-title>
              <v-card-subtitle class="white--text text-h6">
                {{ userSelected.email }}
              </v-card-subtitle>
            </div>
          </v-img>
          <v-card-text>
            <v-row no-gutters class="mx-4">
              <v-col cols="12"
                     class="text-h6 mt-4 mb-2"
                     style="color: rgba(0, 0, 0, 0.87)">Credenciales</v-col>

              <!-- begins first row -->
              <v-col cols="12"
                     class="subtitle-1  d-flex flex-wrap no-gutters ml-2"
                     style="color: rgba(0, 0, 0, 0.87)">
                <div class="col-4">{{ getFormattedData(userSelected.tipo) }}</div>
              </v-col>
              <v-col cols="12"
                     class="caption font-italic d-flex flex-wrap no-gutters mb-4 ml-2">
                <div class="col-4">Tipo de usuario</div>
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
                    style="position: absolute; left: 0; margin-bottom: 26px">Usuarios</h2>
                <!-- ends title-->


                <!-- begins search input -->
                <div style="width: 250px">
                  <div class="input-label">
                    Búsqueda
                  </div>
                  <v-text-field outlined
                                @keyup.enter="searchUser()"
                                placeholder="usuario@test.com"
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
                       color="primary">Añadir usuario
                </v-btn>
                <!-- ends add new item button -->
              </v-col>


              <v-col cols="12"
                     class="mb-4">
                <v-data-table
                  :server-items-length="totalSpecies"
                  height="600px"
                  fixed-header
                  :items-per-page="25"
                  :options.sync="userOptions"
                  :loading="loadingTable"
                  loader-height="4"
                  item-key="idp"
                  loading-text="Reuniendo al personal"
                  :headers="tableColumnsToRender"
                  :items="users">
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
                         <!-- <v-list-item @click="openEditForm(item)">
                            <v-list-item-title>Editar</v-list-item-title>
                          </v-list-item>-->
                          <v-list-item @click="openDeleteConfirmation(item)">
                            <v-list-item-title>Eliminar</v-list-item-title>
                          </v-list-item>
                        </v-list-item-group>
                      </v-list>
                    </v-menu>
                  </template>
                  <template v-slot:item.email="{item}" >
                    <NoDataTableField :field="item.email"></NoDataTableField>
                  </template>
                  <template v-slot:item.nombre="{item}" >
                    <NoDataTableField :field="item.nombre"></NoDataTableField>
                  </template>
                  <template v-slot:item.tipo="{item}">
                    <v-chip :color="item.tipo === 'ADMIN' ? '#FF3D33' : '#54BF00'" small dark>
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
import {stdRules, requiredRules, emailRules} from "@/misc/rules";
import dropImage from "@/misc/dropImage";


export default {
  name: "Users",
  mixins: [overlayController,
    deleteDialogController,
    dropImage,
    formatText,
    snackbarNotification],
  components: {
    MuseumOverlay,
    NoDataTableField
  },
  data: () => {
    return {
      stdRules,
      requiredRules,
      emailRules,
      filterOptions: {
        search: {
          pattern: '',
          columns: [
            'nombre',
            'email',
          ],
        }
      },
      headers: [
        {
          text: 'Nombre',
          disabled: true,
          align: 'start',
          sortable: true,
          value: 'nombre',
        },
        {
          text: 'Correo electrónico',
          align: 'start',
          sortable: true,
          value: 'email',
        },
        {
          text: 'Tipo de usuario',
          align: 'center',
          sortable: true,
          value: 'tipo',
        },
      ],
      tableColumnsSelected: [
        {
          text: 'Nombre',
          disabled: true,
          align: 'start',
          sortable: true,
          value: 'nombre',
        },
        {
          text: 'Correo electrónico',
          align: 'start',
          sortable: true,
          value: 'email',
        },
        {
          text: 'Tipo de usuario',
          align: 'center',
          sortable: true,
          value: 'tipo',
        },
      ],
      tableColumnsToRender: [
        {
          text: 'Nombre',
          disabled: true,
          align: 'start',
          sortable: true,
          value: 'nombre',
        },
        {
          text: 'Correo electrónico',
          align: 'start',
          sortable: true,
          value: 'email',
        },
        {
          text: 'Tipo de usuario',
          align: 'center',
          sortable: true,
          value: 'tipo',
        },
      ],
      userTypes: [
        {text: 'Usuario', value: 'USUARIO'},
        {text: 'Administrador', value: 'ADMIN'}
      ],
      loadingTable: false,
      userOptions: {},
      users: [],
      totalSpecies: 0,
      userSelected: null,
      individualDialog: false,
      deleteDialogActive: false,
      itemToDelete: null,
      user: {
        email: '',
        nombre: '',
        tipo: 'USUARIO',
        password: '',
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
    userOptions: {
      handler() {
        this.getUsersFromDatabase();
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
        await this.getUsersFromDatabase();
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
      this.user = item;
    },
    /**
     * Open the new item dialog and reset the piece variable
     */
    openNewItem() {
      this.isAddingItem = true;
      this.resetUser();
      this.closeFormDialog()
      if (this.$refs.personForm !== undefined) {
        this.$refs.personForm.reset();
      }
    },
    async saveUser() {
      if (this.$refs.personForm.validate()) {
        this.setOverlayText('Guardando usuario');
        this.showOverlay();
        this.processUser();
        let res = await this.$store.dispatch('saveUser', this.user);
        if (res.ok) {
          this.showSuccessNotification('El usuario ha sido guardado');
        } else {
          this.showErrorNotification(`¡El usuario no se ha guardado! ERR: ${res.statusText}`)
        }
        this.closeOverlay();
        this.closeNewItem();
        await this.getUsersFromDatabase();
      }
    },
    async updatePerson() {
      this.editDialogActive = false;
      this.setOverlayText('Actualizando persona');
      this.showOverlay();
      let res = await this.$store.dispatch('updatePerson', this.user);
      if (res.ok) {
        this.userOptions.page = 1;
        this.totalSpecies = 25;
        this.showSuccessNotification('¡La persona ha sido actualizada!');
      } else {
        this.showErrorNotification(`¡La persona no se ha actualizado! ERR: ${res.statusText}`)
      }
      this.closeOverlay();
      this.closeEditItem();
      await this.getUsersFromDatabase();
    },
    /**
     * Process the person to change the empty fields to null
     */
    processUser() {
      this.user.nombre = this.getFmtEmptyField(this.user.nombre);
    },
    /**
     * Erase all the info of the person selected
     */
    resetUser() {
      this.user = {
        email: '',
        nombre: '',
        tipo: 'USUARIO',
        password: '',
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
      this.setOverlayText('Eliminando persona');
      this.showOverlay();
      let res = await this.$store.dispatch('deleteUser', this.itemToDelete.email);
      if (res.ok) {
        await this.getUsersFromDatabase();
        this.showSuccessNotification('El usuario ha sido eliminado correctamente');
      } else {
        this.showErrorNotification(`¡El usuario no se ha eliminado! ERR: ${res.statusText}`);
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
      this.userSelected = value;
      this.setOverlayText('Abriendo pieza');
      this.showOverlay();
      this.closeOverlay();
      this.individualDialog = true;
    },
    /**
     * Get the species from the database
     * @returns {Promise<void>}
     */
    async getUsersFromDatabase() {
      const {page, sortBy, sortDesc} = this.userOptions;
      this.loadingTable = true;
      let query = addQueryParameters({
        offset: (25 * (page - 1)),
        orderby: sortBy.length === 0 ? false : {
          column: 'email',
          direction: sortDesc[0] ? 'DESC' : 'ASC',
        },
        search: this.filterOptions.search.pattern === '' ? false : {
          pattern: this.filterOptions.search.pattern,
          columns: this.filterOptions.search.columns
        }
      });

      await fetch('http://129.146.80.82:3000/forward', {
        headers: new Headers({
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }),
        method: 'POST',
        body: JSON.stringify({
          table: `usuario/${query}`,
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
        this.users = res.items;
      }).catch(err => {
        console.log(err);
      });
      this.loadingTable = false;
    },
    /**
     * Search the given text in the database
     * @returns {Promise<void>}
     */
    async searchUser() {
      this.setOverlayText('Buscando algo increíble');
      this.showOverlay();
      this.userOptions.page = 1;
      this.totalSpecies = 25;
      if (this.filterOptions.search.pattern !== '') {
        clearTimeout(this.timeout);
        // timeout to delay the search after the user ends typing
        this.timeout = setTimeout(async () => {
          let query = addQueryParameters(this.filterOptions);
          await fetch('http://129.146.80.82:3000/forward', {
            headers: new Headers({
              'Authorization': `Bearer ${this.token}`,
              'Content-Type': 'application/json'
            }),
            method: 'POST',
            body: JSON.stringify({
              table: `usuario/${query}`,
              options: {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json'
                }
              }
            })
          }).then(res => res.json()).then(res => {
            this.users = res.items;
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