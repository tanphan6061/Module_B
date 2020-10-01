const SessionDetail = {
    template: `<div>
    <h2>{{session.title}} - {{session.type}}</h2>
    <div class="my-4">{{session.description}}</div>
    <div class="d-flex">
        <div style="width:100px;font-weight: 500">
            Speaker:
        </div>
        <div>{{session.speaker}}</div>
    </div>
    <div class="d-flex mt-2">
        <div style="width:100px;font-weight: 500">
            Start:
        </div>
        <div>{{session.start}}</div>
    </div>
    <div class="d-flex mt-2">
        <div style="width:100px;font-weight: 500">
            End:
        </div>
        <div>{{session.end}}</div>
    </div>
    <div v-if="session.type=='workshop'" class="d-flex mt-2">
        <div style="width:100px;font-weight: 500">
            Cost:
        </div>
        <div>{{session.cost}}.-</div>
    </div>
</div>
    `,
    props: ['oSlug', 'eSlug', 'sId'],
    data() {
        return {
            session: {}
        }
    },
    created() {
        store.logout.oldUrl = this.$router.currentRoute.path;
        if (store.logout.check == true)
            this.$router.push({name: 'user.login'});

        api.get(`organizers/${this.oSlug}/events/${this.eSlug}`)
            .then(res => {
                res.data.channels.forEach(channel => {
                    channel.rooms.forEach(room => {
                        let session = room.sessions.find(session => session.id == this.sId);
                        if (session) {
                            session.start = store.formatTime(session.start);
                            session.end = store.formatTime(session.end);
                            this.session = session;
                        }
                    })
                })
                if (this.session.id == undefined) {
                    store.setAlert('danger', 'Session not found')
                    this.$router.replace('/error404');
                }
            })
            .catch(err => {
                store.setAlert('danger', 'Event not found')
                this.$router.replace('/error404');
            })
    },
    methods: {},
    computed: {}
};