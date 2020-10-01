const EventDetail = {
    template: `<div>
    <div class="d-flex justify-content-between">
        <h2>{{event.name}}</h2>
        <router-link class="btn btn-primary p-2" :to="{name:'events.registration'}" id="register" role="register"
                     aria-label="register button">Register for this event
        </router-link>
    </div>
    <div class="time-line">
        <div class="flex-grow-1">09:00</div>
        <div class="flex-grow-1">11:00</div>
        <div class="flex-grow-1">13:00</div>
        <div class="flex-grow-1">15:00</div>
    </div>
    <div>
        <div class="row m-0 border" v-for="channel in event.channels">
            <div class="channel">{{channel.name}}</div>
            <div class="flex-grow-1">
                <div class="d-flex" v-for="room in channel.rooms">
                    <div class="room">{{room.name}}</div>
                    <div class="flex-grow-1 d-flex position-relative">
                        <router-link class="session text-truncate position-absolute" v-for="session in room.sessions" :style="setStyle(session)"
                                     :class="{registered:checkRegistered(session)}"
                                     :to="{name:'sessions.detail',params:{sId:session.id}}">{{session.title}}
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    `,
    props: ['oSlug', 'eSlug'],
    data() {
        return {
            event: {},
            registrations: [],
            registered: false
        }
    },
    created() {
        store.logout.oldUrl = this.$router.currentRoute.path;
        if (store.logout.check == true)
            this.$router.push({name: 'user.login'});

        api.get(`organizers/${this.oSlug}/events/${this.eSlug}`)
            .then(res => {
                this.event = res.data;
            })
            .catch(err => {
                store.setAlert('danger', 'Event not found')
                this.$router.replace('/error404');
            })
            .then(() => api.get('registrations?token=' + store.auth.token))
            .then(res => {
                let rg = res.data.registrations.find(i => i.event.id == this.event.id);
                if (rg) {
                    this.registered = true;
                    this.registrations = rg.session_ids;
                }
            })
    },
    methods: {
        setStyle({start, end}) {
            let time1 = new Date(start);
            let time2 = new Date(end);
            let totalMinutes = (17 - 9) * 60;

            time1 = time1.getHours() * 60 + time1.getMinutes();
            time2 = time2.getHours() * 60 + time2.getMinutes();
            return {
                width: (time2 - time1) / totalMinutes * 100 + "%",
                left: (time1 - 9 * 60) / totalMinutes * 100 + "%",
            }
        },
        checkRegistered({id, type}) {
            if (this.registered) {
                if (type == 'talk' || this.registrations.find(i => id == i.id))
                    return true;
            }
            return false;
        }
    },
    computed: {}
};
