<template>
    <div id="listaAnimais">         
        <ul class="collection with-header">
            <li class="collection-header"><h4>Animais Registrados:</h4></li>
            <li v-for="animal in animal"
            v-bind:key="animal.id" class="collection-item">
            {{animal.nome}}
            <router-link class="secondary-content" v-bind:to="{name: 'verAnimal', params:{id_animal: animal.id_animal}}">
                 <i class="fa fa-eye"></i>
             </router-link>
            </li>
        </ul>
         
        
         <div class="fixed-action-btn">
            <router-link to="/newAnimal" class = "btn-floating btn-large red">
            <i class="fa fa-plus"></i>
            </router-link>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase'
    import Navbar from './Navbar'
    import db from './firebaseInit'

   
export default{
    name: "listaAnimais",
        data() {
            return {
                usuarioEstaLogado: false,
                usuarioLogado: false,
                animal: []
            }
        },

       

        created(){
            if(firebase.auth().currentUser){
                this.usuarioEstaLogado = true;
                this.usuarioLogado = firebase.auth().currentUser.email;
            }
            db.collection('animal').orderBy('nome').get().then(querrySnapshot =>{
                querrySnapshot.forEach(doc => {
                    const data = {
                        'id': doc.id,
                        'id_animal':doc.data().id_animal,
                        'nome':doc.data().nome,
                        'tipo':doc.data().tipo,
                        'raca':doc.data().raca,
                        'idade': doc.data().idade,
                        'foto': doc.data().foto,
                        'abrigoDono': doc.data().abrigoDono
                    }
                    this.animal.push(data)
                })
            })
        },
    

}
</script>

<style scoped>

</style>