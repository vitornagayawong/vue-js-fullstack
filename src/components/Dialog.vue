<template>
    <div>
        <v-dialog max-width="600px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on">
                 Register Client
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <h2>Register a new client</h2>
                </v-card-title>
                <v-form ref="form">
                    <v-text-field label="Name" class="px-3" prepend-icon="mdi-account" :rules="inputRules" v-model="name"></v-text-field>
                    <v-text-field label="Age" class="px-3" :rules="inputRules" v-model="age"></v-text-field>
                    <v-text-field label="Height" class="px-3" :rules="inputRules" v-model="height"></v-text-field>
                    <v-btn class="sucess" @click="submit">Add client</v-btn>
                </v-form>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>

export default {
    name: 'Dialog',
    data: () => ({
        name: '',
        age: '',
        height: '',
        inputRules: [
            v => (v && v.length >= 3) || 'Minimun length must be 3 caracters',
            x => x == x.toUpperCase() || 'Must be uppercase'
        ]
    }),
    methods: {
        submit() {
            if(this.$refs.form.validate()) {

                let newClient = {
                    nome: this.name,
                    idade: this.age,
                    altura: this.height
                }

                fetch('http://127.0.0.1:8000/api/clientes', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newClient)
                })
                    .then(response => response.JSON())
                    .then(data => {
                        alert(`Client registered sucessfully:` +  data)
                        this.name = '',
                        this.age = '',
                        this.height = ''
                        this.$refs.form.reset()
                    .catch(error => console.log(error))
            })               
            } else {                
                console.log('Fill the corrects fields!')
            }
        }
    }
}
</script>