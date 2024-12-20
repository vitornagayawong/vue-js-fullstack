<template>
  <div>
    <h1 class="headline">Clients</h1>
    <v-container class="purple" mb-10>
      <v-row no-gutters>
        <v-col v-for="ca in clientAttributes" :key="ca.id">
          {{ ca }}
        </v-col>
      </v-row>
      <v-row v-for="client in clientsList" :key="client.id">
        <v-col>
          {{ client.id }}
        </v-col>
        <v-col>
          {{ client.nome }}
        </v-col>
        <v-col>
          {{ client.idade }}
        </v-col>
        <v-col>
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
        <v-text-field
          v-model="clientId"
          label="Id Client"
          required
        ></v-text-field>
        <v-btn @click="searchClientFromId">Search Client</v-btn>
      </v-form>
    </div>

    <v-form class="mt-10">
      <v-text-field label="Name" v-model="client.name" :rules="nameRules"></v-text-field>
      <v-text-field label="Age" v-model="client.age" :rules="ageRules"></v-text-field>
      <v-text-field label="Height" v-model="client.height" :rules="heightRules"></v-text-field>
      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
        Validate
      </v-btn>
      <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>
      <v-btn color="warning" class="mr-4" @click="update"> Update Client </v-btn>
    </v-form>
  </div>
</template>

<script>
import Dialog from "../components/Dialog.vue";

export default {
  name: "Clients",
  data: () => ({
    client: {
      name: '',
      age: '',
      height: ''
    },
    valid: true,
    clientId: "",
    clientIdRules: [
      (v) => !!v || "Required",
      (v) => (v && v.length >= 3) || "Min 3 characters",
    ],
    clientAttributes: ["id", "name", "age", "height"],
    clientsList: [],
    nameRules: [
      v => !!v || 'Required',
      v => v >= 3 || 'Min 3 characters'
    ], 
    ageRules: [
      v => !!v || 'Requried',
      v => v > 0 || 'Min age more then zero'
    ],
    heightRules: [
      v => !!v || 'Requried',
      v => v > 0 || 'height more then zero'
    ]
  }),
  components: {
    Dialog,
  },
  methods: {
    searchClients() {
      fetch("http://127.0.0.1:8000/api/clientes")
        .then((response) => response.json())
        .then((data) => {
          this.clientsList = data;
        })
        .catch((error) => console.log(error));
    },
    searchClientFromId() {
      if (this.clientId) {
        fetch(`http://127.0.0.1:8000/api/clientes/${this.clientId}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          })
          .catch((error) => console.log(error));
      } else {
        alert("Enter with a valid Id");
      }
    },
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    update() {

    }
  },
  created() {
    this.searchClients();
  },
};
</script>
