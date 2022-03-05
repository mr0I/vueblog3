<template>
  <!-- content-Start -->
  <section class="main_content">
    <div class="container-fluid">
      <div class="row">
        <div style="width: 80%;margin:auto 10%;">
          <div class="card text-center">
            <div class="card-header">
              <h5>ورود به سایت</h5>
            </div>
            <div class="card-body">
              <div class="formAdd">
                <form action="#" class="form-control" method="post" style="border:none;">

                  <div class="d-flex flex-wrap justify-content-center">
                    <div class="input-group my-4 mr-sm-2 w-50">
                      <div class="input-group-prepend">
                        <div class="input-group-text"><i class="material-icons">email</i></div>
                      </div>
                      <input type="email" class="form-control" placeholder="ایمیل" v-model="email" name="email">
                    </div>
                  </div>
                  <div class="d-flex flex-wrap justify-content-center">
                    <div class="input-group my-4 mr-sm-2 w-50">
                      <div class="input-group-prepend"><div class="input-group-text"><i class="material-icons">vpn_key</i></div></div>
                      <input type="password" class="form-control" placeholder="رمز عبور" v-model="password"
                             >
                    </div>
                  </div>

                  <input type="submit" class="btn btn-success w-50 my-4"
                         @click.prevent="LoginUser()" id="login_submit" value="ورود">

                </form>
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
    export default {
        data(){
            return{
                email:'',
                password:''
            }
        },
        methods:{
            async LoginUser(){
                const login_data = {
                    email: this.email,
                    password: this.password
                };
                this.$store.dispatch("LoginUser", login_data);
            },
        }
    }
</script>