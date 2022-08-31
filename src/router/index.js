import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LoginView.vue"),
  },
  {
    path: "/home",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/HomeView.vue"),
    children: [
      {
        path: "/welcome",
        name: "welcome", // 上面的name应该写在这里
        component: () =>
          import(/* webpackChunkName: "welcome" */ "../views/WelcomeView.vue"),
      },
      {
        path: "/user",
        name: "user",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/user/UserView.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
