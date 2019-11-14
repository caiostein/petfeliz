<template>
    <div class="profile">
        <div id="profileUser">          
            <h2>Perfil do Abrigo {{nome}}</h2>          
            <ul class="collection with-header">
                <li class = "collection-item">Nome do Abrigo: {{nome}}</li>
                <li class = "collection-item">Email de contato: {{email}}</li>
                <li class = "collection-item">Telefone de contato: {{telefone}}</li>
                <li class = "collection-item">Endereço: {{endereco}}</li>  
				<li class="collection-item" v-if="media==0">Nota do Abrigo: Ainda não há notas </li>
	  			<li class="collection-item" v-else>Nota do Abrigo: {{media}}</li>
            </ul>

			<div class = "avaliacao" v-if="usuarioEstaConfirmado">
				<button class="btn orange" @click="avaliarAbrigo(1)"> 1 Estrela</button>
				<button class="btn orange" @click="avaliarAbrigo(2)"> 2 Estrelas</button>
				<button class="btn blue" @click="avaliarAbrigo(3)"> 3 Estrelas</button>
				<button class="btn green" @click="avaliarAbrigo(4)"> 4 Estrelas</button>
				<button class="btn green" @click="avaliarAbrigo(5)"> 5 Estrelas</button>
			</div>
            <div class="center-align">
            <br>
             <router-link to ="/Seguidores" class="btn blue"> Visualizar Seguidores </router-link> <br> <br>
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
				
			avaliarEvento: function(nota){
				this.media = (this.media*this.countAvaliacoes+nota)/(this.countAvaliacoes+1)
				this.countAvaliacoes++;
				
				db.collection('eventos').where('nome','==',this.nome).get().then(querySnapshot => {
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