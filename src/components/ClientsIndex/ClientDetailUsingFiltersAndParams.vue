<template>
    <div>
        <br>
        <h1>Filtering Clients with Params</h1>
        <br><br><br>
        <v-card>
            <v-row>
                <v-col>
                    <span>Attributes Client</span><v-text-field v-model="onlyAttributesClient"></v-text-field>
                    <v-btn @click="attributesClient">Search</v-btn>
                    {{ clients }}
                </v-col>
                <v-col>
                    <span>Attributes Bank Account</span><v-text-field></v-text-field>
                </v-col>
                <v-col>
                    <span>Attributes Orders</span><v-text-field></v-text-field>
                </v-col>
            </v-row>
            
        </v-card>
        <br><br><br>
        
    </div>
</template>

<script>
export default {
    name: 'ClientDetailUsingFilterAndParams',
    data: () => ({
        urlDefault: 'http://127.0.0.1:8000/api/clientes',
        onlyAttributesClient: '',
        clients: []
    }),
    methods: {
        attributesClient() {
            fetch(`${this.urlDefault}?atributos_cliente=${this.onlyAttributesClient}`)
                .then(response => response.json())
                .then(data => {
                    if(data) {
                        let dataFormatada = JSON.stringify(data, null, 2)
                        this.clients = dataFormatada
                    }
                })
                .catch(error => console.log(error))            
        }
    }
}
</script>