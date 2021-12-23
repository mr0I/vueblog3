import Swal from 'sweetalert2';
import router from '../../Routes';
import axios from 'axios';
import toastr from 'toastr';
import { VueCookieNext } from 'vue-cookie-next';
import jwt from 'jsonwebtoken';



const state = {
    UserFullName: '',
    UserAvatar: '',
    UserGender: '',
    IsUserAuthenticated: false,
    is_form_submited: false,
    is_login_form_submited: false,
    is_avarat_loaded: false,
    user_id: ''
};

const getters = {
    GetUserFullName(state) {
        return state.UserFullName;
    },
    GetUserAvatar(state) {
        return state.UserAvatar;
    },
    GetUserGender(state) {
        return state.UserGender;
    },
    IsUserAuthenticated(state) {
        return state.IsUserAuthenticated;
    },
    IsFormSubmitted(state){
        return state.is_form_submited;
    },
    GetUserID(state){
        return state.user_id;
    },
    IsAvatarLoaded(state){
        return state.is_avarat_loaded;
    }
};

const mutations = {

    CheckAuth(state){
        // check if cookie is set and not expired
        if (VueCookieNext.getCookie(process.env.VUE_APP_AUTH_COOKIE_NAME)){
            const token = VueCookieNext.getCookie(process.env.VUE_APP_AUTH_COOKIE_NAME);
            decryptTokenFunc(process.env.VUE_APP_TOKEN_SECRET , token);
        } else {
            state.IsUserAuthenticated = false;
            state.user_id = '';
        }
    },

    SetAuthCookie(state, loginResult) {
        // let jsonLoginResult = JSON.parse(loginResult);
        // let unix_timestamp = jsonLoginResult.expire_time;

        let expireIn = new Date((Date.now() + 10800) * 1000);
        VueCookieNext.setCookie(process.env.VUE_APP_AUTH_COOKIE_NAME, loginResult, {
            expires: expireIn
        },null,null,true,true);
    },

    SetUserFullName(state, userFullName) {
        state.UserFullName = userFullName;
    },
    SetUserID(state, userID) {
        state.user_id = userID;
    },

    SetUserMeta(state, userMeta) {
        if (userMeta.UserAvatar !== '') state.UserAvatar = process.env.VUE_APP_UPLOAD_DIR + 'user_images/' + userMeta.UserAvatar;
        if (userMeta.UserGender !== '') state.UserGender = userMeta.UserGender;
    },

    SetAvatarLoaded(state, is_loaded) {
        state.is_avarat_loaded=is_loaded;
    },

    SetUserAuthenticated(state, tokenData) {
        if (VueCookieNext.getCookie(process.env.VUE_APP_AUTH_COOKIE_NAME)){
            const {secret_key , token} = tokenData;
            decryptTokenFunc(secret_key , token);
        } else {
            state.IsUserAuthenticated = false;
            state.user_id = '';
        }
    },

    SignOut() {
        VueCookieNext.removeCookie(process.env.VUE_APP_AUTH_COOKIE_NAME);
        state.IsUserAuthenticated = false;
        state.user_id = '';
        state.UserAvatar = '';
        router.push('/');
    }

};

const actions = {

    RegisterUser(context, registerData) {
        context.commit('IsFormSubmitted',true);
        axios.post('auth/register', registerData)
            .then(response => {
                if (response.status === 200) {
                    Swal.fire({
                        title: 'Success',
                        text: 'ثبت نام با موفقیت انجام شد',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    context.commit('IsFormSubmitted',false);
                    router.push({name:'login'});
                } else {
                    Swal.fire({
                        title: 'خطا در ثبت اطلاعات',
                        text: response.data.err.errors[0].message ,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            });
    },

    LoginUser(context, loginData) {
        return new Promise(function (resolve,reject) {
            axios.post('auth/login', loginData ,{
                // headers:{
                //     Authorization: 'Bearer ' + VueCookieNext.getCookie(process.env.VUE_APP_AUTH_COOKIE_NAME)
                // }
            }).then(response => {
                const {result,token} = response.data;

                if (response.status===200 && result==='Done') {
                    const resoveData={
                        'token': token,
                        'context': context
                    };
                    resolve(resoveData);
                } else {
                    reject(response.data.msg);
                }
            });
        }).then(function (resolve_data) {
            const tokenData = {"secret_key":process.env.VUE_APP_TOKEN_SECRET, "token":resolve_data.token};

            resolve_data.context.commit("SetAuthCookie", resolve_data.token);
            resolve_data.context.commit("SetUserAuthenticated", tokenData);
            resolve_data.context.dispatch("GetUserById",state.user_id);

            toastr.success('ورود موفق','تبریک');
            router.push({name:'dash'});
        }).catch(function (err) {
            Swal.fire({
                text: err,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        });
    },

    GetUserById(context , user_id){
        axios.post('auth/getuserbyid', user_id)
            .then(response => {
                if (response.data.body.User !== null  ) context.commit("SetUserFullName", response.data.body.User.name);
                if (response.data.body.UserMeta !== null  ) {
                    context.commit("SetUserMeta", response.data.body.UserMeta);
                } else {
                    context.commit("SetUserMeta", null);
                }
                context.commit("SetAvatarLoaded",true);
            });
    },

    CheckUserLogin(context){
        context.commit("CheckAuth");
    },

    SignOutUser(context) {
        context.commit("SignOut");
    },

    uploadImage(context , imageData){
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        };
        axios.post('auth/uploadimg' , imageData, config)
            .then(res => {
                if (res.data.result === 'Done') {
                    const data = {
                        userID: state.user_id,
                        image : res.data.image
                    };
                    axios.post('auth/updatemetaimage' , data )
                        .then(resp =>{
                            if (resp.data.result === 'Done') {
                                alert('آپلود موفق.');
                            }
                        })
                }
            })
    },
    profileSubmit(context , profileData){
        const data = {
            userID: state.user_id,
            name : profileData.name,
            gender : profileData.gender
        };
        axios.post('auth/updateuser' , data)
            .then(res =>{
                if (res.data.result === 'Done') {
                    alert('اطلاعات با موفقیت ویرایش شد :) ');
                    context.commit("SetUserFullName", res.data.user_data.User.name);
                    if (res.data.user_data.UserMeta !== null  ) {
                        context.commit("SetUserMeta", res.data.user_data.UserMeta);
                    } else {
                        context.commit("SetUserMeta", null);
                    }
                    context.commit("SetAvatarLoaded",true);
                }
            })
    }
};


function decryptTokenFunc(secret_key , token){
    jwt.verify(token, secret_key, (err, user) => {
        if (!err) {
            state.user_id = user.data.id;
            state.IsUserAuthenticated = (state.user_id !== '');
        }
    });
}

export default {
    state,
    getters,
    mutations,
    actions
};
