<template>
  <!-- content-Start -->
  <div class="m-auto w-75">
    <section class="panel_content">
      <h5 class="panelTitle">لیست دسته بندیها</h5>
      <hr>
      <div class="row">
        <div class="articleList">
          <form action="#" class="form-row bg-light p-3">
            <div class="form-group" style="position: relative">
              <label for="search">جستجو</label>
              <input class="form-control" type="text" v-model="filterByName"
                     id="search" placeholder="عنوان دسته بندی را وارد کنید">
              <i class="material-icons" v-if="filterByName" @click="clearInput()"
                 :style="ClearInputStyles">close</i>
            </div>
          </form>

          <div class="table-responsive my-4">
            <table class="table table-hover table-sm table-light"
                   id="tbl_categories" ref="tbl_categories">
              <thead class="thead-inverse">
              <tr>
                <th style="width: 15%">ردیف</th>
                <th style="width: 20%">نام دسته</th>
                <th style="width: 20%">دسته مادر </th>
                <th style="width: 30%">عملیات</th>
              </tr>
              </thead>
              <tbody class="bg-light" v-if="CategoriesList.length!==0">
              <tr v-for="(category,index) in CategoriesList" :key="category.id">
                <!--<tr v-for="(category,index) in CategoriesList.filter(cat => !cat.name.indexOf(this.filterByName))" :key="category.id">-->
                <td >{{ ++index }}</td>
                <td>{{ category.name }}</td>
                <td v-if="category.Parent!==null">{{ category.Parent.name }}</td>
                <td v-else>---</td>
                <td>
                  <router-link :to="{ name: 'edit-category' , params:{catId:category.id} }"
                               class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored bg-info">
                    ویرایش
                  </router-link>
                  <button  @click.prevent="deleteCat(category.id)"
                           class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored bg-danger">
                    حذف</button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  </div>
  <!-- content-End -->
</template>

<!--<script type="text/javascript" src="<%= BASE_URL %>libs/data-table/jquery.dataTables.min.js" defer></script>-->

<script>
    import $ from 'jquery';
    require('../../../../public/libs/data-table/jquery.dataTables.min');

    export default {
        data(){
            return{
                filterByName:''
            }
        },
        created(){
            this.$store.dispatch('GetCategories');
        },
       mounted(){
           $(this.$refs.tbl_categories).dataTable({
               paginate: true,
               scrollY: 300
           });
       },
        computed:{
            CategoriesList(){
                return this.$store.getters.GetCategories;
            },
            ClearInputStyles(){
                return{
                    position: 'absolute',
                    left: '5px',
                    top: '50px',
                    color: '#757575',
                    cursor: 'pointer'
                }
            }
        },
        methods:{
            deleteCat(category_id){
                this.$store.dispatch('DeleteCategoy' , category_id);
            },
            clearInput(){
                this.filterByName='';
            }
        }
    };
</script>

