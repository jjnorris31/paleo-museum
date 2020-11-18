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
            <h1 class="mb-6 text-h4 font-weight-medium" v-if="isAddingItem">Nueva pieza</h1>
            <h1 class="mb-6 text-h4 font-weight-medium" v-if="isEditingItem">Editar pieza</h1>
            <v-form ref="pieceForm"
                    lazy-validation
                    class="d-flex no-gutters flex-wrap">

              <!-- begin basic information -->
              <div class="col-12 text-h6">
                Información básica
              </div>
              <div class="d-flex no-gutters">

                <!-- begins fields -->
                <div class="d-flex flex-wrap no-gutters basic-container">

                  <!-- begin catalog number -->
                  <div class="mr-2 std-text-field">
                    <div class="input-label">
                      Número de catálogo
                    </div>
                    <v-text-field outlined
                                  counter="10"
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
                                  counter="30"
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
                                    counter
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
                                    counter
                                    maxlength="30"
                                    type="text"
                                    :rules="[stdRules]"
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
                                    counter
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
                                placeholder="Aquí va algo importante..."
                                v-model="piece.descripcion"
                                dense>
                    </v-textarea>
                  </div>
                  <!-- ends description -->
                </div>
                <!-- ends fields -->

                <!-- begins image -->
                <div class="d-flex flex-wrap no-gutters image-container rounded align-center" style="border: 2px darkgray dashed">
                  <v-img height="50%"
                         contain
                         width="50%"
                         src="https://lh3.googleusercontent.com/proxy/R6FJITNpTCx70Ri1GDctyZu-AoYkSAOY5JG7UNXmzlWKXDIxvRG4xhM73IAdRGwUryVkGQvCePRDhgDnmTCwg7WZUDp3ns-04rzOku0xhegKPshUqIZeUiRhBBVW5kDktaLotb3wmGFNYqukwpiw8i4GSo0"></v-img>
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

                    <!-- begin scientific name -->
                    <div class="col-6 pl-2">
                      <div class="input-label">
                        Colección
                      </div>
                      <div class="d-flex align-start">
                        <v-text-field outlined
                                      type="text"
                                      counter
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
                                    counter
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
                                    counter
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
                                  :rules="[stdRules]"
                                  placeholder="Aquí va algo importante..."
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
                                      counter
                                      maxlength="30"
                                      placeholder="INSTITUCIÓN 1"
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
                                    counter
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
                                    counter
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
                       @click="savePiece()"
                       height="40px">Guardar pieza
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
            <h1 class="mb-1 headline font-weight-medium col-12">Borrado de pieza</h1>
            <div class="grey--text col-12 mb-4">¿Estás seguro de borrar esta pieza?</div>
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

      <!-- begin delete dialog -->
      <v-dialog v-model="editDialogActive"
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
              <v-col cols="6">
                <h6 class="subtitle-1">País</h6>
                <p>{{indItem.country}}</p>
              </v-col>
              <v-col cols="6">
                <h6 class="subtitle-1">Estado</h6>
                <p>{{indItem.state}}</p>
              </v-col>
              <v-col cols="6">
                <h6 class="subtitle-1">Municipio</h6>
                <p>{{indItem.municipality}}</p>
              </v-col>
              <v-col cols="6">
                <h6 class="subtitle-1">Latitud</h6>
                <p>{{indItem.latitud}}</p>
              </v-col>
              <v-col cols="6">
                <h6 class="subtitle-1">Longitud</h6>
                <p>{{indItem.longitud}}</p>
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
                     class="d-flex align-end justify-start no-gutters">

                <!-- begins search input -->
                <div style="width: 250px">
                  <v-text-field outlined
                                @keyup="searchInDb()"
                                v-model="filterOptions.search.pattern"
                                prepend-inner-icon="mdi-magnify"
                                filled
                                class="mr-2"
                                placeholder="Búsqueda"
                                dense>
                  </v-text-field>
                </div>
                <!-- ends search input -->

                <!-- begins search input -->
                <div style="width: 300px">
                  <v-select
                    v-model="filterOptions.search.columns"
                    :items="headers"
                    multiple
                    item-value="value"
                    class="ml-2"
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
                <!-- ends search input -->
              </v-col>


              <!-- begins columns select -->
              <v-col cols="12">
                <div>
                  <v-combobox
                    v-model="tableColumnsSelected"
                    :items="headers"
                    hint="7 columnas máximo"
                    label="Selecciona las columnas"
                    persistent-hint
                    return-object
                    outlined
                    height="40px"
                    multiple
                    hide-selected
                    chips>
                    <template v-slot:selection="{ attrs, item, select, selected }">
                      <v-chip
                        v-bind="attrs"
                        class="my-1"
                        :input-value="selected"
                        :close="!item.disabled"
                        small
                        :disabled="item.disabled"
                        @click="select"
                        @click:close="remove(item)">
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
                    @click:row="openIndividualItem"
                    height="400px"
                    v-model="selectedPieces"
                    :loading="loadingTable"
                    loader-height="4"
                    item-key="ncatalogo"
                    loading-text="Desenterrando los fósiles..."
                    :headers="tableColumnsToRender"
                    :items="pieces"
                    :options.sync="options"
                    :server-items-length="25">
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
              </v-col>
              <v-col cols="12">
                <v-btn height="40px"
                       depressed
                       class="mr-2"
                       elevation="4"
                       @click="openNewItem()"
                       color="secondary">Añadir pieza
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
import {stdRules, requiredRules, nameRules, decimalRules, columnsRules} from "@/misc/rules";
import NoDataTableField from "@/components/NoDataTableField";
import {addQueryParameters} from '@/misc/util';

