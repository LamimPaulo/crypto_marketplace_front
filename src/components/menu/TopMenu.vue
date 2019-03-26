<template>
  <div>
     <!-------------------- START - Mobile Menu -------------------->
    <div class="menu-mobile menu-activated-on-click color-scheme-white">
      <div class="mm-logo-buttons-w">
        <a class="mm-logo" href="/dashboard"><img src="https://s3.amazonaws.com/navi-public/api/clients/3/cbed47c0-5323-4873-baf7-0284f80bbf0a.png"></a>
        <div class="mm-buttons">
          <div class="content-panel-open">
            <div class="os-icon os-icon-grid-circles"></div>
          </div>
          <div class="mobile-menu-trigger">
            <div class="os-icon os-icon-hamburger-menu-1"></div>
          </div>
        </div>
      </div>
      <div class="menu-and-user">
        <div class="logged-user-w">
          <div class="avatar-w">
            <img :src="require(`@/assets/img/avatar-dev.png`)" :alt="this.$store.state.user.name" class="avatar">
          </div>
          <div class="logged-user-info-w">
            <div class="logged-user-name">
              {{ this.$store.state.user.name }}
            </div>
            <div class="logged-user-role">
              {{ this.$store.state.user.level.name }}
            </div>
          </div>
        </div>
        <!-------------------- START - Mobile Menu List -------------------->
        <top-menu-list></top-menu-list>

        <ul class="main-menu">
          <li class="selected" v-tooltip.right="'Perfil'">
            <a href="/profile">
              <div class="icon-w">
                <div class="os-icon os-icon-user-male-circle2"></div>
              </div>
              <span>Detalhes do Perfil</span>
            </a>
          </li>

          <li class="">
            <a href="/payment-accounts" v-tooltip.right="'Dados de Pagamento'">
              <div class="icon-w">
                <div class="os-icon os-icon-coins-4"></div>
              </div>
              <span>Dados de Pagamento</span>
            </a>
          </li>

          <li class="">
            <a href="/user-configs" v-tooltip.right="'Configurações'">
              <div class="icon-w">
                <div class="os-icon os-icon-settings"></div>
              </div>
              <span>Configurações</span>
            </a>
          </li>

          <li class="" v-tooltip.right="'Sair'">
            <a href="/logout">
              <div class="icon-w">
                <div class="os-icon os-icon-signs-11"></div>
              </div>
              <span>Sair</span>
            </a>
          </li>

        </ul>

        <!-------------------- END - Mobile Menu List -------------------->
      </div>
    </div>
    <!-------------------- END - Mobile Menu -------------------->
    <div class="menu-w color-scheme-light color-style-default menu-position-top menu-layout-compact sub-menu-style-over sub-menu-color-bright selected-menu-color-bright menu-activated-on-hover menu-has-selected-link">
        <h1 class="menu-page-header">Liquidex</h1>

        <top-menu-list></top-menu-list>
    </div>
  </div>
</template>

<script>
  import DropdownProfile from './DropdownProfile'
  import TopMenuList from './TopMenuList'

  export default {
    name: "TopMenu",
    components: {
      DropdownProfile,
      TopMenuList
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
</style>
