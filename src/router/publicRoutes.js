const useComponent = component => () => import(`../view/pages/${component}.vue`);
// import Header from '@/components/Header.vue';
// import Footer from '@/components/Footer.vue';
import client from '@/view/client.vue';
const publicRoutes = [
    {
        path: '/login',
        component: client,

        children: [
            {
                path: '',
                name: 'login',
                meta: {
                    title: "Gizmo",
                    description: " Mô tả "
                },
                components: {
                    default: useComponent('login'),

                }

            },
        ]
    },
];

export default publicRoutes;