export default {
  name: "Dashboard",
  components: {
    NoDataTableField
  },
  data: () => ({
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
          'longitud',
          'latitud',
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
        sortable: true,
        value: 'elematomico',
      },
      {
        text: 'Nombre científico',
        align: 'start',
        disabled: true,
        sortable: true,
        value: 'nombrecientifico'
      },
      {
        text: 'Datación',
        align: 'start',
        sortable: true,
        value: 'datacion',
      },
      {
        text: 'Forma ingreso',
        disabled: true,
        align: 'start',
        sortable: true,
        value: 'formaingreso',
      },
    ],
    tableColumnsToRender: [],
    headers: [
      {
        text: 'No. de catálogo',
        disabled: true,
        align: 'start',
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
        text: 'Estado taxonómico',
        align: 'start',
        sortable: true,
        value: 'estatustaxonomico',
      },
      {
        text: 'Datación',
        align: 'start',
        sortable: true,
        value: 'datacion',
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
        disabled: true,
        sortable: true,
        value: 'nombrecientifico'
      },
    ],
    formDialogActive: false,
    deleteDialogActive: false,
    editDialogActive: false,
    indivDialog: false,
    pieces: [],
    selectedPieces: [],
    timeout: null,
    mainOverlay: false, // page's flag overlay
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
    options: {
      handler() {
        this.getPiecesFromDatabase();
      }
    },
    getPieces: {
      handler: function (val) {
        this.pieces = val;
      },
      immediate: true,
    },
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
    async getPiecesFromDatabase() {
      this.loadingTable = true;
      this.pieces = await this.$store.dispatch('retrievePieces');
      this.loadingTable = false;
    },
    remove(item) {
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
      let query = encodeURIComponent(`{"nombrecientifico": {"$like":"%${v}%"}}`);
      fetch(`https://tpzok3gzaufsnmg-museumdb.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/especie?q=${query}`, {
        method: 'GET'
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
      let query = encodeURIComponent(`{"pais":{"$like":"%${v}%"}}`);
      fetch(`https://tpzok3gzaufsnmg-museumdb.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/ubicacion?q=${query}`, {
        method: 'GET'
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
     * with the user start to typing
     * @param v: the text typed by the user
     */
    queryStates(v) {
      // Lazily load input items
      this.loadingState = true;
      let query = encodeURIComponent(`{"pais":{"$like":"%${this.countrySelected}%"}, "estado":{"$like":"%${v}%"}}`);
      fetch(`https://tpzok3gzaufsnmg-museumdb.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/ubicacion?q=${query}`, {
        method: 'GET'
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
      let query = encodeURIComponent(`{"pais":{"$like":"%${this.countrySelected}%"}, "estado":{"$like":"%${this.stateSelected}%"},"municipio":{"$like":"%${v}%"}}`);
      fetch(`https://tpzok3gzaufsnmg-museumdb.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/ubicacion?q=${query}`, {
        method: 'GET'
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
     * Gets the municipality items from the database to fill the autocomplete
     * with the user start to typing
     * @param v: the text typed by the user
     */
    queryLocal(v) {
      // Lazily load input items
      this.loadingLocal = true;
      let query = encodeURIComponent(`{"nombre":{"$like":"%${v}%"}}`);
      fetch(`https://tpzok3gzaufsnmg-museumdb.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/localidad?q=${query}`, {
        method: 'GET'
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
     * Resets the state items array
     */
    resetStateItems() {
      this.stateItems = [];
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
    showMessage() {
      console.log("mesageee!!")
    },
    async openIndividualItem(value) {
      this.indItem = value;
      this.setMainOverlayText('Abriendo pieza');
      this.showMainOverlay();
      let res = await this.$store.dispatch('getUbietyById', value.idu);
      this.indItem.country = res.pais;
      this.indItem.state = res.estado;
      this.indItem.municipality = res.municipio;
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
      }
    },
    async savePiece() {
      if (this.$refs.pieceForm.validate()) {
        this.showSaveOverlay();
        this.processPiece();
        let res = await this.$store.dispatch('postPiece', this.piece);
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
        this.closeNewItem();
      }
    },
    async updatePiece() {
      this.editDialogActive = false;
      this.showSaveOverlay();
      try {
        await this.$store.dispatch('updatePiece', this.piece);
        await this.setPieces();
      } catch (err) {
        console.log('No se actualizó correctamente...')
      }
      this.hideSaveOverlay();
      this.resetSearch();
      this.closeEditItem();
    },
    getFmtEmptyField(property) {
      return property === '' || !property ? null : property;
    },
    processPiece() {
      this.piece.imagen = this.getFmtEmptyField(this.piece.imagen);
      this.piece.nregistroinah = this.getFmtEmptyField(this.piece.nregistroinah);
      this.piece.elematomico = this.getFmtEmptyField(this.piece.elematomico);
      this.piece.formaingreso = this.getFmtEmptyField(this.piece.formaingreso);
      this.piece.estatus = this.getFmtEmptyField(this.piece.estatus);
      this.piece.descripcion = this.getFmtEmptyField(this.piece.descripcion);
      this.piece.datacion = this.getFmtEmptyField(this.piece.datacion);
      this.piece.notasesttaxo = this.getFmtEmptyField(this.piece.notasesttaxo);
      this.piece.longitud = this.getFmtEmptyField(this.piece.longitud);
      this.piece.latitud = this.getFmtEmptyField(this.piece.latitud);
      this.piece.coleccion = this.getFmtEmptyField(this.piece.coleccion);
      this.piece.institucion = this.getFmtEmptyField(this.piece.institucion);
    },
    resetSearch() {
      this.search = '';
    },
    async searchInDb() {
      this.showMainOverlay();
      this.setMainOverlayText('Buscando algo increíble');
      if (this.filterOptions.search.pattern !== '') {
        clearTimeout(this.timeout);
        // timeout to delay the search after the user ends typing
        this.timeout = setTimeout(async () => {
          let query = addQueryParameters(this.filterOptions);
          fetch(`https://tpzok3gzaufsnmg-museumdb.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/pieza${query}`, {
            method: 'GET'
          }).then(res => res.json()).then(res => {
            this.pieces = res.items;
          }).catch(err => {
            console.log(err);
          }).finally(() => (this.hideMainOverlay()));
        }, 1000);
        console.log(this.search);
      } else {
        this.pieces = await this.$store.dispatch('retrievePieces');
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
     * Shows the delete overlay
     */
    showDeleteOverlay() {
      this.deleteOverlay = true;
    },
    /**
     * Hide the delete overlay
     */
    hideDeleteOverlay() {
      this.deleteOverlay = false;
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
      this.setEditItem(item);
      this.showMainOverlay();
      this.setMainOverlayText('Abriendo pieza');
      let ubietyResponse = await this.$store.dispatch('getUbietyById', item.idu);

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
    /**
     * Dispatch the action to delete an item in the database
     */
    async deleteItem() {
      this.showDeleteOverlay();
      try {
        await this.$store.dispatch('deletePiece', this.itemToDelete.ncatalogo);
      } catch (e) {
        console.log({e});
      }

      await this.setPieces()
      this.hideDeleteOverlay();
      this.closeDeleteConfirmation();
      this.resetItemToDelete();
    },
    /**
     * Set the pieces with the information of the database
     * @returns {Promise<void>}
     */
    async setPieces() {
      try {
        this.pieces = await this.$store.dispatch('retrievePieces');
      } catch (e) {
        console.log({e});
      }
    }

  },
  async mounted() {
    this.showMainOverlay();
    this.setMainOverlayText('Recuperando información');
    /*await this.$store.dispatch('retrieveLocations');
    await this.$store.commit('SET_STATES');
    await this.$store.dispatch('retrieveInst');
    await this.$store.dispatch('retrieveColl');np
    await this.$store.dispatch('retrieveLocl');
    await this.$store.dispatch('retrieveSpecies');
    */
    await this.$store.dispatch('retrievePieces');
    // let p1 = this.$store.dispatch('retrieveLocations');
    // let p2 = this.$store.commit('SET_STATES');
    // let p3 = this.$store.dispatch('retrieveInst');
    // let p4 = this.$store.dispatch('retrieveColl');
    // let p5 = this.$store.dispatch('retrieveLocl');
    // let p6 = this.$store.dispatch('retrieveSpecies');
    // let p7 = this.$store.dispatch('retrievePieces');
    //
    // /**
    //  * Handle with a lot of promises!
    //  * @type {unknown[]}
    //  */
    // let res = await Promise.all([p1, p2, p3, p4, p5, p6, p7]);
    // console.log("finished: ", res);
    this.hideMainOverlay();
  },
}
</script>

<style>
  .std-text-field {
    width: 338px;
  }

  .basic-container {
    width: 692px;
  }

  .image-container {
    margin-top: 23px;
    margin-left: 16px;
    margin-bottom: 15px;
    width: 265px;
    height: 265px;
  }

</style>
