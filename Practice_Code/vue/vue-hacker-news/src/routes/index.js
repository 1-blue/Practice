import Vue from 'vue';
import VueRouter from 'vue-router';

import AskView from '../views/AskView.vue';
import JobsView from '../views/JobsView.vue';
import NewsView from '../views/NewsView.vue';
import ItemView from '../views/ItemView.vue';
import UserView from '../views/UserView.vue';
import { store } from '../store/store.js';
import bus from '../utils/bus.js';

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/news',
      beforeEnter,
    },
    {
      path: "/ask",
      component: AskView,
      beforeEnter,
    },
    {
      path: "/jobs",
      component: JobsView,
      beforeEnter,
    },
    {
      path: "/news",
      component: NewsView,
      beforeEnter
    },
    {
      path: "/item",
      component: ItemView,
    },
    {
      path: "/user/:name",
      component: UserView,
    },
  ]
});

async function beforeEnter(to, from, next){
  bus.$emit("start:spinner");
  await store.dispatch("hacker/FETCH_LIST", to.path.slice(1));
  next();
}