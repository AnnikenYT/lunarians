<template>
	<transition name="slide">
        <div
            v-if="shown"
            v-draggable="{ grid: [10, 10], handle: '#handle', bounds: '#window_container' }"
            :class="`xl:max-w-[30vw] max-w-[90vw] h-fit max-h-[50vh] bg-blue-700 bg-opacity-5 rounded-lg border-2 border-blue-800 backdrop-blur-sm overflow-x-auto`"
        >
            <div
                :id="`handle`"
                :class="`flex flex-row h-7 bg-blue-800 bg-opacity-5 rounded-t-lg`"
            >
                <span id="title" class="ml-1 font-mono text-gray-200">{{
                    title
                }}</span>
                <div class="ml-auto mr-2">
                    <XIcon class="w-5 h-5 mt-1 text-white cursor-pointer" @click="close()"/>
                </div>
            </div>
            <div id="content" class="flex flex-col p-2 text-gray-100">
                <slot />
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
import { XIcon } from "@heroicons/vue/solid";
import { ref, Ref } from "vue";
const props = defineProps({
	title: {
		type: String,
		default: "Lunarians Interface",
	},
    shown: {
        type: Object as () => Ref<boolean>,
        default: ref(false)
    },
    typewriter: {
        type: Boolean,
        default: false
    },
});

const shown = props.shown


const close = () => {
    shown.value = false;
};

const open = () => {
    shown.value = true;
};

defineExpose({
	close,
    open
});
</script>

<style>
.slide-enter-active, .slide-leave-active {
    transition: all 0.5s;
}
.slide-enter, .slide-leave-to {
    transform: translateY(-100%);
    opacity: 0;
}
</style>
