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
                <Form class="form-control" id="signupFrm"
                      style="border:none;" v-slot="{ errors , meta }" :validation-schema="regSchema">
                  <div class="d-flex flex-wrap justify-content-center mb-4">
                    <div class="input-group mr-sm-2 w-50">
                      <div class="input-group-prepend"><div class="input-group-text"><i class="material-icons">person</i></div></div>
                      <Field class="form-control" name="name" v-model="name" placeholder="نام" />
                    </div>
                    <div class="errors w-50 m-auto text-right text-danger">
                      <small>{{ errors.name }}</small>
                    </div>
                  </div>
                  <div class="d-flex flex-wrap justify-content-center mb-4">
                    <div class="input-group mr-sm-2 w-50">
                      <div class="input-group-prepend"><div class="input-group-text"><i class="material-icons">email</i></div></div>
                      <Field class="form-control" name="email" v-model="email" placeholder="ایمیل*" />
                    </div>
                    <div class="errors w-50 m-auto text-right text-danger">
                      <small>{{ errors.email }}</small>
                    </div>
                  </div>
                  <div class="d-flex flex-wrap justify-content-center mb-4">
                    <div class="input-group mr-sm-2 w-50">
                      <div class="input-group-prepend"><div class="input-group-text"><i class="material-icons">vpn_key</i></div></div>
                      <Field type="password" class="form-control" name="password" v-model="password" placeholder="رمز عبور*" />
                    </div>
                    <div class="errors w-50 m-auto text-right text-danger">
                      <small>{{ errors.password }}</small>
                    </div>
                  </div>
                  <div class="d-flex flex-wrap justify-content-center mb-4">
                    <div class="input-group mr-sm-2 w-50">
                      <div class="input-group-prepend"><div class="input-group-text"><i class="material-icons">vpn_key</i></div></div>
                      <Field type="password" class="form-control" name="password_confirmation"
                             v-model="password_confirmation" placeholder="تکرار رمز عبور*" />
                    </div>
                    <div class="errors w-50 m-auto text-right text-danger">
                      <small>{{ errors.password_confirmation }}</small>
                    </div>
                  </div>

                  <input type="submit" :value="!isFormSubmitted? 'ثبت نام' : 'در حال ارسال...' " class="btn btn-primary w-50 my-4"
                         @click.prevent="RegisterUser()" :disabled="!meta.dirty || (Object.keys(errors).length!==0 || !isFormDirty) ">
                </Form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- content-End -->

</template>

<script>
    import { Field, Form , configure } from 'vee-validate';
    import * as yup from 'yup';
    // Default values
    configure({validateOnBlur: true, validateOnChange: true, validateOnInput: true, validateOnModelUpdate: false,});


    export default {
        data(){
            const regSchema = yup.object({
                name: yup.string(),
                email: yup.string().required('فیلد ایمیل الزامی است')
                    .email('ایمیل معتبر نیست!').min(8,'حداقل 8 حرف وارد کنید'),
                password: yup.string().required('فیلد پسورد الزامی است').min(6,'حداقل 6 حرف وارد کنید'),
                password_confirmation: yup.string().oneOf([yup.ref('password'), null], 'پسوردها مطابقت ندارند!')
            });

            return{
                name:'',
                email:'',
                password:'',
                password_confirmation: '',
                regSchema
            }
        },
        components:{
            Field,Form
        },
        computed:{
            isFormSubmitted(){
                return this.$store.getters.IsFormSubmitted;
            },
            isFormDirty(){
                return (this.email !== '' && this.password !== '' && this.password_confirmation !== '');
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