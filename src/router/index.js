import VueRouter from "vue-router";
import routes from "./routes";
import Vue from 'vue';

import store from '@/store/index';

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkExactActiveClass: "active",
  scrollBehavior: (to) => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  if (
    !Object.keys(store.getters.getUser).length > 0 &&
    to.name !== 'join' &&
    to.name !== 'join-ref'
  ) {
    if (from.name) {
      Vue.prototype.$notify({
        message: "Sua sessão expirou. Por favor, logue novamente.",
        icon: 'tim-icons icon-bell-55',
        horizontalAlign: 'center',
        verticalAlign: 'top',
        type: 'warning',
        timeout: 3000,
      });
    }

    store.commit('RESET', '');

    return next({
      path: '/join',
      query: {
        redirect: to.path,
        ref: to.query.ref,
        id: to.query.id,
      }
    });
  }

  next();
});

export default router;
