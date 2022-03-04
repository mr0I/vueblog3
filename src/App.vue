<template>
  <div id="app">
    <app-header v-if="currentRouteName !== '404'" :idleTimer="this.idleTimer"></app-header>
    <transition enter-active-class="animated fadeIn">
      <router-view></router-view>
    </transition>
    <app-footer v-if="currentRouteName !== '404'"></app-footer>
  </div>
</template>

<script>
    import AppHeader from './components/AppHeader';
    import AppFooter from './components/AppFooter';
    import toastr from 'toastr';


    export default {
        components: {
            appHeader: AppHeader,
            appFooter: AppFooter
        },
        data(){
            return {
                timer: null,
                idleTimer: 10 // seconds
            }
        },
        created(){
            if (this.IsUserAuthenticated) {
                window.addEventListener('scroll', this.handleScroll);
            }
        },
        methods:{
            handleScroll () {
                this.idleTimer = 10;
            }
        },
        computed:{
            currentRouteName() {
                return this.$route.name;
            },
            IsUserAuthenticated() {
                return this.$store.getters.IsUserAuthenticated;
            }
        },
        mounted: function () {
            this.timer = setInterval(() => {
                if (this.IsUserAuthenticated) this.idleTimer -= 1;
                    if (this.idleTimer <= 0) {
                        toastr.warning('خروج به دلیل عدم فعالیت!!!','اوپس :-(');
                        this.$store.dispatch("SignOutUser");
                        this.idleTimer = 10;
                    }
            }, 1000);
        },
        beforeUnmount() {
            clearInterval(this.timer)
        }
    }
</script>

<style>

</style>
