<template>
  <div>
    <vue-headful title="Transações" description="Navi Capital"
    />
    <div class="all-wrapper with-side-panel solid-bg-all">
      <div class="layout-w">
        <menubar></menubar>
        <div class="content-w">

          <topbar></topbar>

          <div class="content-panel-toggler">
            <i class="os-icon os-icon-grid-squares-22"></i><span>Menu</span>
          </div>

          <div class="content-i">
            <div class="content-box">
              <router-view></router-view>
            </div>
            <sidebar></sidebar>
          </div>

        </div>
      </div>
      <div class="display-type"></div>
    </div>
  </div>
</template>

<script>
  import Topbar from '../menu/Topbar'
  import Menubar from '../menu/Menubar'
  import Sidebar from '../menu/Sidebar'

  export default {
    name: "Transactions",
    components: {
      Topbar,
      Menubar,
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
.layout-w{
  min-height: 100vh;
}
</style>
