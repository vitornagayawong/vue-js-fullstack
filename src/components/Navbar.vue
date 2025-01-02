<template>
  <div>
    <v-toolbar>
            
      <v-spacer></v-spacer>
      <router-link :to="{ name: 'Clients' }" class="mr-10">
        Clients
      </router-link>
      <router-link :to="{ path: '/clients/index', hash: '#primeiro_slot' }" class="mr-10">
        Clients Index
      </router-link>
      <router-link :to="{ path: '/clients/index/sonofindex' }" class="mr-10">
        Clients Index Son
      </router-link>
      <router-link :to="{ path: '/orders' }" class="mr-10">
        Orders
      </router-link>
      <router-link :to="{ name: 'BankAccount' }" class="mr-10">
        BankAccount
      </router-link>
      <router-link :to="{ path: '/products' }" class="mr-10">
        Products
      </router-link>
      <router-link :to="{ path: '/clients/filters' }" class="mr-10">
        Client with Filters
      </router-link>
      <v-btn text color="grey">
        <span>Sign Out</span>
        <v-icon right>mdi-logout</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer app color="light-blue" permanent>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> Application </v-list-item-title>
          <v-list-item-subtitle> subtext </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.route">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <!-- <v-list>
        <v-list tile>
          <v-list-item-content>
            <v-btn>
              <v-icon @click="drawer = !drawer">mdi-package-down</v-icon>
            </v-btn>
            <v-list-item-action>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-action>
            <v-list-item-title class="white--text">
              Dashboard
            </v-list-item-title>
          </v-list-item-content>
        </v-list>
      </v-list> -->
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data: () => ({   
    items: [
      { title: "Clientes", icon: "mdi-account-details", route: '/clients' },
      { title: "Conta Bancária", icon: "mdi-bank", route: '/bank-account' },
      { title: "Pedidos", icon: "mdi-truck", route: '/orders' },
      { title: "Produtos", icon: "mdi-shopping", route: '/products' },
      { title: "Clients Filters", icon: "mdi-account-details", route: '/clientsFilters' },
    ],
    right: null,
  }),
  methods: {},
  computed: {},
  components: {}
};
</script>

<style scoped>
.router-link-active {
  color: white;
  background-color: rgb(105, 168, 189);
  border-color: green;
  } 
.router-link-exact-active {
  color: white;
  background-color: blue;
  border-color: green;
  padding: 5px;
}
</style>