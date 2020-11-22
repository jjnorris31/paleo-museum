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
    path: '/dashboard',
    name: 'dashboard',
    meta: {
      authentication: true,
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard.vue')
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
    name: 'piezas',
    meta: {
      authentication: true,
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Pieces.vue')
  },
  {
    path: '/tablas/especies',
    name: 'piezas',
    meta: {
      authentication: true,
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Pieces.vue')
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
        next('/dashboard');
      } else {
        next(false);
      }
    }
  }


})

export default router
