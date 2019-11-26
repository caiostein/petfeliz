<template>
    <div id="verAbrigo">
        <ul class="collection with-header">
        <li class="collection-header">
            <h4>{{nome}}</h4>
        </li>
            <li class = "collection-item">Nome do Abrigo: {{nome}}</li>
            <li class = "collection-item">Email de contato: {{email}}</li>
            <li class = "collection-item">Telefone de contato: {{telefone}}</li>
            <li class = "collection-item">Endereço: {{endereco}}</li>  
            <li class="collection-item" v-if="media==0">Nota do Abrigo: Ainda não há notas </li>
	        <li class="collection-item" v-else>Nota do Abrigo: {{media}}</li>

            <div class = "avaliacao" v-if="usuarioEstaConfirmado">
                <button class="btn orange" @click="avaliarAbrigo(1)"> 1 Estrela</button>
                <button class="btn orange" @click="avaliarAbrigo(2)"> 2 Estrelas</button>
                <button class="btn blue" @click="avaliarAbrigo(3)"> 3 Estrelas</button>
                <button class="btn green" @click="avaliarAbrigo(4)"> 4 Estrelas</button>
                <button class="btn green" @click="avaliarAbrigo(5)"> 5 Estrelas</button>
	        </div>

            </ul>
            <div class="center-align">
            <br>
            <button @click="seguirAbrigo" class="btn blue">Seguir Abrigo</button></li>
            <br> <br>
             <router-link to ="/Seguidores" class="btn blue"> Visualizar Seguidores </router-link> <br> <br>
                <button class="btn waves-effect waves-light red" @click="deleteUser">Deletar Abrigo</button>
            </div>
        
        </div>
</template>


<script>
    import firebase from 'firebase'
    import db from '../components/firebaseInit'
    import Navbar from '@/components/Navbar'
    var treco = firebase.auth().currentUser


    export default {
        name:'profile',
        data(){
           return {
            nome:null,
            email:null,
            telefone:null,
            endereco:null,
			seguidores: [],
            media: 0,
	  		countAvaliacoes: null
           };
        },



      created(){
      var user = firebase.auth().currentUser
      db.collection('abrigo')
                    .doc(user.uid)
                    .get()
                    .then(snapshot => {
                        const document = snapshot.data()
                        this.nome = document.nome;
                        this.email = document.email;
                        this.telefone = document.telefone;
						this.endereco = document.endereco;
                        this.media = document.media;
                        this.countAvaliacoes = document.countAvaliacoes;
                        console.log(snapshot.data().nome)
                    })

                
            
            
        },

        methods:{
            deleteUser(){
                 if(confirm('Tem certeza?')){
                var user = firebase.auth().currentUser;
                var userEmail = firebase.auth().currentUser.email;
                user.delete().then((user) =>{
                    alert(`A conta de ${userEmail} foi excluída!`);
                    this.$router.replace('login')
                    location.reload();
                }).catch(function(error) {

                });
            }
            },

            seguirAbrigo(){
                if(confirm("Deseja seguir esse Abrigo?")){
                usuarioLogado = firebase.auth().currentUser
                
                if(usuarioLogado){
                    db.collection("abrigo")
                    .where("id_abrigo", "==", this.id_abrigo)
                    .get()
                    .then(querySnapshot => {
                        querySnapshot.forEach(doc => {
                            db.collection("abrigo").doc(this.id_abrigo).collection("seguidores").doc(usuarioLogado.uid).set({
                            emailSeguidor : usuarioLogado.email,
                            idSeguidor : usuarioLogado.uid
                            });
                        });
                    }).then(
                        db.collection("abrigo")
                        .where("id_abrigo", "==", this.id_abrigo)
                        .get()
                        .then(querySnapshot => {
                            querySnapshot.forEach(doc => {
                            this.id_abrigo = doc.data().id_abrigo;            
                            this.abrigoRealizador = doc.data().abrigoRealizador;
                            db.collection("usuario").doc(usuarioLogado.uid).collection("inscricoes").doc(this.id_abrigo).set({
                                nomeSeguido : this.abrigoRealizador,
                                idSeguido : this.id_abrigo
                            });
                            this.$router.push("../listaEventos");
                            });
                        })
                    )
                }
                }
            },

            

            avaliarAbrigo: function(nota){
                this.media = (this.media*this.countAvaliacoes+nota)/(this.countAvaliacoes+1)
                this.countAvaliacoes++;
                    
                db.collection('abrigo').where('email','==',this.email).get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        doc.ref.update({
                            media:this.media
                        })
                    })
                }) 	
                this.$forceUpdate();
                
                return this.media;
            },


        }
    }
</script>