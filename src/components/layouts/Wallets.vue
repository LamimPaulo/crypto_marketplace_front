<template>

    <div class="container mt-3 mb-3">
      <div class="loader" v-if="loader"></div>

      <top-menu-user></top-menu-user>

      <top-menu></top-menu>

      <vue-headful title="Transações" description="Liquidex"/>

      <div class="all-wrapper with-side-panel solid-bg-all">
        <div class="layout-w">
          <sidebar></sidebar>
          <div class="content-w">

            <!-- <topbar></topbar> -->

            <div class="content-i">
              <div class="content-box">
                <router-view></router-view>
              </div>
            </div>

          </div>
        </div>
        <div class="display-type"></div>
      </div>
       <Footer></Footer>
  </div>


</template>

<script>
  import Menubar from './menu/Menubar'
	import Sidebar from './menu/Sidebar'
	import PieChart from './charts/PieChart';
	import TopMenu from './menu/TopMenu';
  import TopMenuUser from './menu/TopMenuUser';    
	import Footer from './layouts/Footer';

  export default {
    name: "Wallets",
    components: {
      TopMenu,
			TopMenuUser,
      Menubar,
      Footer,
			Sidebar
    },
    data() {
      return {}
    },
    methods: {},
    mounted() {

    },
    beforeCreate: function () {
      document.body.className = 'menu-position-side menu-side-left full-screen with-content-panel';
    }
  }

</script>

<style scoped>

</style>
