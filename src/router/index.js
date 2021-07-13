import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import TodoList from '../views/TodoList.vue'
import Registration from "../views/Registration.vue";
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";
import page_404 from "../views/page_404.vue";

const routes = [
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/registration",
    name: "Registration",
    component: Registration,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/todo",
    name: "TodoList",
    component: TodoList,
    meta:{
      is_user_auth:false
    }
  },
  {
    path: "/:notFound?",
    name: "404",
    component: page_404,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
 
export default router
