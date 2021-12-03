import { createWebHistory, createRouter } from "vue-router";

import Index from './pages/index/index';
import Articles from './pages/articles/articles';
import Register from './pages/auth/register';
import Login from './pages/auth/login';
import Dashboard from './pages/dashboard/dash/dashboard';
import DashArticles from './pages/dashboard/articles/index';
import DashAddArticle from './pages/dashboard/articles/add';
import DashAddCategory from './pages/dashboard/categories/add';
import DashEditCategory from './pages/dashboard/categories/edit';
import DashCategories from './pages/dashboard/categories/index';
import DashProfile from './pages/dashboard/profile/index';
import NotFoundPage from './pages/not_found';


// Middlewares
import auth from './middlewares/auth';
import guest from './middlewares/guest';
import log from './middlewares/log';
import defJQ from './middlewares/default_jquery';


const routes = [
    {
        path: '/',
        component: Index,
        meta:{
            title:"صفحه اصلی",
            middleware:defJQ
        }
    },
    {
        path: '/articles',
        component: Articles
    },
    {
        path: '/register',
        component: Register,
        meta:{
            middleware:[guest,log],
        }
    },
    {
        path: '/login',
        component: Login,
        meta: {
            middleware: guest,
        },
        name:'login'
    },
    {
        path: '/dashboard',
        component: Dashboard,
        meta: {
            middleware: [auth,defJQ],
        },
        name:'dash',
        children:[
            {
                path: 'articles',
                component: DashArticles,
                meta: {
                    middleware: auth,
                },
                name:'dash-articles'
            },
            {
                path: 'add_article',
                component: DashAddArticle,
                meta: {
                    middleware: auth,
                },
            },
            {
                path: 'categories',
                component: DashCategories,
                meta: {
                    middleware: auth,
                },
                name:'dash-categories'
            },
            {
                path: 'add_category',
                component: DashAddCategory,
                meta: {
                    middleware: auth,
                },
                name: 'add-category'
            },
            {
                path: 'edit_category/:catId',
                component: DashEditCategory,
                meta: {
                    middleware: auth,
                },
                name: 'edit-category'
            },
            {
                path: 'profile',
                component: DashProfile,
                meta: {
                    middleware: auth,
                }
            },
        ]
    },
    {
        // Match all paths vue2 Use * vue3 Use /:pathMatch(.*)* or /:pathMatch(.*) or /:catchAll(.*)
        path: "/:catchAll(.*)*",
        component: NotFoundPage,
        name: "404"
    }
];


const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return {
            x: 0,
            y: 0
        }
    }
});

export default router;


