<template>
  <div>
    <h1>{{ $store.state.titulo }}</h1>
    <h2 :class="propComputadaLocal">{{ tituloCustomizado }} junto com prop computada local</h2>
    <br>
    <ul>
      <li>Nome do cliente Vuex: {{ nomeClienteVuex }}</li>
      <li>Altura do cliente Vuex: {{ alturaClienteVuex }}</li>
      <li>idade do cliente Vuex: {{ idadeClienteVuex }}</li>
    </ul>
    <br><br>
    <h2>Total de clientes fictícios do vuex: {{ $store.getters.totalClientesFicitios }}</h2>
    <br>
    <br>
    <h2>Total de clientes fictícios do vuex com mais de 1 (getters aninhadas): {{ $store.getters.totalClientesFicitiosMaisUm }}</h2>
    <br>
    <p v-if="cumprimentar"> oiiiiiiiiiiiiiiiiiiiiiiiiiii</p>
    <p v-else>tchauu</p>

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
        <v-col>
          <v-btn >
            <!-- <router-link :to="`/clients/detail/${client.id}`"> --> <!--primeira forma de fazer-->
            <router-link :to="{ name: 'clientDetail', params: { id: client.id } }"> <!--segunda forma de fazer-->
              <v-icon>mdi-account-details-outline</v-icon>              
            </router-link>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <br>
    <h1>V-DATA-TABLE 1111111111111111</h1>
    <v-data-table
      dense
      :headers="headers"
      :items="clientsList"
      item-key="id"
      class="elevation-1"
    >
    </v-data-table>
    <br>
    <br>

    <v-card class="mb-10">
      <v-card-title>Client</v-card-title>
      <v-card-subtitle>Insert a new client</v-card-subtitle>
      <Dialog></Dialog>
    </v-card>

    <div>
      <h2 class="mt-4" id="client_id_input">Enter with the client Id</h2>
      <v-form>
        <v-text-field
          v-model="clientId"
          label="Id Client"
          required
        ></v-text-field>
        <v-btn @click="searchClientFromId">Search Client</v-btn>
        <v-card v-if="clientFound" v-model="client">
          <v-card-title>Client data</v-card-title>
          <p>Name: {{ client.name }}</p>
          <p>Age: {{ client.age }}</p>
          <p>Height: {{ client.height }}</p>
        </v-card>
        <p v-else>Client not found</p>
      </v-form>
    </div>

    <v-form class="mt-10" ref="form">
      <h4>Update</h4>
      <v-text-field
        label="Name"
        v-model="client.name"
        :rules="nameRules"
      ></v-text-field>
      <v-text-field
        label="Age"
        v-model="client.age"
        :rules="ageRules"
      ></v-text-field>
      <v-text-field
        label="Height"
        v-model="client.height"
        :rules="heightRules"
      ></v-text-field>
      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
        Validate
      </v-btn>
      <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>
      <v-btn color="warning" class="mr-4" @click="update">
        Update Client
      </v-btn>
    </v-form>

    <br /><br />
    <!--prop do filho pro pai sem usar callback-->
    <!-- <delete-client :idClient="clientId" @propDoFilho="recebendoPropDoFilho($event)"></delete-client> -->

    <delete-client 
      :idClient="clientId" 
      @propDoFilho="$event('parametro1', 200)"
      :client="client"
    >
      
      <template v-slot:slotPaiProFilho><p><br>Passando html pro componente filho hehehe</p></template>
      
      <p>Segundo SLOT PADRÃO dentro de um p</p>

      <template v-slot:slotPaiProFilho2><p>Passando html pro componente filho pela segunda vez hahaha</p></template>

      <h3 id="primeiro_slot">Primeiro SLOT PADRÃO dentro de um h3</h3>
    </delete-client>
    <br><br>
    <v-btn @click="navegarParaOrdersPush">Ir para Orders usando $router.push()</v-btn>
    <v-btn @click="navegarParaOrdersReplace">Ir para Orders usando $router.replace()</v-btn>
    <v-btn @click="navegarParaOrdersForward">Ir para Orders usando $router.forward()</v-btn>
    <v-btn @click="navegarParaOrdersBack">Ir para Orders usando $router.back()</v-btn>
    <v-btn @click="navegarParaOrdersGo">Ir para Orders usando $router.go()</v-btn>
    <br>
    <br>
    <hr>

    <router-view></router-view>

    <hr>
    <br>
    <br>

    <h2>Usando Router Link diretamente botando parâmetros na pesquisa</h2>
      <router-link :to="{ name: 'Clients', query: { atributos_clientes: this.clientId } }">
        Puxando clientes pelo Id somente
      </router-link>
      <br>
      <router-link to="/clients?atributos_cliente=id">
        Puxando clientes pelo Id somente
        <br><br>
       {{ clientsList }}
      </router-link>    
  </div>
