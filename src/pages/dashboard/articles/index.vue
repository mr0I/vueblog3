<template>
  <!--<strong>{{ articles }}</strong>-->

  <div class="m-auto w-75">
    <h5 class="panelTitle">لیست مقالات</h5>
    <hr>
    <div class="row">
      <div class="articleList">
        <form action="#" class="form-row p-3 bg-light">
          <div class="form-group col-md-4">
            <label for="search">جستجو</label>
            <input class="form-control" type="text" id="search" placeholder="عنوان مقاله را وارد کنید">
          </div>
          <div class="form-group col-md-4">
            <label for="isSumitted">وضعیت انتشار</label>
            <select class="form-control" id="isSumitted">
              <option disabled selected>---</option>
              <option>منتشر شده</option>
              <option>منتشر نشده</option>
            </select>
          </div>
        </form>
        <div class="table-responsive my-4" v-if="articles.length!==0">
          <table class="table table-hover table-sm table-light" id="tbl_articles" >
            <thead class="thead-inverse">
            <tr>
              <th style="width: 10%;">
                <input type="checkbox" name="">
              </th>
              <th style="width: 10%">ردیف</th>
              <th style="width: 20%">عنوان</th>
              <th style="width: 40%">توضیحات</th>
              <th style="width: 20%">عملیات</th>
            </tr>
            </thead>
            <tbody class="bg-light">
            <tr v-for="(article,index) in articles" :key="article.id">
              <td >
                <input type="checkbox" name="">
              </td>
              <td >{{ ++index }}</td>
              <td>{{ article.title }}</td>
              <td class="articleDesc">{{ (article.desc).substr(0,50) + '...' }}</td>
              <td >
                <button @click.prevent="GetArticleFromServer(article.id)" data-toggle="modal" data-target="#editModal"
                        class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored bg-info">ویرایش</button>
                <a href="#" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored bg-danger">حذف</a>
              </td>
            </tr>
            </tbody>
          </table>

          <ul v-if="articles" class="pagination">
            <li v-if="articlesPaginate.current_page !== 1" :class="{'disabled':articlesPaginate.current_page === 1}" class="page-item first-item">
              <router-link :to="{ query: { page: 1 }}" class="page-link">اولین صفحه</router-link>
            </li>
            <li v-if="articlesPaginate.current_page !== 1" :class="{'disabled':articlesPaginate.current_page === 1}" class="page-item previous-item">
              <router-link :to="{ query: { page: articlesPaginate.current_page - 1 }}" class="page-link">قبلی</router-link>
            </li>
            <li v-for="page in pages" :key="page" :class="{'active':articlesPaginate.current_page === page}" class="page-item number-item">
              <router-link :to="{ query: { page: page }}" class="page-link">{{page}}</router-link>
            </li>
            <li v-if="articlesPaginate.current_page !== articlesPaginate.last_page" :class="{'disabled':articlesPaginate.current_page === articlesPaginate.last_page}" class="page-item next-item">
              <router-link :to="{ query: { page: articlesPaginate.current_page + 1 }}" class="page-link">بعدی</router-link>
            </li>
            <li v-if="articlesPaginate.current_page !== articlesPaginate.last_page" :class="{'disabled':articlesPaginate.current_page === articlesPaginate.last_page}" class="page-item last-item">
              <router-link :to="{ query: { page: articlesPaginate.last_page }}" class="page-link">آخرین صفحه</router-link>
            </li>
          </ul>
          
          <div class="modal fade" id="editModal" tabindex="-1" role="dialog"
               aria-labelledby="exampleModalLabel" aria-hidden="true">
            <modal-window v-bind="singleArticle"  @is_article_loaded="resetIsArticleLoaded"></modal-window>
          </div>
        </div>

        <div v-else>
          <div class="alert alert-warning text-center">مقاله ای یافت نشد!</div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
 import ModalWindow from '../../modals/edit_article_modal';

  export default {
    data(){
      return{
        pages: [],
        title:'',
        image:'',
        desc:'',
        submitted:'',
        isfavorite :'',
        category_id:'',
        preview_image:'',
        img_event:'',
        articleId:''
      }
    },
    components:{
      ModalWindow
    },
    created(){
      this.Articles();
      this.$store.dispatch("GetSubCatsFromServer");
    },
    watch: {
      articles(){
        this.setPages();
      },
      $route() {
        this.Articles(this.$route.query.page);
      }
    },
    methods:{
      setPages(){
        let numberOfPages = Math.ceil((this.articlesPaginate).last_page / (this.articlesPaginate).per_page);
        this.pages = [];
        for (let index = 1; index <= numberOfPages; index++) {
          this.pages.push(index);
        }
      },
      Articles(page=1){
        const data={
          user_id: this.$store.getters.GetUserID,
          page: page
        };
        this.$store.dispatch('GetUserArticles',data);
      },
      async previewImage(e) {
        const image = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = e =>{
          this.preview_image = e.target.result;
        };
        this.img_event = e;
      },
      GetArticleFromServer(article_id){
        this.articleId=article_id;
        this.$store.dispatch("GetArticleFromServer",article_id);
      },
      resetIsArticleLoaded(){
        this.$store.dispatch("resetIsArticleLoaded");
      }
    },
    computed:{
      articles(){
        return this.$store.getters.GetUserArticles;
      },
      articlesPaginate(){
        return this.$store.getters.GetArticlesPaginate;
      },
      singleArticle(){
        return this.$store.getters.GetArticle;
      },
      categories(){
        return this.$store.getters.GetSubCats;
      }
    }
  }
</script>