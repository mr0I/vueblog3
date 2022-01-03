<template>


    <span>test</span>
    <span>{{ title }}</span>
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">ویرایش مقاله</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" @click="UpdateTable()">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div v-if="!isArticleLoaded" class="modal-loading">isloading...</div>
                    <div v-else class="formEdit">
                        <form action="#" class="form-row p-3 bg-light" method="post" enctype="multipart/form-data">
                            <div class="form-group required col-md-6 mt-3">
                                <label class="mainLabel" for="title">عنوان</label>
                                <input class="form-control" type="text" id="title"
                                       :value="title" @input="changeTitle">
                            </div>
                            <div class="form-group col-md-6 mt-3">
                                <label class="mainLabel" for="article_image">لینک تصویر پروفایل</label>
                                <input type="file" class="form-control" name="profile_pic" id="article_image"
                                       @change="previewImage($event)" accept="image/*">
                                <img :src="preview_image" class="uploading-image my-3" width="150" alt="prev_image"
                                v-if="preview_image!=='' "/>
                                <img :src="uploadDir + 'article_images/' + image" v-else
                                     class="uploading-image my-3" width="150" alt="prev_image" />
                            </div>
                            <div class="form-group required col-md-12 mt-3">
                                <label class="mainLabel" for="desc">توضیحات</label>
                                <textarea class="form-control" id="desc" :value="desc" @input="changeDesc"></textarea>
                            </div>
                            <div class="form-group required col-md-4 mt-3">
                                <label class="mainLabel" for="submitted">وضعیت انتشار</label>
                                <select class="form-control w-100" id="submitted" @change="changeSubmitted">
                                    <option disabled selected value="0">---</option>
                                    <option value="true" :selected="submitted==1">منتشر شده</option>
                                    <option value="false" :selected="submitted==0">منتشر نشده</option>
                                </select>
                            </div>
                            <div class="form-group required col-md-4 mt-3">
                                <label class="mainLabel" for="is_favorite" >علاقه مندی</label>
                                <select class="form-control w-100" id="is_favorite" @change="changeIsFavorite">
                                    <option disabled selected value="0">---</option>
                                    <option value="true" :selected="isfavorite==1">هست</option>
                                    <option value="false" :selected="isfavorite==0">نیست</option>
                                </select>
                            </div>
                            <div class="form-group required col-md-4 mt-3">
                                <label class="mainLabel" for="category_id">دسته بندی</label>
                                <select class="form-control w-100" id="category_id" @change="changeCategoryId">
                                    <option v-for="category in categories" :key="category.id" :value="category.id"
                                            :selected="(category.id===category_id)">
                                        {{ category.name }}
                                    </option>
                                </select>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="UpdateTable()">بستن</button>
                    <button type="button" @click.prevent="EditArticle()" class="btn btn-primary mx-1">ویرایش</button>
                </div>
            </div>
        </div>
</template>

<script>
    export default {
        data(){
            return{
                preview_image:'',
                img_event:'',
                articleId:'',
                edited_title:'',
                edited_desc:'',
                edited_submitted:'',
                edited_isfavorite:'',
                edited_category_id:''
            }
        },
        props:{
            title:String,
            desc:String,
            submitted:Number,
            isfavorite:Number,
            category_id:Number,
            id:Number,
            image:String
        },
        computed:{
            categories(){
                return this.$store.getters.GetSubCats;
            },
            uploadDir(){
                return process.env.VUE_APP_UPLOAD_DIR;
            },
            isArticleLoaded(){
                return this.$store.getters.GetisArticleLoaded;
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
            changeTitle(event){this.edited_title = event.target.value;},
            changeDesc(event){this.edited_desc = event.target.value;},
            changeSubmitted(event){this.edited_submitted = event.target.value;},
            changeIsFavorite(event){this.edited_isfavorite = event.target.value;},
            changeCategoryId(event){this.edited_category_id = event.target.value;},
            EditArticle(){
                let image_data = new FormData();
                if(this.img_event!==''){
                    const image = this.img_event.target.files[0];
                    image_data.append('name', image.name);
                    image_data.append('file', this.img_event.target.files[0]);
                }

                const data ={
                    articleData : {
                        id:this.id,
                        user_id:this.$store.getters.GetUserID,
                        title:(this.edited_title!=='')? this.edited_title : this.title,
                        desc:(this.edited_desc!=='')? this.edited_desc : this.desc,
                        image:(this.img_event!=='')? image_data : this.image,
                        submitted:(this.edited_submitted!=='')? (this.edited_submitted==='true')? 'true' : 'false' : this.submitted,
                        isfavorite:(this.edited_isfavorite!=='')? (this.edited_isfavorite==='true')? 'true' : 'false' : this.isfavorite,
                        category_id:(this.edited_category_id!=='')? this.edited_category_id : this.category_id,
                    },
                    is_file_uploaded: this.img_event !== ''
                };

                this.$store.dispatch('EditArticle' , data );
            },
            UpdateTable(){
                const data={
                    user_id: this.$store.getters.GetUserID,
                    page: 1
                };
                this.$store.dispatch('GetUserArticles',data);
                this.$emit("is_article_loaded",false);
            }
        }

    }
</script>

<style type="text/css">
    .modal-content{
        height: 400px;
        overflow: auto;
    }
    .modal-loading{
        position: absolute;
        left: 0;
        width: 100%;
        text-align: center;
        top: 50%;
    }
</style>