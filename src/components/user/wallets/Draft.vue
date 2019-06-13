<template>
    <div class="element-wrapper mb-0 pb-0">
        <div class="element-box">

            <div class="element-info">
                <div class="element-info-with-icon">
                    <div class="element-info-icon">
                        <img alt="" :src="require(`@/assets/img/${wallet.coin.icon}`)">
                    </div>
                    <div class="element-info-text">
                        <h5 class="element-inner-header">
                            Saque {{wallet.coin.shortname}}
                        </h5>
                        <div class="element-inner-desc">
                            preencha os dados solicitados para realizar um pedido de saque da sua carteira
                        </div>
                    </div>
                </div>
            </div>


            <div class="row alert alert-warning">
                <div class="col-sm-12">
                    Solicitações de saques: <strong>{{ user.timezoneSettings.withdrawal_days }}</strong>
                    das <strong>{{ user.timezoneSettings.min_withdrawal_hour }}
                    às {{ user.timezoneSettings.max_withdrawal_hour }}</strong>
                </div>
            </div>

            <form @submit.prevent="sendDraft"
                  v-if="user.timezoneSettings.withdrawal_day && user.timezoneSettings.withdrawal_time">


                <div class="row">
                    <div class="col-12">
                        <div class="row">
                            <div class="col-12">
                                <label> Selecione a conta de destino:</label>
                            </div>
                            <div class="col-sm-12 col-md-4 col-lg-4" v-for="account in accounts">
                                <div class="profile-tile">
                                    <div class="profile-tile-meta">
                                        <ul>
                                            <li>
                                                <label class="hidden">
                                                    <input class="form-check-input" name="user_account_id" type="radio"
                                                           v-model="draft.user_account_id" :value="account.id">
                                                </label>
                                                <strong>{{account.nickname}}</strong>
                                            </li>

                                            <li v-if="account.type==1">
                                                <strong>{{account.bank.name}}</strong>
                                            </li>

                                        </ul>
                                        <div class="pt-btn">
                                            <button type="button" class="btn btn-grey btn-sm"
                                                    v-if="draft.user_account_id !== account.id"
                                                    @click="draft.user_account_id = account.id">
                                                Selecionar
                                            </button>
                                            <button type="button" class="btn btn-success btn-sm"
                                                    v-if="draft.user_account_id === account.id"
                                                    @click="draft.user_account_id = account.id">
                                                Selecionado
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-12 col-md-12 col-lg-12" v-if="draft.user_account_id">
                        <div class="row">
                            <div class="col-sm-12 col-md-6">
                                <div class="form-group">
                                    <label> Quanto quer sacar?</label>

                                    <vue-numeric class="form-control" v-if="user.country_id===31" placeholder="Valor"
                                                 :min="0" :max="parseFloat(wallet.balance)" :minus="false"
                                                 :precision="2"
                                                 v-model="draft.amount" currency="R$"
                                                 @blur="calcWithdrawalTax"
                                                 decimal-separator=","
                                                 thousand-separator="."></vue-numeric>

                                    <vue-numeric
                                            class="form-control"
                                            v-else
                                            placeholder="Value"
                                            :min="0"
                                            :minus="false"
                                            :precision="2"
                                            v-model="draft.amount"
                                            @blur="calcWithdrawalTax"
                                            currency="$"
                                            decimal-separator="."
                                            thousand-separator=","
                                    ></vue-numeric>
                                </div>


                                <div class="form-group">
                                    <label>Prazo de Pagamento</label>
                                    <select class="form-control" v-model="draft.tax_id" @change="calcWithdrawalTax">
                                        <option value="0">Selecione o prazo</option>
                                        <option :value="tax.id" v-for="tax in taxes">{{ tax.deadline + ' dias / ' +
                                            tax.tax
                                            + '%'}}
                                        </option>
                                    </select>
                                </div>

                                <div class="form-group">
                                    <label>Pagamento em: </label>
                                    <input class="form-control" v-model="draft.deadline" readonly type="text">
                                </div>
                            </div>

                            <div class="col-sm-12 col-md-6">
                                <div class="form-group">
                                    <label>Taxa: </label>
                                    <input class="form-control" v-model="draft.tax" readonly type="text">
                                </div>

                                <div class="form-group">
                                    <label>TED: </label>
                                    <input class="form-control" v-model="draft.ted" readonly type="text">
                                </div>

                                <div class="form-group">
                                    <label>Total do Saque: </label>
                                    <input class="form-control" v-model="draft.total" readonly type="text">
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="form-buttons-w text-right">
                    <button class="btn btn-success" :disabled='!isFilled'
                            @click.prevent="showTokenPinModal('sendDraft', 1)"
                            type="button"> Solicitar
                    </button>
                </div>
            </form>

        </div>

        <token-pin v-show="isTokenPinVisible" ref="tokenPinComponent"
                   @close-token-pin-modal="closeTokenPinModal" @token-data="handleTokenPinData"/>
    </div>
