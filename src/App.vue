<template>
  <v-app>
    <v-navigation-drawer clipped
                         app
                         width="300">
      <v-row no-gutters>
        <v-col cols="12" class="mb-4">
          <v-img src="@/assets/images/profile.jpg" height="150px" cover gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)">
            <div class="full-height d-flex justify-center flex-wrap no-gutters mt-4">
              <div class="col-10">
                <h1 style="color: white">Martha</h1>
                <h3 style="color: white">Administrador</h3>
              </div>
            </div>
          </v-img>
        </v-col>
        <v-col cols="12">
          <v-list flat>
            <v-list-item-group v-model="item">
              <v-list-item
                  active-class="blue"
                  color="white"
                  v-for="(item, i) in items"
                  :key="i"
              >
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
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
</style>
