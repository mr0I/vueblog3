<template>
  <!-- content-Start -->
  <section class="search_content">
    <div class="container-fluid">
      <div class="row">
        <h4 class="p-2 m-auto w-50 text-secondary">جستجو برای : <span>آموزش html</span></h4>
       <div class="col-10 m-auto" v-if="searchedArticles.length === 0">
         <div class="alert alert-warning my-4 text-center"><p>نتیجه ای یافت نشد!</p></div>
       </div>
        <div class="col-10 m-auto" v-else>
          <div class="card my-4" v-for="article in searchedArticles" :key="article.id">
            <div class="card-header list-inline">
              <h6 class="list-inline-item ">{{ article.title }}</h6>
              <router-link :to=" '/article/' + article.slug "
                           class="mdl-button mdl-js-button mdl-button--accent mdl-js-ripple-effect list-inline-item float-left">
                ادامه مطلب
                <i class="material-icons">keyboard_arrow_left</i>
              </router-link>
            </div>
            <div class="card-body">
              <article>
                <p class="card-text text-justify">{{ (article.desc).substr(0,50) + '...' }}</p>
                <router-link :to=" '/article/' + article.slug ">
                  <img :src="uploadDir + 'article_images/' + article.image">
                </router-link>
              </article>
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
        computed:{
            searchedArticles(){
                return this.$store.getters.GetSearchedArticles;
            },
            uploadDir(){
                return process.env.VUE_APP_UPLOAD_DIR;
            }
        }
    }
</script>