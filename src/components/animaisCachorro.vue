<template>
    <div id="listaAnimais">
           <br>
          <ul class="collection with-header">
             <li class="collection-header"><h4>Cachorros Registrados</h4> 
             <router-link to="/listaAnimais" class="waves-effect waves-light btn-small"
                  style="margin-right: 10px">Todos</router-link>
             <router-link to="/animaisCachorro" class="waves-effect waves-light btn-small disabled"
                  style="margin-right: 10px">Cachorros</router-link> <router-link to="/animaisGato" 
                  class="waves-effect waves-light btn-small" style="margin-right:10px">Gatos</router-link>
                  <router-link to="/animaisOutro" 
                  class="waves-effect waves-light btn-small" >Outros</router-link>
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

            firebase.auth().onAuthStateChanged((user) => {
                if(user){
                    db.collection('abrigo').doc(user.uid).collection('animal').where("tipo", "==", "Cachorro")
                        .get()
                        .then(querrySnapshot=>{
                            querrySnapshot.forEach(doc =>{
                                const data = {
                                    'id_animal' : doc.data().id_animal,
                                    'id': doc.id,
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
                }
            })

        },
    

}
</script>

<style scoped>

</style>