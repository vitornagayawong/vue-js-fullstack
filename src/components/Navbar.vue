<template>
  <div>
    <v-toolbar>
            
      <v-spacer></v-spacer>
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
    ],
    right: null,
  }),
  methods: {},
  computed: {},
  components: {}
};
</script>

<style>
</style>