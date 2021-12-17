import { createApp } from 'vue'
import App from './App.vue'
import {
	DraggablePlugin,
} from "@braks/revue-draggable";
import "./index.css";


const app = createApp(App)

app.use(DraggablePlugin);



app.mount('#app')