</template>

<script>
	import Vue from 'vue'
	import VueNumeric from 'vue-numeric'
	import TokenPin from './../../verifications/TokenPin'
	import {mapGetters} from 'vuex'

	Vue.use(VueNumeric)

	export default {
		name: "Draft",
		data() {
			return {
				isTokenPinVisible: false,
				accounts: {},
				draft: {
					amount: 0,
					tax_id: 0,
					tax: 0,
					ted: 0,
					total: 0,
					deadline: 0,
					user_account_id: null,
					action: 1
				},
				taxes: {},
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
			...mapGetters([
				'user'
			]),
			isFilled() {
				return this.draft.user_account_id && this.draft.tax_id;
			},
		},
		methods: {
			sendDraft() {
				this.$store.dispatch('sendDraft', {
					user_account_id: this.draft.user_account_id,
					amount: this.draft.amount,
					tax_id: this.draft.tax_id,
					code: this.token.code,
					pin: this.token.pin,
					action: this.draft.action
				})
					.then(
						this.$toasted.show('solicitando...', {position: 'bottom-left'}).goAway(3000)
					)
					.then(response => {
						this.$toasted.show(response.data.message, {position: 'bottom-left'}).goAway(3000)
						setTimeout(function () {
							location.reload()
						}, 3000)
					}).catch(error => {
					if (error.response) {
						this.handleErrors(error.response)
					}
				})
			},
			retrieveAccounts() {
				this.$store.dispatch('retrieveAccounts')
					.then(response => {
						this.accounts = response.data.accounts
					})
					.catch(error => {

					})
			},
			retrieveWithdrawalTax() {
				this.$store.dispatch('retrieveWithdrawalTax')
					.then(response => {
						this.taxes = response.data
					}).catch(error => {
					if (error.response) {
						this.handleErrors(error.response)
					}
				})
			},
			calcWithdrawalTax() {
				if (this.draft.amount > 0 && this.draft.tax_id > 0) {
					this.$store.dispatch('calcWithdrawalTax', this.draft)
						.then(response => {
							this.draft.tax = response.data.tax
							this.draft.ted = response.data.ted
							this.draft.total = response.data.total
							this.draft.deadline = response.data.deadline
						}).catch(error => {
						if (error.response) {
							this.handleErrors(error.response)
						}
					})
				} else {
					this.$toasted.show('preencha o valor e o prazo para completar a solicitação', {
						position: 'top-center',
						type: "error"
					}).goAway(3000)
					this.draft.tax_id = 0
				}
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
				this.sendDraft()
			},

		}
		,
		mounted() {
			this.retrieveAccounts()
			this.retrieveWithdrawalTax()
		}
		,

		components: {
			TokenPin,
			VueNumeric
		}
	}
</script>

<style scoped>

</style>
