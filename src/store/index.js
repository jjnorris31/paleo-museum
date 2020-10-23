import Vue from 'vue'
import Vuex from 'vuex'
const states = require('../misc/estados-municipios.json');

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    locations: [],
    states: [],
    institutions: [],
    collections: [],
    localities: [],
  },
  getters: {
    locations(state)  {
      return state.locations
    },
    states(state) {
      return state.states
    },
    getInstitutions(state) {
      return state.institutions;
    },
    getCollections: state => {
      return state.collections;
    },
    getLocalities: state => {
      return state.localities;
    }
  }
  ,
  mutations: {
    SET_LOCATIONS(state, locations) {
      state.locations = locations;
    },
    SET_STATES(state) {
      state.states = states;
    },
    SET_INSTITUTIONS(state, institutions) {
      state.institutions = institutions;
    },
    SET_COLLECTIONS(state, collections) {
      state.collections = collections;
    },
    SET_LOCALITIES(state, localities) {
      state.localities = localities;
    }
  },
  actions: {
    async retrieveLocations({commit}) {
      let res = await fetch('https://tpzok3gzaufsnmg-db202010212124.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/ubicacion', {
        method: 'GET'
      })
      let locations = await res.json();
      commit('SET_LOCATIONS', locations.items);
    },
    async retrieveStates(context, country) {
      let res = await fetch(`https://tpzok3gzaufsnmg-db202010212124.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/ubicacion/?q={"pais":{"$like":"%${country}%"}}`, {
        method: 'GET'
      })
      let countries = await res.json();
      return countries.items;
    },
    async retrieveMun(context, payload) {
      let res = await fetch(`https://tpzok3gzaufsnmg-db202010212124.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/ubicacion/?q={"pais":{"$like":"%${payload.country}%"}, "estado":{"$like":"%${payload.state}%"}}`, {
        method: 'GET'
      })
      let countries = await res.json();
      return countries.items;
    },
    async retrieveInst({commit}) {
      let res = await fetch('https://tpzok3gzaufsnmg-db202010212124.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/institucion', {
        method: 'GET'
      })
      let institutions = await res.json();
      commit('SET_INSTITUTIONS', institutions.items);
    },
    async retrieveColl({commit}) {
      let res = await fetch('https://tpzok3gzaufsnmg-db202010212124.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/coleccion', {
        method: 'GET'
      })
      let collections = await res.json();
      commit('SET_COLLECTIONS', collections.items);
    },
    async retrieveLocl({commit}) {
      let res = await fetch('https://tpzok3gzaufsnmg-db202010212124.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/localidad', {
        method: 'GET'
      })
      let localities = await res.json();
      commit('SET_LOCALITIES', localities.items);
    },
    async postPiece(context, piece) {
      let res = await fetch('https://tpzok3gzaufsnmg-db202010212124.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/almacenamiento/', {
        method: 'POST',
        body: JSON.stringify(piece),
        headers: new Headers({
          'Content-Type': 'application/json',
        })
      })
      return res.ok;
    }
  },
})
