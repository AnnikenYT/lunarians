<script setup lang="ts">
import Window from "./components/Window.vue";
import { ref, Ref } from "vue";
import Background from "./components/Background.vue";
import Apply from "./components/Apply.vue";
import HomePlanet from "./components/HomePlanet.vue";
import { parse } from "marked";

interface Window {
	key: string;
	icon: string;
	title: string;
	content: any;
	isComponent?: boolean;
	isMarkdown?: boolean;
	shown: Ref<boolean>;
	children?: Windows;
}

interface Windows {
	[key: string]: Window;
}

const windows: Windows = {
	apply: {
		key: "apply",
		// A User icon from fontawesome
		icon: "far fa-user",
		title: "Apply",
		content: Apply,
		isComponent: true,
		shown: ref(false),
	},
	lore: {
		key: "lore",
		icon: "far fa-question-circle",
		title: "Lore",
		content:
			"Click on the different subcategory to learn more about the Lore.",
		shown: ref(false),
		children: {
			home: {
				key: "home",
				icon: "fa fa-home",
				title: "Home",
				content: HomePlanet,
				isComponent: true,
				shown: ref(false),
			},
		},
	},
};

const open_window = (window_name: string) => {
	windows[window_name].shown.value = true;
};
const toggle_window = (window_name: string) => {
	windows[window_name].shown.value = !windows[window_name].shown.value;
};

const toggle_child = (window_name: string, child_name: string) => {
	windows[window_name].children![child_name].shown.value =
		!windows[window_name].children![child_name].shown.value;
};

const getWindowState = (window_name: string) => {
	return windows[window_name].shown.value;
};

const getChildState = (window_name: string, child_name: string) => {
	return windows[window_name].children![child_name].shown.value;
};
</script>

<template>
	<div
		id="window_container"
		class="relative z-10 flex flex-col items-center justify-center w-full h-screen"
	>
		<section v-for="window in windows">
			<Window :title="window.title" :shown="window.shown">
				<component v-if="window.isComponent" :is="window.content" />
				<span v-else class="typewriter">{{ window.content }}</span>
				<div
					v-if="window.children"
					v-for="child in window.children"
					@click="toggle_child(window.key, child.key)"
				>
					<div
						class="font-mono text-white transition-all cursor-pointer select-none border-b-blue-600 hover:border-b-2 w-min-content"
					>
						<i
							:class="`text-gray-100 hover:text-blue-600 ${child.icon} mr-2`"
						></i>
						<span class="hidden xl:inline">{{
							getChildState(window.key, child.key)
								? "Close"
								: "Open"
						}}</span>
						child "{{ child.title }}"
					</div>
				</div>
			</Window>
			<Window
				v-if="window.children"
				v-for="child in window.children"
				:title="child.title"
				:shown="child.shown"
				:handle="child.key"
			>
				<component v-if="child.isComponent" :is="child.content" />
				<span v-else class="typewriter">{{ child.content }}</span>
			</Window>
		</section>
		<div
			class="absolute bottom-0 flex flex-row items-center justify-center w-full"
		>
			<div
				class="flex flex-row flex-wrap items-center w-full h-20 bg-blue-800 border-2 border-blue-800 rounded-t-lg justify-evenly xl:w-1/2 bg-opacity-20 backdrop-blur-sm futurepanel"
			>
				<div
					v-for="window in windows"
					@click="toggle_window(window.key)"
				>
					<div
						class="hidden font-mono text-white transition-all cursor-pointer select-none md:inline border-b-blue-600 hover:border-b-2"
					>
						<i
							:class="`text-gray-100 hover:text-blue-600 ${window.icon} mr-2`"
						></i>
						<span class="hidden xl:inline">{{
							getWindowState(window.key) ? "Close" : "Open"
						}}</span>
						"{{ window.title }}"
					</div>
				</div>
			</div>
		</div>
	</div>
	<Background />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
body {
	background-color: #111;
}

