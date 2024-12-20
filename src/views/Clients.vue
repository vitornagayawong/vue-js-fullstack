<template>
  <div>
    <h1 class="headline ">Clients</h1>  
      <v-container class="purple" mb-10>
        <v-row no-gutters>
          <v-col v-for="ca in clientAttributes" :key="ca.id">
            {{ ca }}
          </v-col>
        </v-row>
        <v-row v-for="(client) in clientsList" :key="client.id">
          <v-col >
            {{ client.id }}
          </v-col>
          <v-col >
            {{ client.nome }}
          </v-col>
          <v-col >
            {{ client.idade }}
          </v-col>
          <v-col >
            {{ client.altura }}
          </v-col>
        </v-row>
      </v-container>

      <v-card class="mb-10">
        <v-card-title>Client</v-card-title>
        <v-card-subtitle>Insert a new client</v-card-subtitle>
        <Dialog></Dialog>        
      </v-card>

      <div>
        <h2 class="mt-4">Enter with the client Id</h2>
        <v-form>
          <v-text-field v-model="clientId" label="Id Client" required></v-text-field>
          <v-btn @click="searchClientFromId">Search Client</v-btn>
        </v-form>
      </div>

  </div>
</template>    

<script>

import Dialog from '../components/Dialog.vue';

export default {
  name: 'Clients',
  data: () => ({
    clientId: '',
    clientIdRules: [
      v => !!v || 'Required',
      v => (v && v.length >= 3 ) || 'Min 3 characters'
    ],
    clientAttributes: ['id', 'name', 'age', 'height'],
    clientsList: []
  }),
  components: {
    Dialog
  },
  methods: {
    searchClients() {
      fetch('http://127.0.0.1:8000/api/clientes')
        .then(response => response.json())
        .then(data => {
          this.clientsList = data
        })
        .catch(error => console.log(error))
    },
    searchClientFromId() {
      if(this.clientId) {
        fetch(`http://127.0.0.1:8000/api/clientes/${this.clientId}`)
        .then(response => response.json())
        .then(data => {
          console.log(data)
        })
        .catch(error => console.log(error))
      } else {
        alert('Enter with a valid Id')
      }
    }
  },
  created() {
    this.searchClients()
  }
}
</script>
