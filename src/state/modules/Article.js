import axios from "axios";
import Swal from "sweetalert2";
import router from '../../Routes';



const state = {
    loading: true,
    Articles:{},
    ArticlesPaginate:{},
    Article:{},
    userArticles:{},
    isArticleLoaded:false
};


const getters = {
    GetLoading(state){
        return state.HeadCats;
    },
    GetArticles(state) {
        return state.Articles;
    },
    GetArticlesPaginate(state) {
        return state.ArticlesPaginate;
    },
    GetArticle(state) {
        return state.Article;
    },
    GetUserArticles(state) {
        return state.userArticles;
    },
    GetisArticleLoaded(state) {
        return state.isArticleLoaded;
    }
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
    },
    SetUserArticles(state, articles) {
        state.userArticles = articles;
    },
    SetisArticleLoaded(state, statues) {
        state.isArticleLoaded = statues;
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
        axios.get('article/articlesList?page='+ data.page + '&user_id=' + data.user_id)
            .then(articles => {
                console.log('articles',articles);
                const perPage = (articles.data.articles.rows).length;
                const count = articles.data.articles.count;

                const articlesPaginate = {
                  'current_page' : data.page,
                  'last_page' : Math.ceil(count / perPage),
                  'per_page' : perPage
                };

                context.commit('SetUserArticles' ,articles.data.articles.rows);
                context.commit('SetArticlesPaginate' ,articlesPaginate);
            });
    },

    GetArticleFromServer(context,article_id){
        axios.get('articles/' + article_id)
            .then(res => {
                context.commit('SetArticle' ,res.body);
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
            axios.post('uploadArticleImg' , data.articleData.image , config)
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

    resetIsArticleLoaded(context){
        context.commit('SetisArticleLoaded' ,false);
    }
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
    axios.put('articles/' + article_data.id , article_data)
        .then(response => {
            if (response.status === 200 && response.body.result === 'Done') {
                Swal.fire({
                    title: 'Success',
                    text: 'مقاله ویرایش شد.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
            }
        });
}

export default {
    state,
    getters,
    mutations,
    actions
};