.typewriter {
	color: #fff;
	overflow: hidden; /* Ensures the content is not revealed until the animation */
	border-right: 0.15em solid lightblue; /* The typwriter cursor */
	white-space: nowrap; /* Keeps the content on a single line */
	margin: 0 auto; /* Gives that scrolling effect as the typing happens */
	animation: typing 1.5s steps(30, end), blink-caret 0.5s step-end infinite;
}

/* The typing effect */
@keyframes typing {
	from {
		width: 0;
	}
	to {
		width: 100%;
	}
}

/* The typewriter cursor effect */
@keyframes blink-caret {
	from,
	to {
		border-color: transparent;
	}
	50% {
		border-color: lightblue;
	}
}

.futurepanel {
  box-sizing: border-box;
  display: inline-block;
  font: normal 100 14px/1.2em "Exo 2", Arial, sans-serif;
  letter-spacing: 0.06em;
  background-color: rgba(120, 200, 255, 0.1);
  border: 1px solid rgba(120, 200, 255, 0.2);
  color: rgba(120, 200, 255, 0.8);
  padding: 0 1em 1em;
}
.futurepanel .futurepanel__header {
  box-sizing: border-box;
  border-bottom: 1px solid rgba(120, 200, 255, 0.2);
}
.futurepanel .futurepanel__title {
  box-sizing: border-box;
  font: normal 100 1.429em/1em "Exo 2", Arial, sans-serif;
  text-transform: uppercase;
  padding: 0.4em 0;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.futurepanel .futurepanel__body {
  box-sizing: border-box;
  padding: 1em;
}
.futurepanel .futurepanel__divider {
  box-sizing: border-box;
  height: 0.6em;
  margin-top: 0.6em;
  border-top: 1px solid rgba(120, 200, 255, 0.2);
}
.futurepanel .futurepanel__footer {
  box-sizing: border-box;
  height: 2em;
  font-size: 0.8em;
  color: rgba(120, 200, 255, 0.2);
}

.futureinput {
  font: normal 100 16px/1.2em "Exo 2", Arial, sans-serif;
  letter-spacing: 0.06em;
  color: rgba(120, 200, 255, 0.8);
  margin: 0;
  padding: 0;
}
.futureinput label {
  font: normal 100 1em/1.8em "Exo 2", Arial, sans-serif;
  margin: 0 0 4em 0;
}
.futureinput label.required:after {
  display: relative;
  content: "*";
  padding-left: 0.2em;
  color: rgba(255, 120, 120, 0.8);
  font: normal 100 1em/1.8em "Exo 2", Arial, sans-serif;
}
.futureinput input[type=text] {
  font: normal 100 1em/2.4em "Exo 2", Arial, sans-serif;
  background-color: rgba(120, 200, 255, 0.1);
  border: 1px solid rgba(120, 200, 255, 0.2);
  color: rgba(120, 200, 255, 0.8);
  height: 2.4em;
  box-sizing: border-box;
  padding: 0 0.8em;
  letter-spacing: 0.06em;
  width: 100%;
}
.futureinput input[type=text]:focus {
  background-color: rgba(120, 200, 255, 0.2);
  border: 1px solid rgba(120, 200, 255, 0.3);
  color: rgba(120, 200, 255, 0.9);
  outline: none;
}
.futureinput input[type=text]::-webkit-input-placeholder {
  color: rgba(120, 200, 255, 0.5);
  font: normal 100 1em/2.4em "Exo 2", Arial, sans-serif;
}
.futureinput input[type=text]:-moz-placeholder {
  color: rgba(120, 200, 255, 0.5);
  font: normal 100 1em/2.4em "Exo 2", Arial, sans-serif;
}
.futureinput input[type=text][disabled] {
  background-color: rgba(120, 200, 255, 0.04);
  border: 1px solid rgba(120, 200, 255, 0.06);
  color: rgba(120, 200, 255, 0.2);
  cursor: not-allowed;
}
.futureinput input[type=text][disabled]::-webkit-input-placeholder {
  color: rgba(120, 200, 255, 0.2);
}
.futureinput input[type=text][disabled]:-moz-placeholder {
  color: rgba(120, 200, 255, 0.2);
}
.futureinput .futureinput__help {
  display: block;
  font: normal 100 0.8em/1.2em "Exo 2", Arial, sans-serif;
  padding: 0.6em 0;
  color: rgba(120, 200, 255, 0.5);
}
.futureinput .futureinput__error {
  display: block;
  font: normal 100 0.8em/1.2em "Exo 2", Arial, sans-serif;
  text-transform: uppercase;
  padding: 0.6em 0;
  color: rgba(255, 120, 120, 0.8);
}

.futurebutton {
  font: normal 300 14px/1.2em "Exo 2", Arial, sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: rgba(255, 255, 255, 0.8);
  margin: 1px;
  padding: 0.4em 1em;
  border: 1px solid rgba(120, 200, 255, 0.2);
  background-color: rgba(120, 200, 255, 0.6);
  cursor: pointer;
}
.futurebutton:hover {
  background-color: rgba(120, 200, 255, 0.4);
  color: rgba(255, 255, 255, 0.6);
}
.futurebutton[disabled] {
  background-color: rgba(120, 200, 255, 0.2);
  border: 1px solid rgba(120, 200, 255, 0.1);
  color: rgba(255, 255, 255, 0.3);
  cursor: not-allowed;
}

.futurebutton--alert {
  background-color: rgba(120, 0, 0, 0.9);
  border: 1px solid rgba(255, 120, 120, 0.4);
  color: rgba(255, 255, 255, 0.8);
}
.futurebutton--alert:hover {
  background-color: rgba(120, 0, 0, 0.9);
  color: rgba(255, 255, 255, 0.8);
}
.futurebutton--alert[disabled] {
  background-color: rgba(120, 0, 0, 0.2);
  border: 1px solid rgba(255, 120, 120, 0.2);
  color: rgba(255, 255, 255, 0.4);
}

.futuremetric {
  font: normal 300 14px/1.2em "Exo 2", Arial, sans-serif;
  box-sizing: border-box;
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  border: 1px solid rgba(120, 200, 255, 0.4);
  color: rgba(120, 200, 255, 0.8);
  height: 6em;
  width: 6em;
  margin: 0;
  padding: 0.4em;
  text-align: center;
  border-radius: 50%;
}
.futuremetric .futuremetric__value {
  font: normal 300 2em/1.2em "Exo 2", Arial, sans-serif;
  margin-top: 0.4em;
}
.futuremetric .futuremetric__value--optimal {
  color: rgba(100, 200, 100, 0.8);
}
.futuremetric .futuremetric__value--optimal:hover {
  color: #64c864;
}
.futuremetric .futuremetric__value--warning {
  color: rgba(255, 200, 0, 0.8);
}
.futuremetric .futuremetric__value--warning:hover {
  color: #ffc800;
}
.futuremetric .futuremetric__value--alert {
  color: rgba(255, 120, 120, 0.8);
}
.futuremetric .futuremetric__value--alert:hover {
  color: #ff7878;
}
.futuremetric .futuremetric__label {
  font-size: 0.8em;
}

.futuregrid {
  font: normal 300 14px/1.2em "Exo 2", Arial, sans-serif;
  box-sizing: border-box;
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  border: 1px solid rgba(120, 200, 255, 0.4);
  color: rgba(120, 200, 255, 0.8);
  margin: 0;
  padding: 0;
  width: 100%;
}
.futuregrid .futuregrid__cell {
  display: inline-block;
  box-sizing: border-box;
  margin: 0;
  border-right: 1px solid rgba(120, 200, 255, 0.4);
  border-bottom: 1px solid rgba(120, 200, 255, 0.4);
  height: 3.6em;
  width: 3.6em;
  text-align: center;
}

.heading {
  font: normal 100 12px/1.2em "Exo 2", Arial, sans-serif;
  text-transform: uppercase;
  padding: 0;
  margin: 0;
}

</style>
