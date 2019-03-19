export function initialize(store, router) {
    router.beforeEach((to, from, next) => {
        const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
        const currentUser = store.state.currentUser;

        if(requiresAuth && !currentUser) {
            next('/login');
        } else if(to.path == '/login' && currentUser) {
            next('/');
        } else if(to.path == '/register' && currentUser) {
            next('/');
        } else {
            next();
        }
    });

    if (store.getters.currentUser) {
        setAuthorization(store.getters.currentUser.token);
    }
}

export function setAuthorization(token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
}
