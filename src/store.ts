import { InjectionKey } from "@vue/runtime-core";
import { createStore, Store } from "vuex";
import { ref, Ref } from "vue";

import Window from "./components/Window.vue";
import Apply from "./components/Apply.vue";
import HomePlanet from "./components/HomePlanet.vue";
import Origin from "./components/Origin.vue";
import DefaultWindow from "./components/DefaultWindow.vue";

export interface Window {
	key: string;
	icon: string;
	title: string;
	content: any;
	isComponent?: boolean;
	isMarkdown?: boolean;
	shown: boolean;
	children?: Windows;
}

export interface Windows {
	[key: string]: Window;
}

export interface State {
	windows: Windows;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const componentsMap = {
	apply: Apply,
	home: HomePlanet,
	origin: Origin,
	default: DefaultWindow,
};

export const store = createStore<State>({
	state: {
		windows: {
			default: {
				key: "default",
				icon: "fa fa-cloud",
				title: "Default",
				content: "default",
				isComponent: true,
				shown: true,
			},
			apply: {
				key: "apply",
				// A User icon from fontawesome
				icon: "far fa-user",
				title: "Apply",
				content: "apply",
				isComponent: true,
				shown: false,
			},
			lore: {
				key: "lore",
				icon: "far fa-question-circle",
				title: "Lore",
				content: `Click on the child windows to see the lore.`,
				shown: false,
				children: {
					home: {
						key: "home",
						icon: "fa fa-home",
						title: "Home",
						content: "lore",
						isComponent: true,
						shown: false,
					},
					origin: {
						key: "origin",
						icon: "fa fa-globe",
						title: "Origin",
						content: "origin",
						isComponent: true,
						shown: false,
					},
				},
			},
		},
  },
  mutations: {
    toggleWindow(state, key: string) {
      const window = state.windows[key];
      window.shown = !window.shown;
    },
    toggleChildWindow(state, { key, childKey }) {
      const window = state.windows[key];
      const childWindow = window.children![childKey];
      childWindow.shown = !childWindow.shown;
    },
  },
  getters: {
    getWindowState: (state) => (key: string) => {
      let window: Window = state.windows[key];
      if (window.isComponent) {
        // @ts-ignore
        window = { ...window, content: componentsMap[window.content] };
      }
      return window
    },
    getChildWindowState: (state) => (key: string, childKey: string) => {
      const window = state.windows[key];
      let childWindow = window.children![childKey];
      if (childWindow.isComponent) {
        // @ts-ignore
        childWindow = { ...childWindow, content: componentsMap[childWindow.content] };
      }
      return childWindow
    }
  }
});
