import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import routes from '@/router/routes.js'

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {

  if (store.state.User.token != null) {
    (to.path === '/login') ? next('/') : next();
  } else {
    (to.path === '/login') ? next() : next('/login');
  }
  
});

export default router
