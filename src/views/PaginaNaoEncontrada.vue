<template>
  <div>
    <h1>Opsss... Página não encontrada</h1>
    <router-link :to="voltar"> Voltar para a Home </router-link>
    <p>{{ incremento }}</p>
  </div>
</template>

<script>
export default {
  name: "PaginaNaoEncontrada",
  data: () => ({
    voltar: "/",
    incremento: 5
  }),
  computed: {
    
  },
  mounted() {
    setTimeout(() => {
      this.$router.push(this.voltar)
      this.incremento()
    }, 5000);
    
      setInterval(() => {
        this.incremento = this.incremento--
      }, 1000); ///continuar aqui
    
  }
};
</script>
