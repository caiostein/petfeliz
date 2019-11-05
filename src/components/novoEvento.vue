<template>
    <div id="novoEvento">
        <h3>Novo Evento</h3>
        <div class="row">
    <form @submit.prevent="salvarEvento" class="col s12">
                      
           
             <div class="row">
                <div class="input-field col s12">
                <input type="text" v-model="nome" required>
                <label>Nome do Evento:</label>
                </div>    
            </div>
             <div class="row">
                <div class="input-field col s12">
                <input type="text" v-model="descricao" required>
                <label>Descrição do Evento:</label>
                </div>    
            </div>
             <div class="row">
                <div class="input-field col s12">
                <input type="text" v-model="local" required>
                <label>Local do Evento:</label>
                </div>    
            </div>
             <div class="row">
                <div class="input-field col s12">
                <input type="text" v-model="data" required>
                <label>Data da realização do Evento:</label>
                </div>    
            </div>
             <div class="row">
                <div class="input-field col s12">
                <input type="text" v-model="horario" required>
                <label>Horário de início do Evento:</label>
                </div>    
            </div>
             <div class="row">
                   
                 <div class="input-field col s12">
            <select v-model="selected">
                <option value="" disabled selected>Escolha o tipo</option>
                <option value="Adoção">Adoção</option>
                <option value="Recolhimento">Recolhimento</option>
            </select>
    <label>Tipo do Evento</label>
    
  </div>
    </div>
        <router-link to="/" class="btn grey">Cancel</router-link>
        <button type="submit" class="btn">Submit</button>           
    </form>
            
        </div>
    </div>
    
</template>

<script>
    import db from './firebaseInit'
    import firebase from 'firebase'


  $(document).ready(function(){
    $('select').formSelect();
  });
    

export default{
    name: 'novoEvento',
    data(){
        return {
            selected: '',
            id_abrigo: null,
            nome:null,
            descricao:null,
            local:null,
            data:null,
            horario:null,
            tipo:null,
            abrigoRealizador: null
        }
    },

    created() {
       $(document).ready(function(){
    $('select').formSelect();
  });
    },


    methods: {
        salvarEvento(){
            db.collection('eventos').add({
                id_abrigo: firebase.auth().currentUser.uid,
                nome: this.nome,
                descricao: this.descricao,
                local: this.local,
                data: this.data,
                horario: this.horario,
                tipo: this.selected,
                abrigoRealizador:  firebase.auth().currentUser.email

            })
            .then(docRef=> {
                this.$router.push('/listaEventos')
            })
            .catch(error => {
                console.log(err)
            })
        }
    }
  
}
</script>

<style scoped>

</style>