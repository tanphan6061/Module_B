const EventRegistration = {
    template: `<div>
    <h2>{{event.name}}</h2>
    <div class="row mx-0 my-5">
        <div v-for="ticket in event.tickets" class="col-4 p-4 ticket d-flex justify-content-between">
            <div class="custom-radio custom-control">
                <input type="radio" :value="ticket.id" v-model="form.ticket_id" :id="'ticket'+ticket.id"
                       class="custom-control-input">
                <label :for="'ticket'+ticket.id" class="custom-control-label">{{ticket.name}}</label>
                <div v-if="ticket.available" style="font-size: 15px;color: #555">{{ticket.description}}</div>
                <div v-else style="font-size: 15px;color: #555">Unavailable</div>
            </div>
            <div>{{ticket.cost}}.-</div>
        </div>
    </div>
    <div>
        <div class="mb-2" style="font-weight: 500">Select additional workshops you want to book:</div>
        <div v-for="session in sessions" class="custom-checkbox custom-control mt-1">
            <input type="checkbox" :value="session.id" v-model="form.session_ids" :id="'session'+session.id"
                   class="custom-control-input">
            <label :for="'session'+session.id" class="custom-control-label">{{session.title}}</label>
        </div>
    </div>
    <div class="d-flex justify-content-end">
        <div>
            <div class="d-flex">
                <div style="width: 200px;">Event Ticket:</div>
                <div>{{getTicketCost}}.-</div>
            </div>
             <div class="d-flex my-3 border-bottom">
                <div style="width: 200px;">Additional workshop:</div>
                <div>{{getSessionCost}}.-</div>
            </div>
             <div class="d-flex">
                <div style="width: 200px;font-weight: 500">Total:</div>
                <div>{{getTotalCost}}.-</div>
            </div>
        
            <div class="d-flex justify-content-end">
                <button class="btn btn-primary mt-3" @click="purchase">Purchase</button>
            </div>
        </div> 
    </div>
</div>
    `,
    props: ['oSlug', 'eSlug'],
    data() {
        return {
            event: {},
            sessions: [],
            form: {
                ticket_id: null,
                session_ids: []
            }
        }
    },
    created() {
        store.logout.oldUrl = this.$router.currentRoute.path;
        if (store.logout.check == true || !store.isAuth())
            this.$router.push({name: 'user.login'});

        api.get(`organizers/${this.oSlug}/events/${this.eSlug}`)
            .then(res => {
                this.event = res.data;
                this.event.channels.forEach(channel => {
                    channel.rooms.forEach(room => {
                        room.sessions.forEach(session => {
                            if (session.type == 'workshop')
                                this.sessions.push(session);
                        })
                    })
                })
            })
            .catch(err => {
                store.setAlert('danger', 'Event not found')
                this.$router.replace('/error404');
            })
    },
    methods: {
        purchase() {
            api.post(`organizers/${this.oSlug}/events/${this.eSlug}/registration?token=${store.auth.token}`, this.form)
                .then(res => {
                    store.setAlert('success', res.data.message);
                    this.$router.push({name: 'events.detail'});
                })
                .catch(err => {
                    store.setAlert('danger', err.response.data.message);
                    // console.log(err.response.data);
                })
        }
    },
    computed: {
        getTicketCost() {
            if (this.form.ticket_id != null) {
                let ticket = this.event.tickets.find(i => i.id == this.form.ticket_id);
                if (ticket)
                    return ticket.cost;
            }
            return 0;
        },
        getSessionCost() {
            let total = 0;
            this.form.session_ids.forEach(id => {
                let ss = this.sessions.find(ss => ss.id == id);
                if (ss)
                    total += ss.cost;
            });
            return total;
        },
        getTotalCost() {
            return this.getTicketCost + this.getSessionCost;
        }
    }
};