<template>
	<transition name="slide">
		<div
			v-if="shown"
			v-draggable="{
				grid: [10, 10],
				handle: '#handle',
				bounds: '#window_container',
			}"
			:class="`futurepanel w-screen md:w-fit max-w-md`"
		>
			<div :id="`handle`" :class="`futurepanel__header`">
				<span id="title" class="futurepanel__title">{{ title }}</span>
				<div class="ml-auto mr-2">
					<XIcon
						class="w-5 h-5 mt-1 text-white cursor-pointer"
						@click=""
					/>
				</div>
			</div>
			<div id="content" class="futurepanel__body">
				<slot />
			</div>
			<div class="futurepanel__footer">
				{{ title }} ////////////// {{ shown }} #{{ Math.random() }}
			</div>
		</div>
	</transition>
</template>

<script setup lang="ts">
import { XIcon } from "@heroicons/vue/solid";
import { ref, Ref } from "vue";
import { useStore } from "vuex";
import { Window } from "../store";

const store = useStore();

const props = defineProps({
	title: {
		type: String,
		default: "Lunarians Interface",
	},
	shown: {
		type: Boolean,
		default: false,
	},
	typewriter: {
		type: Boolean,
		default: false,
	},
	window: {
		type: Object as () => Window,
		required: true,
	}
});

</script>

<style>
.slide-enter-active,
.slide-leave-active {
	transition: all 0.5s;
}
.slide-enter,
.slide-leave-to {
	transform: translateY(-100%);
	opacity: 0;
}
</style>
