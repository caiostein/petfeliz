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
      <li class="collection-item"> <button class="btn red" @click="desconfirmarPresenca" v-if="usuarioEstaConfirmado"> Desconfirmar Presença </button>
        <button v-else class="btn green" @click="confirmarPresenca"> Confirmar Presença </button>
      </li>
      <li class="collection-item">Abrigo Realizador: {{abrigoRealizador}}<br><br>
      <router-link to = "/verAbrigo" class="btn blue"> Página do Abrigo Realizador </router-link> <br> <br>
      <button @click="seguirAbrigo" class="btn blue">Seguir Abrigo</button></li>
    </ul>

  <ul class="collapsible">
    <li >
      <div class="collapsible-header"><i class="material-icons">place</i>Usuários Confirmados</div>
      <div v-for="confirmado in confirmados"
                    v-bind:key="confirmado.id" class="collapsible-body"><span>{{confirmado.emailConfirmado}}</span></div>
    </li>
  </ul>
    
    <router-link to="../listaEventos" class="btn grey">Voltar</router-link>
    <button @click="deletarEvento" class="btn red">Excluir Evento</button>


    <div class="fixed-action-btn">
      <router-link
        v-bind:to="{name: 'editarEvento', params:{id_abrigo:id_abrigo}}"
        class="btn-floating btn-large blue"
      >
        <i class="fa fa-pencil"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"
import db from "./firebaseInit"

 $(document).ready(function(){
    $('.collapsible').collapsible();
  });

 document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems, options);
  });

var usuarioLogado

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
      usuarioEstaConfirmado: false
      
    };
  },
  beforeRouteEnter(to, from, next) {
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
  });

 document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems, options);
  });
    firebase.auth().onAuthStateChanged((user) => {
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
          });
        });
    },

    seguirAbrigo(){
        if(confirm("Deseja seguir esse Abrigo?")){
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