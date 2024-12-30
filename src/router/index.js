import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Clients.vue";
import Clients from "../views/Clients.vue";
import Products from "../views/Products.vue";
import Orders from "../views/Orders.vue";
import BankAccount from "../views/BankAccount.vue";
import Index from "../components/ClientsIndex/Index.vue";
import SonOfIndex from "../components/ClientsIndex/SonOfIndex.vue";
import SonOfIndex2 from "../components/ClientsIndex/SonOfIndex2.vue";
import ClientDetail from "../components/ClientDetail.vue";
import PaginaNaoEncontrada from "../views/PaginaNaoEncontrada.vue";
import ClientDetailUsingFiltersAndParams from "../components/ClientsIndex/ClientDetailUsingFiltersAndParams.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    alias: '/app',
    component: Home,
  },
  {
    path: "/clients",
    name: "Clients",
    component: Clients,
    children: [
      {
        path: "index",
        component: Index,
        children: [
          {
            path: "sonofindex",
            alias: '/soi',
            components: {
              default: SonOfIndex,
              SonOfIndex2: SonOfIndex2,
            },
          },
        ],
      },
      { path: "detail/:id", component: ClientDetail, name: "clientDetail" },
      { path: "filters", component: ClientDetailUsingFiltersAndParams, name: "clientDetailUsingFiltersAndParams" },
    ],
  },
  {
    path: "/orders",
    name: "Orders",
    component: Orders,
  },
  {
    path: "/bank-account",
    name: "BankAccount",
    component: BankAccount,
  },
  {
    path: "/products",
    name: "Products",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Products,
  },
  { path: '/redirecionamento', redirect: '/'}, //redirecionando rotas
  { path: '/redirecionamento2', redirect: { name: 'Home' } }, //redirecionando rotas
  { path: '/redirecionamento3', redirect: to => {
    console.log(to)

    return { name: 'Home' }
    }
  }, //redirecionando rotas
  //{ path: '*', redirect: '/' } //sintaxe vue 2
  { path: '*', component: PaginaNaoEncontrada } //sintaxe vue 2
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
