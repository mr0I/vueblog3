<template>
  <!-- content-Start -->
  <div class="container">
    <section class="panel_content">
      <h5 class="panelTitle">افزودن مقاله</h5>
      <hr>
      <div class="row">
        <div class="formAdd">
          <form action="#" class="form-row p-3 bg-light" method="post">
            <div class="form-group required col-md-6 mt-3">
              <label class="mainLabel" for="title">عنوان</label>
              <input class="form-control" type="text" id="title" v-model="title">
            </div>
            <div class="form-group col-md-6 mt-3">
              <label class="mainLabel" for="article_image">لینک تصویر پروفایل</label>
              <input type="file" class="form-control" name="profile_pic" id="article_image"
                     @change="previewImage($event)" accept="image/*">
              <img :src="preview_image" class="uploading-image my-3" width="150" alt="prev_image" />
            </div>
            <div class="form-group required col-md-12 mt-3">
              <label class="mainLabel" for="desc">توضیحات</label>
              <textarea class="form-control" id="desc" v-model="desc"></textarea>
            </div>
            <div class="form-group required col-md-4 mt-3">
              <label class="mainLabel" for="submitted">وضعیت انتشار</label>
              <select class="form-control" id="submitted" v-model="submitted">
                <option disabled selected value="0">---</option>
                <option value="true">منتشر شده</option>
                <option value="false">منتشر نشده</option>
              </select>
            </div>
            <div class="form-group required col-md-4 mt-3">
              <label class="mainLabel" for="is_favorite" >علاقه مندی</label>
              <select class="form-control" id="is_favorite" v-model="isfavorite ">
                <option disabled selected value="0">---</option>
                <option value="true">هست</option>
                <option value="false">نیست</option>
              </select>
            </div>
            <div class="form-group required col-md-4 mt-3">
              <label class="mainLabel" for="category_id">دسته بندی</label>
              <select class="form-control" id="category_id" v-model="category_id">
                <option v-for="(category,index) in categories" :key="category.id"
                        :value="category.id" :selected="(index===0)? 'selected' : '' ">
                  {{ category.name }}
                </option>
              </select>
            </div>
            <div class="form-group col-12 my-3">
              <button type="submit" @click.prevent="AddArticle()"
                      class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored bg-secondary w-25">ثبت</button>
            </div>
          </form>
        </div>
      </div>

  </section>
  </div>
  <!-- content-End -->
</template>


<script>
  export default {
      data(){
          return{
              title:'',
              image:'',
              desc:'',
              submitted:'',
              isfavorite :'',
              category_id:'',
              preview_image:'',
              img_event:''
          }
      },
      created(){
        this.$store.dispatch("GetSubCatsFromServer");
      },
      computed:{
          categories(){
              return this.$store.getters.GetSubCats;
          }
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
          AddArticle(){
              let image_data = new FormData();
              if(this.img_event!==''){
                  const image = this.img_event.target.files[0];
                  image_data.append('name', image.name);
                  image_data.append('file', this.img_event.target.files[0]);
              }

              const data={
                  articleData :{
                      user_id:this.$store.getters.GetUserID,
                      title:this.title,
                      image:(this.img_event!=='')? image_data : '',
                      desc:this.desc,
                      submitted:(this.submitted === 'true'),
                      isfavorite:(this.isfavorite === 'true'),
                      category_id:this.category_id,
                  },
                  is_file_uploaded: this.img_event !== ''
              };

              this.$store.dispatch('StoreArticle' , data);
          }
      },
  }
</script>