<template>
    <div class="container mt-3 mb-3">
        <div class="loader" v-if="loader"></div>

        <top-menu-user></top-menu-user>

        <top-menu></top-menu>

        <vue-headful title="Dashboard Liquidex" description="Liquidex"/>
        <div class="all-wrapper with-side-panel solid-bg-all">
            <div class="layout-w">


                <div class="content-w">

                    <!-- <topbar v-if="user.country_id===31"></topbar> -->

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
                                     v-if="(user.user_level_id - 1) < level.id && level.id!== 1 "
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
                                                Bônus de Desc. {{ user.level.product.bonus_percent }}%
                                            </li>

                                            <li :class="'li-level-' + level.id" v-else>
                                                Seu Nível Atual
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="plan-body pb-2 pt-4">

                                        <div class="plan-btn-w px-3" v-if="user.user_level_id < level.id">
                                            <div v-if="user.level.product.bonus_percent>0">
                                                <!--BRL-->
                                                De:
                                                <span class="price-crossed">
                                                 {{ level.product.lqxValue }}LQX <br>
                                                </span>

                                                <a :class="'btn btn-block btn-level-' + level.id"
                                                   @click.prevent="showTokenPinModal('buyLevelLqx', action, level.id)"
                                                   href="#">Por: {{ parseFloat(level.product.lqxValue) -
                                                    (parseFloat(user.level.product.lqxValue) *
                                                    parseFloat(user.level.product.bonus_percent) / 100) |
                                                    fixValue}}LQX</a>

                                                <br>
                                                ou
                                                <br>
                                                <br>
                                                De:
                                                <span class="price-crossed">
                                                 {{ level.product.brlValue }} <br>
                                            </span>

                                                <!--BRL-->
                                                <a class="btn btn-block btn-outline-secondary"
                                                   @click.prevent="showTokenPinModal('buyLevelBrl', action, level.id)"
                                                   href="#">Por: R$ {{ parseFloat(level.product.value) -
                                                    (parseFloat(user.level.product.value) *
                                                    parseFloat(user.level.product.bonus_percent) / 100) | currency}}</a>


                                            </div>

                                            <div v-else>
                                                <a :class="'btn btn-block btn-level-' + level.id"
                                                   @click.prevent="showTokenPinModal('buyLevelLqx', action, level.id)"
                                                   href="#">{{ level.product.lqxValue }}LQX</a>

                                                <a class="btn btn-block btn-outline-secondary"
                                                   @click.prevent="showTokenPinModal('buyLevelBrl', action, level.id)"
                                                   href="#">{{ level.product.brlValue }}</a>
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

				if (data.method === 'buyLevelLqx') {
					this.buyLevelLqx()
				}

				if (data.method === 'buyLevelBrl') {
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

    .level-2 {
        color: #94d1e4;
    }

    .bt-level-2 {
        border-top: 5px solid #94d1e4;
    }

    .pricing-plan .plan-description ul .li-level-2:before {
        color: #94d1e4;
    }

    .btn-level-2 {
        color: #fff;
        background-color: #94d1e4;
        border-color: #94d1e4;
    }

    .level-3 {
        color: #4eb3d3;
    }

    .bt-level-3 {
        border-top: 5px solid #4eb3d3;
    }

    .pricing-plan .plan-description ul .li-level-3:before {
        color: #4eb3d3;
    }

    .btn-level-3 {
        color: #fff;
        background-color: #4eb3d3;
        border-color: #4eb3d3;
    }

    .level-4 {
        color: #2b8cbe;
    }

    .bt-level-4 {
        border-top: 5px solid #2b8cbe;
    }

    .pricing-plan .plan-description ul .li-level-4:before {
        color: #2b8cbe;
    }

    .btn-level-4 {
        color: #fff;
        background-color: #2b8cbe;
        border-color: #2b8cbe;
    }

    .level-5 {
        color: #ffbd1b;
    }

    .bt-level-5 {
        border-top: 5px solid #ffbd1b;
    }

    .pricing-plan .plan-description ul .li-level-5:before {
        color: #ffbd1b;
    }

    .btn-level-5 {
        color: #fff;
        background-color: #ffbd1b;
        border-color: #ffbd1b;
    }

    .level-6 {
        color: #5cd150;
    }

    .bt-level-6 {
        border-top: 5px solid #5cd150;
    }

    .pricing-plan .plan-description ul .li-level-6:before {
        color: #5cd150;
    }

    .btn-level-6 {
        color: #fff;
        background-color: #5cd150;
        border-color: #5cd150;
    }

    .price-crossed {
        text-decoration: line-through;
    }
</style>
