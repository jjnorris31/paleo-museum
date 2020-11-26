<template>
  <v-container fluid>
    <v-row no-gutters
           justify="center"
           class="white">

      <!-- begin dialog -->
      <v-dialog v-model="formDialogActive"
                fullscreen
                transition="dialog-bottom-transition"
                hide-overlay
                class="full-height">
        <v-row no-gutters
               style="background-color: white; height: 100%; position: relative"
               class="pt-15 pl-15 justify-space-between">
          <div style="height: 40px; position: absolute; left: 0"
               class="d-flex align-center ml-4">
            <v-btn icon
                   @click="isEditingItem ? closeEditItem() : closeNewItem()">
              <v-icon color="rgba(0, 0, 0, 0.87)" size="32">mdi-close</v-icon>
            </v-btn>
          </div>
          <v-col cols="6">
            <h1 class="mb-6 text-h4 font-weight-medium" v-if="isAddingItem">Nueva pieza</h1>
            <h1 class="mb-6 text-h4 font-weight-medium" v-if="isEditingItem">Editar pieza</h1>
            <v-form ref="pieceForm"
                    lazy-validation
                    class="d-flex no-gutters flex-wrap">

              <!-- begin basic information -->
              <div class="col-12 text-h6">
                Información básica
              </div>
              <div class="d-flex no-gutters justify-space-between" style="min-width: 973px">

                <!-- begins fields -->
                <div class="d-flex flex-wrap no-gutters basic-container">

                  <!-- begin catalog number -->
                  <div class="mr-2 std-text-field">
                    <div class="input-label">
                      Número de catálogo
                    </div>
                    <v-text-field outlined
                                  :disabled="isEditingItem"
                                  maxlength="10"
                                  :rules="[requiredRules]"
                                  type="text"
                                  placeholder="MPG-PD-1234"
                                  v-model="piece.ncatalogo"
                                  dense>
                    </v-text-field>
                  </div>
                  <!-- begin catalog number -->

                  <!-- begin anatomical element -->
                  <div class="ml-2 std-text-field">
                    <div class="input-label">
                      Elemento anatómico
                    </div>
                    <v-text-field outlined
                                  maxlength="30"
                                  placeholder="Húmero derecho"
                                  :rules="[stdRules]"
                                  type="text"
                                  v-model="piece.elematomico"
                                  dense>
                    </v-text-field>
                  </div>
                  <!-- begin anatomical element -->

                  <div style="width: 100%; display: grid; grid-column-gap: 16px; grid-template-columns: auto auto auto">


                    <!-- begin INAH number -->
                    <div>
                      <div class="input-label">
                        No. de registro de INAH
                      </div>
                      <v-text-field outlined
                                    type="text"
                                    maxlength="30"
                                    placeholder="INAH-REG 123"
                                    v-model="piece.nregistroinah"
                                    dense>
                      </v-text-field>
                    </div>
                    <!-- begin INAH number -->

                    <!-- begin dating -->
                    <div>
                      <div class="input-label">
                        Datación
                      </div>
                      <v-text-field outlined
                                    maxlength="30"
                                    type="text"
                                    placeholder="7500 +-500"
                                    v-model="piece.datacion"
                                    dense>
                      </v-text-field>
                    </div>
                    <!-- ends dating -->

                    <!-- begin dating -->
                    <div>
                      <div class="input-label">
                        Forma ingreso
                      </div>
                      <v-text-field outlined
                                    class="small-text-field"
                                    maxlength="30"
                                    type="text"
                                    :rules="[stdRules]"
                                    placeholder="Colecta"
                                    v-model="piece.formaingreso"
                                    dense>
                      </v-text-field>
                    </div>
                    <!-- ends dating -->

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
                                placeholder="Aquí va la descripción de la pieza"
                                v-model="piece.descripcion"
                                dense>
                    </v-textarea>
                  </div>
                  <!-- ends description -->
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
                                    size="96">
                              {{ photoFile !== null ? 'mdi-check' : 'mdi-image-outline' }}</v-icon>

                            <div v-if="isEditingItem"
                                 class="col-12 d-flex no-gutters justify-center">
                              <div class="col-10 text-center input-label"
                                   v-if="imageState === 'EXISTENT_IMAGE'">
                                <span class="font-weight-bold">Ya existe un archivo</span>, para cambiarlo, sube una nueva imagen.
                              </div>

                              <div class="col-10 text-center input-label"
                                   v-else-if="imageState === 'NOT_PHOTO'">
                                <span class="font-weight-bold">Elige un archivo</span> o arrástralo aquí
                              </div>

                              <div class="col-11 text-center caption"
                                   style="color: #828282"
                                   v-else>
                                <span>Archivo</span>: {{photoFile.name}}<br>
                                <span>Tamaño</span>: {{fileSizeInMb(photoFile).toFixed(2)}}Mb
                              </div>
                            </div>

                            <div v-else
                                 class="col-12 d-flex no-gutters justify-center">
                              <div class="col-10 text-center input-label"
                                   v-if="photoFile === null">
                                <span class="font-weight-bold">Elige un archivo</span> o arrástralo aquí
                              </div>

                              <div class="col-11 text-center caption"
                                   style="color: #828282"
                                   v-else>
                                <span>Archivo</span>: {{photoFile.name}}<br>
                                <span>Tamaño</span>: {{fileSizeInMb(photoFile).toFixed(2)}}Mb
                              </div>
                            </div>

                          </div>
                        </label>
                      </div>
                    </v-col>
                  </v-row>
                </div>
                <!-- ends image -->
              </div>
              <!-- ends basic information -->

              <!-- begin classification and geo data -->
              <div class="d-flex flex-wrap no-gutters align-start"
                   style="min-width: 973px">
                <!-- begins classification -->
                <div style="width: 50%"
                     class="d-flex flex-wrap no-gutters pr-12">
                  <div class="col-12 text-h6">
                    Clasificación
                  </div>
                  <div class="col-12 d-flex no-gutters flex-wrap">

                    <!-- begin scientific name -->
                    <div class="col-6 pr-2">
                      <div class="input-label">
                        Nombre científico
                      </div>
                      <div class="d-flex align-start">
                        <v-autocomplete outlined
                                        :rules="[requiredRules]"
                                        cache-items
                                        :loading="loadingSpecies"
                                        :items="specieItems"
                                        :search-input.sync="searchSpecie"
                                        hide-no-data
                                        placeholder="Canis dirus"
                                        v-model="piece.nombrecientifico"
                                        dense>
                        </v-autocomplete>
                      </div>
                    </div>
                    <!-- ends scientific name -->

                    <!-- begin collection -->
                    <div class="col-6 pl-2">
                      <div class="input-label">
                        Colección
                      </div>
                      <div class="d-flex align-start">
                        <v-text-field outlined
                                      type="text"
                                      maxlength="30"
                                      :rules="[stdRules]"
                                      placeholder="Paleontología con datos"
                                      v-model="piece.coleccion"
                                      dense>
                        </v-text-field>
                      </div>
                    </div>
                    <!-- ends scientific name -->

                    <!-- begin status -->
                    <div class="pr-2 col-6">
                      <div class="input-label">
                        Estado
                      </div>
                      <v-text-field outlined
                                    type="text"
                                    maxlength="30"
                                    :rules="[stdRules]"
                                    placeholder="Catalogado"
                                    v-model="piece.estatus"
                                    dense>
                      </v-text-field>
                    </div>
                    <!-- ends status -->

                    <!-- begin taxonomic status -->
                    <div class="col-6 pl-2">
                      <div class="input-label">
                        Estado taxonómico
                      </div>
                      <v-text-field outlined
                                    :rules="[stdRules]"
                                    maxlength="30"
                                    placeholder="Determinado"
                                    v-model="piece.estatustaxonomico"
                                    dense>
                      </v-text-field>
                    </div>
                    <!-- ends taxonomic status -->

                    <!-- begin taxonomic notes -->
                    <div class="col-12">
                      <div class="input-label">
                        Notas taxónomicas
                      </div>
                      <v-textarea outlined
                                  counter
                                  maxlength="200"
                                  height="80px"
                                  placeholder="Aquí van las notas taxónomicas"
                                  v-model="piece.notasesttaxo"
                                  dense>
                      </v-textarea>
                    </div>
                    <!-- ends taxonomic notes -->

                  </div>
                </div>
                <!-- ends classification -->

                <!-- begins geo data -->
                <div style="width: 50%"
                     class="d-flex flex-wrap no-gutters pl-2">
                  <div class="col-12 text-h6">
                    Datos geográficos
                  </div>
                  <div class="col-12 d-flex no-gutters flex-wrap">

                    <div class="d-flex col-12 flex-wrap no-gutters justify-space-between">

                      <!-- begin country -->
                      <div style="width: 30%">
                        <div class="input-label">
                          País
                        </div>
                        <div class="d-flex align-start">
                          <v-autocomplete outlined
                                          :rules="[requiredRules]"
                                          cache-items
                                          :loading="loadingCountries"
                                          :items="countryItems"
                                          :search-input.sync="searchCountry"
                                          hide-no-data
                                          placeholder="México"
                                          v-model="countrySelected"
                                          dense>
                          </v-autocomplete>
                        </div>
                      </div>
                      <!-- ends country -->

                      <!-- begin state -->
                      <div style="width: 30%">
                        <div class="input-label">
                          Estado
                        </div>
                        <div class="d-flex align-start">
                          <v-autocomplete outlined
                                          :loading="loadingState"
                                          :items="stateItems"
                                          :rules="[requiredRules]"
                                          :search-input.sync="searchState"
                                          hide-no-data
                                          placeholder="Jalisco"
                                          v-model="stateSelected"
                                          dense>
                          </v-autocomplete>
                        </div>
                      </div>
                      <!-- ends state -->

                      <!-- begin municipality -->
                      <div style="width: 30%">
                        <div class="input-label">
                          Municipio
                        </div>
                        <div class="d-flex align-start">
                          <v-autocomplete outlined
                                          :loading="loadingMun"
                                          :items="municipalityItems"
                                          cache-items
                                          item-text="municipio"
                                          item-value="idu"
                                          :rules="[requiredRules]"
                                          :search-input.sync="searchMunicipality"
                                          hide-no-data
                                          placeholder="Zapopan"
                                          v-model="piece.idu"
                                          dense>
                          </v-autocomplete>
                        </div>
                      </div>
                      <!-- ends municipality -->
                    </div>

                    <!-- begin institution -->
                    <div class="col-6 pr-2">
                      <div class="input-label">
                        Institución
                      </div>
                      <div class="d-flex align-start">
                        <v-text-field outlined
                                      maxlength="30"
                                      :rules="[stdRules]"
                                      placeholder="Institución 1"
                                      v-model="piece.institucion"
                                      dense>
                        </v-text-field>
                      </div>
                    </div>
                    <!-- ends institution -->

                    <!-- begin locality -->
                    <div class="col-6 pl-2">
                      <div class="input-label">
                        Localidad
                      </div>
                      <div class="d-flex align-start">
                        <v-autocomplete outlined
                                        :loading="loadingLocal"
                                        :items="locationItems"
                                        cache-items
                                        :rules="[requiredRules]"
                                        item-text="nombre"
                                        item-value="idl"
                                        :search-input.sync="searchLocal"
                                        hide-no-data
                                        placeholder="Zapopan"
                                        v-model="piece.idl"
                                        dense>
                        </v-autocomplete>
                      </div>

                    </div>
                    <!-- ends locality -->

                    <!-- begin long -->
                    <div class="col-6 pr-2">
                      <div class="input-label">
                        Longitud
                      </div>
                      <v-text-field outlined
                                    placeholder="Legal"
                                    maxlength="30"
                                    v-model="piece.longitud"
                                    dense>
                      </v-text-field>
                    </div>
                    <!-- begin long -->

                    <!-- begin lat -->
                    <div class="col-6 pl-2">
                      <div class="input-label">
                        Latitud
                      </div>
                      <v-text-field outlined
                                    type="text"
                                    maxlength="30"
                                    placeholder="Legal"
                                    v-model="piece.latitud"
                                    dense>
                      </v-text-field>
                    </div>
                    <!-- begin lat -->
                  </div>
                </div>
                <!-- ends geo data -->

              </div>
              <!-- ends classification and geo data -->


            </v-form>
            <div class="d-flex justify-center my-5 no-gutters"
                 style="width: 973px">
              <div class="col-5 d-flex justify-center">
                <v-btn color="#C9875E"
                       dark
                       class="mr-2"
                       outlined
                       @click="isEditingItem ? closeEditItem() : closeNewItem()"
                       style="border-width: 2px"
                       height="40px">Cancelar</v-btn>
                <v-btn v-if="isAddingItem"
                       class="ml-2"
                       depressed
                       color="primary"
                       elevation="4"
                       @click="savePiece()"
                       height="40px">Guardar pieza
                </v-btn>
                <v-btn v-if="isEditingItem"
                       depressed
                       class="ml-2"
                       color="primary"
                       @click="editDialogActive = true"
                       elevation="4"
                       height="40px">Guardar cambios
                </v-btn>
              </div>
            </div>
          </v-col>

          <!-- begins right image -->
          <v-col cols="5" class="fill-height d-flex align-center">
            <v-img height="500px" src="../assets/images/arq.svg">
            </v-img>
          </v-col>
          <!-- ends right image -->

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
            <h1 class="mb-1 headline font-weight-medium col-12">Borrado de pieza</h1>
            <div class="grey--text col-12 mb-4">¿Estás seguro de borrar esta pieza?</div>
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

      <!-- begin delete dialog -->
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
                <v-btn color="#C9875E"
                       class="mr-2"
                       outlined
                       @click="editDialogActive = false"
                       style="border-width: 2px"
                       height="40px">Cancelar</v-btn>
                <v-btn color="primary"
                       class="ml-2"
                       @click="updatePiece()"
                       elevation="4"
                       height="40px">Editar</v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-dialog>
      <!-- ends delete dialog -->

      <!-- begin main overlay -->
      <v-overlay v-model="mainOverlayActive"
                 opacity=".70"
                 z-index="205">
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
      <!-- ends main overlay -->

      <!-- begins error snackbar -->
      <v-snackbar v-model="errorActive"
                  :color="colorSnackbar"
                  timeout="3000">
        {{errorText}}
      </v-snackbar>
      <!-- ends error snackbar -->

      <v-dialog v-model="indivDialog"
                v-if="indItem !== null"
                width="700px">
        <v-card height="100%"
                style="position: relative">
          <v-img :src="imageToShow"
                 height="200"
                 class="mb-4"
                 position="bottom center"
                 cover>
            <div style="position: absolute; bottom: 0; left: 4px">
              <v-card-title class="white--text text-h3">
                {{indItem.ncatalogo}}
              </v-card-title>
              <v-card-subtitle class="white--text text-h6">
                {{indItem.nombrecientifico}}
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
                <div class="col-4">{{getFormattedData(indItem.elematomico)}}</div>
                <div class="col-4">{{getFormattedData(indItem.nregistroinah)}}</div>
                <div class="col-4">{{getFormattedData(indItem.datacion)}}</div>
              </v-col>
              <v-col cols="12"
                     class="caption d-flex flex-wrap no-gutters mb-4 ml-2">
                <div class="col-4">Elemento anatómico
                </div>
                <div class="col-4">No. de registro INAH</div>
                <div class="col-4">Datación</div>
              </v-col>
              <!-- ends first row -->

              <!-- begins second row -->
              <v-col cols="12"
                     class="subtitle-1 d-flex flex-wrap no-gutters ml-2"
                     style="color: rgba(0, 0, 0, 0.87)">
                <div class="col-4">{{getFormattedData(indItem.localidad)}}</div>
                <div class="col-4">{{getFormattedData(indItem.formaingreso)}}</div>
              </v-col>
              <v-col cols="12"
                     class="caption d-flex flex-wrap no-gutters mb-4 ml-2">
                <div class="col-4">Localidad</div>
                <div class="col-4">Forma ingreso</div>
              </v-col>
              <!-- ends second row -->

              <!-- begins second row -->
              <v-col cols="12"
                     class="subtitle-1 d-flex flex-wrap no-gutters ml-2"
                     style="color: rgba(0, 0, 0, 0.87)">
                <div class="col-12">{{getFormattedData(indItem.descripcion)}}</div>
              </v-col>
              <v-col cols="12"
                     class="caption d-flex flex-wrap no-gutters mb-4 ml-2">
                <div class="col-12">Descripción</div>
              </v-col>
              <!-- ends second row -->

              <v-col cols="12" class="text-h6 mb-2" style="color: rgba(0, 0, 0, 0.87)">Clasificación</v-col>

              <!-- begins first row -->
              <v-col cols="12"
                     class="subtitle-1 d-flex flex-wrap no-gutters ml-2"
                     style="color: rgba(0, 0, 0, 0.87)">
                <div class="col-4">{{getFormattedData(indItem.estatus)}}</div>
                <div class="col-4">{{getFormattedData(indItem.estatustaxonomico)}}</div>
                <div class="col-4">{{getFormattedData(indItem.institucion)}}</div>
              </v-col>
              <v-col cols="12"
                     class="caption d-flex flex-wrap no-gutters mb-4 ml-2">
                <div class="col-4">Estado</div>
                <div class="col-4">Estado taxonómico</div>
                <div class="col-4">Institución</div>
              </v-col>
              <!-- ends first row -->

              <!-- begins second row -->
              <v-col cols="12"
                     class="subtitle-1 d-flex flex-wrap no-gutters ml-2"
                     style="color: rgba(0, 0, 0, 0.87)">
                <div class="col-12">{{getFormattedData(indItem.notasesttaxo)}}</div>
              </v-col>
              <v-col cols="12"
                     class="caption d-flex flex-wrap no-gutters mb-4 ml-2">
                <div class="col-12">Notas taxonómicas</div>
              </v-col>
              <!-- ends second row -->

              <v-col cols="12" class="text-h6 mb-2" style="color: rgba(0, 0, 0, 0.87)">Datos geográficos</v-col>

              <!-- begins first row -->
              <v-col cols="12"
                     class="subtitle-1  d-flex flex-wrap no-gutters ml-2"
                     style="color: rgba(0, 0, 0, 0.87)">
                <div class="col-4">{{getFormattedData(indItem.pais)}}</div>
                <div class="col-4">{{getFormattedData(indItem.estado)}}</div>
                <div class="col-4">{{getFormattedData(indItem.municipio)}}</div>
              </v-col>
              <v-col cols="12"
                     class="caption d-flex flex-wrap no-gutters mb-4 ml-2">
                <div class="col-4">País</div>
                <div class="col-4">Estado</div>
                <div class="col-4">Municipio</div>
              </v-col>
              <!-- ends first row -->

              <!-- begins second row -->
              <v-col cols="12"
                     v-if="user"
                     class="subtitle-1 d-flex flex-wrap no-gutters ml-2"
                     style="color: rgba(0, 0, 0, 0.87)">
                <div class="col-4">{{getFormattedData(indItem.latitud)}}</div>
                <div class="col-4">{{getFormattedData(indItem.longitud)}}</div>
              </v-col>
              <v-col cols="12"
                     v-if="user"
                     class="caption d-flex flex-wrap no-gutters mb-4 ml-2">
                <div class="col-4">Latitud</div>
                <div class="col-4">Longitud</div>
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
                    style="position: absolute; left: 0; margin-bottom: 26px">Piezas</h2>
                <!-- ends title-->


                <!-- begins search input -->
                <div style="width: 300px">
                  <div class="input-label" style="margin-left: 33px">
                    Búsqueda
                  </div>
                  <v-text-field outlined
                                @keyup.enter="searchInDb()"
                                placeholder="MPG-123-ABC"
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

                <!-- begins search input -->
                <div style="width: 300px" class="mx-2">
                  <div class="input-label"
                       id="piece-search-column">
                    Buscar en
                  </div>
                    <v-select
                      v-model="filterOptions.search.columns"
                      flat
                      :items="headersNoDisabled"
                      :menu-props="{offsetY: true,
                      origin: 'center center',
                      transition: 'slide-y-transition',
                      contentClass: 'text--secondary'}"
                      multiple
                      item-value="value"
                      outlined
                      dense>
                      <template v-slot:selection="{ item, index }">
                        <div v-if="filterOptions.search.columns.length === headers.length">
                          <span v-if="index === 0">Todas las columnas</span>
                        </div>
                        <div v-else>
                          <v-chip v-if="index === 0"
                                  color="primary"
                                  small>
                            <span>{{ item.text }}</span>
                          </v-chip>
                          <span v-if="index === 1"
                                class="grey--text caption">(+{{ filterOptions.search.columns.length - 1 }} others)</span>
                        </div>
                      </template>
                    </v-select>
                </div>
                <!-- ends search input -->

                <!-- begins add new item button -->
                <v-btn height="40px"
                       class="ml-2"
                       depressed
                       v-if="user"
                       style="margin-bottom: 26px"
                       @click="openNewItem()"
                       color="primary">Añadir pieza
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
                    :menu-props="{offsetY: true, origin: 'center center', transition: 'slide-y-transition'}"
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
                    v-if="!formDialogActive"
                    :server-items-length="totalPieces"
                    @click:row="openIndividualItem"
                    height="600px"
                    fixed-header
                    :items-per-page="25"
                    :options.sync="options"
                    :loading="loadingTable"
                    loader-height="4"
                    item-key="ncatalogo"
                    loading-text="Desenterrando los fósiles..."
                    :headers="tableColumnsToRender"
                    :items="pieces">
                  <template v-slot:item.actions="{item}" v-if="user">
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
<!--                    <v-icon @click.stop="openEditItem(item)">mdi-pencil</v-icon>-->
                  </template>
                  <template v-slot:item.datacion="{item}" >
                    <NoDataTableField :field="item.datacion"></NoDataTableField>
                  </template>
                  <template v-slot:item.formaingreso="{item}" >
                    <NoDataTableField :field="item.formaingreso"></NoDataTableField>
                  </template>
                  <template v-slot:item.elematomico="{item}">
                    <NoDataTableField :field="item.elematomico"></NoDataTableField>
                  </template>
                  <template v-slot:item.estatus="{item}">
                    <NoDataTableField :field="item.estatus"></NoDataTableField>
                  </template>
                  <template v-slot:item.estatustaxonomico="{item}">
                    <NoDataTableField :field="item.estatustaxonomico"></NoDataTableField>
                  </template>
                  <template v-slot:item.longitud="{item}">
                    <NoDataTableField :field="item.longitud"></NoDataTableField>
                  </template>
                  <template v-slot:item.latitud="{item}">
                    <NoDataTableField :field="item.latitud"></NoDataTableField>
                  </template>
                  <template v-slot:item.nregistroinah="{item}">
                    <NoDataTableField :field="item.nregistroinah"></NoDataTableField>
                  </template>
                </v-data-table>
                <v-col cols="12">
                </v-col>
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
import {stdRules, requiredRules, nameRules, decimalRules, columnsRules} from "@/misc/rules";
import NoDataTableField from "@/components/NoDataTableField";
import {addQueryParameters} from '@/misc/util';
import dropImage from "@/misc/dropImage";
import formatText from "@/misc/formatText";
import snackbarNotification from "@/mixins/snackbarNotification";

