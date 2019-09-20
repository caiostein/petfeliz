<template>
    <div id="editarAnimal">
        <h3>Editar Animal</h3>
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
                <input type="text" v-model="tipo" required>
                </div>    
            </div>
             <div class="row">
                <div class="input-field col s12">
                <input type="text" v-model="idade" required>
                </div>    
            </div>
            <div class="row">
                <div class="input-field col s12">
                <input type="url" v-model="raca" required>
                </div>    
            </div>
            <div class="row">
                <div class="input-field col s12">
                <input type="url" v-model="foto" required>
                </div>    
            </div>

             <router-link to="../listaEventos" class="btn grey">Cancelar</router-link>
            <button type="submit" class="btn">Confirmar</button>           
            </form>
        </div>
    </div>
</template>

<script>
    import db from './firebaseInit'
    export default{
    name: 'editarAnimal',
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
    beforeRouteEnter(to, from, next){
        db.collection('animal').where('id_animal','==',to.params.id_animal).get().then(querySnapshot =>{
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
    methods: {
        fetchData(){
            db.collection('animal').where('id_animal','==',this.$route.params.id_animaç).get().then(querySnapshot => {
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
            db.collection('animal').where('id_animal','==',this.$route.params.id_animal).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
               doc.ref.update({
                    id_animal: this.id_animal,
                    nome:this.nome,
                    tipo:this.tipo,
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