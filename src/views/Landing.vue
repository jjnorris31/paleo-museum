<template>
  <div class="main-container white">
    <main class="flex-grow-1">
      <v-row no-gutters
             style="position: relative;"
             class="fill-height">

        <v-col cols="7"
               style="position: absolute; left: 0; top: 0"
               class="mt-8 gray">
          <v-row no-gutters>
            <v-col cols="7" offset="1">
              <v-img src="../assets/images/museum_full_logo.png"
                     contain
                     width="320px"
                     height="200px">
              </v-img>
            </v-col>
          </v-row>
        </v-col>

        <!-- begin left container -->
        <v-col cols="7">
          <v-row no-gutters
                 align-content="center"
                 class="fill-height">
            <v-col cols="9" offset="1">
              <h1 class="text-h1 font-weight-medium museum-text--grey">Conoce la nueva forma de visitar el museo</h1>
            </v-col>
            <v-col cols="8" offset="1">
              <p style="color: #5f5f5f"
                 class="text-h6 font-weight-light">Ahora nuestra colección está disponible para
                consulta pública, consulta cualquier pieza desde la comodidad de tu hogar</p>
            </v-col>
            <v-col cols="8" offset="1">
              <v-btn height="40px"
                     color="secondary"
                     depressed
                     class="mr-3">Explorar colección</v-btn>
              <v-btn height="40px"
                     outlined
                     style="border-width: 2px"
                     class="ml-3"
                     color="#5F5F5F">Iniciar sesión</v-btn>
            </v-col>
          </v-row>
        </v-col>
        <!-- ends left container -->

        <!-- begin right container-->
        <v-col cols="5" class="d-flex no-gutters align-center justify-center">
          <v-row no-gutters
                 style="height: 500px"
                 align-content="center">
            <v-img src="../assets/images/paleon_fossils.svg" height="100%" contain>
            </v-img>
          </v-row>
        </v-col>
        <!-- ends right container -->
      </v-row>
    </main>
  </div>
</template>

<script>
export default {
name: "Landing"
}
</script>

<style scoped>

  nav {
    height: 90px;
  }
  .main-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    background-color: #FFFFFF;
  }

  .item-collection {
    height: 150px;
    width: 150px;
    border-radius: 4px ;
    background-color: #757575;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nav-item {
    width: 250px;
    display: flex;
    align-content: center;
    justify-content: center;
  }

</style>