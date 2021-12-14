<template>
  <!-- content-Start -->
  <section class="panel_content">
    <div class="container-fluid">
      <h5 class="panelTitle">ویرایش پروفایل</h5>
      <hr>
      <div class="row">
        <div class="formAdd">
          <form action="#" class="form-row p-3 bg-light" method="post" enctype="multipart/form-data">
            <div class="form-group col-md-6 mt-3">
              <label class="mainLabel" for="name">نام</label>
              <input class="form-control" id="name" v-model="name" />
            </div>

            <div class="form-group col-md-6 mt-3">
              <label class="mainLabel" for="gender">جنسیت</label>
              <select class="form-control" id="gender" v-model="gender">
                <option value="male" :selected="gender=='male'">مرد</option>
                <option value="female" :selected="gender=='female'">زن</option>
              </select>
            </div>

            <div class="form-group col-md-6 mt-3">
              <label class="mainLabel" for="imageProfile">لینک تصویر پروفایل</label>
              <input type="file" class="form-control" name="profile_pic" id="imageProfile"
                       @change="previewImage($event)" accept="image/*">
              <img :src="preview_image" class="uploading-image my-3 rounded-circle" width="150" alt="prev_image" />
              <button type="button" @click.prevent="uploadImage()"
                      class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored bg-secondary">
                آپلود
              </button>
            </div>

            <div class="form-group col-12 my-3">
              <button type="submit" @click.prevent="profile_submit()"
                      class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored bg-secondary">
                ثبت
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>

</template>


<script>
    export default {
        data(){
            return{
                preview_image:'',
                name: '',
                gender: '',
                profile_pic : '',
                img_event : ''
            }
        },
        created(){
            this.preview_image = (this.$store.getters.GetUserAvatar === '') ?
                process.env.VUE_APP_DEFAULT_images_DIR +'default/default-avatar.jpg' :
                this.$store.getters.GetUserAvatar;
            this.name = (this.$store.getters.GetUserFullName === '')? '': this.$store.getters.GetUserFullName;
            this.gender = (this.$store.getters.GetUserGender === '')? 'male': this.$store.getters.GetUserGender;
        },
        methods:{
            async previewImage(e) {
                const image = e.target.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(image);
                reader.onload = e =>{
                    this.preview_image = e.target.result;
                };
                this.img_event = e;
            },
            async uploadImage(){
                const image = this.img_event.target.files[0];
                let image_data = new FormData();
                image_data.append('name', image.name);
                image_data.append('file', this.img_event.target.files[0]);

                this.$store.dispatch("uploadImage", image_data );
            },
            async profile_submit(){
                const profile_data={
                    name: this.name,
                    gender: this.gender,
                };
                this.$store.dispatch("profileSubmit", profile_data );
            }
        }
    }
</script>