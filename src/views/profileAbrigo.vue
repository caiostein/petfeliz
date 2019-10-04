<template>
  <div class="profile">
      <div id="profileUser">          
          <h1>Perfil do Abrigo {{nome}}</h1>          
          <ul class="collection with-header">
          <li class = "collection-item">Nome do Abrigo: {{nome}}</li>
          <li class = "collection-item">Email de contato: {{email}}</li>
          <li class = "collection-item">Telefone de contato: {{telefone}}</li>
          <li class = "collection-item">Endereço: {{endereco}}</li>  
</ul>
         <div class="center-align">
             <br><br>
          <button class="btn waves-effect waves-light red" @click="deleteUser">Deletar Abrigo</button>
      </div>
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
            endereco:null
           };
        },

        created(){
           if(firebase.auth().currentUser){
           db.collection('abrigo')
            .doc(treco.uid)
            .get()
            .then(snapshot => {
                const document = snapshot.data()
                this.nome = document.nome;
                this.email = document.email;
                this.telefone = document.telefone;
                this.endereco = document.endereco;
            })
        }},

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
            }


        }
    }
</script>