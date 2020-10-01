const routes = [
    {
        name: 'user.login',
        path: '/login',
        component: UserLogin
    },
    {
        name: 'events.index',
        path: '/',
        component: EventIndex
    },
    {
        name: 'events.detail',
        path: '/organizers/:oSlug/events/:eSlug',
        component: EventDetail,
        props: true
    },
    {
        name: 'events.registration',
        path: '/organizers/:oSlug/events/:eSlug/registration',
        component: EventRegistration,
        props: true
    },
    {
        name: 'sessions.detail',
        path: '/organizers/:oSlug/events/:eSlug/sessions/:sId',
        component: SessionDetail,
        props: true
    }, {
        name: 'error404',
        path: '*',
        component: Error404,
    }
];