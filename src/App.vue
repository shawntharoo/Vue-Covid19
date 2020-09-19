<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-8 col-md-offset-2">
                <h1>Demo Presentation</h1>
                <router-view name="header-top"></router-view>
                <hr>
                <router-view></router-view>
                <router-view name="header-bottom"></router-view>
            </div>
        </div>
    </div>
</template>

<script>

    export default {

    }
</script>

<style>
</style>
