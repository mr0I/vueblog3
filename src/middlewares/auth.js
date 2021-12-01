// import Vue from "vue";
import { VueCookieNext } from 'vue-cookie-next';
// import * as cryptojS from "crypto-js";
import jwt from "jsonwebtoken";

export default function auth({ next, router }) {
    if (!VueCookieNext.getCookie(process.env.VUE_APP_AUTH_COOKIE_NAME)) {
        return router.push({ name: 'login' });
    }

    const token = VueCookieNext.getCookie(process.env.VUE_APP_AUTH_COOKIE_NAME);
    const userID = decryptTokenFunc(process.env.VUE_APP_AUTH_SECRET_KEY , token);
    if (!userID) return router.push({ name: 'login' });

    return next();
}


function decryptTokenFunc(secret_key , token){
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (!err) return user.id;
    });
}
