<template>
    <div>
        <div class="loader" v-if="loader"></div>

        <modal>
            <template slot="header">
                <div class="os-tabs-w">
                    <div class="os-tabs-controls os-tabs-complex">
                        <ul class="nav nav-tabs">
                            <li class="nav-item col-md-6 text-center">
                                <a :class="tabclass_buy" href="#" @click="showBuyWindow">
                                    <span class="tab-label">Comprar</span>
                                </a>
                            </li>
                            <li class="nav-item col-md-6 text-center">
                                <a :class="tabclass_sell" href="#" @click="showSellWindow">
                                    <span class="tab-label">Vender</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </template>

            <template slot="body">
                <div v-if="isBuyWindowVisible">
                    <form @submit.prevent="sendOrderBuy">
                        <div class="row">
                            <div class="col-12">
                                <div class="form-group">
                                    <label>Comprar</label>
                                    <input class="form-control" placeholder="Quantidade..." type="text" disabled
                                           :value="buyOrder.base">
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <div class="form-group">
                                    <label>Quantidade</label>
                                    <vue-numeric class="form-control" placeholder="Quantidade..."
                                         @input="retrieveBuyConversion" v-model="buyOrder.amount"
                                         :min="0" :minus="false" :precision="5"
                                         currency="" decimal-separator="."
                                         thousand-separator=""></vue-numeric>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <div class="form-group">
                                    <label>Total</label>
                                    <input class="form-control" type="text" :value="buyOrder.total" readonly>
                                </div>
                            </div>
                        </div>

                        <div class="row" v-if="!buyOrder.message&&buyOrder.total">
                            <div class="col-12 ">
                                <span class="badge badge-danger">Saldo Insuficiente</span>
                            </div>
                        </div>

                        <hr>

                        <div class="row mt-5">
                            <div class="col-12 text-center">
                                <button class="btn btn-grey" type="button" @click="closeModal"> Fechar</button>
                                <button class="btn btn-primary" type="submit" :disabled="!isBuyFilled"
                                        @click.prevent="showPinModal('convertBuyAmount')">
                                    Confirmar
                                </button>
                            </div>
                        </div>

                    </form>

                </div>
                <div v-else>
                    <form>
                        <div class="row">
                            <div class="col-12">
                                <div class="form-group">
                                    <label>Vender</label>
                                    <input class="form-control" placeholder="Quantidade..." type="text" disabled
                                           :value="sellOrder.base">
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <div class="form-group">
                                    <label>Quantidade</label>
                                    <vue-numeric class="form-control" placeholder="Quantidade..."
                                         @input="retrieveSellConversion" v-model="sellOrder.amount"
                                         :min="0" :minus="false" :precision="5"
                                         currency="" decimal-separator="."
                                         thousand-separator=""></vue-numeric>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <div class="form-group">
                                    <label>Total</label>
                                    <input class="form-control" type="text" :value="sellOrder.total" readonly>
                                </div>
                            </div>
                        </div>

                        <div class="row" v-if="!sellOrder.message&&sellOrder.total">
                            <div class="col-12 ">
                                <span class="badge badge-danger">Saldo Insuficiente</span>
                            </div>
                        </div>

                        <hr>

                        <div class="row mt-5">
                            <div class="col-12 text-center">
                                <button class="btn btn-grey" type="button" @click="closeModal"> Fechar</button>
                                <button class="btn btn-primary" type="submit" :disabled="!isSellFilled"
                                        @click.prevent="showPinModal('convertAmount')">
                                    Confirmar
                                </button>
                            </div>
                        </div>

                    </form>

                </div>
            </template>

            <template slot="footer">
                &nbsp;
            </template>
        </modal>

        <pin v-show="isPinVisible" ref="pinComponent"
             @close-pin-modal="closePinModal" @pin-data="handlePinData"/>

    </div>
</template>

