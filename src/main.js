import { createApp } from 'vue';
import {createRouter, createWebHistory} from 'vue-router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import App from "@/App.vue";
import Auth from "@/components/Auth.vue"
import MainMenu from "@/components/MainMenu.vue";
import GamePage from "@/components/Game.vue";
import PageNotFound from "@/PageNotFound.vue";
import './index.css'
import colors from 'vuetify/lib/util/colors'

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        themes: {
            light: {
                dark: false,
                colors: {
                    primary: colors.teal.lighten1, // #26A69A
                    secondary: colors.teal.lighten5, // #E0F2F1
                }
            },
        },
    },
})

const routes = [
    { path: '/', component: Auth },
    { path: '/rooms', component: MainMenu },
    { path: '/game/:roomName', component: GamePage },
    { path: '/:pathMatch(.*)*', component: PageNotFound }
]

const router= createRouter({
    history: createWebHistory(),
    routes
})

createApp(App).use(vuetify).use(router).mount('#app')
