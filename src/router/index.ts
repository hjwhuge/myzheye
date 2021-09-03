import { createRouter, createWebHistory } from "vue-router";
import { getToken } from "@/utils/auth";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import ColumnDetail from "../views/ColumnDetail.vue";
import CreatePost from "../views/CreatePost.vue";
import PostDetail from "../views/PostDetail.vue";
import store from "../store";
const routerHistory = createWebHistory();
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup,
    },
    {
      path: "/create",
      name: "create",
      component: CreatePost,
      meta: { requiredLogin: true },
    },
    {
      path: "/column/:id",
      name: "column",
      component: ColumnDetail,
    },
    {
      path: "/posts/:id",
      name: "post",
      component: PostDetail,
    },
  ],
});
router.beforeEach((to, from, next) => {
  // console.log(to, from);cc
  const token = getToken();
  const userinfo = localStorage.getItem("userinfo");
  const whiteList = ["/login", "/signup"];
  if (whiteList.includes(to.path)) {
    // 在免登录白名单，直接进入
    next();
  } else {
    // token 不存在
    if (!token) {
      next("login");
      localStorage.removeItem("userinfo");
    } else {
      if (userinfo) {
        // console.log(userinfo)
        store.commit("fetchUserinfo", JSON.parse(userinfo));
        next();
      } else {
        store.dispatch("fetchUserinfo").then(() => {
          next();
        });
      }
    }
  }
});

export default router;
