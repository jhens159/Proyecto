import Vue from 'vue';
import Router from 'vue-router';
import CursosForm from './components/CursosForm.vue';
import Cursos from './components/Cursos.vue';
import HelloWorld from './components/HelloWorld.vue';
import Login from './components/Login.vue';
import Logout from './components/Logout.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/cursos',
      name: 'Cursos',
      component: Cursos,
    },
    {
      path: '/cursos/new',
      name: 'CursosForm',
      component: CursosForm,
    },
    {
      path: '/cursos/new/:id',
      name: 'CursosForm',
      component: CursosForm,
    },
    {
      path: '/login',
      name: 'LoginForm',
      component: Login
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    },
  ],
});

let whiteRoutes = [
  "LoginForm",
  "HelloWorld"
]

router.beforeEach((to, from, next) => {
  console.log(`${from.path} to ${to.path}`);
  let isAuthenticated = false;
  if (localStorage.getItem('user') != null) {
    isAuthenticated = true;
  }
  // if (to.name !== 'LoginForm' && to.name !== 'HelloWorld' && to.name !== 'Ping' && !isAuthenticated) {
  if (!whiteRoutes.includes(to.name) && !isAuthenticated) {
    next({ name: 'LoginForm' });
  } else {
    next();
  }
});
//https://www.digitalocean.com/community/tutorials/vuejs-advanced-vue-routing
export default router



