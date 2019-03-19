<template>
    <div class="w-full h-16 bg-white border-b border-grey-light shadow">
        <div class="container items-stretch h-full mx-auto flex justify-between px-4">
            <div class="text-left text-xl self-center">{{ $store.state.applicationName }}</div>
            <div class="text-right self-center">
                <ul class="list-reset font-light text-grey-dark">
                    <router-link v-if="!$store.state.currentUser" active-class="text-black font-medium" tag="li" to="/login" class="inline px-3 hover:text-grey-darker cursor-pointer trans">Login</router-link>
                    <router-link v-if="!$store.state.currentUser" active-class="text-black font-medium" tag="li" to="/register" class="inline px-3 hover:text-grey-darker cursor-pointer trans">Register</router-link>
                    <li v-if="$store.state.currentUser" @click="logout" class="inline px-3 hover:text-grey-darker cursor-pointer">Logout</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                name: null,
                password: null,
                errors: {
                    name: null,
                    password: null,
                },
            }
        }
    },
    methods: {
        logout() {
            localStorage.removeItem("user");
            this.$store.state.currentUser = null;
            this.$router.push({ name: 'login' })
        }
    }
}
</script>

<style scoped>
.trans {
    transition: 0.3s ease;
}
</style>