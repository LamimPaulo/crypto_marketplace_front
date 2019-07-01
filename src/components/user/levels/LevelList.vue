<template>
    <div class="container mt-3 mb-3">
        <div class="loader" v-if="loader"></div>
        <top-menu-user></top-menu-user>
        <top-menu></top-menu>
        <vue-headful title="Comprar Key Code Liquidex" description="Liquidex"/>
        <div class="all-wrapper with-side-panel solid-bg-all">
            <div class="layout-w">
                <div class="content-w">
                    <!-- <topbar></topbar> -->
                    <div class="content-i">
                        <!--Content-->
                        <div class="content-box">
                            <div class="section-heading centered">
                                <h3>
                                    Compra de Key Code
                                </h3>
                            </div>
                            <div class="pricing-plans row no-gutters justify-content-center">
                                <div class="pricing-plan col-sm-6 col-md-4 col-lg-3  with-hover-effect"
                                     v-if="(user.user_level_id-1) < level.id && level.id!== 1 "
                                     v-for="level in levels">
                                    <div :class="'plan-head bt-level-' + level.id">
                                        <div :class="'plan-name level-' + level.id">
                                            {{ level.name }}
                                        </div>
                                    </div>

                                    <div class="plan-description">
                                        <ul>
                                            <li :class="'li-level-' + level.id" v-if="level.id > 1">
                                                Keycode
                                            </li>
                                            <li :class="'li-level-' + level.id">
                                                {{ level.btcDiary}} Envio Crypto
                                            </li>
                                            <li :class="'li-level-' + level.id" v-if="level.type===1">
                                                {{ level.brlDiary}} Saque
                                            </li>
                                            <li :class="'li-level-' + level.id" v-if="user.user_level_id < level.id"
                                                v-tooltip.top="'O valor de desconto é calculado em cima do valor pago pelo seu Keycode atual.'">
                                                Bônus de Desc. {{ level.product.bonus_percent }}%
                                            </li>
                                            <li :class="'li-level-' + level.id" v-else>
                                                Seu Nível Atual
                                            </li>
                                        </ul>
                                    </div>

                                    <div class="plan-body pb-2 pt-4" v-if="user.country_id===31">
                                        <div class="plan-btn-w px-3" v-if="user.user_level_id < level.id">
                                            <div v-if="user.level.product.bonus_percent>0">
                                                <!--LQX-->
                                                De:
                                                <span class="price-crossed">
                                                 {{ level.product.lqxValue }}LQX <br>
                                                </span>
                                                <a :class="'btn btn-block btn-level-' + level.id"
                                                   @click.prevent="showLevelDetailsModal(level, 'buyLevelLqx')"
                                                   href="#">Por: {{ parseFloat(level.product.lqxValue) -
                                                    (parseFloat(user.level.product.lqxValue) *
                                                    parseFloat(level.product.bonus_percent) / 100) |
                                                    fixValue}}LQX</a>

                                                <span v-if="level.type===1">
                                                    <br> ou <br><br>
                                                    De:
                                                    <span class="price-crossed">
                                                     {{ level.product.brlValue }} <br>
                                                    </span>
                                                </span>
                                                <!--BRL-->
                                                <a class="btn btn-block btn-outline-secondary"
                                                   v-if="level.type===1"
                                                   @click.prevent="showLevelDetailsModal(level, 'buyLevelBrl')"
                                                   href="#">Por: R$ {{ parseFloat(level.product.value) -
                                                    (parseFloat(user.level.product.value) *
                                                    parseFloat(level.product.bonus_percent) / 100) | currency}}</a>
                                            </div>
                                            <div v-else>
                                                <a :class="'btn btn-block btn-level-' + level.id"
                                                   @click.prevent="showLevelDetailsModal(level, 'buyLevelLqx')"
                                                   href="#">{{ level.product.lqxValue }}LQX</a>
                                                <a class="btn btn-block btn-outline-secondary"
                                                   @click.prevent="showLevelDetailsModal(level, 'buyLevelBrl')"
                                                   href="#">{{ level.product.brlValue }}</a>
                                            </div>
                                        </div>
                                        <div class="plan-btn-w px-5 mb-5 mt-5" v-else>
                                            <br>
                                            <a class="btn btn-grey btn-block" href="#">Já Adquirido</a>
                                            <br>
                                        </div>
                                    </div>

                                    <div class="plan-body pb-2 pt-4" v-else>

                                        <div class="plan-btn-w px-3" v-if="user.user_level_id < level.id">
                                            <div v-if="user.level.product.bonus_percent>0">
                                                <!--LQX-->
                                                De:
                                                <span class="price-crossed">
                                                 {{ level.product.lqxValue }}LQX <br>
                                                </span>
                                                <a :class="'btn btn-block btn-level-' + level.id"
                                                   @click.prevent="showLevelDetailsModal(level, 'buyLevelLqx')"
                                                   href="#">
                                                    Por: {{ parseFloat(level.product.lqxValue) -
                                                    (parseFloat(user.level.product.lqxValue) *
                                                    parseFloat(level.product.bonus_percent) / 100) |
                                                    fixValue}} LQX </a>

                                                <span v-if="level.type===2">
                                                    <br> ou <br><br>
                                                    De:
                                                    <span class="price-crossed">
                                                     $ {{ level.product.value_usd }} <br>
                                                    </span>
                                                </span>
                                                <!--USD-->
                                                <a class="btn btn-block btn-outline-secondary"
                                                   v-if="level.type===2"
                                                   @click.prevent="showLevelDetailsModal(level, 'buyLevelUsd')"
                                                   href="#">Por: $ {{ (parseFloat(level.product.value_usd) -
                                                    (parseFloat(user.level.product.value_usd) *
                                                    parseFloat(level.product.bonus_percent) / 100)).toFixed(2) }}</a>
                                            </div>
                                            <div v-else>
                                                <a :class="'btn btn-block btn-level-' + level.id"
                                                   @click.prevent="showLevelDetailsModal(level, 'buyLevelLqx')"
                                                   href="#">{{ level.product.lqxValue }}LQX</a>
                                                <a class="btn btn-block btn-outline-secondary"
                                                   @click.prevent="showLevelDetailsModal(level, 'buyLevelUsd')"
                                                   href="#">$ {{ level.product.value_usd }}</a>
                                            </div>
                                        </div>
                                        <div class="plan-btn-w px-5 mb-5 mt-5" v-else>
                                            <br>
                                            <a class="btn btn-grey btn-block" href="#">Já Adquirido</a>
                                            <br>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
        <modal v-if="isModalVisible&&level_popup">
            <template slot="header">
                <h6 class="pull-left ml-3 mt-2">
                    Atenção: regras para este Keycode
                </h6>
                <button class="btn btn-grey pull-right mt-3 mr-3 mb-3" type="button" @click="closeThisModal">
                    <i class="os-icon os-icon-close"></i>
                </button>
            </template>
            <template slot="body">
                <div class="py-0 px-5 text-center">
                    <h4 v-if="level_popup.buyType==='buyLevelLqx'" class="text-success font-5">
                        Valor do Keycode: {{ parseFloat(level_popup.product.lqxValue) -
                        (parseFloat(user.level.product.lqxValue) *
                        parseFloat(level_popup.product.bonus_percent) / 100) |
                        fixValue }} LQX</h4>
                    <h4 v-if="level_popup.buyType==='buyLevelBrl'"> Valor do Keycode: R$ {{
                        parseFloat(level_popup.product.value) -
                        (parseFloat(user.level.product.value) *
                        parseFloat(level_popup.product.bonus_percent) / 100) | currency}}</h4>
                    <h4 v-if="level_popup.buyType==='buyLevelUsd'"> Valor do Keycode: $ {{
                        parseFloat(level_popup.product.value_usd) -
                        (parseFloat(user.level.product.value_usd) *
                        parseFloat(level_popup.product.bonus_percent) / 100) | currency}}</h4>
                    <p> - Depósitos e documentos: 48 horas úteis</p>
                    <p> - Envio de Criptomoedas: <span v-if="level_popup.limit_btc_diary>0">SIM</span> <span
                            v-else>NÃO</span></p>
                    <p> - Limite de saque por retirada: {{level_popup.brlDiary }}</p>
                    <p> - Limite de envio de Criptomoeda: {{level_popup.btcDiary }}</p>
                    <p> - Taxa de corretagem Nanotech BTC: {{level_popup.nanotechBtcPercent }}%</p>
                    <p> - Taxa de corretagem Nanotech LQX: {{level_popup.nanotechLqxPercent }}%</p>
                    <p> - Taxa de corretagem Masternode: {{level_popup.masternodePercent }}%</p>
                    <p v-if="level_popup.type===2"> - Saque em Moeda Fiat:
                        <span v-if="level_popup.id!==1&&level_popup.id!==7">SIM</span>
                        <span v-else>NÃO</span>
                    </p>
                    <p v-if="level_popup.tax_crypto[0]"> - Taxa de envio de Criptomoeda:
                        {{level_popup.tax_crypto[0].value | roundValue}} %</p>
                    <p v-else> - Taxa de envio de Criptomoeda: 0 %</p>
                    <p v-if="level_popup.type===2&&level_popup.tax_brl[0]"> - Taxa por operação: R$ {{
                        level_popup.tax_brl[0].value | currency }}</p>
                    <p v-else> - Taxa por operação: R$ 0,00</p>
                    <p> - Valor mínimo para retirada e deposito: R$ {{ level_popup.minWithdrawal }}</p>
                    <p> - Envio mínimo de Criptomoeda (se disponível): {{level_popup.minCryptoSubmission }}</p>
                    <p> - Bônus para Upgrade: {{ level_popup.product.bonus_percent }}%</p>
                    <p> Para mais informações, use nosso suporte via chat.</p>
                    <h3 class="text-primary">Este Keycode atende às suas necessidades?</h3>
                </div>
            </template>
            <template slot="footer">
                <div class="row justify-content-center" style="width: 100%">
                    <button class="btn btn-lg btn-danger pull-left" @click.prevent="closeThisModal">Cancelar</button>
                    <button class="btn btn-lg btn-success pull-right"
                            @click.prevent="showTokenPinModal(level_popup.buyType, action, level_popup.id)">Contratar
                    </button>
                </div>
            </template>
        </modal>
        <token-pin v-show="isTokenPinVisible" ref="tokenPinComponent"
                   @close-token-pin-modal="closeTokenPinModal" @token-data="handleTokenPinData"/>
    </div>
