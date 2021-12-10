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
            <table class="table table-hover table-sm table-light" id="tbl_categories">
              <thead class="thead-inverse">
              <tr>
                <th style="width: 15%">ردیف</th>
                <th style="width: 20%">نام دسته</th>
                <th style="width: 20%">دسته مادر </th>
                <th style="width: 30%">عملیات</th>
              </tr>
              </thead>
              <tbody class="bg-light" v-if="CategoriesList.length!==0">
              <tr v-for="(category,index) in CategoriesList" :key="category.uuid">
              <!--<tr v-for="(category,index) in CategoriesList.filter(cat => !cat.name.indexOf(this.filterByName))" :key="category.uuid">-->
                <td >{{ ++index }}</td>
                <td>{{ category.name }}</td>
                <td>sdad</td>
                <!--<td>{{ category.get_parent.name }}</td>-->
                <td>
                  <router-link :to="{ name: 'edit-category' , params:{catId:category.uuid} }"
                               class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored bg-info">
                    ویرایش</router-link>
                  <button  @click.prevent="deleteCat(category.uuid)"
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


<script>
    export default {
        data(){
          return{
              filterByName:''
          }
        },
        created(){
             this.$store.dispatch('GetCategories');
             console.log(this.CategoriesList);
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

