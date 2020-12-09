<template>
  <v-app>
    <v-navigation-drawer clipped
                         app
                         v-if="inApp"
                         width="300">
      <v-row no-gutters class="fill-height">
        <v-col cols="12"
               class="mt-8 mb-4 d-flex justify-center no-gutters">
          <v-img src="@/assets/images/museum_full_logo.png"
                 contain
                 max-width="250px">
          </v-img>
        </v-col>
        <v-col cols="12">
          <v-list flat dense>
            <v-list-item-group v-model="listItemSelected">
              <v-list-item @click="showMessage()"
                           v-if="false"
                           dense
                           color="primary"
                           class="list-item">
                <v-list-item-icon>
                  <v-icon>mdi-home</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Inicio</v-list-item-title>
              </v-list-item>
              <v-list-group
                :value="true"
                no-action
                prepend-icon="mdi-table">
                <template v-slot:activator>
                  <v-list-item-title>Tablas</v-list-item-title>
                </template>
                  <v-list-item @click="item.action()"
                               color="primary"
                               v-for="item in tableItems"
                               :key="item.text">
                    <v-list-item-icon>
                      <v-icon>{{item.icon}}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>{{item.text}}</v-list-item-title>
                  </v-list-item>
              </v-list-group>

              <v-list-item @click="goToUsers()"
                           v-if="admin"
                           color="primary"
                           class="list-item">
                <v-list-item-icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Usuarios
                </v-list-item-title>
              </v-list-item>

            </v-list-item-group>
          </v-list>
        </v-col>
        <v-col cols="12"
               class="align-self-end d-flex justify-center">
          <v-row no-gutters>

            <!-- begins icon -->
            <v-col cols="12"
                   class="mb-4">
              <v-row no-gutters
                     class="justify-center">
                <div class="mr-4">
                  <v-icon x-large>mdi-account-circle</v-icon>
                </div>
                <div>
                  <div class="caption">Usuario actual:</div>
                  <div>{{email}}</div>
                </div>
              </v-row>
            </v-col>
            <!-- ends icon -->

            <!-- begins logout button -->
            <v-col cols="12"
                   class="d-flex justify-center no-gutters mb-8">
              <v-btn outlined
                     @click="logout()"
                     depressed
                     color="rgba(0, 0, 0, 0.6)"
                     class="caption font-weight-medium"
                     style="border-width: 2px">
                <v-icon class="mr-1">mdi-logout</v-icon>
                Cerrar sesión
              </v-btn>
            </v-col>
            <!-- ends logout button -->
          </v-row>
        </v-col>
      </v-row>
    </v-navigation-drawer>
    <v-main class="full-height">
      <RouterView></RouterView>
    </v-main>
  </v-app>
</template>

<script>
import router from "@/router";
import {mapGetters} from 'vuex'

export default {
  name: 'App',

  components: {
  },

  computed: {
    inApp() {
      return this.$route.name !== 'landing' && this.user;
    },
    ...mapGetters([
      "user",
      "email",
      "token",
      "admin"
    ])
  },

  data: () => ({
    item: 1,
    listItemSelected: 1,
    tableItems: [
      { text: 'Personas',
        icon: 'mdi-account-supervisor-circle',
        action: async () => {await router.push({name: 'persons'})}
      },
      { text: 'Almacenamiento',
        icon: 'mdi-office-building-outline',
        action: async () => {await router.push({name: 'storage'})}
      },
      { text: 'Piezas', icon: 'mdi-bone',
        action: async () => {await router.push({name: 'pieces'})}
      },
      { text: 'Localidades', icon: 'mdi-archive',
        action: async () => {await router.push({name: 'locations'})}
      },
      { text: 'Especies', icon: 'mdi-google-downasaur',
        action: async () => {await router.push({name: 'species'})}
      },
      { text: 'Expertos', icon: 'mdi-account-star',
        action: async () => {await router.push({name: 'experts'})}
      },
      { text: 'Publicaciones', icon: 'mdi-newspaper-variant-multiple-outline',
        action: async () => {await router.push({name: 'publications'})}
      },
    ],
  }),

  methods: {
    goToUsers() {
      this.$router.push({name: 'users'})
    },
    showMessage() {
    },
    logout() {
      localStorage.removeItem('museum_token');
      this.$store.commit('SET_TOKEN', null);
      this.$router.push({path: '/'});
    }
  },
  created() {
    let token = localStorage.getItem('museum_token');
    if (token) {
      this.$store.commit('SET_TOKEN', token);
    }
  }
};
</script>

<style lang="scss">
  @import "assets/styles/css/mainstyle.css";
  // NOT REMOVE

  html {
    overflow-y: hidden !important;
  }

  .list-item {
    font-size: 1rem;
    font-weight: normal;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }




</style>
