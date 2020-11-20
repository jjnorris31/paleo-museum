<template>
  <div class="main-container white">
    <main class="flex-grow-1">

      <museum-overlay :overlay-active="overlayActive"
               :text="overlayText">
      </museum-overlay>

      <!-- begins error snackbar -->
      <v-snackbar v-model="snackbarActive"
                  color="error"
                  timeout="3000">Correo o contraseña incorrectas
        <template v-slot:action="{ attrs }">
          <v-btn
            color="white"
            icon
            v-bind="attrs"
            @click="snackbarActive = false">
            <v-icon>
              mdi-close-circle
            </v-icon>
          </v-btn>
        </template>
      </v-snackbar>
      <!-- ends error snackbar -->

      <!-- begin login dialog -->
      <v-dialog v-model="loginDialogActive"
                width="600px"
                class="full-height">
        <v-row no-gutters
               style="background-color: white; height: 100%"
               class=" px-7">
          <v-col cols="12"
                 class="d-flex no-gutters flex-wrap my-6">
            <h1 class="mb-1 headline font-weight-medium col-12">Inicia sesión</h1>
            <div class=" col-12 mb-8">¡Hola! ¿Ya has terminado de excavar?</div>

            <v-img height="150"
                   width="100%"
                   contain
                   src="../assets/images/sand.svg"></v-img>

            <v-form ref="loginForm">
              <!-- begins text fields -->
              <div class="col-12 justify-end mb-10 mt-4 d-flex no-gutters flex-wrap">
                <!-- begins username input -->
                <div class="col-12 std-text-field">
                  <div class="input-label">
                    Correo electrónico
                  </div>
                  <v-text-field outlined
                                required
                                type="text"
                                :rules="emailRules"
                                placeholder="test@mail.com"
                                v-model="username"
                                dense>
                  </v-text-field>
                </div>
                <!-- ends username input -->

                <!-- begins password input -->
                <div class="col-12 std-text-field">
                  <div class="input-label">
                    Contraseña
                  </div>
                  <v-text-field outlined
                                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                :rules="passwordRules"
                                :type="showPassword ? 'text' : 'password'"
                                @click:append="showPassword = !showPassword"
                                placeholder="test@mail.com"
                                v-model="password"
                                dense>
                  </v-text-field>
                </div>
                <!-- ends password input -->
                <div class="col-12 text-end input-label grey--text text--darken-1">
                  ¿Olvidaste tu contraseña?
                </div>
              </div>
              <!-- ends text fields -->

            </v-form>
            <!-- begins login button -->
            <div class="col-12 d-flex justify-center">
              <v-btn width="200px" color="secondary"
                     @click="login()">Iniciar sesión</v-btn>
            </div>
            <!-- ends login button-->


          </v-col>
        </v-row>
      </v-dialog>
      <!-- ends login dialog -->

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
              <!--<v-btn height="40px"
                     outlined
                     style="border-width: 2px"
                     class="ml-3"
                     @click="toDashboard()"
                     color="#5F5F5F">Iniciar sesión</v-btn>-->
            </v-col>
          </v-row>
        </v-col>
        <!-- ends left container -->

        <!-- begin right container-->
        <v-col cols="5" class="d-flex no-gutters align-center justify-center" style="position:relative;">
          <div style="position: absolute; right: 16px; top: 16px">
            <v-btn height="40px"
                   outlined
                   style="border-width: 2px"
                   class="ml-3"
                   @click="showLoginDialog()"
                   color="#5F5F5F">Iniciar sesión
            </v-btn>
          </div>
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
import MuseumOverlay from '@/components/MuseumOverlay';
import {passwordRules, emailRules} from "@/misc/rules";

export default {
  name: "Landing",
  components: {
    MuseumOverlay,
  },
  data: () => {
    return {
      username: '',
      password: '',
      loginDialogActive: false,
      overlayText: '',
      overlayActive: false,
      snackbarActive: false,
      emailRules,
      passwordRules,
      showPassword: false,
    }
  },
  methods: {
    toDashboard() {
      this.$router.push({name: 'dashboard'});
    },
    showLoginDialog() {
      this.loginDialogActive = true;
    },
    closeLoginDialog() {
      this.loginDialogActive = false;
    },
    showOverlay() {
      this.overlayActive = true;
    },
    closeOverlay() {
      this.overlayActive = false;
    },
    setOverlayText(text) {
      this.overlayText = text;
    },
    showSnackbar() {
      this.snackbarActive = true;
    },
    resetPassword() {
      this.password = '';
    },
    async login() {
      if (this.$refs.loginForm.validate()) {
        console.log("validate!")
        this.setOverlayText('Iniciando sesión');
        this.showOverlay();
        try {
          let res = await fetch('http://localhost:3000/login', {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({email: this.username, password: this.password})
          });
          let {accessToken} = await res.json();
          localStorage.setItem('museum_token', accessToken);
        } catch (e) {
          this.resetPassword();
          this.showSnackbar();
          console.log({e})
        } finally {
          this.closeOverlay();
        }
      }
    }
  }
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