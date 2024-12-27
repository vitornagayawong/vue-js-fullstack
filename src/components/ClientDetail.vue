<template>
    <div>
        <br>
        Client DEtail de id {{ $route.params.id }}
        <br>
        <v-btn @click="searchClient()">Find client e show details</v-btn>
        {{ client }}
        <hr>
        <br>
        <hr>
        <br>
        <h2>Dados ClientWatch monitorando o $route</h2>
        <p>Nome cliente: {{ clientWatch.nome }}</p>
        <p>Idade cliente: {{ clientWatch.idade }}</p>
        <p>Altura cliente: {{ clientWatch.altura }}</p>
        <hr>
        <br>
        <h2>Dados ClientBeforeRouteUpdate</h2>
        <p>Nome cliente: {{ clientBeforeRouteUpdate.n }}</p>
        <p>Idade cliente: {{ clientBeforeRouteUpdate.i }}</p>
        <p>Altura cliente: {{ clientBeforeRouteUpdate.a }}</p>
    </div>
</template>

<script>
import MixinClients from '@/mixin'

export default {
    name: 'ClientDetail',
    data: () => ({
        client: {
            name: '',
            age: '',
            height: ''
        },
        clientWatch: {
            nome: '',
            idade: '',
            altura: ''
        },
        clientBeforeRouteUpdate: {
            n: '',
            i: '',
            a: ''
        }
    }),
    created() {
        console.log(this.$route)
    },
    mixins: [MixinClients],
    methods: {
    searchClient() {
      
        fetch(`http://127.0.0.1:8000/api/clientes/${this.$route.params.id}`)
          .then((response) => response.json())
          .then((data) => {
            console.log('oláaaa', data);
            if (data) {              
              this.client.name = data.nome;
              this.client.age = data.idade;
              this.client.height = data.altura;
            } 
          })
          .catch((error) => console.log(error));
      
    },
  },
  watch: {
    $route(to) {
        //console.log('hehehehe', to.params, from.params)
        fetch(`http://127.0.0.1:8000/api/clientes/${to.params.id}`)
          .then((response) => response.json())
          .then((data) => {
            if (data) {              
              this.clientWatch.nome = data.nome;
              this.clientWatch.idade = data.idade;
              this.clientWatch.altura = data.altura;
            } 
          })
          .catch((error) => console.log(error));
    }
  },
  beforeRouteUpdate(to, from , next) {
    if(to != undefined) {
        fetch(`http://127.0.0.1:8000/api/clientes/${to.params.id}`)
          .then((response) => response.json())
          .then((data) => {
            if (data) {              
              this.clientBeforeRouteUpdate.n = data.nome;
              this.clientBeforeRouteUpdate.i = data.idade;
              this.clientBeforeRouteUpdate.a = data.altura;
            } 
          })
          .catch((error) => console.log(error));
    }
    next()
  }
}
</script>