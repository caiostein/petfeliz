<template>
    <div id="novoAnimal">
        <h3>Novo Animal</h3>
        <div class="row">
        <form @submit.prevent="salvarAnimal" class="col s12">
            <div class="row">
                <div class="input-field col s12">
                <input type="text" v-model="id_animal" required>
                <label>ID do Animal:</label>
                </div>    
            </div>
             <div class="row">
                <div class="input-field col s12">
                <input type="text" v-model="nome" required>
                <label>Nome do Animal:</label>
                </div>    
            </div>
             <div class="row">
                <div class="input-field col s12">
                <input type="text" v-model="tipo" required>
                <label>Tipo do animal:</label>  
                </div>    
            </div>
             <div class="row">
                <div class="input-field col s12">
                <input type="text" v-model="raca" required>
                <label>Raça do Animal:</label>
                </div>    
            </div>
             <div class="row">
                <div class="input-field col s12">
                <input type="text" v-model="idade" required>
                <label>Idade do Animal:</label>
                </div>    
            </div>
             <div class="row">
                <div class="input-field col s12">
                <input type="text" v-model="foto" required>
                <label>Copie o Link de uma foto desse animal:</label>
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

    

export default{
    name: 'novoAnimal',
    data(){
        return {
            id_animal: null,
            nome:null,
            tipo:null,
            idade:null,
            raca:null,
            foto:null,
            abrigoDono: null
        }
    },
    methods: {
        salvarAnimal(){
            db.collection('animal').add({
                id_animal: this.id_animal,
                nome:this.nome,
                tipo:this.tipo,
                idade:this.idade,
                raca:this.raca,
                foto:this.foto,
                abrigoDono: firebase.auth().currentUser.email
            })
            .then(docRef=> {
                this.$router.push('/listaAnimais') 
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