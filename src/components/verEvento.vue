<template>
  <div id="verEvento">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>{{nome}}</h4>
      </li>
      <li class="collection-item">Nome do Evento: {{nome}}</li>
      <li class="collection-item">Descrição do Evento: {{descricao}}</li>
      <li class="collection-item">Local do Evento: {{local}}</li>
      <li class="collection-item">Data de realização do Evento: {{data}}</li>
      <li class="collection-item">Horário de início do Evento: {{horario}}</li>
      <li class="collection-item">Tipo do Evento: {{tipo}} </li>
      <li class="collection-item">Latitude do local do Evento: {{lat}} </li>
      <li class="collection-item">Longitude do local do Evento: {{long}} </li>
      <li class="collection-item">Evento Realizador: {{abrigoRealizador}}<br><br>
      <router-link v-bind:to="{name: 'verAbrigo', params:{id:id_abrigo}}" class="btn blue"> Página do Abrigo Realizador </router-link> <br> <br>
      <button @click="seguirAbrigo" class="btn blue">Seguir Evento</button></li>

      <li class="collection-item"> <button class="btn red" @click="desconfirmarPresenca" v-if="usuarioEstaConfirmado"> Cancelar Confirmação </button>
        <button v-else class="btn green" @click="confirmarPresenca"> Confirmar Presença </button>
      </li>
	  <li class="collection-item" v-if="media>=0 && media<0.5">
                <p>Nota do Evento:</p>
                <i class="small material-icons yellow-text" > star_border </i>
                <i class="small material-icons yellow-text"> star_border </i>
                <i class="small material-icons yellow-text"> star_border </i>
                <i class="small material-icons yellow-text"> star_border </i>
                <i class="small material-icons yellow-text"> star_border </i></li>

                 <li class="collection-item" v-else-if="media>=0.5 && media<1">
                <p>Nota do Evento:</p>
                <i class="small material-icons yellow-text"> star_half </i>
                <i class="small material-icons yellow-text"> star_border </i>
                <i class="small material-icons yellow-text"> star_border </i>
                <i class="small material-icons yellow-text"> star_border </i>
                <i class="small material-icons yellow-text"> star_border </i></li>

                <li class="collection-item" v-else-if="media>=1 && media<1.5">
                <p>Nota do Evento:</p>
                <i class="small material-icons yellow-text"> star </i>
                <i class="small material-icons yellow-text"> star_border </i>
                <i class="small material-icons yellow-text"> star_border </i>
                <i class="small material-icons yellow-text"> star_border </i>
                <i class="small material-icons yellow-text"> star_border </i></li>

                <li class="collection-item" v-else-if="media>=1.5 && media<2">                
                <p>Nota do Evento:</p>
                <i class="small material-icons yellow-text"> star </i>
                <i class="small material-icons yellow-text"> star_half </i>
                <i class="small material-icons yellow-text"> star_border </i>
                <i class="small material-icons yellow-text"> star_border </i>
                <i class="small material-icons yellow-text"> star_border </i></li>

                <li class="collection-item" v-else-if="media>=2 && media<2.5">
                <p>Nota do Evento:</p>
                <i class="small material-icons yellow-text"> star </i>
                <i class="small material-icons yellow-text"> star </i>
                <i class="small material-icons yellow-text"> star_border </i>
                <i class="small material-icons yellow-text"> star_border </i>
                <i class="small material-icons yellow-text"> star_border </i></li>

                <li class="collection-item" v-else-if="media>=2.5 && media<3">
                <p>Nota do Evento:</p>
                <i class="small material-icons yellow-text"> star </i>
                <i class="small material-icons yellow-text"> star </i>
                <i class="small material-icons yellow-text"> star_half </i>
                <i class="small material-icons yellow-text"> star_border </i>
                <i class="small material-icons yellow-text"> star_border </i></li>

                <li class="collection-item" v-else-if="media>=3 && media<3.5">
                <p>Nota do Evento:</p>
                <i class="small material-icons yellow-text"> star </i>
                <i class="small material-icons yellow-text"> star </i>
                <i class="small material-icons yellow-text"> star </i>
                <i class="small material-icons yellow-text"> star_border </i>
                <i class="small material-icons yellow-text"> star_border </i></li>

                <li class="collection-item" v-else-if="media>=3.5 && media<4">
                <p>Nota do Evento:</p>
                <i class="small material-icons yellow-text"> star </i>
                <i class="small material-icons yellow-text"> star </i>
                <i class="small material-icons yellow-text"> star </i>
                <i class="small material-icons yellow-text"> star_half </i>
                <i class="small material-icons yellow-text"> star_border </i></li>

                <li class="collection-item" v-else-if="media>=4 && media<4.5">
                <p>Nota do Evento:</p>
                <i class="small material-icons yellow-text"> star </i>
                <i class="small material-icons yellow-text"> star </i>
                <i class="small material-icons yellow-text"> star </i>
                <i class="small material-icons yellow-text"> star </i>
                <i class="small material-icons yellow-text"> star_border </i></li>

                <li class="collection-item" v-else-if="media>=4.5 && media<5">
                <p>Nota do Evento:</p>
                <i class="small material-icons yellow-text"> star </i>
                <i class="small material-icons yellow-text"> star </i>
                <i class="small material-icons yellow-text"> star </i>
                <i class="small material-icons yellow-text"> star </i>
                <i class="small material-icons yellow-text"> star_half </i></li>

                <li class="collection-item" v-else-if="media>=5">
                <p>Nota do Evento:</p>
                <i class="small material-icons yellow-text"> star </i>
                <i class="small material-icons yellow-text"> star </i>
                <i class="small material-icons yellow-text"> star </i>
                <i class="small material-icons yellow-text"> star </i>
                <i class="small material-icons yellow-text"> star </i></li>

                <li v-if="!voted && usuarioEstaConfirmado" class="collection-item">                 
                <h4> Avalie o Evento! </h4>               
                <button class="red waves-effect waves-light btn-large" style="margin:10px" @click="avaliarEvento(1)">
                    <i class="large material-icons"> star </i></button>
                <button class="btn-large orange" style="margin:10px" @click="avaliarEvento(2)"> 
                    <i class="small material-icons"> star </i>
                    <i class="small material-icons"> star </i></button>
                <button class="btn-large yellow" style="margin:10px" @click="avaliarEvento(3)"> 
                    <i class="small material-icons"> star </i>
                    <i class="small material-icons"> star </i>
                    <i class="small material-icons"> star </i></button>
                <button class="btn-large blue" style="margin:10px" @click="avaliarEvento(4)">
                    <i class="small material-icons"> star </i>
                    <i class="small material-icons"> star </i>
                    <i class="small material-icons"> star </i>
                    <i class="small material-icons"> star </i></button>
                <button class="btn-large green" style="margin:10px" @click="avaliarEvento(5)">
                    <i class="small material-icons"> star </i>
                    <i class="small material-icons"> star </i>
                    <i class="small material-icons"> star </i>
                    <i class="small material-icons"> star </i>
                    <i class="small material-icons"> star </i></button>
                </li>
                <li class="collection-item" v-else-if="voted && usuarioEstaConfirmado">
                    <h4> Obrigado pelo voto! </h4>
                    <button class="btn-large orange disabled" style="margin:10px" @click="avaliarEvento(1)">
                    <i class="large material-icons"> star </i></button>
                <button class="btn-large orange disabled" style="margin:10px" @click="avaliarEvento(2)"> 
                    <i class="small material-icons"> star </i>
                    <i class="small material-icons"> star </i></button>
                <button class="btn-large blue disabled" style="margin:10px" @click="avaliarEvento(3)"> 
                    <i class="small material-icons"> star </i>
                    <i class="small material-icons"> star </i>
                    <i class="small material-icons"> star </i></button>
                <button class="btn-large green disabled" style="margin:10px" @click="avaliarEvento(4)">
                    <i class="small material-icons"> star </i>
                    <i class="small material-icons"> star </i>
                    <i class="small material-icons"> star </i>
                    <i class="small material-icons"> star </i></button>
                <button class="btn-large green disabled" style="margin:10px" @click="avaliarEvento(5)">
                    <i class="small material-icons"> star </i>
                    <i class="small material-icons"> star </i>
                    <i class="small material-icons"> star </i>
                    <i class="small material-icons"> star </i>
                    <i class="small material-icons"> star </i></button>
                </li>

      


    </ul>

  <ul class="collapsible">
    <li >
      <div class="collapsible-header"><i class="material-icons">account_circle</i>Visualizar Usuários Confirmados: {{confirmados.lenght}}</div>
      <div v-for="confirmado in confirmados"
                    v-bind:key="confirmado.id" class="collapsible-body"><span>{{confirmado.emailConfirmado}}</span></div>
    </li>
  </ul>
    
    <router-link to="../listaEventos" class="btn grey" style = "margin-right: 10px">Voltar</router-link>
    <button v-if="usuarioDono" @click="deletarEvento" class="btn red">Excluir Evento</button>


    <div v-if="usuarioDono" class="fixed-action-btn">
      <router-link
        v-bind:to="{name: 'editarEvento', params:{id_abrigo:id_abrigo}}"
        class="btn-floating btn-large blue"
      >
        <i class="fa fa-pencil"></i>
      </router-link>
    </div>

     <div id= "mapaEventos">
            <ul class="collection with-header">
            <li class="collection-header"><h4>Localização do Evento</h4></li>
            <GmapMap
                :center="getPosition()"
                :zoom="17"
                mapTypeId: google.maps.MapTypeId.ROADMAP
                style="width: 1500px; height: 600px"
            >
                <GmapMarker
                    
                    :position="getPosition()"
                    :clickable="true"
                    :draggable="false"
                    @click="center=m.point"
                />
            </GmapMap>
            </ul>
        </div>
  </div>
