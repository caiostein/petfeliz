<template>
    <div id="listaEventos">         
         <ul class="collection with-header">
             <li class="collection-header"><h4>Eventos</h4></li>
             <li v-for="evento in eventos"
             v-bind:key="evento.id" class="collection-item">
            
                {{evento.nome}}

             <router-link class="secondary-content" v-bind:to="{name: 'verEvento', params:{id_abrigo: evento.id_abrigo}}">
                 <i class="fa fa-eye"></i>
             </router-link>
             </li>
        </ul>
         
        
     
     <div class="fixed-action-btn">
         <router-link to="/new" class = "btn-floating btn-large red">
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
    name: "listaEventos",
        data() {
            return {
                usuarioEstaLogado: false,
                usuarioLogado: false,
                eventos: [],
                segue: false
            }
        },
        created(){
            if(firebase.auth().currentUser){
                this.usuarioEstaLogado = true;
                this.usuarioLogado = firebase.auth().currentUser.email;
            }
            db.collection('eventos').orderBy('nome').get().then(querrySnapshot =>{
                querrySnapshot.forEach(doc => {
                   
                    const data = {
                        'id': doc.id,
                        'id_abrigo':doc.data().id_abrigo,
                        'nome':doc.data().nome,
                        'local':doc.data().local,
                        'tipo':doc.data().tipo,
                        'form': doc.data().form
                    }
                     if(doc.data().id_abrigo == db.collection('usuario').doc(firebase.auth().currentUser.uid).collection('inscricoes').doc(doc.data().id_abrigo).id_seguido){
                       vm.segue = true;
                    }
                    this.eventos.push(data)
                })
            })
        }
    

}
</script>

<style scoped>

</style>