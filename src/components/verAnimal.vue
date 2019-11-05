<template>
  <div id="verAnimal">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>{{nome}}</h4>
      </li>
      <li class="collection-item">Nome do Animal: {{nome}}</li>
      <li class="collection-item">Tipo do Animal: {{tipo}}</li>
      <li class="collection-item">Idade do Animal: {{idade}}</li>
      <li class="collection-item">Raça: {{raca}}</li>
      <li class="collection-item"><img :src="foto"></li>
    </ul>
    <router-link to="../listaAnimais" class="btn grey">Back</router-link>
    <button @click="deletarAnimal" class="btn red">Delete</button>

    <div class="fixed-action-btn">
      <router-link
        v-bind:to="{name: 'editarAnimal', params:{id_animal:id_animal}}"
        class="btn-floating btn-large blue"
      >
        <i class="fa fa-pencil"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import db from "./firebaseInit";
import firebase from 'firebase';
export default {
    name: "verAnimal",
    data() {
        return {
            id_animal: null,
            nome:null,
            tipo:null,
            idade:null,
            raca:null,
            foto:null,
            abrigoDono: null
        };
    },
  beforeRouteEnter(to, from, next) {
    var user = firebase.auth().currentUser
    if(user){
      db.collection('abrigo').doc(user.uid).collection('animal')
        .where("id_animal", "==", to.params.id_animal)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            next(vm => {
              vm.id_animal = doc.data().id_animal;
              vm.nome = doc.data().nome;
              vm.tipo = doc.data().tipo;
              vm.idade = doc.data().idade;
              vm.raca = doc.data().raca;
              vm.foto = doc.data().foto;
              vm.abrigoDono = doc.data().abrigoDono;
            });
          });
        });
    }
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    fetchData() {
      var user = firebase.auth().currentUser
      if(user){
      db.collection('abrigo').doc(user.uid).collection('animal')
        .where("id_animal", "==", this.$route.params.id_animal)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.id_animal = doc.data().id_animal;
            this.nome = doc.data().nome;
            this.tipo = doc.data().tipo;
            this.idade = doc.data().idade;
            this.raca = doc.data().raca;
            this.foto = doc.data().foto;
            this.abrigoDono = doc.data().abrigoDono;
          });
        });
    }
    },
    deletarAnimal() {
      var user = firebase.auth().currentUser
      if(user){
      if (confirm("Tem certeza que deseja deletar esse animal?")) {
        db.collection('abrigo').doc(user.uid).collection('animal')
          .where("id_animal", "==", this.$route.params.id_animal)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              doc.ref.delete();
              this.$router.push("../listaAnimais");
            });
          });
      }
    }
  }
}
};
</script>

<style scoped>
</style>