export default {
  name: "Dashboard",
  mixins: [dropImage, formatText, snackbarNotification],
  components: {
    NoDataTableField
  },
  data: () => ({
    totalPieces: 0,
    municipalityEditAllowed: false,
    itemToDelete: null,
    options: {},
    filterOptions: {
      search: {
        pattern: '',
        columns: [
          'ncatalogo',
          'nregistroinah',
          'elematomico',
          'formaingreso',
          'estatus',
          'estatustaxonomico',
          'datacion',
          'nombrecientifico'
        ],
      }
    },
    loadingTable: false,
    tab: null,
    stdRules,
    requiredRules,
    columnsRules,
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
      ncatalogo: '',
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
      coleccion: '',
      institucion: '',
      idl: '',
      idu: '',
      imagen: '',
    },
    countrySelected: '',
    stateSelected: '',
    locationSelected: '',
    institutions: [],
    tableColumnsSelected: [
      {
        text: 'No. de catálogo',
        disabled: true,
        align: 'start',
        sortable: true,
        value: 'ncatalogo',
      },
      {
        text: 'Elemento anatómico',
        align: 'start',
        disabled: true,
        sortable: false,
        value: 'elematomico',
      },
      {
        text: 'Nombre científico',
        align: 'start',
        disabled: true,
        sortable: false,
        value: 'nombrecientifico'
      },
      {
        text: 'Forma ingreso',
        disabled: true,
        align: 'start',
        sortable: false,
        value: 'formaingreso',
      },
      {
        text: 'Datación',
        align: 'start',
        sortable: false,
        value: 'datacion',
      },
    ],
    tableColumnsToRender: [],
    headers: [
      {
        text: 'No. de catálogo',
        disabled: true,
        align: 'start',
        class: 'text--primary',
        sortable: true,
        value: 'ncatalogo',
      },
      {
        text: 'No. INAH',
        align: 'start',
        sortable: true,
        value: 'nregistroinah',
      },
      {
        text: 'Elemento anatómico',
        align: 'start',
        disabled: true,
        sortable: false,
        value: 'elematomico',
      },
      {
        text: 'Forma ingreso',
        disabled: true,
        align: 'start',
        sortable: false,
        value: 'formaingreso',
      },
      {
        text: 'Estatus',
        align: 'start',
        sortable: false,
        value: 'estatus',
      },
      {
        text: 'Estado taxonómico',
        align: 'start',
        sortable: false,
        value: 'estatustaxonomico',
      },
      {
        text: 'Datación',
        align: 'start',
        sortable: false,
        value: 'datacion',
      },
      {
        text: 'Longitud',
        align: 'start',
        sortable: false,
        value: 'longitud',
      },
      {
        text: 'Latitud',
        align: 'start',
        sortable: false,
        value: 'latitud',
      },
      {
        text: 'Nombre científico',
        align: 'start',
        disabled: true,
        sortable: false,
        value: 'nombrecientifico'
      },
    ],
    formDialogActive: false,
    deleteDialogActive: false,
    editDialogActive: false,
    indivDialog: false,
    pieces: [],
    endpoint: 'public',
    selectedPieces: [],
    timeout: null,
    mainOverlayActive: false, // page's flag overlay
    mainOverlayText: '', // text page's overlay
    indItem: null,
    isEditingItem: false,
    isAddingItem: false,
    editLocation: {},
    numberOfColumns: 6,
    searchSpecie: null,
    searchCountry: null,
    searchState: null,
    searchMunicipality: null,
    searchLocal: null,
    specieItems: [],
    countryItems: [],
    stateItems: [],
    municipalityItems: [],
    locationItems: [],
    loadingSpecies: false,
    loadingCountries: false,
    loadingState: false,
    loadingMun: false,
    loadingLocal: false,
  }),
  computed: {
    imageState() {
      if (this.isEditingItem) {
        if (this.photoFile === null && (this.piece.imagen === null || this.piece.imagen === '')) {
          // no new photo and no image of piece
          return 'NOT_PHOTO';
        } else if (this.photoFile !== null && (this.piece.imagen === null || this.piece.imagen === '')) {
          // new photo and no image from piece
          return 'NEW_IMAGE';
        } else if (this.photoFile === null && (this.piece.imagen !== null || this.piece.imagen !== '')) {
          // no new photo and image from piece
          return 'EXISTENT_IMAGE';
        }
      }
      return 'NEW_IMAGE';
    },
    headersNoDisabled() {
      return this.headers.map(x => {
        x.disabled = false
        return x;
      })
    },
    imageToShow() {
      return this.indItem && this.indItem.imagen ? this.indItem.imagen : require('../assets/images/not_found.png');
    },
    searchPattern() {
      return this.filterOptions.search.pattern;
    },
    storeLocations() {
      return this.$store.getters.locations;
    },
    ...mapGetters(
        ['getCollections',
          'getInstitutions',
          'getSpecies',
          'user',
          'token',
          'getLocalities']
    ),
  },
  watch: {
    formDialogActive(val) {
      this.photoFile = val ? this.photoFile : null;
    },
     async searchPattern(val) {
      if (val === '') {
        this.setMainOverlayText('Regresando todo a su lugar...');
        this.showMainOverlay();
        await this.getPiecesFromDatabase();
        this.hideMainOverlay();
      }
    },
    options: {
      handler() {
        this.getPiecesFromDatabase();
      },
      deep: true
    },
    tableColumnsSelected: {
      handler: function (val) {
        if (val.length > 6) {
          this.$nextTick(() => this.tableColumnsSelected.pop())
        }
        this.tableColumnsToRender = [...this.tableColumnsSelected];
        if (this.user) {
          this.tableColumnsToRender.push(
            {
              text: 'Acciones',
              align: 'center',
              disabled: true,
              sortable: false,
              value: 'actions'
            })
        }
      },
      immediate: true,
    },
    searchSpecie(newVal) {
      newVal && newVal !== this.piece.nombrecientifico && this.querySpecies(newVal)
    },
    searchCountry(newVal) {
      newVal && newVal !== this.countrySelected && this.queryCountries(newVal);
    },
    searchState(newVal) {
      newVal && newVal !== this.stateSelected && this.queryStates(newVal);
    },
    searchMunicipality(newVal) {
      newVal && newVal !== this.piece.idu && this.queryMunicipalities(newVal);
    },
    searchLocal(newVal) {
      newVal && newVal !== this.piece.idl && this.queryLocal(newVal);
    },
    storeLocations: {
      handler: function (val) {
        this.locations = val;
      },
      immediate: true,
    },
    countrySelected(val) {
      if (val) {
        this.setStateSelected('');
        this.setStateItems([]);
        this.setSearchState(null);
      }
    },
    stateSelected(val) {
      if (val && !this.municipalityEditAllowed) {
        this.piece.idu = '';
        this.setMunicipalityItems([]);
        this.setSearchMunicipality(null);
      }
    },
  },
  methods: {
    setEndpoint() {
      this.endpoint = this.token ? 'forward' : 'public';
    },
    async getPiecesFromDatabase() {
      const {page, sortBy, sortDesc} = this.options;
      this.loadingTable = true;
      this.setEndpoint();
      let query = addQueryParameters({
        offset: (25 * (page - 1)),
        orderby: sortBy.length === 0 ? false : {
          column: 'ncatalogo',
          direction: sortDesc[0] ? 'DESC' : 'ASC',
        },
        search: this.filterOptions.search.pattern === '' ? false : {
          pattern: this.filterOptions.search.pattern,
          columns: this.filterOptions.search.columns
        }
      });

      let res;

      if (this.token) {
        res = await fetch('http://localhost:3000/forward', {
          headers: new Headers({
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json'
          }),
          method: 'POST',
          body: JSON.stringify({
            table: `pieza/${query}`,
            options: {
              method: 'GET'
            }
          })
        })
      } else {
        res = await fetch('http://localhost:3000/public', {
          headers: new Headers({
            'Content-Type': 'application/json'
          }),
          method: 'POST',
          body: JSON.stringify({
            options: {
              method: 'GET'
            }
          })
        })
      }

      res.json().then(res => {
        if (res.hasMore) {
          // calculating the pagination
          this.totalPieces = ((25 * (page + 1)));
        } else {
          this.totalPieces = (25 * page);
        }
        this.pieces = res.items;
      }).catch(err => {
        console.log(err);
      }).finally(() => (this.hideMainOverlay()));
      this.loadingTable = false;
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
     * Gets the specie items from the database to fill the autocomplete
     * with the user start to typing
     * @param v: the text typed by the user
     */
    querySpecies(v) {
      // Lazily load input items
      this.loadingSpecies = true;
      let query = `{"nombrecientifico": {"$instr":"${v}"}}`;
      fetch('http://localhost:3000/forward', {
        headers: new Headers({
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }),
        method: 'POST',
        body: JSON.stringify({
          table: `especie?q=${query}`,
          options: {
            method: 'GET'
          }
        })
      }).then(res => res.json()).then(res => {
        this.specieItems = [];
        res.items.forEach(item => {
          this.specieItems.push(item.nombrecientifico);
        });
      }).catch(err => {
        console.log(err);
      }).finally(() => (this.loadingSpecies = false));
    },
    /**
     * Gets the state items from the database to fill the autocomplete
     * with the user start to typing
     * @param v: the text typed by the user
     */
    queryCountries(v) {
      // Lazily load input items
      this.loadingCountries = true;

      let query = addQueryParameters({
        search: {
          pattern: v,
          columns: []
        }
      });

      fetch('http://localhost:3000/forward', {
        headers: new Headers({
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }),
        method: 'POST',
        body: JSON.stringify({
          table: `ubicacion/${query}`,
          options: {
            method: 'GET'
          }
        })
      }).then(res => res.json()).then(res => {
        this.countryItems = [];
        res.items.forEach(item => {
          this.countryItems.push(item.pais);
        });
      }).catch(err => {
        console.log(err);
      }).finally(() => (this.loadingCountries = false));
    },
    /**
     * Gets the state items from the database to fill the autocomplete
     * with the user starts to typing
     * @param v: the text typed by the user
     */
    queryStates(v) {
      // Lazily load input items
      this.loadingState = true;
      let query = `{"pais":{"$instr":"${this.countrySelected}"}, "estado":{"$instr":"${v}"}}`;
      fetch('http://localhost:3000/forward', {
        headers: new Headers({
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }),
        method: 'POST',
        body: JSON.stringify({
          table: `ubicacion?q=${query}`,
          options: {
            method: 'GET'
          }
        })
      }).then(res => res.json()).then(res => {
        this.stateItems = [];
        res.items.forEach(item => {
          this.stateItems.push(item.estado);
        });
      }).catch(err => {
        console.log(err);
      }).finally(() => (this.loadingState = false));
    },
    /**
     * Gets the municipality items from the database to fill the autocomplete
     * with the user start to typing
     * @param v: the text typed by the user
     */
    queryMunicipalities(v) {
      // Lazily load input items
      this.loadingMun = true;
      let query = `{"pais":{"$instr":"${this.countrySelected}"}, "estado":{"$instr":"${this.stateSelected}"},"municipio":{"$instr":"${v}"}}`;

      fetch('http://localhost:3000/forward', {
        headers: new Headers({
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }),
        method: 'POST',
        body: JSON.stringify({
          table: `ubicacion?q=${query}`,
          options: {
            method: 'GET'
          }
        })
      }).then(res => res.json()).then(res => {
        this.municipalityItems = [];
        res.items.forEach(item => {
          this.municipalityItems.push(item);
        });
      }).catch(err => {
        console.log(err);
      }).finally(() => (this.loadingMun = false));
    },
    /**
     * Gets the location items from the database to fill the autocomplete
     * with the user start to typing
     * @param v: the text typed by the user
     */
    queryLocal(v) {
      // Lazily load input items
      this.loadingLocal = true;
      let query = `{"idl":{"$instr":"${v}"}}`;
      fetch('http://localhost:3000/forward', {
        headers: new Headers({
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }),
        method: 'POST',
        body: JSON.stringify({
          table: `localidad?q=${query}`,
          options: {
            method: 'GET'
          }
        })
      }).then(res => res.json()).then(res => {
        this.locationItems = [];
        res.items.forEach(item => {
          this.locationItems.push(item.idl);
        });
      }).catch(err => {
        console.log(err);
      }).finally(() => (this.loadingLocal = false));
    },
    /**
     * Resets the state selected
     */
    resetStateSltd() {
      this.stateSelected = '';
    },
    /**
     * Resets the search state
     */
    setSearchState(searchState) {
      this.searchState = searchState;
    },
    /**
     * Resets the search municipality
     */
    setSearchMunicipality(searchMunicipality) {
      this.searchMunicipality = searchMunicipality;
    },
    async openIndividualItem(value) {
      this.indItem = value;
      this.setMainOverlayText('Abriendo pieza');
      this.showMainOverlay();
      if (this.user) {
        let res = await this.$store.dispatch('getUbietyById', value.idu);
        res = await res.json();
        this.indItem.pais = res.pais;
        this.indItem.estado = res.estado;
        this.indItem.municipio = res.municipio;
      }
      this.hideMainOverlay();
      this.indivDialog = true;
    },
    /**
     * Open the new item dialog and reset the piece variable
     */
    openNewItem() {
      this.isAddingItem = true;
      this.resetPiece();
      this.closeFormDialog()
      if (this.$refs.pieceForm !== undefined) {
        this.$refs.pieceForm.reset();
      }
    },
    /**
     * Closes the new item dialog and reset the piece variable
     */
    closeNewItem() {
      this.isAddingItem = false;
      this.isEditingItem = false;
      this.openFormDialog();
    },
    setEditItem(isEdit) {
      this.isEditingItem = isEdit;
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
    setCountrySelected(country) {
      this.countrySelected = country;
    },
    /**
     * Sets the countries items to be displayed in the country's list
     */
    setCountryItems(countries) {
      this.countryItems = countries;
    },
    /**
     * Sets the state selected to display it in the text field
     */
    setStateSelected(state) {
      this.stateSelected = state;
    },
    /**
     * Sets the state items to be displayed in the state's list
     */
    setStateItems(states) {
      this.stateItems = states;
    },
    /**
     * Sets the state selected to display it in the text field
     */
    setPieceIdu(id) {
      this.piece.idu = id;
    },
    /**
     * Sets the state selected to display it in the text field
     */
    setPieceIdl(id) {
      this.piece.idl = id;
    },
    /**
     * Sets the state items to be displayed in the state's list
     */
    setLocationItems(locations) {
      this.locationItems = locations;
    },
    /**
     * Sets the state items to be displayed in the state's list
     */
    setSpecieItems(species) {
      this.specieItems = species;
    },
    /**
     * Sets the state items to be displayed in the state's list
     */
    setPieceScientificName(scientificName) {
      this.piece.nombrecientifico = scientificName;
    },
    /**
     * Sets the state items to be displayed in the state's list
     */
    setMunicipalityItems(municipalities) {
      this.municipalityItems = municipalities;
    },
    /**
     * Closes the edit piece dialog and reset the piece variable
     */
    closeEditItem() {
      this.isEditingItem = false;
      this.openFormDialog();
    },
    /**
     * Erase all the info of the piece selected
     */
    resetPiece() {
      this.piece = {
        ncatalogo: '',
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
        coleccion: '',
        institucion: '',
        idl: '',
        idu: '',
        imagen: ''
      };
      this.photoFile = null;
    },
    async savePiece() {
      if (this.$refs.pieceForm.validate()) {
        this.setMainOverlayText('Guardando pieza');
        this.showMainOverlay();
        this.processPiece();
        this.piece.imagen = await this.uploadPicture();
        let res = await this.$store.dispatch('savePiece', this.piece);
        if (res.ok) {
          this.hideMainOverlay();
          this.showSuccessNotification('La pieza ha sido guardada');
          this.search = '';
        } else {
          this.showErrorNotification(`¡La pieza no se ha guardado! ERR: ${res.statusText}`)
          this.hideMainOverlay();
          this.search = '';
        }
        this.closeNewItem();
        await this.getPiecesFromDatabase();

      }
    },
    async updatePiece() {
      this.editDialogActive = false;
      this.setMainOverlayText('Actualizando pieza');
      this.showMainOverlay();
      let res = await this.$store.dispatch('updatePiece', {piece: this.piece, photoFile: this.photoFile});
      if (res.ok) {
        this.options.page = 1;
        this.totalPieces = 25;
        await this.getPiecesFromDatabase();
        this.showSuccessNotification('¡La pieza ha sido actualizada!');
      } else {
        this.showErrorNotification(`¡La pieza no se ha actualizado! ERR: ${res.statusText}`)
      }
      this.hideMainOverlay();
      this.closeEditItem();
      this.$router.go();
    },
    /**
     * Dispatch the action to delete an item in the database
     */
    async deleteItem() {
      this.setMainOverlayText('Eliminando pieza');
      this.showMainOverlay();
      let res = await this.$store.dispatch('deletePiece', this.itemToDelete);
      if (res.ok) {
        await this.getPiecesFromDatabase();
        this.showSuccessNotification('La pieza ha sido eliminada correctamente');
      } else {
        this.showErrorNotification(`¡La pieza no se ha eliminado! ERR: ${res.statusText}`);
      }
      this.hideMainOverlay();
      this.closeDeleteConfirmation();
      this.resetItemToDelete();
    },
    getFmtEmptyField(property) {
      return property === '' || !property ? null : property;
    },
    /**
     * Upload a picture in the storage
     */
    async uploadPicture() {
      if (this.photoFile !== null) {
        let formData = new FormData();
        let url = null;
        formData.append("file", this.photoFile, this.photoFile.name);
        formData.append("name", this.piece.ncatalogo);
        try {
          let res = await fetch('http://localhost:3000/images', {
            headers: new Headers({
              'Authorization': `Bearer ${this.token}`
            }),
            method: 'POST',
            body: formData,
          });
          url = await res.text();
        } catch (e) {
          this.showErrorNotification(`¡La pieza no se ha guardado! ERR: ${e.statusText}`)
        }
        return url;
      }
      return null;
    },
    /**
     * Process the piece to change the empty fields to null
     */
    processPiece() {
      this.piece.imagen = this.photoFile ? this.photoFile : null;
      this.piece.nregistroinah = this.getFmtEmptyField(this.piece.nregistroinah);
      this.piece.elematomico = this.getFmtEmptyField(this.piece.elematomico);
      this.piece.formaingreso = this.getFmtEmptyField(this.piece.formaingreso);
      this.piece.estatus = this.getFmtEmptyField(this.piece.estatus);
      this.piece.descripcion = this.getFmtEmptyField(this.piece.descripcion);
      this.piece.datacion = this.getFmtEmptyField(this.piece.datacion);
      this.piece.notasesttaxo = this.getFmtEmptyField(this.piece.notasesttaxo);
      this.piece.estatustaxonomico = this.getFmtEmptyField(this.piece.estatustaxonomico);
      this.piece.longitud = this.getFmtEmptyField(this.piece.longitud);
      this.piece.latitud = this.getFmtEmptyField(this.piece.latitud);
      this.piece.coleccion = this.getFmtEmptyField(this.piece.coleccion);
      this.piece.institucion = this.getFmtEmptyField(this.piece.institucion);
    },
    async searchInDb() {
      this.setMainOverlayText('Buscando algo increíble');
      this.setEndpoint();
      this.showMainOverlay();
      this.options.page = 1;
      this.totalPieces = 25;
      if (this.filterOptions.search.pattern !== '') {
        clearTimeout(this.timeout);
        // timeout to delay the search after the user ends typing
        this.timeout = setTimeout(async () => {
          let query = addQueryParameters(this.filterOptions);

          let res;

          if (this.token) {
            res = await fetch('http://localhost:3000/forward', {
              headers: new Headers({
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json'
              }),
              method: 'POST',
              body: JSON.stringify({
                table: `pieza/${query}`,
                options: {
                  method: 'GET'
                }
              })
            })
          } else {
            console.log(query);
            res = await fetch('http://localhost:3000/public', {
              headers: new Headers({
                'Content-Type': 'application/json'
              }),
              method: 'POST',
              body: JSON.stringify({
                queryParams: query,
              })
            })
          }
          res.json().then(res => {
            this.pieces = res.items;
          }).catch(err => {
            console.log(err);
          }).finally(() => (this.hideMainOverlay()));
        }, 1000);
      }
    },
    /**
     * Show the main overlay
     */
    showMainOverlay() {
      this.mainOverlayActive = true;
    },
    /**
     * Hide the main overlay
     */
    hideMainOverlay() {
      this.mainOverlayActive = false;
    },
    /**
     * Set the item to be deleted
     */
    setItemToDelete(item) {
      this.itemToDelete = item;
    },
    /**
     * Reset the item to be deleted
     */
    resetItemToDelete() {
      this.itemToDelete = null;
    },
    /**
     * Opens the edit form
     * @params item - The item to be modified
     */
    async openEditForm(item) {
      this.setEditItem(true);
      this.showMainOverlay();
      this.setMainOverlayText('Abriendo pieza');
      let ubietyResponse = await this.$store.dispatch('getUbietyById', item.idu);
      ubietyResponse = await ubietyResponse.json();
      this.setLocationItems([item.idl]);
      this.setPieceIdl(item.idl);
      this.setSpecieItems([item.nombrecientifico]);
      this.setPieceScientificName(item.nombrecientifico);

      this.setCountryItems([ubietyResponse.pais]);
      this.setCountrySelected(ubietyResponse.pais);

      // execute this when the DOM was updated
      this.$nextTick(function () {
        this.municipalityEditAllowed = true;
        this.setStateItems([ubietyResponse.estado]);
        this.setStateSelected(ubietyResponse.estado);
      });

      this.setPieceIdu(ubietyResponse.idu);
      this.setMunicipalityItems([ubietyResponse]);
      this.municipalityEditAllowed = false;
      this.hideMainOverlay();
      this.closeFormDialog();
      this.piece = item;
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
     * Closes the delete confirm dialog
     */
    closeDeleteConfirmation() {
      this.deleteDialogActive = false;
    },
    /**
     * Opens the form dialog
     */
    openFormDialog() {
      this.formDialogActive = false;
    },
    /**
     * Closes the form dialog
     */
    closeFormDialog() {
      this.formDialogActive = true;
    },
  },
}
</script>

<style>
  .std-text-field {
    width: 338px;
  }

  .v-data-footer__select {
    display: none;
  }

  .v-data-footer {
    padding-top: 12px !important;
  }

  .v-data-table-header tr span {
    font-size: .8rem;
    color: rgba(0, 0, 0, 0.6);
  }

</style>
