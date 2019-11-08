<template>
    <div id="listaEventos">         
           <br>
                      
         <ul class="collection with-header">
             <li class="collection-header">
                 <h4>Todos os Eventos</h4> 
                 <router-link to="/listaEventos" class="waves-effect waves-light btn-small disabled"
                  style="margin-right: 10px">Todos</router-link>
             <router-link to="/filtroAdocao" class="waves-effect waves-light btn-small"
                  style="margin-right: 10px">Adoção</router-link> <router-link to="/filtroRecolhimento" 
                  class="waves-effect waves-light btn-small">Recolhimento
                  </router-link>
             <li v-for="evento in eventos"
             v-bind:key="evento.id" class="collection-item">
             {{evento.nome}}

             <router-link class="secondary-content" v-bind:to="{name: 'verEvento', params:{id_abrigo: evento.id_abrigo}}">
                 <i class="fa fa-eye"></i>
             </router-link>
             </li>
        </ul>
     
        <div v-if="abrigoEstaLogado" class="fixed-action-btn">
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
                abrigoEstaLogado: false,
                eventos: []
            }
        },
        created(){
            if(firebase.auth().currentUser){
                this.usuarioEstaLogado = true;
                this.usuarioLogado = firebase.auth().currentUser.email;
            }
            
            var usersRef = db.collection('abrigo').doc(firebase.auth().currentUser.uid)
            if(firebase.auth().currentUser){
                usersRef.get().then((docSnapshot) => {
                    if(docSnapshot.exists) {
                        usersRef.onSnapshot((doc) => {
                            this.abrigoEstaLogado = true;
                        })
                    } else {
                            this.usuarioEstaLogado = true;
                    }
                })
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
                        'form': doc.data().form,
            
                    }
           
                    this.eventos.push(data)

                })
            })
        },
    

}
</script>

<style scoped>

</style>
