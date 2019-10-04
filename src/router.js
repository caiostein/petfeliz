import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Cadastro from "./views/Cadastro"
import Profile from './views/Profile'
import profileAbrigo from './views/profileAbrigo'
import listaEventos from '@/components/listaEventos'
import editarEvento from '@/components/editarEvento'
import novoEvento from '@/components/novoEvento'
import verEvento from '@/components/verEvento'
import novoAnimal from '@/components/novoAnimal'
import listaAnimais from '@/components/listaAnimais'
import verAnimal from '@/components/verAnimal'
import editarAnimal from '@/components/editarAnimal'
import firebase from "firebase"



Vue.use(Router)

const router = new Router({
    routes: [{
            path: '/home',
            name: 'Home',
            component: Home,
            meta: {
                requiresAuth: true
            }
        },

        {
            path: '/cadastro',
            name: 'Cadastro',
            component: Cadastro
        },
        {
            path: '/listaEventos',
            name: 'listaEventos',
            component: listaEventos,
            meta: {
                requiresAuth: true
            }
        },

        {
            path: '/editarEvento/:id_evento',
            name: 'editarEvento',
            component: editarEvento,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/verEvento/:id_evento',
            name: 'verEvento',
            component: verEvento,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/new',
            name: 'novoEvento',
            component: novoEvento,
            meta: {
                requiresAuth: true
            }
        },

        {
            path: '/profile',
            name: 'Profile',
            component: Profile,
            meta: {
                requiresAuth: true
            }
        },
        
        {
            path: '/profileAbrigo',
            name: 'profileAbrigo',
            component: profileAbrigo,
            meta: {
                requiresAuth: true
            }
        },

        {
            path: '*',
            redirect: '/login'
        },

        {
            path: '/',
            redirect: '/login'

        },

        {
            path: '/login',
            name: 'Login',
            component: Login
        },

        {
            path: '/newanimal',
            name: 'novoAnimal',
            component: novoAnimal,
            meta: {
                requiresAuth: true
            }
        },

        {
            path: '/listaAnimais',
            name: 'listaAnimais',
            component: listaAnimais,
            meta: {
                requiresAuth: true
            }
        },

        {
            path: '/verAnimal/:id_animal',
            name: 'verAnimal',
            component: verAnimal,
            meta: {
                requiresAuth: true
            }
        },

        {
            path: '/editarAnimal/:id_animal',
            name: 'editarAnimal',
            component: editarAnimal,
            meta: {
                requiresAuth: true
            }
        }


    ]
});

router.beforeEach((to, from, next) => {
    const currentUser = firebase.auth().currentUser;
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    if (requiresAuth && !currentUser) next('login');
    else if (!requiresAuth && currentUser) next('home');
    else next();
});

export default router;