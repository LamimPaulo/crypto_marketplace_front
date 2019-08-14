<template>
    <div class="container mt-3 mb-3">
        <top-menu-user></top-menu-user>

        <top-menu></top-menu>

        <vue-headful title="Transações" description="Liquidex"/>
        <div class="all-wrapper with-side-panel solid-bg-all">
            <div class="layout-w">
                <sidebar></sidebar>
                <div class="content-w">

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
	import Sidebar from './../menu/Sidebar'
	import TopMenu from './../menu/TopMenu';
	import TopMenuUser from './../menu/TopMenuUser';
	import Footer from './Footer';

	export default {
		name: "Transactions",
		components: {
			TopMenu,
			TopMenuUser,
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
    .layout-w {
        /*min-height: 100vh;*/
    }
</style>
