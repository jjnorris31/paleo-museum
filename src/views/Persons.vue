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
            <h1 class="mb-6 text-h4 font-weight-medium" v-if="isAddingItem">Nueva persona</h1>
            <h1 class="mb-6 text-h4 font-weight-medium" v-if="isEditingItem">Editar persona</h1>
            <v-form ref="personForm"
                    lazy-validation
                    class="d-flex no-gutters flex-wrap">

              <!-- begin basic information -->
              <div class="col-12 text-h6">
                Información personal
              </div>

              <div class="d-flex no-gutters justify-space-between"
                   style="min-width: 973px">

                <!-- begins fields -->
                <div class="d-flex flex-wrap align-content-lg-space-between no-gutters basic-container">

                  <!-- begin nombres -->
                  <div class="mr-2 std-text-field">
                    <div class="input-label">
                      Nombres(s)
                    </div>
                    <v-text-field outlined
                                  counter="30"
                                  maxlength="30"
                                  :rules="[stdRules]"
                                  type="text"
                                  placeholder="Rafael Elu"
                                  v-model="person.nombrespila"
                                  dense>
                    </v-text-field>
                  </div>
                  <!-- begin nombres -->

                  <!-- begin apellido paterno -->
                  <div class="ml-2 std-text-field">
                    <div class="input-label">
                      Apellido paterno
                    </div>
                    <v-text-field outlined
                                  counter="30"
                                  maxlength="30"
                                  placeholder="Hernández"
                                  :rules="[stdRules]"
                                  type="text"
                                  v-model="person.apellidopaterno"
                                  dense>
                    </v-text-field>
                  </div>
                  <!-- begin apellido paterno -->

                  <!-- begins three fields -->
                  <div class="row-form-container">

                    <!-- begin apellido materno -->
                    <div>
                      <div class="input-label">
                        Apellido materno
                      </div>
                      <v-text-field outlined
                                    type="text"
                                    counter
                                    maxlength="30"
                                    placeholder="González"
                                    v-model="person.apellidomaterno"
                                    dense>
                      </v-text-field>
                    </div>
                    <!-- begin apellido materno -->

                    <!-- begin telefono -->
                    <div>
                      <div class="input-label">
                        Teléfono
                      </div>
                      <v-text-field outlined
                                    counter
                                    maxlength="30"
                                    type="text"
                                    :rules="[stdRules]"
                                    placeholder="3312501965"
                                    v-model="person.telefono"
                                    dense>
                      </v-text-field>
                    </div>
                    <!-- ends dating -->

                    <!-- begin dating -->
                    <div>
                      <div class="input-label">
                        Correo
                      </div>
                      <v-text-field outlined
                                    counter
                                    maxlength="30"
                                    type="text"
                                    :rules="[stdRules]"
                                    placeholder="test@example.com"
                                    v-model="person.correo"
                                    dense>
                      </v-text-field>
                    </div>
                    <!-- ends dating -->
                  </div>
                  <!-- ends three fields -->

                  <!-- begin pagina web -->
                  <div class="mr-2 std-text-field">
                    <div class="input-label">
                      Página web
                    </div>
                    <v-text-field outlined
                                  counter="50"
                                  maxlength="50"
                                  :rules="[stdRules]"
                                  type="text"
                                  placeholder="Rafael Elu"
                                  v-model="person.paginaweb"
                                  dense>
                    </v-text-field>
                  </div>
                  <!-- ends pagina web -->

                  <!-- begin institucion -->
                  <div class="ml-2 std-text-field">
                    <div class="input-label">
                      Institución
                    </div>
                    <div class="d-flex align-start">
                    <v-text-field outlined
                                  counter
                                  maxlength="30"
                                  placeholder="Institución"
                                  v-model="person.institucion"
                                  dense>
                    </v-text-field>
                  </div>
                  </div>
                  <!-- begin institucion -->

                </div>
                <!-- ends fields -->

                <!-- begins image -->
                <div class="d-flex flex-wrap no-gutters image-container rounded align-center"
                     style="border: 2px darkgray dashed">
                  <v-row no-gutters class="align-center justify-center body-1">
                    <v-col cols="12">
                      <div @drop="dropPhotoFile"
                           @dragover="dragPhotoFile"
                           @dragleave="leavePhotoFile"
                           class="primary--text"
                           style="height: 265px; position: relative">
                        <input type="file"
                               style="overflow: hidden; opacity: 0; width: 100%; height: 100%; position: absolute"
                               id="assetsPhotoHandle"
                               ref="photoInput"
                               @change="onFileSelected"
                               accept="image/*">
                        <label for="assetsPhotoHandle"
                               class="full-width fill-height d-flex align-content-center justify-center flex-wrap no-gutters">
                          <!--suppress HtmlUnknownTag -->
                          <div class="col-12 d-flex no-gutters justify-center align-center flex-wrap">
                            <v-icon class="mb-2"
                                    size="96">{{ photoFile !== null ? 'mdi-check' : 'mdi-image-outline' }}</v-icon>
                            <div class="col-10 text-center input-label" v-if="photoFile === null">
                              <span class="font-weight-bold">Elige un archivo</span> o arrástralo aquí
                            </div>
                            <div class="col-11 text-center caption"
                                 style="color: #828282"
                                 v-else>
                              <span>Archivo</span>: {{photoFile.name}}<br>
                              <span>Tamaño</span>: {{fileSizeInMb(photoFile).toFixed(2)}}Mb
                            </div>
                          </div>
                        </label>
                      </div>
                    </v-col>
                  </v-row>
                </div>
                <!-- ends image -->
                <div>
              </div>
              <!-- ends basic information -->
              </div>

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
                       @click="savePerson()"
                       height="40px">Guardar persona
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
                v-if="specieSelected !== null"
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
                {{specieSelected.nombrecientifico}}
              </v-card-title>
              <v-card-subtitle class="white--text text-h6">
                {{specieSelected.genero}}
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
                <div class="col-4">{{getFormattedData(specieSelected.clase)}}</div>
                <div class="col-4">{{getFormattedData(specieSelected.reino)}}</div>
                <div class="col-4">{{getFormattedData(specieSelected.orden)}}</div>
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
                <div class="col-4">{{getFormattedData(specieSelected.filum)}}</div>
                <div class="col-8">{{getFormattedData(specieSelected.descripcion)}}</div>
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
                <div class="col-4">{{getFormattedData(specieSelected.temporalidad)}}</div>
                <div class="col-4">{{getFormattedData(specieSelected.clado)}}</div>
                <div class="col-4">{{getFormattedData(specieSelected.subclado)}}</div>
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
                    style="position: absolute; left: 0; margin-bottom: 26px">Personas</h2>
                <!-- ends title-->


                <!-- begins search input -->
                <div style="width: 250px">
                  <div class="input-label">
                    Búsqueda
                  </div>
                  <v-text-field outlined
                                @keyup.enter="searchPerson()"
                                placeholder="Marisa Valdés"
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
                       color="primary">Añadir persona
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
                  :options.sync="personOptions"
                  :loading="loadingTable"
                  loader-height="4"
                  item-key="idp"
                  loading-text="Reuniendo al personal"
                  :headers="tableColumnsToRender"
                  :items="persons">
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
                  <template v-slot:item.nombrespila="{item}" >
                    <NoDataTableField :field="item.nombrespila"></NoDataTableField>
                  </template>
                  <template v-slot:item.apellidopaterno="{item}" >
                    <NoDataTableField :field="item.apellidopaterno"></NoDataTableField>
                  </template>
                  <template v-slot:item.apellidomaterno="{item}">
                    <NoDataTableField :field="item.apellidomaterno"></NoDataTableField>
                  </template>
                  <template v-slot:item.telefono="{item}">
                    <NoDataTableField :field="item.telefono"></NoDataTableField>
                  </template>
                  <template v-slot:item.correo="{item}">
                    <NoDataTableField :field="item.correo"></NoDataTableField>
                  </template>
                  <template v-slot:item.institucion="{item}">
                    <NoDataTableField :field="item.institucion"></NoDataTableField>
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
import dropImage from "@/misc/dropImage";


