<template>
    <div class="container mt-3 mb-3">
        <div class="loader" v-if="loader"></div>

        <top-menu-user></top-menu-user>

        <top-menu></top-menu>

        <vue-headful title="Dashboard Liquidex" description="Liquidex"/>
        <div class="all-wrapper with-side-panel solid-bg-all">
            <div class="layout-w">


                <div class="content-w">

                    <!-- <topbar></topbar> -->

                    <div class="content-i">
                        <!--Content-->
                        <div class="content-box">

                            <div class="section-heading centered">
                                <h3>
                                    Níveis de Usuário
                                </h3>
                            </div>
                            <div class="pricing-plans row no-gutters">
                                <div class="pricing-plan col-sm-3 with-hover-effect" v-for="level in levels">
                                    <div :class="'plan-head bt-' + level.name">
                                        <div :class="'plan-name ' + level.name">
                                            {{ level.name }}
                                        </div>
                                    </div>
                                    <div class="plan-description">
                                        <ul>
                                            <li :class="'li-' + level.name" v-if="level.id > 1">
                                                Keycode
                                            </li>

                                            <li :class="'li-' + level.name">
                                                {{ level.btcDiary}} BTC/dia
                                            </li>
                                            <li :class="'li-' + level.name">
                                                {{ level.brlDiary}} /dia
                                            </li>
                                            <li :class="'li-' + level.name">
                                                {{ level.transactionAuto}} BTC/auto
                                            </li>
                                            <li :class="'li-' + level.name">
                                                {{ level.brokeragePercent}}% de Corretagem
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="plan-body pb-4">

                                        <div class="plan-btn-w px-3" v-if="user.user_level_id < level.id">
                                            <a class="btn btn-primary btn-block"
                                               @click.prevent="showTokenPinModal('buyLevelLqx', action, level.id)"
                                               href="#">{{ level.product.lqxValue }}LQX</a>

                                            <a :class="'btn btn-block py-3 btn-' + level.name"
                                               @click.prevent="showTokenPinModal('buyLevelBrl', action, level.id)"
                                               href="#">{{ level.product.brlValue }}</a>
                                        </div>

                                        <div class="plan-btn-w px-3 mb-4" v-else>
                                            <a class="btn btn-outline-secondary btn-block" href="#">Já Adquirido</a>
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

	export default {
		name: "LevelList",
		data() {
			return {
				levels: [],
				loader: true,
                isTokenPinVisible: false,
				token: {
					code: null,
					pin: null
				},
                action: 11,
                level: null
			}
		},
		methods: {
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
				this.$store.dispatch('buyLevel', {
					level_id: this.level,
					abbr: "LQX",
                    action: this.action,
					code: this.token.code,
					pin: this.token.pin,
				})
					.then(response => {
						this.loader = false
						this.$toasted.show(response.data.message, {position: 'bottom-left'}).goAway(3000)
                        this.$store.dispatch('retrieveUser')
                        this.retrieveLevels()
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
				this.$store.dispatch('buyLevel', {
					level_id: this.level,
					abbr: "BRL",
                    action: this.action,
					code: this.token.code,
					pin: this.token.pin,
				})
					.then(response => {
						this.loader = false
						this.$toasted.show(response.data.message, {position: 'bottom-left'}).goAway(3000)
                        this.$store.dispatch('retrieveUser')
                        this.retrieveLevels()
					})
					.catch(error => {
						this.loader = false
						if (error.response) {
							this.handleErrors(error.response)
						}
					})
			},
            showTokenPinModal(method, action, level) {
				this.level = level;
				this.isTokenPinVisible = true
				this.$refs.tokenPinComponent.setData(method, action)
			},
			closeTokenPinModal() {
				this.isTokenPinVisible = false;
			},
			handleTokenPinData(data) {
				this.token.code = data.code
				this.token.pin = data.pin

                if(data.method==='buyLevelLqx'){
                	this.buyLevelLqx()
                }

                if(data.method==='buyLevelBrl'){
                	this.buyLevelBrl()
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
            TokenPin
		}
	}
</script>

<style scoped>
    .alert {
        color: #fff;
    }
    .Free {
        color: #94d1e4;
    }
    .bt-Free {
        border-top: 5px solid #94d1e4;
    }
    .pricing-plan .plan-description ul .li-Free:before {
        color: #94d1e4;
    }
    .btn-Free {
        color: #fff;
        background-color: #94d1e4;
        border-color: #94d1e4;
    }
    .Basic {
        color: #4eb3d3;
    }
    .bt-Basic {
        border-top: 5px solid #4eb3d3;
    }
    .pricing-plan .plan-description ul .li-Basic:before {
        color: #4eb3d3;
    }
    .btn-Basic {
        color: #fff;
        background-color: #4eb3d3;
        border-color: #4eb3d3;
    }
    .Pro {
        color: #2b8cbe;
    }
    .bt-Pro {
        border-top: 5px solid #2b8cbe;
    }
    .pricing-plan .plan-description ul .li-Pro:before {
        color: #2b8cbe;
    }
    .btn-Pro{
        color: #fff;
        background-color: #2b8cbe;
        border-color: #2b8cbe;
    }
    .Gold {
        color: #ffbd1b;
    }
    .bt-Gold {
        border-top: 5px solid #ffbd1b;
    }
    .pricing-plan .plan-description ul .li-Gold:before {
        color: #ffbd1b;
    }
    .btn-Gold  {
        color: #fff;
        background-color: #ffbd1b;
        border-color: #ffbd1b;
    }
</style>
