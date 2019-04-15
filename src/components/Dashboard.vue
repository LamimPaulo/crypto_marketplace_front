<template>
    <div class="container mt-3 mb-3">
        <div class="loader" v-if="loader"></div>

        <top-menu-user></top-menu-user>

        <top-menu></top-menu>
        
        <vue-headful title="Dashboard Liquidex" description="Liquidex"/>
        <div class="all-wrapper with-side-panel solid-bg-all">
            <div class="layout-w">


                <sidebar></sidebar>

                <div class="content-w">

                    <!-- <topbar></topbar> -->

                    <div class="content-i">
                        <!--Content-->
                        <div class="content-box">

                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="element-wrapper compact pt-2">
                                        <h6 class="element-header">
                                            Dashboard
                                        </h6>
                                        <div class="element-box-tp">

                                            <div class="row">
                                                <div class="col-6 col-sm-3 col-xxl-2" v-for="wallet in wallets">
                                                    <a class="element-box el-tablo centered trend-in-corner smaller mb-3"
                                                       :href="`/wallet/f/${wallet.abbr}`" v-if="!wallet.is_crypto">
                                                        <div class="pt-avatar-w">
                                                            <img alt="" width="30vw"
                                                                 :src="require(`@/assets/img/${wallet.icon}`)">
                                                        </div>
                                                        <div class="label mt-2">
                                                            <strong>{{ wallet.name}}</strong><br/>
                                                        </div>
                                                        <div class="value" v-if="wallet.abbr==='BRL'">
                                                            R$ {{ parseFloat(wallet.wallets[0].balance_rounded) | currency}}
                                                        </div>
                                                        <div class="value" v-else>
                                                            $ {{ wallet.wallets[0].balance_rounded}}
                                                        </div>
                                                    </a>

                                                    <a class="element-box el-tablo centered trend-in-corner smaller mb-3"
                                                       :href="`/wallet/c/${wallet.abbr}`" v-else>
                                                        <div class="pt-avatar-w">
                                                            <img alt="" width="30vw"
                                                                 :src="require(`@/assets/img/${wallet.icon}`)">
                                                        </div>
                                                        <div class="label mt-2">
                                                            <strong>{{ wallet.name}}</strong><br/>
                                                        </div>
                                                        <div class="value">
                                                            {{ wallet.wallets[0].balance_rounded}}
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="element-wrapper compact pt-4">
                                        <h6 class="element-header">
                                            Meus Investimentos
                                        </h6>
                                        <div class="element-box-tp">
                                            <div class="row">
                                                <div class="col-sm-4">
                                                    <table class="table table-clean">
                                                        <thead>
                                                        <tr>
                                                            <th>Alocação por Produto</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr>
                                                            <td>
                                                                <pie-chart ref="chartComponent"></pie-chart>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div class="col-sm-8">
                                                    <table class="table table-clean">
                                                        <thead>
                                                        <tr>
                                                            <th></th>
                                                            <th>Produto</th>
                                                            <th>BTC</th>
                                                            <th v-if="user.country_id===31">BRL</th>
                                                            <th v-if="user.country_id!==31">USD</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr v-for="(product, i) in products">
                                                            <td></td>
                                                            <td><span
                                                                    :class="'marker-left color-' + i">{{product.name}}</span>
                                                            </td>
                                                            <td>{{product.value_btc}}</td>
                                                            <td v-if="user.country_id===31">R$ {{product.value_brl}}
                                                            </td>
                                                            <td v-else>$ {{product.value_usd}}</td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td class="text-center">Total</td>
                                                            <td>
                                                                <button class="btn btn-primary">{{product_total.total_btc}} BTC</button>
                                                            </td>
                                                            <td v-if="user.country_id===31">
                                                                <button class="btn btn-success">R$ {{product_total.total_brl}}</button>
                                                            </td>
                                                            <td v-else>
                                                                <button class="btn btn-success">$ {{product_total.total_usd}}</button>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--Content-end-->


                    </div>

                </div>
            </div>
            <div class="display-type"></div>
        </div>

        <Footer></Footer>

    </div>
</template>

<script>
	import Sidebar from './menu/Sidebar'
	import PieChart from './charts/PieChart';
	import TopMenu from './menu/TopMenu';
    import TopMenuUser from './menu/TopMenuUser';    
	import Footer from './layouts/Footer';
	import {mapGetters} from 'vuex'

	export default {
		name: "Dashboard",
		components: {
            PieChart,
            TopMenu,
			TopMenuUser,
            Footer,
			Sidebar
		},
		data() {
			return {
				wallets: [],
				products: [],
				product_total: {
					total_btc: 0,
					total_brl: 0,
					total_usd: 0,
				},
				chart: [1, 2, 3, 4],
				count: null,
				loader: true,
			}
		},
		methods: {
			retrieveWallets() {
				this.$store.dispatch('retrieveWallets')
					.then(response => {
						this.wallets = response.data.wallets
						this.count = response.data.count
						this.loader = false
					})
					.catch(error => {
						if (error.response) {
							this.handleErrors(error.response)
						}
					})
			},
			retrieveProducts() {
				this.$store.dispatch('retrieveDashboard')
					.then(response => {
						this.chart = response.data.chart
						this.$refs.chartComponent.setData(this.chart)
						this.products = response.data.products
						this.product_total = response.data.product_total
					})
					.catch(error => {
						if (error.response) {
							this.handleErrors(error.response)
						}
					})
			},
		},
		mounted() {
			this.retrieveWallets()
			this.retrieveProducts()
		},
		beforeCreate: function () {
			document.body.className = 'menu-position-side menu-side-left full-screen with-content-panel';
		},
		computed: {
			...mapGetters([
				'user'
			]),
		}
	}

</script>

<style scoped>
    .layout-w {
        /*min-height: 100vh;*/
    }

    .trending-up {
        right: 0px;
    }

    .trending-down {
        left: 0px;
    }
</style>
