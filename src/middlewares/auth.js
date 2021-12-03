import { VueCookieNext } from 'vue-cookie-next';
import jwt from "jsonwebtoken";


export default function auth({ next, router }) {
    if (!VueCookieNext.getCookie(process.env.VUE_APP_AUTH_COOKIE_NAME)) {
        return router.push({ name: 'login' });
    }

    const token = VueCookieNext.getCookie(process.env.VUE_APP_AUTH_COOKIE_NAME);
    const userID = jwt.verify(token, process.env.VUE_APP_TOKEN_SECRET, (err, user) => {
        if (!err) return user.data.id;
    });
    if (!userID && userID===null) return router.push({ name: 'login' });

    return next();
}

