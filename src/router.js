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
import verAbrigo from '@/components/verAbrigo'
import firebase from "firebase"
import Feed from '@/components/Feed'
import verSeguidores from '@/components/verSeguidores'
import filtroAdocao from '@/components/filtroAdocao'
import filtroRecolhimento from '@/components/filtroRecolhimento'


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
            path: '/filtroAdocao',
            name: 'filtroAdocao',
            component: filtroAdocao,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/filtroRecolhimento',
            name: 'filtroRecolhimento',
            component: filtroRecolhimento,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/Feed',
            name: 'Feed',
            component: Feed,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/Seguidores',
            name: 'verSeguidores',
            component: verSeguidores,
            meta: {
                requiresAuth: true
            }
        },

        {
            path: '/editarEvento/',
            name: 'editarEvento',
            component: editarEvento,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/verEvento/',
            name: 'verEvento',
            component: verEvento,
            meta: {
                requiresAuth: true
            }
        },
        
        {
            path: '/verAbrigo',
            name: 'verAbrigo',
            component: verAbrigo,
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