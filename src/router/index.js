import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'landing',
    component: () => import(/* webpackChunkName: "about" */ '../views/Landing.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
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
      authentication: true,
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
    path: '/usuarios',
    name: 'users',
    meta: {
      authentication: true,
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Users.vue')
  },
]

const router = new VueRouter({
  routes
});


router.beforeEach(async (to, from, next) => {

  let token = localStorage.getItem('museum_token');
  let res = await fetch('http://localhost:3000/auth', {
    method: 'GET',
    headers: new Headers({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    })
  });

  let auth = res.ok;

  if (to.matched.some(record => record.meta.authentication)) {
    if (!auth) { // not logged
      next('/');
    } else { // user logged
      next();
    }
  } else {
    if (!auth) {
      next();
    } else {
      if (from.path === '/') {
        next('/tablas/piezas');
      } else {
        next(false);
      }
    }
  }


})

export default router
