<template>
    <nav>  
        <div class="nav-wrapper blue">           
            <div class="container">
                <span v-if="usuarioEstaLogado"><router-link to="/profile">{{usuarioLogado}}</router-link></span>
                <span v-else-if="abrigoEstaLogado"><router-link to="/profileAbrigo">{{usuarioLogado}}</router-link></span>
                <span class="brand-logo" v-else>Portal de Eventos PetFeliz</span>    
                <ul id="nav-movbile" class="right hide-on-med-and-down">                          
                    <li v-if="usuarioEstaLogado"><router-link to="/home">Página Inicial</router-link></li>
                    <li v-else-if="abrigoEstaLogado"><router-link to="/home">Página Inicial</router-link></li>
                    <li v-if="usuarioEstaLogado"><router-link to="/listaEventos">Feed</router-link></li>
                    <li v-if="abrigoEstaLogado"><router-link to="/listaAnimais">Animais Registrados</router-link></li>
                    <li v-if="abrigoEstaLogado"><router-link to="/listaEventos">Lista de Eventos</router-link></li>                  

                    <li v-if="usuarioEstaLogado"><a v-on:click="logout" class="waves-effect waves-light btn red">Sair</a></li>
                    <li v-else-if="abrigoEstaLogado"><a v-on:click="logout" class="waves-effect waves-light btn red">Sair</a></li>
                </ul>
            </div>
        </div>
    </nav>       
</template>

<script>
    import firebase from 'firebase'
    import db from './firebaseInit'
    var treco = false;

    export default {
        name: "Navbar",
        data() {
            return {
                usuarioEstaLogado: false,
                usuarioLogado: false,
                abrigoEstaLogado:false
            }
        },
        created(){
            treco = firebase.auth().currentUser;
            var usersRef = db.collection('abrigo').doc(treco.uid)
            if(treco){
                usersRef.get().then((docSnapshot) => {
                    if(docSnapshot.exists) {
                        usersRef.onSnapshot((doc) => {
                            this.abrigoEstaLogado = true;
                        })
                    } else {
                            this.usuarioEstaLogado = true;
                    }
                })
                this.usuarioLogado = firebase.auth().currentUser.email;
            }
        },

        methods:{
            logout: function () {
                firebase.auth().signOut().then(() =>{
                    this.$router.replace('/login')
                    location.reload();
                });

            }
        }



    }
</script>

<style scoped>
    .email {
        padding-right: 10px;
    }
</style>