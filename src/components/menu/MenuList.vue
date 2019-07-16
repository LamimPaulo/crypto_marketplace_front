<template>
    <ul class="main-menu">
        <li class="selected" v-tooltip.right="'Dashboard'">
            <router-link to="/dashboard">
                <div class="icon-w">
                    <div class="os-icon os-icon-layout"></div>
                </div>
                <span>Dashboard</span>
            </router-link>
        </li>
        <li class="" v-tooltip.right="'Carteiras'">
            <router-link to="/wallets/list">
                <div class="icon-w">
                    <div class="os-icon os-icon-wallet-loaded"></div>
                </div>
                <span>Carteiras</span>
            </router-link>
        </li>
        <li class="" v-tooltip.right="'Transações'">
            <router-link to="/transactions/list">
                <div class="icon-w">
                    <div class="os-icon os-icon-refresh-cw"></div>
                </div>
                <span>Transações</span>
            </router-link>
        </li>

        <li class="" v-tooltip.right="'Masternode'">
            <router-link to="/masternode">
                <div class="icon-w">
                    <div class="os-icon os-icon-zap"></div>
                </div>
                <span>Masternode</span>
            </router-link>
        </li>

        <li class="" v-tooltip.right="'Investimentos'">
            <router-link to="/index/fund">
                <div class="icon-w">
                    <div class="os-icon os-icon-target"></div>
                </div>
                <span>Investimentos</span>
            </router-link>
        </li>

        <li class="" v-tooltip.right="'Nanotech'">
            <router-link to="/nanotech">
                <div class="icon-w">
                    <div class="os-icon os-icon-activity"></div>
                </div>
                <span>Nanotech</span>
            </router-link>
        </li>

        <li class="" v-tooltip.right="'Mining'">
            <router-link to="/mining">
                <div class="icon-w">
                    <div class="fa fa-calculator"></div>
                </div>
                <span>Mining</span>
            </router-link>
        </li>


    </ul>
</template>

<script>
	import {mapGetters} from 'vuex'

	export default {
		name: "MenuList",
		computed: {
			...mapGetters([
				'user'
			]),
		}
	}
</script>

<style scoped>
    .menu-w .logo-w img {
        width: 85%;
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
