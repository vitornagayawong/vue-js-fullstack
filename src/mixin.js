export default {
  data: () => ({
    client: {
        name: "",
        age: "",
        height: "",
      },
  }),
  name: 'MixinClients',
  methods: {
    searchClientFromId() {
      if (this.clientId) {
        fetch(`http://127.0.0.1:8000/api/clientes/${this.clientId}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (data) {
              this.clientFound = true;
              this.client.name = data.nome;
              this.client.age = data.idade;
              this.client.height = data.altura;
            } else {
              this.clientFound = false;
            }
          })
          .catch((error) => console.log(error));
      } else {
        alert("Enter with a valid Id");
      }
    },
  },
};