</template>
<script>
	import {mapGetters} from 'vuex'
	import TopMenu from './../../menu/TopMenu';
	import TopMenuUser from './../../menu/TopMenuUser';
	import Footer from './../../layouts/Footer';
	import TokenPin from '../../verifications/TokenPin'
	import Modal from '../../layouts/Modal'

	export default {
		name: "LevelList",
		data() {
			return {
				levels: [],
				level_popup: null,
				loader: true,
				isTokenPinVisible: false,
				isModalVisible: false,
				token: {
					code: null,
					pin: null
				},
				action: 11,
				level: null
			}
		},
		methods: {
			closeThisModal() {
				this.level_popup = null
				this.isModalVisible = false
			},
			showLevelDetailsModal(level, buyType) {
				this.level_popup = level
				this.level_popup.buyType = buyType
				this.isModalVisible = true
			},
			retrieveLevels() {
				this.loader = true
				this.$store.dispatch('retrieveLevels')
					.then(response => {
						this.levels = response.data
						this.loader = false
					})
					.catch(error => {
						this.loader = false
						if (error.response) {
							this.handleErrors(error.response)
						}
					})
			},
			buyLevelLqx() {
				this.loader = true
				this.isModalVisible = false
				this.$store.dispatch('buyLevel', {
					level_id: this.level,
					abbr: "LQX",
					action: this.action,
					code: this.token.code,
					pin: this.token.pin,
				})
					.then(response => {
						this.loader = false
						this.$toasted.show(response.data.message, {position: 'bottom-left', type: 'success'}).goAway(3000)
						this.$store.dispatch('retrieveUser')
						this.refresh()
					})
					.catch(error => {
						this.loader = false
						if (error.response) {
							this.handleErrors(error.response)
						}
					})
			},
			buyLevelBrl() {
				this.loader = true
				this.isModalVisible = false
				this.$store.dispatch('buyLevel', {
					level_id: this.level,
					abbr: "BRL",
					action: this.action,
					code: this.token.code,
					pin: this.token.pin,
				})
					.then(response => {
						this.loader = false
						this.$toasted.show(response.data.message, {position: 'bottom-left', type: 'success'}).goAway(3000)
						this.$store.dispatch('retrieveUser')
						this.refresh()
					})
					.catch(error => {
						this.loader = false
						if (error.response) {
							this.handleErrors(error.response)
						}
					})
			},
			buyLevelUsd() {
				this.loader = true
				this.isModalVisible = false
				this.$store.dispatch('buyLevelUsd', {
					level_id: this.level,
					abbr: "USD",
					action: this.action,
					code: this.token.code,
					pin: this.token.pin,
				})
					.then(response => {
						this.loader = false
						this.$toasted.show(response.data.message, {position: 'bottom-left', type: 'success'}).goAway(3000)
						this.$store.dispatch('retrieveUser')
						this.refresh()
					})
					.catch(error => {
						this.loader = false
						if (error.response) {
							this.handleErrors(error.response)
						}
					})
			},
			refresh() {
				setTimeout(function () {
					location.reload()
				}, 2000)
			},
			showTokenPinModal(method, action, level) {
				this.level = level;
				this.isTokenPinVisible = true
				this.isModalVisible = false
				this.$refs.tokenPinComponent.setData(method, action)
			},
			closeTokenPinModal() {
				this.isTokenPinVisible = false;
			},
			handleTokenPinData(data) {
				this.token.code = data.code
				this.token.pin = data.pin

				if (data.method === 'buyLevelLqx') {
					this.buyLevelLqx()
				}

				if (data.method === 'buyLevelBrl') {
					this.buyLevelBrl()
				}

				if (data.method === 'buyLevelUsd') {
					this.buyLevelUsd()
				}
			},
		},
		mounted() {
			this.retrieveLevels()
		},
		computed: {
			...mapGetters([
				'user'
			]),
		},
		components: {
			TopMenu,
			TopMenuUser,
			Footer,
			TokenPin,
			Modal
		}
	}
