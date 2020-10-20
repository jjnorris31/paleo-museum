import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

function getToken() {
  let url = "https://tpzok3gzaufsnmg-museumdb.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/oauth"
  let headers = new Headers({
    'Authorization': 'Basic dWduaWFHUm8tQ3ZwS0hQRTY2UkUwQS4uOnNURzRpMUVuaVJObmtPZ1p5dEIyYWcuLg==',
    'Content-Type': "application/x-www-form-urlencoded",
  });

  fetch(url, {
    "method": 'POST',
    mode: "no-cors",
    "body": JSON.stringify(({
      "grant_type": "client_credentials",
      "scope": ""
    })),
    "credentials": "include",
    "headers": headers,
  }).then(res => res.json()
  ).then(result => {
    console.log(result);
  });

}

getToken();

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
