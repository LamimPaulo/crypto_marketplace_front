<template>
    <div>
        <!-------------------- START - Mobile Menu -------------------->
        <div class="menu-mobile menu-activated-on-click color-scheme-light">
            <div class="mm-logo-buttons-w">
                <a class="mm-logo" href="/dashboard"><img
                        src="https://s3.amazonaws.com/navi-public/api/clients/3/cbed47c0-5323-4873-baf7-0284f80bbf0a.png"></a>
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
                        <img :src="require(`@/assets/img/avatar-dev.png`)" :alt="this.$store.state.user.name"
                             class="avatar">
                    </div>
                    <div class="logged-user-info-w">
                        <div class="logged-user-name">
                            {{ this.$store.state.user.name }}
                        </div>
                        <div class="logged-user-role">
                            {{ this.$store.state.user.level.name }}
                        </div>

                        <div class="logged-user-role">
                            {{ this.$store.state.user.username }}
                        </div>
                    </div>
                </div>
                <!-------------------- START - Mobile Menu List -------------------->
                <menu-list></menu-list>

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

        <!-------------------- START - Main Menu -------------------->
        <div
                class="menu-w selected-menu-color-light menu-has-selected-link menu-activated-on-click color-scheme-light color-style-default sub-menu-color-light menu-position-side menu-side-left menu-layout-compact sub-menu-style-inside">
            <!-- <div class="logo-w">
              <a class="logo" href="/dashboard">
                <img src="https://s3.amazonaws.com/navi-public/api/clients/3/cbed47c0-5323-4873-baf7-0284f80bbf0a.png" class="logo">
              </a>
            </div>

            <div class="logged-user-w avatar-inline">
              <div class="logged-user-i">
                <div class="avatar-w">
                  <img alt="" src="../../assets/img/avatar-dev.png">
                </div>
                <div class="logged-user-info-w">
                  <div class="logged-user-name">
                    {{ this.$store.state.user.name }}
                  </div>
                  <div class="logged-user-role">
                    {{ this.$store.state.user.level.name }}
                  </div>
                </div>
                <div class="logged-user-toggler-arrow">
                  <div class="os-icon os-icon-chevron-down"></div>
                </div>
                <DropdownProfile></DropdownProfile>

              </div>
            </div> -->

            <h1 class="menu-page-header">
                ...
            </h1>

            <menu-list></menu-list>

        </div>
        <!-------------------- END - Main Menu -------------------->
    </div>
</template>

<script>
	import DropdownProfile from './DropdownProfile'
	import MenuList from './MenuList'

	export default {
		name: "Menubar",
		components: {
			DropdownProfile,
			MenuList
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
    .menu-w .logo-w img {
        width: 85px;
    }

    .menu-w {
        height: 100%;
        min-width: 260px;
    }

    .menu-w.menu-layout-compact {
        -webkit-box-flex: 0;
        -ms-flex: 0 0 260px;
        flex: 0 0 260px;
    }
</style>
