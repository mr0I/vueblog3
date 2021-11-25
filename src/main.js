import { createApp } from 'vue';
import App from './App.vue';

// import VueRouter from 'vue-router';
// import VueResource from 'vue-resource';
// import VueCookie from 'vue-cookie';
import Vuelidate from 'vuelidate';
import router from './Routes';
import {store} from './state/Store';
import axios from 'axios';
import toastr from 'toastr';
import { VueCookieNext } from 'vue-cookie-next';
// global.Raphael = Raphael;
const app = createApp(App);



// app.use(VueRouter);
// app.use(VueCookie);
// app.use(VueResource);
app.use(Vuelidate);



// Set axios defaults
const http = require('http');
const https = require('https');
const httpAgent = new http.Agent({
    keepAlive: true,
    keepAliveMsecs: 10 * 1000,
});
const httpsAgent = new https.Agent({
    keepAlive: true,
    keepAliveMsecs: 18 * 1000,
});

axios.defaults.baseURL = process.env.VUE_APP_AXIOS_BASE_URL;
axios.defaults.headers = {'X-Custom-Header': 'foobar'};
axios.defaults.httpAgent = httpAgent;
axios.defaults.httpsAgent = httpsAgent;
axios.defaults.timeout = 60000;


VueCookieNext.config({
    expire: '3d',
    path: '/',
    domain: '',
    secure: '',
    sameSite: '',
});

// Toastr settings
toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-top-left",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};


/* Creates a `nextMiddleware()` function which not only
** runs the default `next()` callback but also triggers
** the subsequent Middleware function.
*/
function nextFactory(context, middleware, index) {
    const subsequentMiddleware = middleware[index];
    // If no subsequent Middleware exists,
    // the default `next()` callback is returned.
    if (!subsequentMiddleware) return context.next;

    return (...parameters) => {
        // Run the default Vue Router `next()` callback first.
        context.next(...parameters);
        // Then run the subsequent Middleware with a new
        // `nextMiddleware()` callback.
        const nextMiddleware = nextFactory(context, middleware, index + 1);
        subsequentMiddleware({ ...context, next: nextMiddleware });
    };
}
router.beforeEach((to, from, next) => {
    if (to.meta.middleware) {
        const middleware = Array.isArray(to.meta.middleware)
            ? to.meta.middleware
            : [to.meta.middleware];

        const context = {
            from,
            next,
            router,
            to,
        };
        const nextMiddleware = nextFactory(context, middleware, 1);

        return middleware[0]({ ...context, next: nextMiddleware });
    }
    document.title = to.meta.title ? to.meta.title : "Some Default Title";
    return next();
});



createApp(App).use(router).use(store).mount('#app');