</template>

<script>
import { mapState } from "vuex/dist/vuex.common.js";
import DeleteClient from "../components/DeleteClient.vue";
import Dialog from "../components/Dialog.vue";
import MixinClients from '@/mixin';

export default {
  name: "Clients",
  mixins: [MixinClients],
  data: () => ({
    cumprimentar: true,
    headers: [
      {
        text: "Id",
        align: "start",
        sortable: false,
        value: "id",
      },
      {
        text: "Name",
        value: "nome",
      },
      {
        text: "Age",
        value: "idade",
      },
      {
        text: "Height",
        value: "altura",
      }
    ],
    clientFound: false,
    client: {
      name: "",
      age: "",
      height: "",
    },
    valid: true,
    clientId: "",
    clientIdRules: [
      (v) => !!v || "Required",
      (v) => (v && v.length >= 3) || "Min 3 characters",
    ],
    clientAttributes: ["id", "name", "age", "height", "details"],
    clientsList: [],
    nameRules: [
      (v) => !!v || "Required",
      (v) => (v && v.length) >= 3 || "Min 3 characters",
    ],
    ageRules: [
      (v) => !!v || "Requried",
      (v) => v > 0 || "Min age more then zero",
    ],
    heightRules: [
      (v) => !!v || "Requried",
      (v) => v > 0 || "height more then zero",
    ],
  }),
  components: {
    Dialog,
    DeleteClient,
  },
  methods: {
    navegarParaOrdersPush() {
      this.$router.push('/orders')
    },
    navegarParaOrdersReplace() {
      this.$router.replace('/orders')
    },
    navegarParaOrdersForward() {
      this.$router.forward('/orders')
    },
    navegarParaOrdersBack() {
      this.$router.back('/orders')
    },
    navegarParaOrdersGo() {
      this.$router.go(2)
    },
    searchClients() {
      fetch("http://127.0.0.1:8000/api/clientes")
        .then((response) => response.json())
        .then((data) => {
          this.clientsList = data;
        })
        .catch((error) => console.log(error));
    },
    // searchClientFromId() {
    //   if (this.clientId) {
    //     fetch(`http://127.0.0.1:8000/api/clientes/${this.clientId}`)
    //       .then((response) => response.json())
    //       .then((data) => {
    //         console.log(data);
    //         if (data) {
    //           this.clientFound = true;
    //           this.client.name = data.nome;
    //           this.client.age = data.idade;
    //           this.client.height = data.altura;
    //         } else {
    //           this.clientFound = false;
    //         }
    //       })
    //       .catch((error) => console.log(error));
    //   } else {
    //     alert("Enter with a valid Id");
    //   }
    // },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    update() {
      if (this.$refs.form.validate()) {
        let newClient = {
          nome: this.client.name,
          idade: this.client.age,
          altura: this.client.height,
        };

        fetch(`http://127.0.0.1:8000/api/clientes/${this.clientId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json " },
          body: JSON.stringify(newClient),
        })
          .then((response) => response.json())
          .then(
            (data) => alert("Client updated sucessfully: " + data),
            (this.client.name = ""),
            (this.client.age = ""),
            (this.client.altura = ""),
            this.$refs.form.reset()
          )
          .catch((error) => console.log(error));
      }
    },
    recebendoPropDoFilho(propDoFilho) {
      console.log(propDoFilho);
    },
    passandoParametroProGetterDoVuex() {
      return this.$store.getters.totalClientesFicitios
    }
  },
  computed: {
    ...mapState({ //precisa usar o ... (spread operator para que o computed possa ter outros métodos nada a ver com o vuex)
      nomeClienteVuex: state => state.cliente.nome,
      idadeClienteVuex: state => state.cliente.idade,
      alturaClienteVuex: state => state.cliente.altura,
      //método computado normal, sem ser vuex
      tituloCustomizado() { 
        return `<-- ${this.$store.state.titulo} Customizado -->`
      }
    }),
    propComputadaLocal() {
      return 'red'
    }
  },
  created() {
    this.searchClients();
  },
  watch: {
    clientFound(novo, velho) {
      console.log('testando o watch :',novo, velho)
    }
  },
  beforeRouteUpdate(to, from, next) {
    const queryParams = new URLSearchParams(to.query).toString()
    console.log(queryParams)
    fetch(`http://127.0.0.1:8000/api/clientes?${queryParams}`)
          .then((response) => response.json())
          .then(            
            data => this.clientsList = data  //deu certo
          )
          .catch((error) => console.log(error));
    next()
  }
};
</script>
