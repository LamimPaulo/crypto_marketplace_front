<template>
    <div class=" compact color-scheme-light" id="content-panel">
        <div class="element-wrapper">
            <h5 class="element-header">
                <strong><img :src="require(`@/assets/img/svg_icons/accounting.svg`)" width="28px" alt=""> Conversão
                    Rápida</strong>
            </h5>
            <div class="element-box-tp">
                <form action="">
                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label for="">De</label>
                                <select class="form-control" v-model="conversor.base" @change="conversorBaseChange">
                                    <option :value="coin.abbr" v-for="coin in myCoins" selected
                                            v-if="coin.abbr!=='LQXD'"> {{coin.abbr}}
                                    </option>

                                </select>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label for="">Para</label>
                                <select class="form-control" v-model="conversor.quote" @change="conversorQuoteChange">
                                    <option :value="coin.abbr" v-for="coin in myCoins"
                                            :disabled="conversor.base===coin.abbr" selected>
                                        {{coin.abbr}}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label for="">Quantidade</label>
                                <vue-numeric class="form-control" placeholder="Quantidade..."
                                         v-if="conversor.base!==conversor.quote"
                                         @input="retrieveConversion" v-model="conversor.amount"
                                         :min="0" :minus="false" :precision="5"
                                         currency="" decimal-separator="."
                                         thousand-separator=""></vue-numeric>

                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label for="">Total</label>
                                <input class="form-control" type="text" :value="conversor.total" readonly>
                            </div>
                        </div>
                    </div>

                    <div class="row" v-if="!conversor.message&&conversor.total">
                        <div class="col-12 ">
                            <span class="badge badge-danger">Saldo Insuficiente</span>
                        </div>
                    </div>

                    <button class="btn btn-primary btn-block btn-lg" :disabled="!isFilled"
                            @click.prevent="showPinModal('convertAmount')">
                        <i class="os-icon os-icon-refresh-ccw"></i><span>Converter</span>
                    </button>
                </form>
            </div>
        </div>

       

        <span class="animate-border"></span>

        <pin v-show="isPinVisible" ref="pinComponent"
             @close-pin-modal="closePinModal" @pin-data="handlePinData"/>

    </div>
</template>

<script>
	import {mapGetters} from 'vuex'
	import Pin from './../verifications/Pin'
	import debounce from 'lodash/debounce'
    import Vue from 'vue'
    import VueNumeric from 'vue-numeric'

    Vue.use(VueNumeric)

	export default {
		name: "Sidebar",
		data() {
			return {
				isPinVisible: false,
				conversor: {
					base: 'BTC',
					quote: 'BRL',
					amount: 0,
					total: null,
					message: false
				},
				token: {
					pin: null
				},
				transactions: [],
				count: null,
				count_accounts: null,
				myCoins: []
			}
		},
		computed: {
			...mapGetters([
				'user'
			]),
			isFilled() {
				return (this.conversor.amount > 0) && this.conversor.message;
			},
		},
		methods: {
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
			retrieveConversion: debounce(function () {
				if (this.conversor.amount > 0) {
					this.$store.dispatch('retrieveConversion', this.conversor)
						.then(response => {
							this.conversor.total = response.data.amount
							this.conversor.message = response.data.message
						})
						.catch(error => {
							if (error.response) {
								this.handleErrors(error.response)
							}
						})
				}
			}, 500),
			convertAmount() {
				this.$store.dispatch('convertAmount', {
					base: this.conversor.base,
					quote: this.conversor.quote,
					amount: this.conversor.amount,
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
			conversionList() {
				this.$store.dispatch('conversionList')
					.then(response => {
						this.transactions = response.data.transactions
						this.count = response.data.count
					})
					.catch(error => {
						if (error.response) {
							this.handleErrors(error.response)
						}
					})
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
			},
			retrieveAccounts() {
				this.$store.dispatch('retrieveAccounts')
					.then(response => {
						this.count_accounts = response.data.count
					})
					.catch(error => {

					})
			},
			conversorBaseChange() {
				this.conversor.amount = 0
				this.conversor.total = null
			},
			conversorQuoteChange() {
				this.conversor.amount = 0
				this.conversor.total = null
			},
			copyAddress() {
				const selBox = document.createElement('textarea');
				selBox.style.position = 'fixed';
				selBox.style.left = '0';
				selBox.style.top = '0';
				selBox.style.opacity = '0';
				selBox.value = this.user.api_key;
				document.body.appendChild(selBox);
				selBox.focus();
				selBox.select();
				document.execCommand('copy');
				document.body.removeChild(selBox);
				this.$toasted.show('Copiado!', {position: 'bottom-left', type: 'info'}).goAway(3000)
			}
		},
		mounted() {
			this.conversionList()
			this.retrieveAccounts()
			this.myCoinsList()
		},
		components: {
			Pin,
            VueNumeric
		}
	}
</script>

<style scoped>
    .todo-item {
        cursor: pointer;
    }

    .element-header {
        font-weight: 500;
        line-height: 1.2;
    }

	strong {
		font-size: 18px;
	}

    select option {
        color: #000;
    }
</style>
