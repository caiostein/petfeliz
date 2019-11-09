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
                    <input type="text" v-model="lat" required>
                    <label>Latitude do local do evento:</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <input type="text" v-model="long" required>
                    <label>Longitude do local do evento:</label>
                </div>
            </div>
             <div class="row">
                 <div class="input-field col s12">
            <select v-model="selected">
                <option value="" disabled selected>Escolha o Tipo</option>
                <option value="Adoção">Adoção</option>
                <option value="Recolhimento">Recolhimento</option>
            </select>
    <label>Tipo do Evento</label>
    
  </div>
    </div>
        <router-link to="/listaEventos" class="btn grey" style="margin-right: 10px">Cancel</router-link>
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
            abrigoRealizador: null,
            lat:null,
            long:null
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
                abrigoRealizador:  firebase.auth().currentUser.email,
                lat: this.lat,
                long: this.long

            })
            .then( 
                this.$router.push('/listaEventos')
            )
            .catch(error => {
                console.log(err)
            })
        }
    }
  
}
</script>

<style scoped>

</style>