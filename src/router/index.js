import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Clients.vue";
//import Clients from "../views/Clients.vue";
import Products from "../views/Products.vue";
import Orders from "../views/Orders.vue";
import BankAccount from "../views/BankAccount.vue";
import Index from "../components/ClientsIndex/Index.vue";
import SonOfIndex from "../components/ClientsIndex/SonOfIndex.vue";
import SonOfIndex2 from "../components/ClientsIndex/SonOfIndex2.vue";
import ClientDetail from "../components/ClientDetail.vue";
import PaginaNaoEncontrada from "../views/PaginaNaoEncontrada.vue";
import ClientDetailUsingFiltersAndParams from "../components/ClientsIndex/ClientDetailUsingFiltersAndParams.vue";


//lazy loading
const Clients = () => import(/* webpackChunkName: "clients" */ '../views/Clients.vue')

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
    meta: { requertAutorizacao: true },
    children: [
      {
        path: "index",
        component: Index,
        beforeEnter: (to, from, next) => {
        //beforeEnter: () => {
          console.log('guarda de rota beforeEnter')
          next()
        },
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
    meta: { requertAutorizacao: false }
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
  //scrollBehavior(to, from, savedPosition) {
  scrollBehavior(to, from, savedPosition) {

    console.log('savedsavedPosition', savedPosition)

    if(savedPosition) {
      return savedPosition
    }

    if(to.hash) {
      return { el: to.hash }
    }
    
    return { left: 0,  top: 0 }
  }
});

router.beforeEach((to, from, next) => {
//router.beforeEach(() => {
  // if(to.meta.requertAutorizacao) {
  //   console.log('Validar o acesso')
  // } else {    
  //   console.log('Apenas seguir')
  // }
  // next()
  console.log('Guarda de rota global beforeEach')
  next()
})

//router.afterEach((to, from) => {
router.afterEach(() => {
    // console.log('Guarda de rota executada após a navegação')
    // console.log('Origem: ', from)
    // console.log('Destino: ', to)
    console.log('Guarda de rota global afterEach')
})

export default router;
