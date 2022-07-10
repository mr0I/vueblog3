import axios from "axios";
import Swal from "sweetalert2";
import router from '../../Routes';
import { VueCookieNext } from 'vue-cookie-next';


const state = {
    loading: true,
    Articles:{},
    ArticlesPaginate:{},
    Article:{},
    userArticles:{},
    isArticleLoaded:false,
    SearchedArticles: {}
};


const getters = {
    GetLoading: state => state.HeadCats,
    GetArticles: state => state.Articles,
    GetArticlesPaginate: state => state.ArticlesPaginate,
    GetArticle: state => state.Article,
    GetUserArticles: state => state.userArticles,
    GetisArticleLoaded: state => state.isArticleLoaded,
    GetSearchedArticles: state => state.SearchedArticles,
};

const mutations = {
    SetArticles(state, articles) {
        state.Articles = articles;
        state.loading = false;
    },
    SetArticlesPaginate(state, paginateData) {
        state.ArticlesPaginate = paginateData;
    },
    SetArticle(state, article) {
        state.Article = article;
        //Object.assign(state,article);
    },
    SetUserArticles(state, articles) {
        state.userArticles = articles;
    },
    SetisArticleLoaded(state, statues) {
        state.isArticleLoaded = statues;
    },
    SetSearchedArticles(state,articles){
        state.SearchedArticles = articles;
    }
};

const actions = {
    GetArticlesFromServer(context , page){
        axios.get('articles?page=' + page)
            .then(res => {
                return res.json();
            }).then(data=>{
            context.commit('SetArticles' ,data);
        })
    },

    GetUserArticles(context , data){
        GetUserArticlesFunc(context,data.page,data.user_id);
    },

    GetArticleFromServer(context,article_id){
        axios.get('article/single_article/' + article_id)
            .then(res => {
                context.commit('SetArticle' ,res.data.article);
                context.commit('SetisArticleLoaded' ,true);
            })
    },

    StoreArticle(context,data){
        if (data.is_file_uploaded){
            const config = {
                headers: { 'content-type': 'multipart/form-data' }
            };
            axios.post('article/uploadArticleImg' , data.articleData.image , config)
                .then(response => {
                    data.articleData.image = response.data.image;
                    if (response.status === 200 && response.data.result === 'Done') {
                        addArticle(data.articleData);
                    }
                });
        } else {
            addArticle(data.articleData);
        }

    },

    EditArticle(context,data){
        if (data.is_file_uploaded){
            const config = {
                headers: { 'content-type': 'multipart/form-data' }
            };
            axios.post('article/uploadArticleImg' , data.articleData.image , config)
                .then(response => {
                    data.articleData.image = response.data.image;
                    if (response.status === 200 && response.data.result === 'Done') {
                        updateArticle(data.articleData)
                    }
                });
        } else {
            updateArticle(data.articleData)
        }
    },

    DeleteArticle(context,data) {
        if (confirm('Sure?')){
            axios.delete(`article/remove/${data.article_id}`)
                .then(response => {
                    console.log('del',response);
                    if (response.status === 200 && response.data.result === 'Done') {
                        Swal.fire({
                            title: 'Success',
                            text: 'مقاله پاک شد.',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        });
                        GetUserArticlesFunc(context,1,data.user_id);
                    }
                });
        }
    },
    resetIsArticleLoaded(context){
        context.commit('SetisArticleLoaded' ,false);
    },

    searchArticle(context,sq){
        axios.get('article/search?q=' + sq)
            .then(res => {
                if (res.status === 201) {
                    alert('input error!');
                } else {
                    context.commit('SetSearchedArticles',res.data.articles);
                    router.push({ name: "search-articles", query: {q: sq} });
                }
            });
    },
};


function addArticle(article_data) {
    axios.post('article/articles',article_data)
        .then(res => {
            if (res.status === 200 && res.data.result === 'Done') {
                Swal.fire({
                    title: 'Success',
                    text: 'مقاله جدید ثبت شد.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            }
            router.push({name:'dash-articles'});
        })
}
function updateArticle(article_data) {
    const articleID = article_data.id;
    for (let [key,] of Object.entries(article_data)) {
        if (key && key=='id'){
            delete article_data[key];
        }
    }

    axios.put(`article/articles/${articleID}` , article_data)
        .then(response => {
            if (response.status === 200 && response.data.result === 'Done') {
                Swal.fire({
                    title: 'Success',
                    text: 'مقاله ویرایش شد.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
            }
        });
}
function GetUserArticlesFunc(context,page=1,user_id) {
    axios.get('article/articlesList?page='+ page + '&user_id=' + user_id,{
        headers:{Authorization:'Bearer '+VueCookieNext.getCookie(process.env.VUE_APP_AUTH_COOKIE_NAME)}
    }).then(articles => {
        const perPage = process.env.VUE_APP_DEFAULT_LIMIT;
        const count = articles.data.articles.count;

        const articlesPaginate = {
            'current_page' : parseInt(page),
            'last_page' : Math.ceil(count / perPage),
            'per_page' : perPage
        };

        context.commit('SetUserArticles' ,articles.data.articles.rows);
        context.commit('SetArticlesPaginate' ,articlesPaginate);
    });

}

export default {
    state,
    getters,
    mutations,
    actions
};
