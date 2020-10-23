import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

/*function getToken() {
  let url = "https://tpzok3gzaufsnmg-museumdb.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/oauth/token"
  let headers = new Headers({
    'Authorization': `Basic ${window.btoa("ugniaGRo-CvpKHPE66RE0A..:sTG4i1EniRNnkOgZytB2ag..")}`,
    'Content-Type': "application/x-www-form-urlencoded",
    'accept': 'application/json'
  });
  console.log(headers.get('Authorization'))
  let obj = {
    "method": 'POST',
    mode: 'cors',
    "body": JSON.stringify(({
      "client_id": "ugniaGRo-CvpKHPE66RE0A..",
      "client_secret": "sTG4i1EniRNnkOgZytB2ag..",
      "grant_type": "client_credentials",
      "scope": "",
    })),
    "credentials": "include",
    "headers": headers,
  }

  fetch(url, obj).then(res => res.json()
  ).then(result => {
    console.log(result);
  });

}

getToken();*/


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
