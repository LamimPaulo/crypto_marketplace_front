<template>
  <div class="all-wrapper solid-bg-all">
    <vue-headful title="Seu Perfil" description="Liquidex"
    />

    <div class="layout-w">
      <menubar></menubar>
      <div class="content-w">

        <topbar></topbar>

        <div class="content-i">
          <router-view></router-view>
        </div>

      </div>
    </div>
    <div class="display-type"></div>
  </div>
</template>

<script>
  import Menubar from '../menu/Menubar'
  import Topbar from '../menu/Topbar'
  import Sidebar from '../menu/Sidebar'

  export default {
    name: "User",
    components: {
      Menubar,
      Sidebar,
      Topbar
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
