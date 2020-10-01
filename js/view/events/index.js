const EventIndex = {
    template: `
<div>
    <router-link v-for="event in events" class="event bg-white p-4 mt-4" tag="div" :to="{name:'events.detail',params:{oSlug:event.organizer.slug,eSlug:event.slug}}">
        <div class="">{{event.name}}</div>
        <div class="text-secondary" style="font-size: 14px">{{event.organizer.name}}, {{store.formatDate(event.date)}}</div>
    </router-link>
</div>
    `,
    data() {
        return {
            events: []
        }
    },
    created() {
        store.logout.oldUrl = this.$router.currentRoute.path;
        if (store.logout.check == true)
            this.$router.push({name: 'user.login'});

        api.get('events')
            .then(res=>{
                this.events = res.data.events;
            })
    },
    methods: {},
    computed: {}
};