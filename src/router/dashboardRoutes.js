const useComponent = component => () => import(`../view/${component}.vue`);
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import admin from '@/view/admin.vue';
import SideBar from '@/components/SideBar.vue';
const dashboardRoutes = [
    {
        path: '/',
        component: admin,
        children: [

            {
                path: '',
                meta: {
                    title: "Giao hàng",
                    description: "GizmoShop"
                },
                components: {
                    default: useComponent('test'),
                    header: Header,
                    footer: Footer,
                    SideBar: SideBar,
                }

            },

        ]
    },
];

export default dashboardRoutes;