</script>

<style scoped>
    .alert {
        color: #fff;
    }

    .level-2, .level-8 {
        color: #94d1e4;
    }

    .bt-level-2,
    .bt-level-8 {
        border-top: 5px solid #94d1e4;
    }

    .pricing-plan .plan-description ul .li-level-2:before,
    .pricing-plan .plan-description ul .li-level-8:before {
        color: #94d1e4;
    }

    .btn-level-2,
    .btn-level-8 {
        color: #fff;
        background-color: #94d1e4;
        border-color: #94d1e4;
    }

    .level-3,
    .level-9 {
        color: #4eb3d3;
    }

    .bt-level-3,
    .bt-level-9 {
        border-top: 5px solid #4eb3d3;
    }

    .pricing-plan .plan-description ul .li-level-3:before,
    .pricing-plan .plan-description ul .li-level-9:before {
        color: #4eb3d3;
    }

    .btn-level-3,
    .btn-level-9 {
        color: #fff;
        background-color: #4eb3d3;
        border-color: #4eb3d3;
    }

    .level-4,
    .level-10 {
        color: #2b8cbe;
    }

    .bt-level-4,
    .bt-level-10 {
        border-top: 5px solid #2b8cbe;
    }

    .pricing-plan .plan-description ul .li-level-4:before,
    .pricing-plan .plan-description ul .li-level-10:before {
        color: #2b8cbe;
    }

    .btn-level-4,
    .btn-level-10 {
        color: #fff;
        background-color: #2b8cbe;
        border-color: #2b8cbe;
    }

    .level-5,
    .level-11 {
        color: #ffbd1b;
    }

    .bt-level-5,
    .bt-level-11 {
        border-top: 5px solid #ffbd1b;
    }

    .pricing-plan .plan-description ul .li-level-5:before,
    .pricing-plan .plan-description ul .li-level-11:before {
        color: #ffbd1b;
    }

    .btn-level-5,
    .btn-level-11 {
        color: #fff;
        background-color: #ffbd1b;
        border-color: #ffbd1b;
    }

    .level-6,
    .level-12 {
        color: #5cd150;
    }

    .bt-level-6,
    .bt-level-12 {
        border-top: 5px solid #5cd150;
    }

    .pricing-plan .plan-description ul .li-level-6:before,
    .pricing-plan .plan-description ul .li-level-12:before {
        color: #5cd150;
    }

    .btn-level-6,
    .btn-level-12 {
        color: #fff;
        background-color: #5cd150;
        border-color: #5cd150;
    }

    .price-crossed {
        text-decoration: line-through;
    }
</style>
