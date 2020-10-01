const UserLogin = {
    template: `<div class="d-flex justify-content-center">
    <div class="card w-75">
        <div class="card-header bg-primary text-white px-5">Login</div>
        <div class="card-body p-5">
            <form @submit.prevent="login">
                <div class="row">
                    <label for="lastname" class="col-3">Lastname</label>
                    <input placeholder="Lastname" v-model="form.lastname" class="form-control col-8" id="lastname" type="text">
                </div>
                 <div class="row my-4">
                    <label for="registration_code" class="col-3">Registration Code</label>
                    <input placeholder="Code" v-model="form.registration_code" class="form-control col-8" id="registration_code" type="password">
                </div>
                <div class="row">
                    <button id="login" class="offset-3 btn btn-primary" role="login" aria-label="button for submit form login">Login</button>
                </div>
            </form>
        </div>
    </div>
</div>
    `,
    data() {
        return {
            form: {
                lastname: '',
                registration_code: ''
            }
        }
    },
    created() {
        if (store.isAuth())
            this.$router.replace({ name: 'events.index' });
    },
    methods: {
        login() {
            store.logout.check = false;
            api.post('login', this.form)
                .then(res => {
                    store.setAuth(res.data);
                    store.setAlert('success', 'Login success');
                    this.$router.back(store.logout.oldUrl);
                })
                .catch(err => {
                    store.setAlert('danger', "Lastname or registration code not correct");
                })
        }
    },
    computed: {}
};