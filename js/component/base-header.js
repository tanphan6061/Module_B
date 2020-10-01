 Vue.component('base-header', {
    template: `<header class="d-flex justify-content-between bg-white border sticky-top shadow-sm px-5 py-2">
    <div @click="goIndex" style="font-size: 28px;cursor: pointer">Event Booking Platform</div>
    <router-link v-if="!store.isAuth()" role="login" aria-label="login button" :to="{name:'user.login'}"
                 class="btn btn-primary">Login
    </router-link>
    <div v-else class="d-flex justify-content-between">
        <div class="p-2 mr-2">{{store.auth.username}}</div>
        <button role="logout" aria-label="logout button" @click="logout" class="btn btn-primary">Logout</button>
    </div>
</header>
    `,
    data() {
        return {
            // store
        }
    },
    created() {

    },
    methods: {
        goIndex() {
            store.logout.check = false;
            if (this.$router.currentRoute.path != '/')
                this.$router.push({name: 'events.index'})
        },
        logout() {
            api.post('logout?token=' + store.auth.token)
                .then(res => {
                    store.removeAuth();
                    store.setAlert('success', res.data.message);
                    store.logout.check = true;
                    this.$router.push({name: 'user.login'});
                })
                .catch(err => {
                    console.log(err)
                })
        }
    },
    computed: {}
});