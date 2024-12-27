<template>
    <div>
        <v-dialog transition="dialog-bottom-transition" max-width="600">
            <template v-slot:activator="{ on, attrs }">                
                <h1>Delete Client</h1>
                <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon >mdi-delete-circle</v-icon>
                </v-btn>                
                <v-btn @click="passandoPropProPai()">Click to pass a prop to the father</v-btn>
            </template>
            <template v-slot:default="dialog">
                <v-card>
                    <v-toolbar color="blue" >Are you sure you want to delete this client?</v-toolbar>
                    <v-card-text class="text-h2 pa-12"></v-card-text>
                    <v-card-actions>
                        <v-btn text @click="dialog.value=false">Cancel</v-btn>
                    </v-card-actions>
                    <v-btn @click="deleteClient">Delete!!!</v-btn>
                </v-card>                
            </template>
        </v-dialog>
        <br>
        <slot name="slotPaiProFilho">
            <p>mensagem default do slotPaiProFilho</p>
        </slot>
        <hr>
        <slot name="slotPaiProFilho2">
            <p>mensagem default do slotPaiProFilho2</p>
        </slot>
        <br>
        <hr>
        <slot>mensagem default do slot Padrão</slot>
    </div>
</template>

<script>
export default {
    name: 'DeleteClient',
    data: () => ({
        propriedadeFilho: 'PropriedadeFilho'
    }),
    methods: {
        deleteClient() {
            fetch(`http://127.0.0.1:8000/api/clientes/${this.idClient}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(this.client)
            })
                .then(response =>  response.json())
                .then(data => {
                    console.log(data)
                    alert('Client deleted sucessfully: ' + data.nome)
                })
        },
        passandoPropProPai() {
            //this.$emit('propDoFilho', this.propriedadeFilho) //primeira forma de passar prop do filho para o pai
            
            //usando callback
            this.$emit('propDoFilho', (parametro1, parametro2) => {
                console.log('prop do filho pro pai usando callback')
                console.log(parametro1)
                console.log(parametro2)
            }) 
        }
    },
    props: {
        idClient: {
            type: [ Number, String ],
            required: true,
            validator(p) {
                //console.log('prop no validator: ' + p)
                if(p < 10) return true
                else return false
            },
            default: 0
        },
        client: {
            type: Object
        }
    }
}
</script>