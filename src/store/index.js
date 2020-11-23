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
    species: [],
    pieces: [],
    token: null,
  },
  getters: {
    locations(state)  {
      return state.locations
    },
    token(state){
      return state.token;
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
    },
    getSpecies: state => {
      return state.species;
    },
    getPieces: state => {
      return state.pieces;
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
    },
    SET_SPECIES(state, species) {
      state.species = species;
    },
    SET_PIECES(state, pieces) {
      state.pieces = pieces;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    }
  },
  actions: {
    async retrieveLocations({commit}) {
      let res = await fetch('https://tpzok3gzaufsnmg-museumdb.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/ubicacion/', {
        method: 'GET'
      })
      let locations = await res.json();
      commit('SET_LOCATIONS', locations.items);
    },
    async retrieveStates(context, country) {
      let res = await fetch(`https://tpzok3gzaufsnmg-museumdb.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/ubicacion/?q={"pais":{"$like":"%${country}%"}}`, {
        method: 'GET'
      })
      let countries = await res.json();

      return countries.items;
    },
    async retrieveMun(context, payload) {
      let res = await fetch(`https://tpzok3gzaufsnmg-museumdb.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/ubicacion/?q={"pais":{"$like":"%${payload.country}%"}, "estado":{"$like":"%${payload.state}%"}}`, {
        method: 'GET'
      })
      let countries = await res.json();
      return countries.items;
    },
    async retrieveInst({commit}) {
      let res = await fetch('https://tpzok3gzaufsnmg-museumdb.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/institucion/', {
        method: 'GET'
      })
      let institutions = await res.json();
      commit('SET_INSTITUTIONS', institutions.items);
    },
    async retrieveColl({commit}) {
      let res = await fetch('https://tpzok3gzaufsnmg-museumdb.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/coleccion/', {
        method: 'GET'
      })
      let collections = await res.json();
      commit('SET_COLLECTIONS', collections.items);
    },
    async retrieveLocl({commit}) {
      let res = await fetch('https://tpzok3gzaufsnmg-museumdb.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/localidad/', {
        method: 'GET'
      })
      let localities = await res.json();
      commit('SET_LOCALITIES', localities.items);
    },
    async retrieveSpecies({commit}) {
      let res = await fetch('https://tpzok3gzaufsnmg-museumdb.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/especie/', {
        method: 'GET'
      })
      let species = await res.json();
      commit('SET_SPECIES', species.items);
    },
    async savePiece(context, piece) {
      try {
        return await fetch('http://localhost:3000/forward', {
          headers: new Headers({
            'Authorization': `Bearer ${context.state.token}`,
            'Content-Type': 'application/json'
          }),
          method: 'POST',
          body: JSON.stringify({
            table: `pieza/`,
            options: {
              method: 'POST',
              body: JSON.stringify(piece),
              headers: {
                'Content-Type': 'application/json'
              }
            }
          })
        });
      } catch (e) {
        return e;
      }
    },
    async saveSpecie(context, specie) {
      try {
        return await fetch('http://localhost:3000/forward', {
          headers: new Headers({
            'Authorization': `Bearer ${context.state.token}`,
            'Content-Type': 'application/json'
          }),
          method: 'POST',
          body: JSON.stringify({
            table: `especie/`,
            options: {
              method: 'POST',
              body: JSON.stringify(specie),
              headers: {
                'Content-Type': 'application/json'
              }
            }
          })
        });
      } catch (e) {
        return e;
      }
    },
    async updatePiece(context, piece) {
      try {
        return await fetch('http://localhost:3000/forward', {
          headers: new Headers({
            'Authorization': `Bearer ${context.state.token}`,
            'Content-Type': 'application/json'
          }),
          method: 'POST',
          body: JSON.stringify({
            table: `pieza/${piece.ncatalogo}`,
            options: {
              method: 'PUT',
              body: JSON.stringify(piece),
              headers: {
                'Content-Type': 'application/json'
              }
            }
          })
        });
      } catch (e) {
        return e;
      }
    },
    async updateSpecie(context, piece) {
      try {
        return await fetch('http://localhost:3000/forward', {
          headers: new Headers({
            'Authorization': `Bearer ${context.state.token}`,
            'Content-Type': 'application/json'
          }),
          method: 'POST',
          body: JSON.stringify({
            table: `especie/${piece.nombrecientifico}`,
            options: {
              method: 'PUT',
              body: JSON.stringify(piece),
              headers: {
                'Content-Type': 'application/json'
              }
            }
          })
        });
      } catch (e) {
        return e;
      }
    },
    async deletePiece(context, id) {
      try {
        return await fetch('http://localhost:3000/forward', {
          headers: new Headers({
            'Authorization': `Bearer ${context.state.token}`,
            'Content-Type': 'application/json'
          }),
          method: 'POST',
          body: JSON.stringify({
            table: `pieza/${id}`,
            options: {
              method: 'DELETE',
            }
          })
        });
      } catch (e) {
        return e;
      }
    },
    async deleteSpecie(context, id) {
      try {
        return await fetch('http://localhost:3000/forward', {
          headers: new Headers({
            'Authorization': `Bearer ${context.state.token}`,
            'Content-Type': 'application/json'
          }),
          method: 'POST',
          body: JSON.stringify({
            table: `especie/${id}`,
            options: {
              method: 'DELETE',
            }
          })
        });
      } catch (e) {
        return e;
      }
    },
    /**
     * Save a new picture to the piece item in the object storage
     * @param context
     * @param imageInfo
     * @returns {Promise<Response|*>}
     */
    async uploadPicture(context, imageInfo) {
      let formData = new FormData();
      formData.append(`${imageInfo.id}`, imageInfo.file, `${imageInfo.id}`);
      try {
        return await fetch("http://localhost:3000/images", {
          method: 'POST',
          body: formData
        });
      } catch (e) {
        return e;
      }
    },
    async getUbietyById(context, id) {
      let res = await fetch(`https://tpzok3gzaufsnmg-museumdb.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/ubicacion/${id}`, {
        method: 'GET'
      });
      return await res.json();
    },
    async getLocationById(context, id) {
      let res = await fetch(`https://tpzok3gzaufsnmg-museumdb.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/localidad/${id}`, {
        method: 'GET'
      });
      return await res.json();
    },
    async getSpecieById(context, id) {
      let res = await fetch(`https://tpzok3gzaufsnmg-museumdb.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/especie/${id}`, {
        method: 'GET'
      });
      return await res.json();
    },
    async searchPiece({commit}, searchText) {
      let res = await fetch(`https://tpzok3gzaufsnmg-museumdb.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/pieza/?q={"ncatalogo":{"$like":"%${searchText}%"}}`,  {
        method: 'GET'
      });

      let pieces = await res.json();
      commit('SET_PIECES', pieces.items);
      return pieces.items;
    },
  },
})
