<template>
  <v-container class="fill-height">
    <div class="main-container">
      <nav class="d-flex align-center justify-end px-4">
        <div class="nav-item">
          Búsqueda avanzada
        </div>
        <v-btn color="primary"
               outlined class="mr-2">LOGIN</v-btn>
      </nav>
      <main class="flex-grow-1">
        <v-row no-gutters class="fill-height">
          <v-col cols="7"
                 class="d-flex align-center justify-center no-gutters">
            <div class="col-8 info--text">
              <!-- begin logo with text -->
              <v-row no-gutters justify="center">
                <v-col cols="4">
                  <v-img src="../assets/images/mamut-logo.svg" height="100px" contain></v-img>
                </v-col>
                <v-col cols="5">
                  <h1 class="primary--text">Museo de paleontología</h1>
                  <div>Fernando A. Solórzano Barreto</div>
                </v-col>
              </v-row>
              <!-- ends logo with text -->
              <v-row no-gutters class="mt-8">
                <v-col cols="12">
                  <v-img src="../assets/images/fossils.svg" height="350px" contain>
                  </v-img>
                </v-col>
              </v-row>
            </div>
          </v-col>
          <v-col cols="5" class="d-flex no-gutters align-center justify-center">
            <v-row no-gutters
                   style="max-width: 400px"
                   align-content="center">
              <div>
                <h2>Explora</h2>
              </div>
              <v-col cols="12"
                     class="d-flex flex-wrap">
                <div class="item-collection warning mr-2 mb-2">
                  Especie
                </div>

                <div class="item-collection primary ml-2 mb-2">
                  Dino
                </div>

                <div class="item-collection info mr-2 my-2">
                  Otro dino
                </div>

                <div class="item-collection  ml-2 my-2" style="background-color: #837B9C">
                  Dino increíble
                </div>


              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </main>
    </div>
  </v-container>
</template>

<script>
export default {
name: "Landing"
}
</script>

<style scoped>

  nav {
    height: 60px;
  }
  .main-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    background-color: #FAF8FB;
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