<template>
    <div>
        <div class="banner top-bar">
            <div class="diamond">
                <div></div>
            </div>
            <div class="container">
                <div class="row">

                    <div class="col-3">
                        <router-link to="/dashboard">
                            <h1 class="my-5">
                                <img src="https://liquidex.com.br/assets/img/logo_w.png" style="width: 200px">
                            </h1>
                        </router-link>
                    </div>
                    <div class="col-9 d-flex justify-content-end">
                        <div class="top-menu-controls">
                            <!--------------------START - Notification System-------------------->
                            <dropdown-messages></dropdown-messages>
                            <!--------------------END - Notification System-------------------->
                            
                            <!--------------------START - User avatar and menu in secondary top menu-------------------->
                            <dropdown-profile></dropdown-profile>
                            <!--------------------END - User avatar and menu in secondary top menu-------------------->

                        </div>
                        <!--------------------END - Top Menu Controls-------------------->
                    </div>


                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import DropdownProfile from './DropdownProfile'
    import DropdownMessages from './DropdownMessages'
    import MenuList from './MenuList'

    export default {
        name: "TopMenuUser",
        components: {
            MenuList,
            DropdownProfile,
            DropdownMessages
        },
        data() {
            return {}
        },
        beforeCreate() {
            this.$store.dispatch('retrieveUser')
        }
    }
</script>

<style scoped>
    .banner {
        position: relative;
        background-color: #3E4B5B;
        width: 100%;
        height: 200px;
        /*margin-top: 10px;*/
    }

    /*.banner .text {*/
    /*    position: absolute;*/
    /*    margin-top: 25px;*/
    /*    margin-left: 40px;*/
    /*}*/

    .diamond {
        position: absolute;
        background-color: rgba(0,0,0,.1);
        width: 60%;
        height: 200px;
        right: 0;
        -moz-transition: width 2s;
        -o-transition: width 2s;
        -webkit-transition: width 2s;
        transition: width 2s;
    }

    .diamond:before {
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        top: 0;
        left: -100px;
        border-right: 100px solid rgba(0,0,0,.1);
        border-bottom: 100px solid rgba(0,0,0,0);
    }

    .diamond div:before {
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        bottom: 0;
        left: -100px;
        border-right: 100px solid rgba(0,0,0,.1);
        border-top: 100px solid rgba(0,0,0,0);
    }

    .banner:hover .diamond {
        width: 25%;
    }
</style>
