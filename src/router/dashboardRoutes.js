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
                path: '/your_delivery',
                meta: {
                    title: "Giao hàng",
                    description: "GizmoShop"
                },
                components: {
                    default: useComponent('yourDelivery'),
                    header: Header,
                    footer: Footer,
                    SideBar: SideBar,
                }

            },
            {
                path: '/list',
                meta: {
                    title: "Giao hàng",
                    description: "GizmoShop"
                },
                components: {
                    default: useComponent('deliveryList'),
                    header: Header,
                    footer: Footer,
                    SideBar: SideBar,
                }

            },
            {
                path: '/supplier-list',
                meta: {
                    title: "Giao hàng",
                    description: "GizmoShop"
                },
                components: {
                    default: useComponent('supplierDelivery'),
                    header: Header,
                    footer: Footer,
                    SideBar: SideBar,
                }

            },
            {
                path: '/detailDelivery',
                meta: {
                    title: "Giao hàng",
                    description: "GizmoShop"
                },
                components: {
                    default: useComponent('deliveryDetail'),
                    header: Header,
                    footer: Footer,
                    SideBar: SideBar,
                }

            },
            {
                path: '/profile',
                meta: {
                    title: "Giao hàng",
                    description: "GizmoShop"
                },
                components: {
                    default: useComponent('profile'),
                    header: Header,
                    footer: Footer,
                    SideBar: SideBar,
                }

            },
            {
                path: '/history',
                meta: {
                    title: "Giao hàng",
                    description: "GizmoShop"
                },
                components: {
                    default: useComponent('statisticsOrder'),
                    header: Header,
                    footer: Footer,
                    SideBar: SideBar,
                }

            },


        ]
    },
];

export default dashboardRoutes;