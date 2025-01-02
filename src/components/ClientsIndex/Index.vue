<template>
  <div>
    <h1>V-DATA-TABLE 222222222222222222222</h1>
    <!-- <v-data-table
      dense
      :headers="headers"
      :items="clientsList"
      item-key="id"
      class="elevation-1"
    >
    </v-data-table> -->
    <br>
    <hr>
    <br>
    <router-view></router-view> <!-- default -->
    <router-view name="SonOfIndex2"></router-view>
  </div>
</template>

<script>
export default {
  name: "Index",
  data: () => ({
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
      },
    ],
  }),
  beforeRouteEnter(to, from, next) {
  //beforeRouteEnter() {
    console.log('Guarda de componente beforeRouteEnter')
    next()
  },
  beforeRouteLeave(to, from, next) {
    console.log('Guarda de componente beforeRouteLeave')
    next()
  }
};
</script>
    
