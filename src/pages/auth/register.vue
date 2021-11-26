<template>

    <!-- content-Start -->
    <section class="main_content">
        <div class="container-fluid">
            <div class="row">
                <div style="width: 80%;margin:auto 10%;">
                    <div class="card text-center">
                        <div class="card-header">
                            <h5>ثبت نام</h5>
                        </div>
                        <div class="card-body">
                            <div class="formAdd">
                                <form action="#" id="signupFrm" class="form-control" method="post" style="border:none;">
                                    <div class="d-flex flex-wrap justify-content-center">
                                        <div class="input-group my-4 mr-sm-2 w-50">
                                            <div class="input-group-prepend"><div class="input-group-text"><i class="material-icons">person</i></div></div>
                                            <input type="text" class="form-control" placeholder="نام" name="name" v-model="name">
                                        </div>
                                    </div>
                                    <div class="d-flex flex-wrap justify-content-center">
                                        <div class="input-group my-4 mr-sm-2 w-50">
                                            <div class="input-group-prepend"><div class="input-group-text"><i class="material-icons">email</i></div></div>
                                            <input type="email" class="form-control" placeholder="ایمیل*" v-model="email"
                                                   >
                                        </div>
                                        <!--<div class="errors w-50 p-2" v-if="$v.email.$invalid && $v.email.$dirty">-->
                                            <!--<small class="float-right text-danger" v-if="!$v.email.required && $v.email.$dirty">-->
                                                <!--فیلد ایمیل را تکمیل کنید.-->
                                            <!--</small>-->
                                            <!--<br>-->
                                            <!--<small class="float-right text-danger" v-if="!$v.email.email">-->
                                                <!--ایمیل معتبر نیست.-->
                                            <!--</small>-->
                                            <!--<br>-->
                                            <!--<small class="float-right text-danger" v-if="!$v.email.maxLength">-->
                                                <!--ایمیل کاربر نمیتواند بیشتر از {{$v.email.$params.maxLength.max}} کاراکتر داشته باشد-->
                                            <!--</small>-->
                                            <!--<br>-->
                                            <!--<small class="float-right text-danger" v-if="!$v.email.unique && $v.email.$dirty">-->
                                                <!--ایمیل وارد شده تکراری میباشد-->
                                            <!--</small>-->
                                        <!--</div>-->
                                    </div>
                                    <div class="d-flex flex-wrap justify-content-center">
                                        <div class="input-group my-4 mr-sm-2 w-50">
                                            <div class="input-group-prepend"><div class="input-group-text"><i class="material-icons">vpn_key</i></div></div>
                                            <input type="password" class="form-control" placeholder="رمز عبور*" v-model="password">
                                        </div>
                                        <!--<div class="errors w-50 p-2" v-if="$v.password.$invalid && $v.password.$dirty">-->
                                            <!--<small class="float-right text-danger" v-if="!$v.password.required && $v.password.$dirty">-->
                                                <!--لطفا کلمه عبور را وارد کنید-->
                                            <!--</small>-->
                                            <!--<br>-->
                                            <!--<small class="float-right text-danger" v-if="!$v.password.minLength">-->
                                                <!--کلمه عبور باید حداقل شامل {{$v.password.$params.minLength.min}} کاراکتر باشد-->
                                            <!--</small>-->
                                            <!--<br>-->
                                            <!--<small class="float-right text-danger" v-if="!$v.password.maxLength">-->
                                                <!--کلمه عبور کاربر نمیتواند بیشتر از {{$v.password.$params.maxLength.max}} کاراکتر داشته باشد-->
                                            <!--</small>-->
                                        <!--</div>-->
                                    </div>
                                    <div class="d-flex flex-wrap justify-content-center">
                                        <div class="input-group my-4 mr-sm-2 w-50">
                                            <div class="input-group-prepend"><div class="input-group-text"><i class="material-icons">vpn_key</i></div></div>
                                            <input type="password" class="form-control" placeholder="تکرار رمز عبور*" v-model="password_confirmation"
                                            >
                                        </div>
                                        <!--<div class="errors w-50 p-2" v-if="$v.password_confirmation.$invalid && $v.password_confirmation.$dirty">-->
                                            <!--<small class="float-right text-danger" v-if="!$v.password_confirmation.sameAs && $v.password_confirmation.$dirty">-->
                                                <!--کلمه عبور مغایرت دارد-->
                                            <!--</small>-->
                                        <!--</div>-->
                                    </div>
                                    <input type="submit" :value="!isFormSubmitted? 'ثبت نام' : 'در حال ارسال...' " class="btn btn-primary w-50 my-4"
                                    @click.prevent="RegisterUser()" >
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <!--<div style="direction:ltr">{{$v}}</div>-->
            </div>
        </div>
    </section>
    <!-- content-End -->

</template>

<script>
    // import {required, maxLength, email, minLength, sameAs} from "vuelidate/lib/validators";
    export default {
        data(){
            return{
                name:'',
                email:'',
                password:'',
                password_confirmation: ''
            }
        },
        computed:{
            isFormSubmitted(){
                return this.$store.getters.IsFormSubmitted;
            }
        },
        methods:{
            RegisterUser(){
                const register_data = {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.password_confirmation
                };
                this.$store.dispatch("RegisterUser", register_data);
            }
        },
    }
</script>