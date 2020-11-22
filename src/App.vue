<template>
  <v-app>
    <v-navigation-drawer clipped
                         app
                         v-if="inDashboard"
                         width="300">
      <v-row no-gutters>
        <v-col cols="12"
               class="mt-8 mb-4 d-flex justify-center no-gutters">
          <v-img src="@/assets/images/logo_museum_darkblue.svg"
                 contain
                 max-width="250px">
          </v-img>
        </v-col>
        <v-col cols="12">
          <v-list flat dense>
            <v-list-item-group v-model="listItemSelected">
              <v-list-item @click="showMessage()"
                           dense
                           color="#000000"
                           class="list-item">
                <v-list-item-icon>
                  <v-icon>mdi-home</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Inicio</v-list-item-title>
              </v-list-item>
              <v-list-group
                color="#000000"
                :value="true"
                no-action
                prepend-icon="mdi-table">
                <template v-slot:activator>
                  <v-list-item-title>Tablas</v-list-item-title>
                </template>
                  <v-list-item @click="item.action()"
                               color="#000000"
                               v-for="item in tableItems"
                               :key="item.text">
                    <v-list-item-icon>
                      <v-icon>{{item.icon}}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>{{item.text}}</v-list-item-title>
                  </v-list-item>
              </v-list-group>

              <v-list-item @click="showMessage()"
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
      </v-row>

    </v-navigation-drawer>
    <v-main class="full-height">
      <RouterView></RouterView>
    </v-main>
  </v-app>
</template>

<script>
import router from "@/router";

export default {
  name: 'App',

  components: {
  },

  computed: {
    inDashboard() {
      return this.$route.name === 'dashboard';
    }
  },

  data: () => ({
    item: 1,
    listItemSelected: 1,
    tableItems: [
      { text: 'Personas',
        icon: 'mdi-account-supervisor-circle',
        action: async () => {await router.push({name: 'pieces'})}
      },
      { text: 'Almacenamiento',
        icon: 'mdi-office-building-outline',
        action: async () => {await router.push({name: 'pieces'})}
      },
      { text: 'Piezas', icon: 'mdi-bone',
        action: async () => {await router.push({name: 'pieces'})}
      },
      { text: 'Especies', icon: 'mdi-google-downasaur',
        action: async () => {await router.push({name: 'species'})}
      },
      { text: 'Preparadores', icon: 'mdi-account-star',
        action: async () => {await router.push({name: 'pieces'})}
      },
      { text: 'Determinadores', icon: 'mdi-account-question',
        action: async () => {await router.push({name: 'pieces'})}
      },
    ],
  }),

  methods: {
    goToLogin() {
      this.$router.push({name: 'Login'})
    },
    showMessage() {
      console.log("clicked");
    }
  },
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
