<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "Master",
    computed: {
      loggedIn() {
        return this.$store.getters.loggedIn
      }
    }
  }
</script>

<style>
  @import "https://fonts.googleapis.com/css?family=Rubik:300,400,500";
  @import "../../../node_modules/select2/dist/css/select2.min.css";
  @import "../../../node_modules/bootstrap-daterangepicker/daterangepicker.css";
  @import "../../../node_modules/datatables-bootstrap/css/dataTables.bootstrap.min.css";
  @import "../../../node_modules/fullcalendar/dist/fullcalendar.min.css";
  @import "../../../node_modules/perfect-scrollbar/css/perfect-scrollbar.css";
  @import "../../../node_modules/slick-carousel/slick/slick.css";
  @import "../../assets/css/main.css";

  #app {
    /*min-height: 100vh;*/
  }

</style>
