<template>
    <!-- content-Start -->
    <section class="article_content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-8 col-sm-12">

                    <div v-if="loading">Loading...</div>
                    <div v-else>
                        <div class="card article" v-for="article in articles.data" :key="article.id">
                            <div class="card-header">
                                <h5>{{ article.title }}</h5>
                            </div>
                            <div class="card-body">
                                <a href="#">
                                    <img class="article_mainPhoto" alt="aticle_image"
                                         :src="uploadDir + 'articles_images/' + article.image">
                                </a>
                                <p class="card-text text-justify">
                                    {{ article.desc }}
                                </p>
                            </div>
                            <div class="card-footer">
                                <ul class="list-inline">
                                    <li class="list-inline-item">
                                        <i class="material-icons">account_box</i><span>{{ article.user.name }}</span>
                                    </li>
                                    <li class="list-inline-item">
                                        <i class="material-icons">visibility</i><span>21</span>
                                    </li>
                                  <li class="list-inline-item">
                                    <i class="material-icons">date_range</i>
                                    <span>{{ (new Date(article.created_at)).toLocaleDateString('fa-IR' , { year: 'numeric', month: 'long', day: 'numeric' }) }}</span>
                                  </li>
                                    <li class="list-inline-item">
                                        <i class="material-icons">favorite_border</i><span>33</span>
                                    </li>
                                </ul>
                                <span class="more">
								<a href="single.html" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--primary">ادامه مطلب</a>
							</span>
                            </div>
                        </div>
                    </div>
                    <!--<div v-if="(articles.data).length == 0">-->
                    <!--مطلبی برای نمایش وجود ندارد!-->
                    <!--</div>-->
                  
                  <pagination align="center" :data="articles" @pagination-change-page="Articles"></pagination>
                </div>


                <div class="col-md-4 col-sm-12">
                    <aside>
                        <div class="card">
                            <div class="card-header">
                                <h6><i class="material-icons align-middle">list</i>دسته بندی ها </h6>
                            </div>
                            <div class="card-body">
                                <ul class="category" id="indexCats">
                                    <p class="mb-3" v-for="(headCat,index) in headCats" :key="headCat.id">
										<span>
											<a :href="'#Section'+index" data-toggle="collapse" class="cat-header">
												{{ headCat.name }}
											</a>
											<li :id="'Section'+index" class="collapse mr-4" data-parent="#indexCats">
												<ul>
													<li v-for="subCat in subCats" :key="subCat.id">
														<a href="#" class="cat-item" v-if="subCat.parent_id===headCat.id">
                                                          <span>{{ subCat.name }}</span>
                                                        </a>
													</li>
												</ul>
											</li>
										</span>
                                    </p>

                                    <!--<p class="mb-3">-->
										<!--<span>-->
											<!--<a href="#Section1" data-toggle="collapse" class="cat-header">-->
												<!--برنامه نویسی موبایل-->
											<!--</a>-->
											<!--<li id="Section1" class="collapse mr-4" data-parent="#indexCats">-->
												<!--<ul>-->
													<!--<li >-->
														<!--<a href="#" class="cat-item"><span>Android studio</span></a>-->
													<!--</li>-->
													<!--<li >-->
														<!--<a href="#" class="cat-item"><span>ios</span></a>-->
													<!--</li>-->
													<!--<li >-->
														<!--<a href="#" class="cat-item"><span>windows phone</span></a>-->
													<!--</li>-->
												<!--</ul>-->
											<!--</li>-->
										<!--</span>-->
                                    <!--</p>-->
                                    <!--<p class="mb-3">-->
										<!--<span>-->
											<!--<a href="#Section2" data-toggle="collapse" class="cat-header">-->
												<!--برنامه نویسی وب-->
											<!--</a>-->
											<!--<li id="Section2" class="collapse mr-4" data-parent="#indexCats">-->
												<!--<ul>-->
													<!--<li >-->
														<!--<a href="#" class="cat-item"><span>html</span></a>-->
													<!--</li>-->
													<!--<li >-->
														<!--<a href="#" class="cat-item"><span>css</span></a>-->
													<!--</li>-->

												<!--</ul>-->
											<!--</li>-->
										<!--</span>-->
                                    <!--</p>-->
                                </ul>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    </section>
    <!-- content-End -->
</template>


<script>
  //import pagination from 'laravel-vue-pagination';

    export default {
        components:{
            //pagination
        },
        computed:{
            articles(){
                return this.$store.getters.GetArticles;
            },
            loading(){
                return this.$store.getters.GetLoading;
            },
            uploadDir(){
                return process.env.VUE_APP_UPLOAD_DIR;
            },
            subCats(){
                return this.$store.getters.GetSubCats;
            },
            headCats(){
                return this.$store.getters.GetHeadCats;
            }
        },
        created() {
            // this.$store.dispatch("GetSubCatsFromServer");
            // this.$store.dispatch("GetHeadCatsFromServer");
            //
            // this.Articles();
        },
        methods:{
             Articles(page=1){
                this.$store.dispatch('GetArticlesFromServer',page);
            }
        }
    }
</script>