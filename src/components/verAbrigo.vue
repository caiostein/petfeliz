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
	      
            <li class="collection-item" v-if="media>=0 && media<0.5">
                <p>Nota do Abrigo:</p>
                <i class="small material-icons yellow-text" > star_border </i>
                <i class="small material-icons yellow-text"> star_border </i>
                <i class="small material-icons yellow-text"> star_border </i>
                <i class="small material-icons yellow-text"> star_border </i>
                <i class="small material-icons yellow-text"> star_border </i></li>

                 <li class="collection-item" v-else-if="media>=0.5 && media<1">
                <p>Nota do Abrigo:</p>
                <i class="small material-icons yellow-text"> star_half </i>
                <i class="small material-icons yellow-text"> star_border </i>
                <i class="small material-icons yellow-text"> star_border </i>
                <i class="small material-icons yellow-text"> star_border </i>
                <i class="small material-icons yellow-text"> star_border </i></li>

                <li class="collection-item" v-else-if="media>=1 && media<1.5">
                <p>Nota do Abrigo:</p>
                <i class="small material-icons yellow-text"> star </i>
                <i class="small material-icons yellow-text"> star_border </i>
                <i class="small material-icons yellow-text"> star_border </i>
                <i class="small material-icons yellow-text"> star_border </i>
                <i class="small material-icons yellow-text"> star_border </i></li>

                <li class="collection-item" v-else-if="media>=1.5 && media<2">                
                <p>Nota do Abrigo:</p>
                <i class="small material-icons yellow-text"> star </i>
                <i class="small material-icons yellow-text"> star_half </i>
                <i class="small material-icons yellow-text"> star_border </i>
                <i class="small material-icons yellow-text"> star_border </i>
                <i class="small material-icons yellow-text"> star_border </i></li>

                <li class="collection-item" v-else-if="media>=2 && media<2.5">
                <p>Nota do Abrigo:</p>
                <i class="small material-icons yellow-text"> star </i>
                <i class="small material-icons yellow-text"> star </i>
                <i class="small material-icons yellow-text"> star_border </i>
                <i class="small material-icons yellow-text"> star_border </i>
                <i class="small material-icons yellow-text"> star_border </i></li>

                <li class="collection-item" v-else-if="media>=2.5 && media<3">
                <p>Nota do Abrigo:</p>
                <i class="small material-icons yellow-text"> star </i>
                <i class="small material-icons yellow-text"> star </i>
                <i class="small material-icons yellow-text"> star_half </i>
                <i class="small material-icons yellow-text"> star_border </i>
                <i class="small material-icons yellow-text"> star_border </i></li>

                <li class="collection-item" v-else-if="media>=3 && media<3.5">
                <p>Nota do Abrigo:</p>
                <i class="small material-icons yellow-text"> star </i>
                <i class="small material-icons yellow-text"> star </i>
                <i class="small material-icons yellow-text"> star </i>
                <i class="small material-icons yellow-text"> star_border </i>
                <i class="small material-icons yellow-text"> star_border </i></li>

                <li class="collection-item" v-else-if="media>=3.5 && media<4">
                <p>Nota do Abrigo:</p>
                <i class="small material-icons yellow-text"> star </i>
                <i class="small material-icons yellow-text"> star </i>
                <i class="small material-icons yellow-text"> star </i>
                <i class="small material-icons yellow-text"> star_half </i>
                <i class="small material-icons yellow-text"> star_border </i></li>

                <li class="collection-item" v-else-if="media>=4 && media<4.5">
                <p>Nota do Abrigo:</p>
                <i class="small material-icons yellow-text"> star </i>
                <i class="small material-icons yellow-text"> star </i>
                <i class="small material-icons yellow-text"> star </i>
                <i class="small material-icons yellow-text"> star </i>
                <i class="small material-icons yellow-text"> star_border </i></li>

                <li class="collection-item" v-else-if="media>=4.5 && media<5">
                <p>Nota do Abrigo:</p>
                <i class="small material-icons yellow-text"> star </i>
                <i class="small material-icons yellow-text"> star </i>
                <i class="small material-icons yellow-text"> star </i>
                <i class="small material-icons yellow-text"> star </i>
                <i class="small material-icons yellow-text"> star_half </i></li>

                <li class="collection-item" v-else-if="media>=5">
                <p>Nota do Abrigo:</p>
                <i class="small material-icons yellow-text"> star </i>
                <i class="small material-icons yellow-text"> star </i>
                <i class="small material-icons yellow-text"> star </i>
                <i class="small material-icons yellow-text"> star </i>
                <i class="small material-icons yellow-text"> star </i></li>

                <li v-if="!voted" class="collection-item">                 
                <h4> Avalie o Abrigo! </h4>               
                <button class="red waves-effect waves-light btn-large" style="margin:10px" @click="avaliarAbrigo(1)">
                    <i class="large material-icons"> star </i></button>
                <button class="btn-large orange" style="margin:10px" @click="avaliarAbrigo(2)"> 
                    <i class="small material-icons"> star </i>
                    <i class="small material-icons"> star </i></button>
                <button class="btn-large yellow" style="margin:10px" @click="avaliarAbrigo(3)"> 
                    <i class="small material-icons"> star </i>
                    <i class="small material-icons"> star </i>
                    <i class="small material-icons"> star </i></button>
                <button class="btn-large blue" style="margin:10px" @click="avaliarAbrigo(4)">
                    <i class="small material-icons"> star </i>
                    <i class="small material-icons"> star </i>
                    <i class="small material-icons"> star </i>
                    <i class="small material-icons"> star </i></button>
                <button class="btn-large green" style="margin:10px" @click="avaliarAbrigo(5)">
                    <i class="small material-icons"> star </i>
                    <i class="small material-icons"> star </i>
                    <i class="small material-icons"> star </i>
                    <i class="small material-icons"> star </i>
                    <i class="small material-icons"> star </i></button>
                </li>
                <li class="collection-item" v-else>
                    <h4> Obrigado pelo voto! </h4>
                    <button class="btn-large orange disabled" style="margin:10px" @click="avaliarAbrigo(1)">
                    <i class="large material-icons"> star </i></button>
                <button class="btn-large orange disabled" style="margin:10px" @click="avaliarAbrigo(2)"> 
                    <i class="small material-icons"> star </i>
                    <i class="small material-icons"> star </i></button>
                <button class="btn-large blue disabled" style="margin:10px" @click="avaliarAbrigo(3)"> 
                    <i class="small material-icons"> star </i>
                    <i class="small material-icons"> star </i>
                    <i class="small material-icons"> star </i></button>
                <button class="btn-large green disabled" style="margin:10px" @click="avaliarAbrigo(4)">
                    <i class="small material-icons"> star </i>
                    <i class="small material-icons"> star </i>
                    <i class="small material-icons"> star </i>
                    <i class="small material-icons"> star </i></button>
                <button class="btn-large green disabled" style="margin:10px" @click="avaliarAbrigo(5)">
                    <i class="small material-icons"> star </i>
                    <i class="small material-icons"> star </i>
                    <i class="small material-icons"> star </i>
                    <i class="small material-icons"> star </i>
                    <i class="small material-icons"> star </i></button>
                </li>
                
            </ul>
            <div class="center-align">
            <br>
            <button @click="seguirAbrigo" class="btn blue">Seguir Abrigo</button>
            <br> <br>
            </div>
        
        </div>
