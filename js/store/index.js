const store = {
    logout: {
        check: false,
        oldUrl: '/'
    }
    ,
    auth: {
        username: localStorage.getItem('username') || null,
        token: localStorage.getItem('token') || null,
    },
    alert: {
        type: '',
        mess: '',
        timer: null
    },
    isAuth() {
        return this.auth.username && this.auth.token ? true : false;
    },
    setAuth({username, token}) {
        this.auth.token = token;
        this.auth.username = username;

        localStorage.setItem('username', username);
        localStorage.setItem('token', token);
    },
    removeAuth() {
        this.auth = {
            username: null,
            token: null
        };
        localStorage.clear();
    },
    setAlert(type, mess) {
        this.alert.type = type;
        this.alert.mess = mess;
        this.alert.timer = setTimeout(() => {
            this.alert.type = '';
            this.alert.mess = '';
        }, 4000);
    },
    formatDate(date) {
        let option = {year: 'numeric', month: 'long', day: 'numeric'};
        date = new Date(date);
        return date.toLocaleDateString('en-EN', option);
    },
    formatTime(time) {
        return time.split(" ")[1].split(":").splice(0, 2).join(":");
    }
};