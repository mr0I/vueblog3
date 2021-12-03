import { VueCookieNext } from 'vue-cookie-next';
import jwt from "jsonwebtoken";


export default function guest({ next, router }) {
    if (VueCookieNext.getCookie(process.env.VUE_APP_AUTH_COOKIE_NAME)) {
        const token = VueCookieNext.getCookie(process.env.VUE_APP_AUTH_COOKIE_NAME);
        const userID = jwt.verify(token, process.env.VUE_APP_TOKEN_SECRET, (err, user) => {
            if (!err) return user.data.id;
        });
        if (userID) return router.push('/');
    }

    return next();
}
