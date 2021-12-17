<script setup lang="ts">
import Window from "./components/Window.vue";
import { ref, Ref } from "vue";
import Background from "./components/Background.vue";

interface Window {
	key: string;
	icon: string;
	title: string;
	content: any;
	shown: Ref<boolean>;
	children?: Windows;
}

interface Windows {
	[key: string]: Window;
}

const windows: Windows = {
	interface: {
		key: "interface",
		icon: "far fa-user-circle",
		title: "Lunarians Interface",
		content:
			"This is the Lunarians Interface.",
		shown: ref(false),
	},
	lorem: {
		key: "lorem",
		icon: "far fa-file-alt",
		title: "Lorem Ipsum",
		content:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente consequatur error vitae recusandae! Laborum a atque voluptas odio nam corrupti totam esse voluptatum repudiandae eaque tempora, optio ipsam sapiente. Tempore modi dolores, deserunt ad perspiciatis rem sequi omnis quas cupiditate officiis voluptate, fugit possimus illo. Id fugit, possimus doloribus eligendi cum soluta mollitia. Rerum aliquam architecto dolorum adipisci aut, corrupti eius. Nisi, dolore doloremque odit nihil hic adipisci minima voluptatibus sapiente quibusdam debitis quasi numquam natus deleniti earum vitae vero magni illo quisquam esse fuga reprehenderit, explicabo accusamus. Veritatis voluptatibus dolor eaque qui recusandae voluptatem vero ipsum incidunt ab dolorum iure nesciunt aspernatur, iste corrupti dolores numquam quas. Officia fugit distinctio quo architecto. Quis itaque dolor rerum autem? Eligendi illum odio voluptates soluta dolore dicta architecto odit deleniti distinctio voluptatibus est cumque sequi voluptate tempora officiis rerum expedita corporis, laborum nam? Atque repellat beatae commodi quas cum autem dignissimos, debitis odio. Velit veniam ea, unde ab quae ducimus consectetur est recusandae nam. Sapiente ex quo, repellat quidem eius pariatur necessitatibus. Illum tempora eligendi distinctio saepe doloribus velit hic suscipit. Omnis autem, ratione aliquam sint corporis possimus quaerat exercitationem tempora quidem distinctio dolorum quis nobis ad quasi officia minima veritatis. Minus?",
		shown: ref(false),
	},
	parrent: {
		key: "parrent",
		icon: "far fa-folder",
		title: "Parrent",
		content:
			"This is the parrent window.",
		shown: ref(false),
		children: {
			child: {
				key: "child",
				icon: "far fa-file-alt",
				title: "Child",
				content:
					"This is the child window.",
				shown: ref(false),
			},
		},
	},
  anotherwindow: {
    key: "anotherwindow",
    icon: "far fa-file-alt",
    title: "Another Window",
    content:
      "This is another window.",
    shown: ref(false),
  }
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
				{{ window.content }}
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
				{{ child.content }}
			</Window>
		</section>
		<div
			class="absolute bottom-0 flex flex-row items-center justify-center w-full"
		>
			<div
				class="flex flex-row flex-wrap items-center w-full h-20 bg-blue-800 border-2 border-blue-800 rounded-t-lg justify-evenly xl:w-1/2 bg-opacity-20 backdrop-blur-sm"
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
body {
	background-color: #111;
}
</style>