<script>
	import Modal from './../../layouts/Modal';
	import debounce from 'lodash/debounce'
	import {mapGetters} from 'vuex'
	import Pin from './../../verifications/Pin'

    import Vue from 'vue'
    import VueNumeric from 'vue-numeric'

    Vue.use(VueNumeric)

	export default {
		name: "OrderWindow",
		props: ['coin'],
		data() {
			return {
				loader: false,
				buyOrder: {
					base: 'BTC',
					quote: 'BRL',
					amount: 0,
					total: null,
					message: false
				},
				sellOrder: {
					base: 'BTC',
					quote: 'BRL',
					amount: 0,
					total: null,
					message: false
				},
				myCoins: [],
				token: {
					pin: null
				},
				isPinVisible: false,
				isBuyWindowVisible: true,
				isSellWindowVisible: false,
				tabclass_buy: 'nav-link active',
				tabclass_sell: 'nav-link',
			}
		},
		methods: {
			closeModal() {
				this.$emit('close-modal')
			},
			myCoinsList() {
				this.$store.dispatch('myCoinsList')
					.then(response => {
						this.myCoins = response.data
					})
					.catch(error => {
						if (error.response) {
							this.handleErrors(error.response)
						}
					})
			},
			retrieveBuyConversion: debounce(function () {
				if (this.buyOrder.amount > 0) {
					this.$store.dispatch('retrieveBuyConversion', {
						base: this.buyOrder.base,
						amount: this.buyOrder.amount,
					})
						.then(response => {
							this.buyOrder.total = response.data.amount
							this.buyOrder.message = response.data.message
						})
						.catch(error => {
							if (error.response) {
								this.handleErrors(error.response)
							}
						})
				}
			}, 500),
			retrieveSellConversion: debounce(function () {
				if (this.sellOrder.amount > 0) {
					this.$store.dispatch('retrieveConversion', {
						base: this.sellOrder.base,
						quote: this.sellOrder.quote,
						amount: this.sellOrder.amount,
					})
						.then(response => {
							this.sellOrder.total = response.data.amount
							this.sellOrder.message = response.data.message
						})
						.catch(error => {
							if (error.response) {
								this.handleErrors(error.response)
							}
						})
				}
			}, 500),
			convertAmount() {
				if (this.sellOrder.base !== 'LQXD') {
					this.$store.dispatch('convertAmount', {
						base: this.sellOrder.base,
						quote: this.sellOrder.quote,
						amount: this.sellOrder.amount,
						action: 10,
						pin: this.token.pin,
					})
						.then(this.$toasted.show('enviando solicitação...', {position: 'bottom-left', type: 'info'}).goAway(5000))
						.then(response => {
							this.$toasted.show(response.data.message, {position: 'bottom-left', type: 'success'}).goAway(3000)
							this.refresh()
						})
						.catch(error => {
							if (error.response) {
								if (error.response) {
									this.handleErrors(error.response)
								}
								this.resetPin()
							}
						})
				}
			},
			convertBuyAmount() {
				this.$store.dispatch('convertBuyAmount', {
					base: this.buyOrder.base,
					quote: this.buyOrder.quote,
					amount: this.buyOrder.amount,
					action: 10,
					pin: this.token.pin,
				})
					.then(this.$toasted.show('enviando solicitação...', {position: 'bottom-left', type: 'info'}).goAway(5000))
					.then(response => {
						this.$toasted.show(response.data.message, {position: 'bottom-left', type: 'success'}).goAway(3000)
						this.refresh()
					})
					.catch(error => {
						if (error.response) {
							if (error.response) {
								this.handleErrors(error.response)
							}
							this.resetPin()
						}
					})
			},
			showBuyWindow() {
				this.resetOrders()
				this.isBuyWindowVisible = true
				this.isSellWindowVisible = false
				this.tabclass_buy = 'nav-link active'
				this.tabclass_sell = 'nav-link'

			},
			showSellWindow() {
				this.resetOrders()
				this.isSellWindowVisible = true
				this.isBuyWindowVisible = false
				this.tabclass_buy = 'nav-link'
				this.tabclass_sell = 'nav-link active'
			},
			resetOrders() {
				this.buyOrder.amount = null
				this.buyOrder.total = null
				this.sellOrder.amount = null
				this.sellOrder.total = null
			},
			setOrderCoins(coin, fiat) {
				this.buyOrder.base = coin
				this.buyOrder.quote = fiat
				this.sellOrder.base = coin
				this.sellOrder.quote = fiat
			},
			resetPin() {
				this.token.pin = null
				this.$refs.pinComponent.resetData()
			},
			refresh() {
				setTimeout(function () {
					location.reload()
				}, 3000)
			},
			showPinModal(method) {
				this.isPinVisible = true
				this.$refs.pinComponent.setData(method)
			},
			closePinModal() {
				this.isPinVisible = false;
			},
			handlePinData(data) {
				this.token.pin = data.pin

				if (data.method === 'convertAmount') {
					this.convertAmount()
				}
				if (data.method === 'convertBuyAmount') {
					this.convertBuyAmount()
				}
			},
		},
		computed: {
			...mapGetters([
				'user'
			]),
			isBuyFilled() {
				return (this.buyOrder.amount > 0) && this.buyOrder.message;
			},
			isSellFilled() {
				return (this.sellOrder.amount > 0) && this.sellOrder.message;
			},
		},
		components: {
			Modal,
			Pin,
            VueNumeric
		},
		mounted() {
			this.myCoinsList()
		}
	}
</script>

<style scoped>
    .element-wrapper .element-info {
        margin-bottom: 0px;
    }

    .os-tabs-controls.os-tabs-complex .nav-item .nav-link {
        padding: 30px 50px;
    }

    .nav-item.col-md-6 {
        padding-right: 0px;
        padding-left: 0px;
    }

    form {
        padding: 1.5em;
    }

</style>
