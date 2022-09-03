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
    redirect: "/welcome",
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
          import(/* webpackChunkName: "about" */ "../views/user/ListView.vue"),
      },
      {
        path: "/product_list",
        name: "product",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/goods/product/ListView.vue"
          ),
      },
      {
        path: "/classify_list",
        name: "classify",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/goods/classify/ListView.vue"
          ),
      },
      {
        path: "/order_list",
        name: "order",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/order/ListView.vue"),
      },
      {
        path: "/warehouse",
        name: "warehouse",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/warehouse/ListView.vue"
          ),
      },
      {
        path: "/sorting",
        name: "sorting",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/sorting/ListView.vue"
          ),
      },
      {
        path: "/distribution",
        name: "distribution",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/distribution/ListView.vue"
          ),
      },
      {
        path: "/role",
        name: "role",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/limits/role/ListView.vue"
          ),
      },
      {
        path: "/department",
        name: "department",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/limits/department/ListView.vue"
          ),
      },
      {
        path: "/account",
        name: "account",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/limits/account/ListView.vue"
          ),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  // console.log("router.beforeEach", to, from);
  // 一旦使用了全局守卫就要考虑白名单
  // 处理白名单
  if (to.path === "/login") {
    next();
  } else {
    const store = JSON.parse(sessionStorage.getItem("vuex"));
    console.log(store);
    if (store === null || store === "" || store === undefined) {
      setTimeout(function () {
        next("/");
      }, 1000);
    } else {
      next();
    }
  }

  // next();
});

export default router;
