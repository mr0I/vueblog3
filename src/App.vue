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
    import AppHeader from '@/components/AppHeader';
    import AppFooter from '@/components/AppFooter';
    import toastr from 'toastr';

    export default {
        components: {
            appHeader: AppHeader,
            appFooter: AppFooter
        },
        data(){
            return {
                timer: null,
                idleTimer: Number(process.env.VUE_APP_DEFAULT_IDLE_TIME) // seconds
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
        created(){
           window.addEventListener('scroll', this.handleEvent);
           window.addEventListener('click', this.handleEvent);
        },
        methods:{
            handleEvent() {
                this.idleTimer = Number(process.env.VUE_APP_DEFAULT_IDLE_TIME);
            }
        },
        mounted: function () {
            this.timer = setInterval(() => {
                if (this.IsUserAuthenticated) this.idleTimer -= 1;
                    if (this.idleTimer <= 0) {
                        toastr.warning('خروج به دلیل عدم فعالیت!!!','اوپس :-(');
                        this.$store.dispatch("SignOutUser");
                        this.idleTimer = Number(process.env.VUE_APP_DEFAULT_IDLE_TIME);
                    }
            }, 1000);
        },
        beforeUnmount() {
            clearInterval(this.timer);
            window.removeEventListener('scroll', this.handleEvent);
            window.removeEventListener('click', this.handleEvent);
        }
    }
</script>

<style>

</style>
