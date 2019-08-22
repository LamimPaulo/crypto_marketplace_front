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
                                                <div class="col-6 col-sm-4 col-xxl-2" v-for="wallet in wallets">
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
                                                            R$ {{ parseFloat(wallet.wallets[0].balance_rounded) |
                                                            currency}}
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
                                         <MobileConverter class="mConverter"> </MobileConverter>
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
                                                <div class="col-sm-12 col-md-4">
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
                                                <div class="col-sm-12 col-md-8">
                                                    <table class="table table-clean">
                                                        <thead>
                                                        <tr>
                                                            <th></th>
                                                            <th>Produto</th>
                                                            <th>LQX</th>
                                                            <th v-if="user.country_id===31">BRL</th>
                                                            <th v-else>USD</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr v-for="(product, i) in products">
                                                            <td></td>
                                                            <td>
                                                                <span :class="'marker-left color-' + i">{{product.name}}</span>
                                                            </td>
                                                            <td>{{product.value_lqx | fixValue}}</td>
                                                            <td v-if="user.country_id===31">
                                                                R$ {{product.value_brl | formatValue}}
                                                            </td>
                                                            <td v-else>
                                                                $ {{product.value_usd }}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td class="text-center">Total</td>
                                                            <td>
                                                                <button class="btn btn-primary" id="button1">
                                                                    {{product_total.value_lqx | fixValue}} LQX
                                                                </button>
                                                            </td>
                                                            <td v-if="user.country_id===31">
                                                                <button class="btn btn-success">R$
                                                                    {{product_total.value_brl | formatValue}}
                                                                </button>
                                                            </td>
                                                            <td v-else>
                                                                <button class="btn btn-success">$
                                                                    {{product_total.value_usd }}
                                                                </button>
                                                            </td>

                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                                <MobileViewProfile class="mProfile"> </MobileViewProfile>
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

        <notification-modal v-show="isModalVisible" @close-modal="closeModal"></notification-modal>

    </div>
</template>

<script>
    import Sidebar from './menu/Sidebar'
    import PieChart from './charts/PieChart';
    import TopMenu from './menu/TopMenu';
    import TopMenuUser from './menu/TopMenuUser';
    import MobileViewProfile from './menu/MobileViewProfile';
    import MobileConverter from './menu/mobileCurrencyConverter';
    import Footer from './layouts/Footer';
    import NotificationModal from './user/notifications/NotificationModal';
    import {mapGetters} from 'vuex'

    export default {
        name: "Dashboard",
        components: {
            PieChart,
            TopMenu,
            TopMenuUser,
            MobileConverter,
            MobileViewProfile,
            Footer,
            NotificationModal,
            Sidebar
        },
        data() {
            return {
                isModalVisible: false,
                wallets: [],
                products: [],
                generalNotification: [],
                product_total: {
                    value_lqx: 0,
                    value_brl: 0,
                    value_usd: 0,
                },
                chart: [1, 2, 3, 4],
                count: null,
                totalMsg: 0,
                typeMsg: null,
                loader: true
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
            retrieveTotalNotifications() {
                this.$store.dispatch('retrieveTotalNotifications')
                    .then(response => {
                        this.totalMsg = response.data
                        this.typeMsg

                        if (this.totalMsg >= 1) {
                            this.isModalVisible = true
                        }
                    })
                    .catch(error => {
                        if (error.response) {
                            this.handleErrors(error.response)
                        }
                    })
            },
            closeModal() {
                this.isModalVisible = false
            }
        },
        mounted() {
            this.retrieveWallets()
            this.retrieveProducts()
            this.retrieveTotalNotifications()
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
        /* min-height: 100vh; */
    }

    .trending-up {
        right: 0px;
    }

    .trending-down {
        left: 0px;
    }

    .mConverter,
    .mProfile {
        display: none;
    }
    
            /* Large desktops and laptops */
    @media (max-width: 1150px) {
        .mConverter {
            display: block;
            font-size: 13px;
        }
        .mProfile {
            display: block;
        }

    }

    /* Landscape tablets and medium desktops */
    @media (min-width: 992px) and (max-width: 1199px) {

    }

    /* Portrait tablets and small desktops */
    @media (min-width: 768px) and (max-width: 991px) {

    }

    /* Landscape phones and portrait tablets */
    @media (max-width: 767px) {

    }

    /* Portrait phones and smaller */
    @media (max-width: 480px) {    
        .mConverter {
            font-size: 10px;
        }
    }
</style>