export default {
  name: "Persons",
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
      filterOptions: {
        search: {
          pattern: '',
          columns: [
            'nombrespila',
            'apellidopaterno',
            'apellidomaterno',
            'telefono',
            'correo',
            'institucion'
          ],
        }
      },
      headers: [
        {
          text: 'Nombre(s)',
          disabled: true,
          align: 'start',
          sortable: true,
          value: 'nombrespila',
        },
        {
          text: 'Apellido paterno',
          align: 'start',
          sortable: true,
          value: 'apellidopaterno',
        },
        {
          text: 'Apellido materno',
          align: 'start',
          disabled: true,
          sortable: false,
          value: 'apellidomaterno',
        },
        {
          text: 'Teléfono',
          align: 'start',
          sortable: false,
          value: 'telefono',
        },
        {
          text: 'Correo',
          align: 'start',
          sortable: false,
          value: 'correo',
        },
        {
          text: 'Institución',
          align: 'start',
          sortable: false,
          value: 'institucion',
        },
      ],
      tableColumnsSelected: [
        {
          text: 'Nombre(s)',
          disabled: true,
          align: 'start',
          sortable: true,
          value: 'nombrespila',
        },
        {
          text: 'Apellido paterno',
          align: 'start',
          sortable: true,
          value: 'apellidopaterno',
        },
        {
          text: 'Apellido materno',
          align: 'start',
          disabled: true,
          sortable: false,
          value: 'apellidomaterno',
        },
      ],
      tableColumnsToRender: [],
      loadingTable: false,
      personOptions: {},
      persons: [],
      totalSpecies: 0,
      specieSelected: null,
      individualDialog: false,
      deleteDialogActive: false,
      itemToDelete: null,
      person: {
        imagen: '',
        idp: '',
        nombrespila: '',
        apellidopaterno: '',
        apellidomaterno: '',
        paginaweb: '',
        telefono: '',
        correo: '',
        institucion: '',
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
    personOptions: {
      handler() {
        this.getPersonsFromDatabase();
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
        await this.getPersonsFromDatabase();
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
      this.setEditItem(item);
      this.setOverlayText('Abriendo especie');
      this.showOverlay();
      this.closeOverlay();
      this.closeFormDialog();
      this.person = item;
    },
    /**
     * Open the new item dialog and reset the piece variable
     */
    openNewItem() {
      this.isAddingItem = true;
      this.resetPerson();
      this.closeFormDialog()
      if (this.$refs.personForm !== undefined) {
        this.$refs.personForm.reset();
      }
    },
    async savePerson() {
      if (this.$refs.personForm.validate()) {
        this.setOverlayText('Guardando persona');
        this.showOverlay();
        this.processPerson();
        let res = await this.$store.dispatch('savePerson', this.person);
        if (res.ok) {
          this.showSuccessNotification('La pieza ha sido guardada');
        } else {
          this.showErrorNotification(`¡La pieza no se ha guardado! ERR: ${res.statusText}`)
        }
        this.closeOverlay();
        this.closeNewItem();
        await this.getPersonsFromDatabase();
      }
    },
    async updatePerson() {
      this.editDialogActive = false;
      this.setOverlayText('Actualizando persona');
      this.showOverlay();
      let res = await this.$store.dispatch('updatePerson', this.person);
      if (res.ok) {
        this.personOptions.page = 1;
        this.totalSpecies = 25;
        this.showSuccessNotification('¡La persona ha sido actualizada!');
      } else {
        this.showErrorNotification(`¡La persona no se ha actualizado! ERR: ${res.statusText}`)
      }
      this.closeOverlay();
      this.closeEditItem();
      await this.getPersonsFromDatabase();
    },
    /**
     * Process the person to change the empty fields to null
     */
    processPerson() {
      this.person.imagen = this.photoFile ? this.photoFile : null;
      this.person.idp = Math.round(Math.random() * 1000000);
      this.person.nombrespila = this.getFmtEmptyField(this.person.nombrespila);
      this.person.apellidopaterno = this.getFmtEmptyField(this.person.apellidopaterno);
      this.person.apellidomaterno = this.getFmtEmptyField(this.person.apellidomaterno);
      this.person.paginaweb = this.getFmtEmptyField(this.person.paginaweb);
      this.person.telefono = this.getFmtEmptyField(this.person.telefono);
      this.person.correo = this.getFmtEmptyField(this.person.correo);
      this.person.institucion = this.getFmtEmptyField(this.person.institucion);
    },
    /**
     * Erase all the info of the person selected
     */
    resetPerson() {
      this.person = {
        imagen: '',
        idp: '',
        nombrespila: '',
        apellidopaterno: '',
        apellidomaterno: '',
        paginaweb: '',
        telefono: '',
        correo: '',
        institucion: '',
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
      let res = await this.$store.dispatch('deletePerson', this.itemToDelete.idp);
      if (res.ok) {
        await this.getPersonsFromDatabase();
        this.showSuccessNotification('La persona ha sido eliminada correctamente');
      } else {
        this.showErrorNotification(`¡La persona no se ha eliminado! ERR: ${res.statusText}`);
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
      this.specieSelected = value;
      this.setOverlayText('Abriendo pieza');
      this.showOverlay();
      this.closeOverlay();
      this.individualDialog = true;
    },
    /**
     * Get the species from the database
     * @returns {Promise<void>}
     */
    async getPersonsFromDatabase() {
      const {page, sortBy, sortDesc} = this.personOptions;
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
          table: `persona/${query}`,
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
        this.persons = res.items;
      }).catch(err => {
        console.log(err);
      });
      this.loadingTable = false;
    },
    /**
     * Search the given text in the database
     * @returns {Promise<void>}
     */
    async searchPerson() {
      this.setOverlayText('Buscando algo increíble');
      this.showOverlay();
      this.personOptions.page = 1;
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
              table: `persona/${query}`,
              options: {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json'
                }
              }
            })
          }).then(res => res.json()).then(res => {
            this.persons = res.items;
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