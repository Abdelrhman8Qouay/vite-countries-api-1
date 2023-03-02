import { createApp } from 'vue'

import './main.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import {
faUserSecret,
faSun,
faMoon,
faMagnifyingGlass,
faChevronDown
} from '@fortawesome/free-solid-svg-icons'
/* add icons to the library */
library.add(faUserSecret, faSun, faMoon,faMagnifyingGlass, faChevronDown)


app.use(router).component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
