import Vue from "vue";
import * as cryptojS from "crypto-js";

export default function guest({ next, router }) {
    if (Vue.cookie.get(process.env.VUE_APP_AUTH_COOKIE_NAME)) {
        const token = Vue.cookie.get(process.env.VUE_APP_AUTH_COOKIE_NAME);
        const userID = decryptTokenFunc(process.env.VUE_APP_AUTH_SECRET_KEY , token);
        if (userID) return router.push('/');
    }

    return next();
}


function decryptTokenFunc(secret_key , token){
    let jsonToken = '';
    try {
        jsonToken = JSON.parse(token);
    } catch (e) {
        return false;
    }
    let encrypted = jsonToken.ciphertext;
    let salt = cryptojS.enc.Hex.parse(jsonToken.salt);
    let iv = cryptojS.enc.Hex.parse(jsonToken.iv);
    let key = cryptojS.PBKDF2(secret_key, salt, { hasher: cryptojS.algo.SHA512, keySize: 64/8, iterations: 999});
    let decrypted = cryptojS.AES.decrypt(encrypted, key, { iv: iv});

    return decrypted.toString(cryptojS.enc.Utf8);
}