<template>
    <div>
        <!-------------------- START - Mobile Menu -------------------->
        <div class="menu-mobile menu-activated-on-click color-scheme-white">
            <div class="mm-logo-buttons-w">
                <div class="mm-buttons">
                    <div class="content-panel-open">
                        <div class="os-icon os-icon-grid-circles"></div>
                    </div>
                    <div class="mobile-menu-trigger pulse">
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
                    </div>
                </div>
                <!-------------------- START - Mobile Menu List -------------------->
                <top-menu-list></top-menu-list>

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
	import {mapGetters} from 'vuex'
	import DropdownProfile from './DropdownProfile'
	import TopMenuList from './TopMenuList'
    import Topbar from './Topbar'

	export default {
		name: "TopMenu",
		components: {
			DropdownProfile,
			TopMenuList,
            Topbar
		},
		computed: {
			...mapGetters([
				'user'
			]),
		},
		beforeCreate() {
			this.$store.dispatch('retrieveUser')
		}
	}
</script>

<style scoped>
    .pulse {
        padding: 20px;
        border-radius: 50%;
        position: relative;
        background: rgba(62, 75, 90, 0.26);
        -webkit-box-shadow: 0 0 0 0 rgba(62, 75, 90, 0.26);
        box-shadow: 0 0 0 0 rgba(62, 75, 90, 0.26);
        background-size: cover;
        background-repeat: no-repeat;
        cursor: pointer;
        -webkit-animation: pulse 1.25s infinite cubic-bezier(.66, 0, 0, 1);
        animation: pulse 1.25s infinite cubic-bezier(.66, 0, 0, 1);
    }

    .pulse:hover {
        -webkit-animation: none;
        animation: none;
    }

    @-webkit-keyframes pulse {
        to {
            -webkit-box-shadow: 0 0 0 15px rgba(232, 76, 61, 0);
            box-shadow: 0 0 0 15px rgba(232, 76, 61, 0);
        }
    }

    @keyframes pulse {
        to {
            -webkit-box-shadow: 0 0 0 15px rgba(232, 76, 61, 0);
            box-shadow: 0 0 0 15px rgba(232, 76, 61, 0);
        }
    }
</style>
