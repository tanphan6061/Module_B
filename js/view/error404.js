const Error404 = {
    template:`
<div class="d-flex text-secondary flex-column align-items-center">
    <h2 class="display-2 font-weight-bold">404</h2>
    <h4 class="display-4">Page Not Found</h4>
    <router-link class="btn btn-outline-secondary mt-4" :to="{name:'events.index'}">Goto Home</router-link>
    
</div>
    `,
    data(){
        return {

        }
    },
    created(){
        if (store.logout.check == true)
            this.$router.push({name: 'user.login'});
    },
    methods:{

    },
    computed:{

    }
};