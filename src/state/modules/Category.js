import Swal from "sweetalert2";
import router from '../../Routes';
import axios from 'axios';


const state = {
    HeadCats:{},
    SubCats:{},
    Categories:{},
    Category:{},
    is_edit_data_ready : false
};


const getters = {
    GetHeadCats(state){
        return state.HeadCats;
    },
    GetSubCats(state){
        return state.SubCats;
    },
    GetCategories(state){
        return state.Categories;
    },
    GetCategory(state){
        return state.Category;
    },
    GetIsEditDataReady(state){
        return state.is_edit_data_ready;
    }
};

const mutations = {
    SetHeadCats(state, cats) {
        state.HeadCats = cats;
    },
    SetSubCats(state, cats) {
        state.SubCats = cats;
    },
    SetCategories(state,cats){
        state.Categories = cats;
    },
    SetCategory(state,cat){
        state.Category = cat;
    },
    SetIsEditDataReady(state , condition){
        state.is_edit_data_ready = condition;
    }
};

const actions = {
    GetHeadCatsFromServer(context){
        axios.get('headCats')
            .then(response => {
                if (response.status === 200) {
                    context.commit("SetHeadCats" , response.body.cats);
                }
            });
    },
    GetSubCatsFromServer(context){
        axios.get('subCats')
            .then(response => {
                if (response.status === 200) {
                    context.commit("SetSubCats" , response.body.cats);
                }
            });
    },

    StoreCategory(context , catData) {
        axios.post('category/categories' , catData)
            .then(response => {
                if (response.status === 200 && response.data.result === 'Done') {
                    Swal.fire({
                        title: 'Success',
                        text: 'دسته جدید ثبت شد.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    router.push({name:'dash-categories'});
                }
            });
    },

    GetCategories(context) {
        GetCategoriesFunc(context);
    },

    GetSelectedCategory(context , category_id) {
        axios.get('categories/' + category_id)
            .then(response => {
                if (response.status === 200 && response.body.result === 'Done') {
                    context.commit("SetCategory" , JSON.parse(response.body.category));
                    context.commit("SetIsEditDataReady" , true);
                }
            });
    },

    ResetIsEditDataReady(context,condition){
        context.commit("SetIsEditDataReady" , condition);
    },

    EditCategory(context , catData){
        axios.put('categories/' + catData.id , catData)
            .then(response => {
                if (response.status === 200 && response.body.result === 'Done') {
                    Swal.fire({
                        title: 'Success',
                        text: 'دسته ویرایش شد.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                }
            });
    },

    DeleteCategoy(context,cat_id){
        if (confirm('Sure?')){
            axios.delete('categories/' + cat_id)
                .then(response => {
                    console.log(response);
                    if (response.status === 200 && response.body.result === 'Done') {
                        Swal.fire({
                            title: 'Success',
                            text: 'دسته پاک شد.',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        });
                        GetCategoriesFunc(context);
                    }
                });
        }
    }
};

function GetCategoriesFunc(context) {
    axios.get('categories')
        .then(res => {
            return res.json();
        }).then(data=>{
        context.commit('SetCategories' ,data);
    })
}

export default {
    state,
    getters,
    mutations,
    actions
};