</template>

<script>
import firebase from "firebase"
import db from "./firebaseInit"

var user

 $(document).ready(function(){
    $('.collapsible').collapsible();
  });

 document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems, options);
  });

var usuarioLogado

var lat
var long
var coords

export default {
  name: "verEvento",
  data() {
    return {
      id_abrigo: null,
      abrigoRealizador: null,
      nome: null,
      descricao: null,
      local: null,
      data:null,
      horario:null,
      tipo: null,
      confirmados: [],
      usuarioEstaConfirmado: false,
      usuarioDono: false,
      lat: null,
	  long: null,
	  media: 0,
    countAvaliacoes: null,
    voted:null
	  
    };
  },
  beforeRouteEnter(to, from, next) {
    user = firebase.auth().currentUser
    db.collection("eventos")
      .where("id_abrigo", "==", to.params.id_abrigo)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.id_abrigo = doc.data().id_abrigo;
            vm.abrigoRealizador = doc.data().abrigoRealizador;
            vm.nome = doc.data().nome;
            vm.descricao = doc.data().descricao;
            vm.local = doc.data().local;
            vm.data = doc.data().data;
            vm.horario = doc.data().horario;
            vm.tipo = doc.data().tipo;
            vm.lat = doc.data().lat;
			vm.long = doc.data().long;
			vm.media = doc.data().media

            if(vm.id_abrigo == user.uid){
              vm.usuarioDono = true;
            }
          });
        });
      }
      );
  },
  watch: {
    $route: "fetchData"
  },
  created(){
    
    $(document).ready(function(){
    $('.collapsible').collapsible();
    this.fetchData();
  });

 document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems, options);
  });
    firebase.auth().onAuthStateChanged((user) => {
      
        console.log(this.nome)
      if(user){
        db.collection("eventos")
        .where("id_abrigo", "==", this.$route.params.id_abrigo)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            
            db.collection('eventos').doc(doc.id).collection('confirmados')
                        .get()
                        .then(querrySnapshot=>{
                            querrySnapshot.forEach(doc =>{
                                const data = {
                                    'emailConfirmado': doc.data().emailConfirmado,
                                    'idConfirmado': doc.data().idConfirmado                                    
                                }
                                this.confirmados.push(data);
                                
                            })
                        }
                        
                        )
            db.collection('eventos').doc(doc.id).collection('confirmados')
                        .get()
                        .then(querrySnapshot=>{
                            querrySnapshot.forEach(doc =>{
                                if(doc.data().emailConfirmado == user.email){
                                  this.usuarioEstaConfirmado = true;
                                }
                            })
                        }
                        
                        )
        });
            })

        db.collection("usuario").doc(firebase.auth().currentUser.uid).collection("votosEvento")
        .where("nomeEvento", "==", this.nome)
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

  methods: {
    fetchData() {
      db.collection("eventos")
        .where("id_abrigo", "==", this.$route.params.id_abrigo)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.id_abrigo = doc.data().id_abrigo;
            this.nome = doc.data().nome;
            this.descricao = doc.data().descricao;
            this.local = doc.data().local;
            this.data = doc.data().data;
            this.horario = doc.data().horario;
            this.tipo = doc.data().tipo;
            this.abrigoRealizador = doc.data().abrigoRealizador;
            this.lat = doc.data().lat;
			this.long = doc.data().long;
      this.media = doc.data().media;
            
          });
        });
    },

    seguirAbrigo(){
        if(confirm("Deseja seguir esse Evento?")){
          usuarioLogado = firebase.auth().currentUser
          
          if(usuarioLogado){
             db.collection("eventos")
        .where("id_abrigo", "==", this.$route.params.id_abrigo)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.id_abrigo = doc.data().id_abrigo;

            db.collection("abrigo").doc(this.id_abrigo).collection("seguidores").doc(usuarioLogado.uid).set({
              emailSeguidor : usuarioLogado.email,
              idSeguidor : usuarioLogado.uid
            });
        });
            }).then(
                 db.collection("eventos")
        .where("id_abrigo", "==", this.$route.params.id_abrigo)
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

    getPosition: function(){
      return {
        lat: parseFloat(this.lat),
        lng: parseFloat(this.long)
      }
	},

	avaliarEvento: function(nota){
		this.media = (this.media*this.countAvaliacoes+nota)/(this.countAvaliacoes+1)
    this.countAvaliacoes++;
    this.voted = true;
		
		db.collection('eventos').where('nome','==',this.nome).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
            	doc.ref.update({
          media:this.media,
          countAvaliacoes:this.countAvaliacoes
     
				})
			})
    }) 
    

    db.collection("eventos")
        .where("nome", "==", this.nome)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {    
              db.collection("usuario").doc(firebase.auth().currentUser.uid).collection("votosEvento").doc(doc.id).set({
                voto: nota,
                nomeEvento : this.nome
                });
            
        });
              })
		
		this.$forceUpdate();
		

		return this.media;
	},

    confirmarPresenca(){
        if(confirm("Deseja confirmar presença?")){
          usuarioLogado = firebase.auth().currentUser
          
          if(usuarioLogado){
             db.collection("eventos")
        .where("id_abrigo", "==", this.$route.params.id_abrigo)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.id_abrigo = doc.data().id_abrigo;
            
            db.collection("eventos").doc(doc.id).collection("confirmados").doc(usuarioLogado.uid).set({
              emailConfirmado : usuarioLogado.email,
              idConfirmado : usuarioLogado.uid
            });
        });
            }).then(
                 db.collection("eventos")
        .where("id_abrigo", "==", this.$route.params.id_abrigo)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.id_abrigo = doc.data().id_abrigo;            
            this.abrigoRealizador = doc.data().nome;
              db.collection("usuario").doc(usuarioLogado.uid).collection("confirmacoes").doc(doc.id).set({
                nomeEvento : this.nome,
                idEvento : doc.id
                });
                this.$router.push("../listaEventos");
        });
              })
            )

          }

        }
    },

    desconfirmarPresenca(){
      if(confirm("Deseja Desconfirmar Presença?")){
        usuarioLogado = firebase.auth().currentUser
        db.collection("eventos")
        .where("id_abrigo", "==", this.$route.params.id_abrigo)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.id_abrigo = doc.data().id_abrigo;
            
            db.collection("eventos").doc(doc.id).collection("confirmados").doc(usuarioLogado.uid).delete()
        });
            }).then(
                 db.collection("eventos")
        .where("id_abrigo", "==", this.$route.params.id_abrigo)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.id_abrigo = doc.data().id_abrigo;            
            this.abrigoRealizador = doc.data().nome;
              db.collection("usuario").doc(usuarioLogado.uid).collection("confirmacoes").doc(doc.id).delete();
              this.$router.push("../listaEventos");
        });
              })
            )

      }
    },

    deletarEvento() {
      if (confirm("Tem certeza?")) {
        db.collection("eventos")
          .where("id_abrigo", "==", this.$route.params.id_abrigo)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              doc.ref.delete();
              this.$router.push("../listaEventos");
            });
          });
      }
    }
  }
};
</script>

<style scoped>
</style>