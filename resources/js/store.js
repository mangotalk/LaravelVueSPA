import { getLocalUser } from "./helpers/auth";

const user = getLocalUser();

export default {
    state: {
        applicationName: '',
        currentUser: user,
    },
    getters: {
        currentUser(state) {
            return state.currentUser;
        },
    },
    mutations: {
        // empty
    },
    actions: {
        // empty
    },
};