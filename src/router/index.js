import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/',
  },
  {
    path: '/',
    name: 'landing',
    component: () => import(/* webpackChunkName: "about" */ '../views/Landing.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/tablas/piezas',
    name: 'pieces',
    meta: {
      authentication: false,
      admin: false,
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Pieces.vue')
  },
  {
    path: '/tablas/especies',
    name: 'species',
    meta: {
      authentication: true,
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Species.vue')
  },
  {
    path: '/tablas/personas',
    name: 'persons',
    meta: {
      authentication: true,
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Persons.vue')
  },
  {
    path: '/tablas/publicaciones',
    name: 'publications',
    meta: {
      authentication: true,
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Publications.vue')
  },
  {
    path: '/tablas/expertos',
    name: 'experts',
    meta: {
      authentication: true,
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Experts.vue')
  },
  {
    path: '/usuarios',
    name: 'users',
    meta: {
      authentication: true,
      admin: true,
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Users.vue')
  },
  {
    path: '/tablas/almacenamiento',
    name: 'storage',
    meta: {
      authentication: true,
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Storage.vue')
  },
  {
    path: '/tablas/localidades',
    name: 'locations',
    meta: {
      authentication: true,
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Locations.vue')
  },
]

const router = new VueRouter({
  routes
});


router.beforeEach(async (to, from, next) => {

  let token = localStorage.getItem('museum_token');
  let auth = false;
  let res = null;
  let admin = false;
  let email = null;

  if (token) {
    res = await fetch('http://localhost:3000/auth', {
      method: 'GET',
      headers: new Headers({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
    });
    auth = res.status === 200;
    let tmp = await res.json();
    admin = tmp.tipo === 'ADMIN';
    email = tmp.email;
  }
  store.commit('SET_USER', admin);
  store.commit('SET_EMAIL', email);

  if (to.matched.some(record => record.meta.authentication) && to.matched.some(record => record.meta.admin)) {
    if (!auth) { // not admin!
      next('/');
    } else if (auth && !admin){ // user logged
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.authentication)) {
    if (!auth) { // not logged
      next('/');
    } else { // user logged
      next();
    }
  } else {
    next();
  }


})

export default router
