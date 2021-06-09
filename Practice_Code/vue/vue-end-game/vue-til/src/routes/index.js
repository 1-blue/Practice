import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/index.js";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/main",
    },
    {
      path: "/login",
      component: () => import("@/views/LoginPage.vue"),
    },
    {
      path: "/signup",
      component: () => import("@/views/SignupPage.vue"),
    },
    {
      path: "/main",
      component: () => import("@/views/MainPage.vue"),
      meta: { auth: true },
    },
    {
      path: "/add",
      component: () => import("@/views/PostAddPage.vue"),
      meta: { auth: true },
    },
    {
      path: "/edit/:id",
      component: () => import("@/views/PostEditPage.vue"),
      meta: { auth: true },
    },
    {
      path: "*",
      component: () => import("@/views/NotFoundPage.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !store.getters.isLogin) {
    alert("접근권한이 없습니다. 로그인후 접근해주세요");
    next("/login");
    return;
  }
  next();
});

export default router;
