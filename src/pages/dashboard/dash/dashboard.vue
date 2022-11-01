<template>
  <div class="container-fluid">
    <section class="panel_content">
      <h1>پنل مدیریت</h1>
      <hr>
      <transition enter-active-class="animated fadeIn">
        <router-view></router-view>
      </transition>
    </section>
  </div>
</template>


<script>
    require('../../../../public/js/preloader');


    export default {
    }
</script>