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
                    description: " Login"
                },
                components: {
                    default: useComponent('login'),

                }

            },
        ]
    },
    {
        //route lỗi (err)
        path: '/err',
        component: client,
        children: [

            {
                path: '404',
                name: 'NotFound',
                meta: {
                    title: "Đường dẫn không tồn tại",
                    description: "Gizmo"
                },
                components: {
                    default: useComponent('404'),

                }

            },
            {
                path: '500',
                name: 'ServerError',
                meta: {
                    title: "Đã có lỗi xảy ra",
                    description: "Gizmo"
                },
                components: {
                    default: useComponent('500'),

                }
            },
            {
                path: '',
                redirect: '/err/500'
            },
            //thêm route lỗi
        ]
    },
];

export default publicRoutes;