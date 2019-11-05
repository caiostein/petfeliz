<template>
    <div id="editarEvento">
        <h3>Editar Evento</h3>
        <div class="row">
        <form @submit.prevent="updateEvento" class="col s12">
             <div class="row">
                <div class="input-field col s12">
                <input type="text" v-model="nome" required>
                </div>    
            </div>
             <div class="row">
                <div class="input-field col s12">
                <input type="text" v-model="local" required>
                </div>    
            </div>
             <div class="row">
                <div class="input-field col s12">
                <input type="text" v-model="tipo" required>
                </div>    
            </div>
             <div class="row">
                <div class="input-field col s12">
                <input type="text" v-model="descricao" required>
                </div>    
            </div>
             <div class="row">
                <div class="input-field col s12">
                <input type="text" v-model="horario" required>
                </div>    
            </div>
             <div class="row">
                <div class="input-field col s12">
                <input type="text" v-model="data" required>
                </div>    
            </div>
             <router-link to="../listaEventos" class="btn grey">Cancelar</router-link>
            <button type="submit" class="btn">Confirmar</button>           
            </form>
        </div>
    </div>
</template>

<script>
    import db from './firebaseInit'
    import firebase from 'firebase'
    export default{
    name: 'editarEvento',
    data(){
       return {
        id_abrigo: null,
        abrigoRealizador: null,
        nome: null,
        descricao: null,
        local: null,
        data:null,
        horario:null,
        tipo: null
        }
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
                })
            })
        })
    },
    watch:{
        '$route': 'fetchData'
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
        updateEvento(){
            db.collection('eventos').where('id_abrigo','==',this.$route.params.id_abrigo).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
               doc.ref.update({
                   id_abrigo: this.id_abrigo,
                   nome : this.nome,
                   descricao : this.descricao,
                   local : this.local,
                   data : this.data,
                   horario : this.horario,
                   tipo : this.tipo,
                   abrigoRealizador : this.abrigoRealizador
                  
                   
               })
               .then(
                   () =>
                   this.$router.push({name: 'verEvento', params: {id_abrigo:this.id_abrigo}})
               )
            })
            })
        }
    
    }
  
}
</script>

<style scoped>

</style>