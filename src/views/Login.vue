<template>
  <v-row no-gutters
         class="full-height"
         align="center"
         justify="center">
    <v-col cols="10"
           class="elevation-4 rounded">
      <v-row no-gutters>
        <v-col cols="7">
          <v-img src="../assets/images/welcome_fossil.jpg"
                 height="600px"
                 cover
                 class="d-flex no-gutters align-end rounded-tl rounded-bl">
            <div class="col-10 mx-auto mb-4">
              <v-img src="../assets/images/museum_logo_full.png">
              </v-img>
            </div>
          </v-img>
        </v-col>
        <v-col cols="5">
          <v-row no-gutters justify="center">
            <v-col cols="10" class="mt-16">
              <h1 class="mb-1">{{title}}</h1>
              <!-- normal login -->
              <v-row no-gutters v-if="!recoverPass">
                <v-col cols="12">
                  <h4 class="mb-4">¿No tienes cuenta? <span class="selectable-text">Contacta al administrador</span></h4>
                  <v-form ref="sign-form">
                    <div class="input-label">Correo</div>
                    <v-text-field outlined
                                  dense
                                  placeholder="example@gmail.com">
                    </v-text-field>
                    <div class="input-label">Contraseña</div>
                    <v-text-field outlined
                                  dense
                                  placeholder="********">
                    </v-text-field>
                  </v-form>
                  <div class="d-flex justify-space-between no-gutters mb-2">
                    <v-btn depressed outlined color="blue" height="40px">Acceso público</v-btn>
                    <v-btn depressed color="blue" dark height="40px" @click="recoverPass = true">Iniciar sesión</v-btn>
                  </div>
                  <p class="text-center caption selectable-text ">¿Olvidaste tu contraseña?</p>
                </v-col>
              </v-row>
              <!-- end normal login -->
              <!-- recover password  -->
              <v-row no-gutters v-if="recoverPass && stepRecover === 1">
                <v-col cols="12">
                  <h4 class="mb-4">¿No recuerdas tu correo? <span class="selectable-text">Contacta al administrador</span></h4>
                  <v-form ref="sign-form">
                    <div class="input-label">Correo</div>
                    <v-text-field outlined
                                  dense
                                  placeholder="example@gmail.com">
                    </v-text-field>
                  </v-form>
                  <div class="d-flex justify-center no-gutters mb-2">
                    <v-btn depressed color="blue" dark height="40px" @click="stepRecover = 2">Continuar</v-btn>
                  </div>
                </v-col>
              </v-row>
              <!-- end recover password -->
              <!-- recover password  -->
              <v-row no-gutters v-if="recoverPass && stepRecover === 2">
                <v-col cols="12">
                  <h4 class="mb-4">Hemos enviado un correo electrónico a tu bandeja de entrada.
                    Sigue las instrucciones de ese correo.</h4>
                  <div class="d-flex justify-center no-gutters mb-2">
                    <v-btn depressed color="blue"
                           dark
                           height="40px"
                           @click="resetRecover()">Ir a login
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
              <!-- end recover password -->
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Login",
  computed: {
    title() {
      return this.recoverPass ? 'Recupera tu contraseña' : 'Bienvenido al museo';
    }
  },
  data: () => ({
    recoverPass: false,
    stepRecover: 1,
  }),
  methods: {
    resetRecover() {
      this.recoverPass = false;
      this.stepRecover = 1;
    }
  }
}
</script>

<style scoped lang="css">
</style>
