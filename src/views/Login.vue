<template>
    <div class = "login container center-align">
        <h3>Login</h3>
        <input type="text" v-model="email" placeholder="Email" class="validate"><br>
        <input type="password" v-model="password" placeholder="Senha" class="validate"><br><br>
        <button class="btn waves-effect waves-light blue" @click="login" >Login
            <i class="material-icons right">send</i>
        </button>

        <p> Or Sign In with Google</p>

       <button class="social-button" @click="socialLogin" >
            <img alt="Google Logo" src="../assets/google-logo.png">
        </button>

       

        <p>Sem conta? Não se preocupe, clique no link abaixo e una-se a nossa rede!</p>
        <router-link to="/Cadastro" class="btn waves-effect waves-light green">Cadastre aqui!     
         <i class="material-icons right">edit</i></router-link>
    </div>

</template>

<script>
    import firebase from 'firebase'
import { Script } from 'vm';
    export default {
        name: "login",
        data(){
            return {
                email: '',
                password: ''
            };
        },
        methods: {
            login() {
                firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((user)=>{
                        this.$router.replace('home')
                        location.reload();
                    },
                    (err) => {
                        alert('Opa! '+err.message)
                    }
                );

            },

        socialLogin() {
            const provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider).then((result) => {
            this.$router.replace('home');
            location.reload();
            }).catch((err) => {
            alert('Oops. ' + err.message)
            });
        }   
    }
  }
</script>  

<style scoped> 
  .social-button {
    width: 75px;
    background: white;
    padding: 10px;
    border-radius: 100%;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
    outline: 0;
    border: 0;
  }
  .social-button:active {
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.1);
  }
  .social-button img {
    width: 100%;
  }
</style>