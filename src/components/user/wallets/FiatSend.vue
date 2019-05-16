<template>
    <div>
        <div class="element-wrapper mb-0 pb-0">
            <div class="element-box">

                <div class="element-info">
                    <div class="element-info-with-icon">
                        <div class="element-info-icon">
                            <img alt="" :src="require(`@/assets/img/${wallet.coin.icon}`)">
                        </div>
                        <div class="element-info-text">
                            <h5 class="element-inner-header">
                                Enviar {{wallet.coin.shortname}} para Credminer
                            </h5>
                            <div class="element-inner-desc">
                                preencha os dados solicitados para realizar um envio
                            </div>
                        </div>
                    </div>
                </div>

                <form @submit.prevent="">

                    <div class="row">

                        <div class="col-sm-6">
                            <div class="form-group">
                                <label> Quanto quer enviar?</label>

                                <vue-numeric class="form-control" placeholder="Valor"
                                             :min="0" :max="parseFloat(wallet.balance)" :minus="false" :precision="2"
                                             v-model="transfer.amount" currency="R$" decimal-separator=","
                                             thousand-separator="."></vue-numeric>
                            </div>
                        </div>

                        <div class="col-sm-6">
                            <label> Para:</label>
                            <input class="form-control" placeholder="Digite o Login"
                                   v-model="transfer.toAddress" type="text">
                        </div>

                    </div>

                </form>

            </div>

        </div>

        <div class="form-buttons-w text-right mb-5">
            <button :disabled='!isFilled' @click.prevent="showTokenPinModal('sendTransfer', 18)"
                    class="btn btn-success" type="button"> Enviar
            </button>
        </div>

        <token-pin v-show="isTokenPinVisible" ref="tokenPinComponent"
                   @close-token-pin-modal="closeTokenPinModal" @token-data="handleTokenPinData"/>
    </div>

</template>

<script>
	import Vue from 'vue'
	import VueNumeric from 'vue-numeric'
	import TokenPin from './../../verifications/TokenPin'
	import Modal from './../../layouts/Modal'
	import {mapGetters} from 'vuex'
	import debounce from 'lodash/debounce'

	Vue.use(VueNumeric)

	export default {
		name: "FiatSend",
		data() {
			return {
				isTokenPinVisible: false,
				transfer: {
					amount: 0,
					toAddress: null,
					action: 18
				},
				token: {
					code: null,
					pin: null
				},
			}
		},
		props: {
			wallet: {
				coin: {
					name: "-",
					shortname: "-",
					abbr: "-",
					is_crypto: 0,
					icon: "brl_icon.png"
				},
				balance: 0
			},
		},
		computed: {
			isFilled() {
				return this.transfer.toAddress && (this.transfer.amount > 0);
			},
			...mapGetters([
				'user'
			]),
		},
		methods: {
			sendTransfer() {
				this.$store.dispatch('sendTransfer', {
					amount: this.transfer.amount,
					toAddress: this.transfer.toAddress,
					code: this.token.code,
					pin: this.token.pin,
					action: this.transfer.action
				})
					.then(
						this.$toasted.show('enviando...', {position: 'bottom-left'}).goAway(3000)
					)
					.then(response => {
						this.$toasted.show(response.data.message, {position: 'bottom-left'}).goAway(3000)
						this.refresh()
					}).catch(error => {
					if (error.response) {
						this.handleErrors(error.response)
					}
				})
			},

			retrieveSearchEmail: debounce(function (e) {
				if (this.beneficiary.email) {
					this.$store.dispatch('retrieveSearchEmail', this.beneficiary.email)
						.then(response => {
							this.account = response.data.account
							this.beneficiary.name = response.data.account.name
							this.beneficiary.email_ = response.data.account.email
						})
						.catch(error => {
							if (error.response) {
								this.handleErrors(error.response)
							}
						})
				}
			}, 500),

			resetToken() {
				this.token.code = null
				this.token.pin = null
				this.$refs.tokenPinComponent.resetData()
			},
			refresh() {
				setTimeout(function () {
					location.reload()
				}, 3000)
			},
			showTokenPinModal(method, action) {
				this.isTokenPinVisible = true
				this.$refs.tokenPinComponent.setData(method, action)
			},
			closeTokenPinModal() {
				this.isTokenPinVisible = false;
			},
			handleTokenPinData(data) {
				this.token.code = data.code
				this.token.pin = data.pin
				this.sendTransfer()
			},
		},

		components: {
			TokenPin,
			Modal,
			VueNumeric
		}
	}
</script>

<style scoped>
</style>
