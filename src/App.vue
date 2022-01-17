<template>
  <div id="app">
    <app-header v-if="currentRouteName !== '404'"></app-header>
    <transition enter-active-class="animated fadeIn">
      <router-view></router-view>
    </transition>
    <app-footer v-if="currentRouteName !== '404'"></app-footer>
  </div>
</template>

<script>
  import AppHeader from './pages/site/shared/header';
  import AppFooter from './pages/site/shared/footer';

  export default {
    components: {
      appHeader: AppHeader,
      appFooter: AppFooter
    },
    computed:{
      currentRouteName() {
        return this.$route.name;
      }
    }
  }
</script>

<style>

</style>