</template>


<script>
    import firebase from 'firebase'
    import db from '../components/firebaseInit'
    import Navbar from '@/components/Navbar'
    var treco = firebase.auth().currentUser

    $(document).ready(function(){
    $('select').formSelect();
  });

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
            countAvaliacoes: null,
            id_abrigo: null,
            voted:null
           };
        },

        

 beforeRouteEnter(to, from, next) {
    db.collection("abrigo")
      .where("id_abrigo", "==", to.params.id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.nome = doc.data().nome;
            vm.telefone = doc.data().telefone;
            vm.endereco = doc.data().endereco;
            vm.media = doc.data().media;
            vm.countAvaliacoes = doc.data().countAvaliacoes;
            vm.email = doc.data().email;     
            
            

          });
        });
      }
      
      );
      
        
  },

watch: {
    $route: "fetchData"
    
  },

  created() {
       $(document).ready(function(){
    $('select').formSelect();
  });
    
    firebase.auth().onAuthStateChanged((user) => {
      
        console.log(this.nome)
      if(user){
        
        db.collection("usuario").doc(firebase.auth().currentUser.uid).collection("votosAbrigo")
        .where("nomeAbrigo", "==", this.nome)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {               
          if(doc.exists){ 
            console.log("Usuario Já Votou")
              this.voted = true;
          }
        });
          
              })


            
      }
    })


    },

        methods:{

            fetchData() {
      db.collection("abrigo")
        .where("id_abrigo", "==", this.$route.params.id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.nome = doc.data().nome;
            this.telefone = doc.data().telefone;
            this.endereco = doc.data().endereco;
            this.media = doc.data().media;
            this.countAvaliacoes = doc.data().countAvaliacoes;
            this.email = doc.data().email;
          });
        });
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
                this.voted = true;
                
                    
                db.collection('abrigo').where('email','==',this.email).get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        doc.ref.update({
                            media:this.media,
                            countAvaliacoes:this.countAvaliacoes
                        })
                    })
                }) 	
                console.log(this.nome)
                db.collection("abrigo")
        .where("nome", "==", this.nome)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {    
              db.collection("usuario").doc(firebase.auth().currentUser.uid).collection("votosAbrigo").doc(doc.id).set({
                voto: nota,
                nomeAbrigo : this.nome
                });
            
        });
              })
                this.$forceUpdate();
                
                return this.media;
            },


        }
    }
</script>