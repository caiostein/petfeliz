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
      <li class="collection-item">Abrigo Realizador: {{abrigoRealizador}}<br><br>
      <router-link to = "/verAbrigo" class="btn blue"> Página do Abrigo Realizador </router-link>
      <button @click="seguirAbrigo" class="btn blue">Seguir Abrigo</button></li>
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
      tipo: null
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
      });
  },
  watch: {
    $route: "fetchData"
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
          });
        });
    },

    seguirAbrigo(){
        if(confirm("Deseja seguir esse Abrigo?")){
          usuarioLogado = firebase.auth().currentUser
          
          if(usuarioLogado){
            db.collection("abrigo").doc(this.id_abrigo).collection("seguidores").set({
              emailSeguidor : usuarioLogado.email,
              idSeguidor : usuarioLogado.uid
            }).then(
              db.collection("usuario").doc(usuarioLogado.uid).collection("inscricoes").set({
                nomeSeguido : this.nome,
                idSeguido : this.id_abrigo
              })
            )

          }

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