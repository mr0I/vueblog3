<template>
    <!-- Footer-Start -->
    <footer class="text-center" v-if="currentRoutePath.indexOf('dashboard') === -1 ">
        <div >
            <ul >
                <li><a href="#">Help</a></li>
                <li><a href="#">Privacy & Terms</a></li>
            </ul>
        </div>
    </footer>
    <!-- Footer-End -->
</template>


<script>
    export default {
        computed:{
            currentRoutePath() {
                return this.$route.path;
            }
        }
    }
</script>

