<template>
    <button :class="`mt-3 futurebutton ${alert ? 'futurebutton--alert' : ''}`" :disabled="disabled">
        <slot/>
    </button>
</template>

<script setup lang="ts">
const props = defineProps({
    disabled: {
        type: Boolean,
        default: false
    },
    alert: {
        type: Boolean,
        default: false
    },
})
</script>

<style lang="scss">

</style>