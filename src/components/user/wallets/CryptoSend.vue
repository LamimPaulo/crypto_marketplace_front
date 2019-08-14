<template>
    <div class="element-wrapper mb-0 pb-0" v-if="abbr!='LQXD'">
        <div class="loader" v-if="loader"></div>
        <div class="element-box">

            <div class="element-info">
                <div class="element-info-with-icon">
                    <div class="element-info-icon">
                        <img alt="" style="width: 30px !important;" :src="require(`@/assets/img/${icon}`)">
                    </div>
                    <div class="element-info-text">
                        <h5 class="element-inner-header">
                            Enviar {{ abbr }}
                        </h5>
                        <div class="element-inner-desc">
                            preencha os dados solicitados para envio de {{ abbr }}
                        </div>
                    </div>
                </div>
            </div>

            <form @submit.prevent="sendTransaction">
                <div class="row">
                    <div class="col-sm-6 col-lg-3">
                        <div class="form-group">
                            <label> Quanto quer enviar?</label>
                            <vue-numeric class="form-control" placeholder="Quantidade"
                                         @input="retrieveFee" v-model="transaction.amount"
                                         :min="0" :minus="false" :precision="5"
                                         currency="" decimal-separator="."
                                         thousand-separator=""></vue-numeric>
                        </div>
                    </div>

                    <div class="col-sm-6 col-lg-5">
                        <div class="form-group">
                            <label> Endereço</label>
                            <input class="form-control" data-minlength="16" placeholder="address"
                                   @input="retrieveFee" v-model="transaction.toAddress" type="text">
                        </div>
                    </div>

                    <div class="col-sm-6 col-lg-2">
                        <div class="form-group">
                            <label> Fee</label>
                            <input class="form-control" placeholder="0" type="text" v-model="transaction.fee">
                        </div>
                    </div>

                    <div class="col-sm-6 col-lg-2">
                        <div class="form-group">
                            <label> Prioridade</label>
                            <select class="form-control" name="" id="" v-model="transaction.priority"
                                    @change="retrieveFee">
                                <option value="6">Baixa</option>
                                <option value="3">Normal</option>
                                <option value="1">Alta</option>
                            </select>
                        </div>
                    </div>

                </div>
                <div class="form-buttons-w text-right">
                    <span class="pull-left">Total da Transação: {{ total }} {{ abbr }}</span>
                    <button class="btn btn-primary" :disabled='!isFilled'
                            @click.prevent="showTokenPinModal('sendTransaction', 5)"
                            type="button"> Enviar
                    </button>
                </div>
            </form>

            <token-pin v-show="isTokenPinVisible" ref="tokenPinComponent"
                       @close-token-pin-modal="closeTokenPinModal" @token-data="handleTokenPinData"/>
        </div>
    </div>
</template>

<script>
	import TokenPin from './../../verifications/TokenPin'
	import debounce from 'lodash/debounce'
	import Vue from 'vue'
	import VueNumeric from 'vue-numeric'

	Vue.use(VueNumeric)

	export default {
		name: "CryptoSend",
		props: ['icon', 'address', 'abbr'],
		data() {
			return {
				loader: false,
				isTokenPinVisible: false,
				transaction: {
					amount: 0,
					toAddress: '',
					fee: 0,
					priority: 3,
					total: 0,
					action: 5
				},
				token: {
					code: null,
					pin: null
				},
			}
		},
		computed: {
			isFilled() {
				return this.transaction.amount && (this.transaction.toAddress.length > 16);
			},
			total() {
				return parseFloat(this.transaction.fee) + parseFloat(this.transaction.amount)
			}
		},
		methods: {
			retrieveFee: debounce(function () {
				if (this.transaction.amount > 0) {
					this.$store.dispatch('retrieveFee', {
						toAddress: this.transaction.toAddress,
						amount: this.transaction.amount,
						priority: this.transaction.priority,
						address: this.address
					})
						.then(response => {
							this.transaction.fee = (parseFloat(response.data.fee) + parseFloat(response.data.tax)).toFixed(8)
						}).catch(error => {
						if (error.response) {
							this.handleErrors(error.response)
						}

					})
				}
			}, 500),
			sendTransaction() {
				this.loader = true
				this.$store.dispatch('sendTransaction', {
					address: this.address,
					priority: this.transaction.priority,
					toAddress: this.transaction.toAddress,
					amount: this.transaction.amount,
					code: this.token.code,
					pin: this.token.pin,
					action: this.transaction.action
				}).then(
					this.$toasted.show('enviando...', {position: 'bottom-left', type: 'info'}).goAway(3000)
				)
					.then(response => {
						this.$toasted.show(response.data.message, {position: 'bottom-left', type: 'success'}).goAway(3000)
						this.loader = false
						this.$emit('retrieve-transactions')
					}).catch(error => {
					if (error.response) {
						this.handleErrors(error.response)
						this.loader = false
					}

				})
			},
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
				this.sendTransaction()
			},
		},
		components: {
			TokenPin,
            VueNumeric
		},
	}
</script>

<style scoped>

</style>
