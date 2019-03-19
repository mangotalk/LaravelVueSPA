<template>
    <div class="w-full p-4 mt-1 md:mt-8">
        <div class="bg-white max-w-md border border-grey-light rounded mx-auto">
            <div class="py-3 px-4 border-b border-grey-light">Login</div>
            <form class="py-6" v-on:submit.prevent="login">
                <div class="mx-auto w-3/4 flex flex-wrap flex items-stretch h-full py-4">
                    <div class="w-1/4 text-right pr-2 self-start pt-2" :class="{ 'text-red-dark': form.errors.name }">
                        Username
                    </div>
                    <div class="w-3/4 text-left px-4 self-start">
                        <input type="text" v-model="form.name" :class="{ 'border-red-dark': form.errors.name }" class="bg-white rounded border border-grey-light w-full px-2 py-2 focus:outline-none text-grey-darker"/>
                        <p v-if="form.errors.name" class="text-red-dark mt-1 text-sm">{{ form.errors.name }}</p>
                    </div> 
                </div>
                <div class="mx-auto w-3/4 flex flex-wrap flex items-stretch h-full py-4">
                    <div class="w-1/4 text-right pr-2 self-start pt-2" :class="{ 'text-red-dark': form.errors.password }">
                        Password
                    </div>
                    <div class="w-3/4 text-left px-4 self-start">
                        <input type="password" v-model="form.password" :class="{ 'border-red-dark': form.errors.password }" class="bg-white rounded border w-full px-2 py-2 focus:outline-none text-grey-darker"/>
                        <p v-if="form.errors.password" class="text-red-dark mt-1 text-sm">{{ form.errors.password }}</p>
                    </div> 
                </div>
                <div class="mx-auto w-3/4 flex flex-wrap flex items-stretch h-full py-3">
                    <div class="w-1/4 text-right px-2 self-start pt-2"></div>
                    <div class="w-3/4 text-left px-4 self-start">
                        <button class="px-4 py-2 focus:outline-none text-white bg-blue-dark rounded">Login</button>
                    </div> 
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { setAuthorization } from "../../helpers/general";

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
        login() {
            var _this = this;
            _this.form.errors = {
                name: null,
                password: null,
            };
            axios.post('/api/auth/login', _this.form)
                .then((response) => {
                    setAuthorization(response.data.access_token);
                    _this.$store.state.currentUser = Object.assign({}, response.data.user, {token: response.data.access_token});
                    localStorage.setItem("user", JSON.stringify(_this.$store.state.currentUser));

                    _this.$router.push({ name: 'home' })
                })
                .catch((error) =>{
                    _this.form.password = null;
                    switch(error.response.status) {
                        case 400:
                            for (var key in error.response.data)
                                _this.form.errors[key] = error.response.data[key][0];
                            break;
                        case 401:
                            _this.form.errors.password = "These credentials do not match our records.";
                            break;
                    }
                });
        }
    }
}
</script>
