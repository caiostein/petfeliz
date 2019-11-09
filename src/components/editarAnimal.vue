<template>
    <div id="editarAnimal">
        <h3>Editando Informações de {{nome}} <img class ="circle" width = "100" style="vertical-align:middle" :src=foto></h3>
        <div class="row">
        <form @submit.prevent="updateAnimal" class="col s12">
            
            <div class="row">
                <div class="input-field col s12">
                <input disabled type="text" v-model="id_animal" required>
                </div>    
            </div>
             <div class="row">
                <div class="input-field col s12">
                <input type="text" v-model="nome" required>
                </div>    
            </div>
             <div class="row">
                <div class="input-field col s12">
            <select v-model="selected">
                <option value="" disabled selected>Escolha o Tipo</option>
                <option value="Cachorro">Cachorro</option>
                <option value="Gato">Gato</option>                
                <option value="Outro">Outro</option>
            </select>
    <label>Tipo do Animal</label>
            </div>   
            </div>
             <div class="row">
                <div class="input-field col s12">
                <input type="text" v-model="idade" required>
                </div>    
            </div>
            <div class="row">
                <div class="input-field col s12">
                <input type="text" v-model="raca" required>
                </div>    
            </div>
            <div class="row">
                <div class="input-field col s12">
                <input type="url" v-model="foto" required>                
                </div>    
            </div>

             <router-link to="../listaAnimais" class="btn grey" style ="margin-right: 10px">Cancelar</router-link>
            <button type="submit" class="btn">Confirmar</button>           
            </form>
        </div>
    </div>
</template>

<script>
    import db from './firebaseInit'
    import firebase from'firebase'

    $(document).ready(function(){
    $('select').formSelect();
  });

    export default{
    name: 'editarAnimal',
    data(){
       return {
           selected: '',
            id_animal: null,
            nome:null,
            tipo:null,
            idade:null,
            raca:null,
            foto:null,
            abrigoDono: null
        }
    },
    beforeRouteEnter(to, from, next){
        var user = firebase.auth().currentUser
        db.collection('abrigo').doc(user.uid).collection('animal').where('id_animal','==',to.params.id_animal).get().then(querySnapshot =>{
            querySnapshot.forEach(doc => {
                next(vm => {
                    vm.id_animal = doc.data().id_animal;
                    vm.nome = doc.data().nome;
                    vm.tipo = doc.data().tipo;
                    vm.idade = doc.data().idade;
                    vm.raca = doc.data().raca;
                    vm.foto = doc.data().foto;
                    vm.abrigoDono = doc.data().abrigoDono;
                })
            })
        })
    },
    watch:{
        '$route': 'fetchData'
    },

    created(){
        $(document).ready(function(){
    $('select').formSelect();
  })
    },

    methods: {
        fetchData(){
             var user = firebase.auth().currentUser
            db.collection('abrigo').doc(user.uid).collection('animal').where('id_animal','==',this.$route.params.id_animal).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                this.id_animal = doc.data().id_animal;
                this.nome = doc.data().nome;
                this.tipo = doc.data().tipo;
                this.idade = doc.data().idade;
                this.raca = doc.data().raca;
                this.foto = doc.data().foto;
                this.abrigoDono = doc.data().abrigoDono;
            })
            })
        },
        updateAnimal(){
             var user = firebase.auth().currentUser
            db.collection('abrigo').doc(user.uid).collection('animal').where('id_animal','==',this.$route.params.id_animal).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
               doc.ref.update({
                    id_animal: this.id_animal,
                    nome:this.nome,
                    tipo:this.selected,
                    idade:this.idade,
                    raca:this.raca,
                    foto:this.foto,
                    abrigoDono:  firebase.auth().currentUser.email
               })
               .then(
                   () =>
                   this.$router.push({name: 'verAnimal', params: {id_animal:this.id_animal}})
               )
            })
            })
        }
    
    }
  
}
</script>

<style scoped>

</style>