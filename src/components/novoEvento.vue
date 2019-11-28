<template>
    <div id="novoEvento">
        <h3>Novo Evento</h3>
        <div class="row">
    <form @submit.prevent="salvarEvento" class="col s12">
                      
           
             <div class="row">
                <div class="input-field col s12">
                <input type="text" v-model="nome" required>
                <label>Nome do Evento:</label>
                </div>    
            </div>
             <div class="row">
                <div class="input-field col s12">
                <input type="text" v-model="descricao" required>
                <label>Descrição do Evento:</label>
                </div>    
            </div>
             <div class="row">
                <div class="input-field col s12">
                <input type="text" v-model="local" required>
                <label>Local do Evento:</label>
                </div>    
            </div>
             <div class="row">
                <div class="input-field col s12">
                <input type="text" v-model="data" required>
                <label>Data da realização do Evento:</label>
                </div>    
            </div>
             <div class="row">
                <div class="input-field col s12">
                <input type="text" v-model="horario" required>
                <label>Horário de início do Evento:</label>
                </div>    
            </div>

            <div class="row">
                <div class="input-field col s12">
                    <input type="text" v-model="lat" required>
                    <label>Latitude do local do evento:</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <input type="text" v-model="long" required>
                    <label>Longitude do local do evento:</label>
                </div>
            </div>
             <div class="row">
                 <div class="input-field col s12">
            <select v-model="selected">
                <option value="" disabled selected>Escolha o Tipo</option>
                <option value="Adoção">Adoção</option>
                <option value="Recolhimento">Recolhimento</option>
            </select>
    <label>Tipo do Evento</label>
    
  </div>
    </div>
        <router-link to="/listaEventos" class="btn grey" style="margin-right: 10px">Cancel</router-link>
        <button type="submit" class="btn" v-bind="sendEmail"  @click="sendEmail()">Submit</button>
    </form>
        </div>

        <div>
			<input type="button" v-bind="sendEmail" value="Send Email" @click="sendEmail()">
        </div>
    
    </div>

    
</template>
<script>
    import db from './firebaseInit'
    import firebase from 'firebase'
    
  $(document).ready(function(){
    $('select').formSelect();
  });

export default{
    name: 'novoEvento',
    data(){
        return {
            selected: '',
            id_abrigo: null,
            nome:null,
            descricao:null,
            local:null,
            data:null,
            horario:null,
            tipo:null,
            abrigoRealizador: null,
            lat:null,
			long:null,
			media:0,
			 countAvaliacoes: null,
			 seguidores: []

        }
    },

    created() {
       $(document).ready(function(){
    $('select').formSelect();
  });
	},
	

    methods: {
        salvarEvento(){
            db.collection('eventos').add({
                id_abrigo: firebase.auth().currentUser.uid,
                nome: this.nome,
                descricao: this.descricao,
                local: this.local,
                data: this.data,
                horario: this.horario,
                tipo: this.selected,
                abrigoRealizador:  firebase.auth().currentUser.email,
                lat: this.lat,
				long: this.long,
				media: this.media,
				countAvaliacoes: this.countAvaliacoes,
				seguidores: this.seguidores
            })
            .then( 
                this.$router.push('/listaEventos')
            )
            .catch(error => {
                console.log(err)
            })
		},
		
			sendEmail(){
				//get seguidores
				var abrigoLogado = firebase.auth().currentUser
				 db.collection('abrigo').doc(abrigoLogado.uid).collection('seguidores')
                        .get()
                        .then(querrySnapshot=>{
                            querrySnapshot.forEach(doc =>{                                       
                                this.seguidores.push(doc.data().emailSeguidor)
                            })
						})			
							
				var vamoLa = this.seguidores.join(',')
				console.log(vamoLa)
				Email.send({
					SecureToken : "29c9caf0-8bd4-46ca-a1c2-199f846d223a",
					To : vamoLa,
					From : "biacoronha@gmail.com",
					Subject : "Novo Evento",
					Body : "Um novo Evento foi criado. AGORA TEM QUE IR CARALHO"
					}).then(
						message => alert("mail sent successfully")
					);
	}
          
    }
  
}

</script>

<style scoped>

</style>