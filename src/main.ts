import { createApp } from 'vue'
import App from './App.vue'
import {
	DraggablePlugin,
} from "@braks/revue-draggable";
import "./index.css";
import { store } from './store';


const app = createApp(App)

app.use(DraggablePlugin);

app.use(store)


app.mount('#app')
