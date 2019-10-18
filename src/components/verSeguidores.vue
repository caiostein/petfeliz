<template>
    <div class="profile">
        <div id="profileUser">
            <div class="center-align">
            </div>
            <div id="listaSeguidores">
                <ul class="collection with-header">
                    <li class="collection-header"><h4>Seguidores:</h4></li>
                    <li v-for="seguidor in seguidores"
                    v-bind:key="seguidor.id" class="collection-item">
                    {{seguidor.emailSeguidor}}
                    </li>
                </ul>
            </div>
            <div class ="center-align">
                <router-link to ="/profileAbrigo" class="btn red"> Voltar </router-link>
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
            seguidores: []
           };
        },

        created(){
            firebase.auth().onAuthStateChanged((user) => {
                if(user){
                    db.collection('abrigo').doc(user.uid).collection('seguidores')
                        .get()
                        .then(querrySnapshot=>{
                            querrySnapshot.forEach(doc =>{
                                const data = {
                                    'idSeguidor': doc.data().idSeguidor,
                                    'emailSeguidor': doc.data().emailSeguidor
                                }
                                this.seguidores.push(data)
                            })
                        })
                    db.collection('abrigo')
                    .doc(treco.uid)
                    .get()
                    .then(snapshot => {
                        const document = snapshot.data()
                        this.nome = document.nome;
                        this.email = document.email;
                        this.telefone = document.telefone;
                        this.endereco = document.endereco;
                    })
                    
                }
            })
                
                
            
            
        }
    }
</script>