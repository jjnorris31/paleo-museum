<template>
  <v-app>
    <v-navigation-drawer clipped
                         app
                         v-if="false"
                         style="background-color: #f3f4f5"
                         width="300">
      <v-row no-gutters>
        <v-col cols="12"
               class="mt-8 mb-4 d-flex justify-center no-gutters">
          <v-img src="@/assets/images/museum_full_logo_blue.png"
                 contain
                 max-width="250px">
          </v-img>
        </v-col>
        <v-col cols="12">
          <v-list>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
                <v-list-item>Dashboard</v-list-item>
              </v-list-item-icon>
            </v-list-item>
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

export default {
  name: 'App',

  components: {
  },

  computed: {
    inLogin() {
      return this.$route.name === 'Login';
    }
  },

  data: () => ({
    item: 1,
    items: [
      { text: 'Dashboard', icon: 'mdi-home' },
      { text: 'Reportes', icon: 'mdi-table' },
      { text: 'Usuarios', icon: 'mdi-account-multiple' },
    ],
  }),

  methods: {
    goToLogin(){
      this.$router.push({name: 'Login'})
    },
    showMessage() {
      console.log("clicked");
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
