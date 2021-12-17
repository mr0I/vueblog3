<template>
  <!-- content-Start -->
  <div class="m-auto w-75">
    <section class="panel_content">
      <h5 class="panelTitle">ویرایش دسته بندی</h5>
      <hr>
      <div class="row">
        <div class="formAdd">
          <form action="#" v-if="is_edit_data_ready"
                class="form-row p-3 bg-light justify-content-center" method="post">
            <div class="form-group required col-md-4">
              <label class="mainLabel" for="name">نام دسته</label>
              <input class="form-control" type="text" id="name" @input="changeName"
                     :value="GetCategory.name">
            </div>
            <div class="form-group required col-md-4">
              <label class="mainLabel" for="submitted">مادر دسته</label>
              <select class="form-control" id="submitted" @input="changeParentID" >
                <option value="0">---</option>
                <option :value="category.id" v-for="category in headCats" :key="category.id"
                        :selected="(GetCategory.parentId==category.id)" >
                  {{ category.name }}
                </option>
              </select>
            </div>

            <div class="form-group my-3 col-12">
              <button type="submit" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored bg-secondary w-25"
                      @click.prevent="EditCategory(category_id)">
                ویرایش
              </button>
              <router-link :to="{ name: 'dash-categories' }" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored bg-danger w-25 mx-2">بازگشت</router-link>
            </div>
          </form>
          <div v-else>
            Loading...
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
                name:'',
                parent_id:'',
                category_id: this.$route.params.catId,
            }
        },
        computed:{
            headCats(){
                return this.$store.getters.GetHeadCats;
            },
            is_edit_data_ready(){
                return this.$store.getters.GetIsEditDataReady;
            },
            GetCategory(){
                return this.$store.getters.GetCategory;
            }
        },
         created() {
            this.$store.dispatch('GetHeadCatsFromServer');
            this.$store.dispatch("GetSelectedCategory", this.$route.params.catId);
        },
        methods:{
            changeName(event){this.name = event.target.value;},
            changeParentID(event){this.parent_id = event.target.value;},
            EditCategory(category_id){
                const catData = {
                    id:category_id,
                    name:(this.name!=='')? this.name : (this.$store.getters.GetCategory).name,
                    parent_id:(this.parent_id!=='')? this.parent_id : (this.$store.getters.GetCategory).parent_id,
                };
                this.$store.dispatch('EditCategory' , catData);
            }
        },
        beforeRouteLeave(to, from, next) {
                if (confirm('آیا مطمئن هستید؟')) {
                    next();
                    this.$store.dispatch('ResetIsEditDataReady' , false);
                } else {
                    next(false);
                }
        }
    };
</script>


<style>
  button:disabled{
    cursor: not-allowed !important;
  }
  td a{
    border-radius: 0 !important;
  }
</style>

