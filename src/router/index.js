import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Clients.vue'
import Clients from '../views/Clients.vue'
import Products from '../views/Products.vue'
import Orders from '../views/Orders.vue'
import BankAccount from '../views/BankAccount.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/clients',
    name: 'Clients',
    component: Clients
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders
  },
  {
    path: '/bank-account',
    name: 'BankAccount',
    component: BankAccount
  },
  {
    path: '/products',
    name: 'Products',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Products
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
