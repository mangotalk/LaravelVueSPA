<template>
    <div class="flex flex-wrap">
        <app-header/>
        <div class="container mx-auto">
            <transition
                name="fade"
                mode="out-in"
            >
                <router-view/>
            </transition>
        </div>
    </div>
</template>

<script>
import Header from '../components/Header.vue';

export default {
    props: ['title'],
    mounted() {
        this.$store.state.applicationName = this.title;
    },
    components: {
       'app-header': Header,
    }
}
</script>

<style>
    .fade-enter-active,
    .fade-leave-active {
    transition-duration: 0.2s;
    transition-property: opacity;
    transition-timing-function: ease;
    }

    .fade-enter,
    .fade-leave-active {
    opacity: 0
    }
</style>