<template>
  <!-- content-Start -->
  <div class="m-auto w-75">
    <section class="panel_content">
      <h5 class="panelTitle">افزودن دسته بندی</h5>
      <hr>
      <div class="row">
        <div class="formAdd">
          <form action="#" class="form-row p-3 bg-light justify-content-center" method="post">
            <div class="form-group required col-md-4">
              <label class="mainLabel" for="name">نام دسته</label>
              <input class="form-control" type="text" id="name" v-model="name">
            </div>
            <div class="form-group required col-md-4">
              <label class="mainLabel" for="submitted">مادر دسته</label>
              <select class="form-control" id="submitted" v-model="parent_id">
                <option value="0" selected>---</option>
                <option :value="category.id" v-for="category in headCats" :key="category.id">
                  {{ category.name }}
                </option>
              </select>
            </div>

            <div class="form-group my-3 col-12">
              <button type="submit" @click.prevent="AddCategory()" ref="edit_category_submit_btn"
                      class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored bg-secondary w-25" disabled>ثبت</button>
            </div>
          </form>
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
                parent_id:''
            }
        },
        computed:{
            // headCats(){
            //     return this.$store.getters.GetHeadCats;
            // },
            fromChangeChecking(){
                return this.name!=='' && this.parent_id!=='';
            }
        },
        created() {
            //this.$store.dispatch('GetHeadCatsFromServer');
        },
        watch:{
            fromChangeChecking(value) {
                this.$refs.edit_category_submit_btn.disabled = !value;
            }
        },
        methods:{
            AddCategory(){
                const catData ={
                    name:this.name,
                    parent_id:this.parent_id
                };
                this.$store.dispatch('StoreCategory' , catData);
            }
        }
    };
</script>

