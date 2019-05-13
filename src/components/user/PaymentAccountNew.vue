<template>
    <div class="content-box">
        <div class="loader" v-if="loader"></div>
        <vue-headful title="Dados de Pagamento - Liquidex" description="Liquidex"/>

        <div class="row" v-if="this.$store.state.user.country_id===31">
            <div class="col-sm-6">
                <div class="element-wrapper">
                    <div class="element-box">

                        <div class="element-info">
                            <div class="element-info-with-icon">
                                <div class="element-info-icon">
                                    <div class="os-icon os-icon-plus"></div>
                                </div>
                                <div class="element-info-text">
                                    <h5 class="element-inner-header">
                                        Adicionar Conta
                                    </h5>
                                    <div class="element-inner-desc">
                                        Contas Bancárias são necessárias apenas para operações com moeda Brasileira
                                        (BRL)
                                    </div>
                                </div>
                            </div>
                        </div>


                        <fieldset class="form-group">
                            <form @submit.prevent="storeAccount">
                                <legend><span>Dados da Conta Bancária</span></legend>
                                <div class="form-group row">

                                    <div class="col-sm-6">
                                        <div class="form-check">
                                            <label class="form-check-label">
                                                <input class="form-check-input" name="account_type" type="radio"
                                                       value="1"
                                                       v-model="account.category">Conta Corrente</label>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="form-check">
                                            <label class="form-check-label">
                                                <input class="form-check-input" name="account_type" type="radio"
                                                       value="2"
                                                       v-model="account.category">Conta Poupança</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label> Banco</label>
                                            <model-list-select :list="banks" v-model="account.bank_id" option-value="id"
                                                               option-text="name"
                                                               placeholder="buscar banco">
                                            </model-list-select>
                                        </div>
                                    </div>
                                    <input type="hidden" v-model="account.provider_id" value="1">
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label for="name">Apelido da Conta</label>
                                            <input class="form-control" placeholder="Apelido da Conta" type="text"
                                                   id="name"
                                                   v-model="account.nickname"
                                            >
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-8">
                                        <div class="form-group">
                                            <label for="account"> Número</label>
                                            <input class="form-control" placeholder="Número da Conta" type="text"
                                                   id="account"
                                                   v-model="account.account">
                                        </div>
                                    </div>
                                    <div class="col-sm-4">
                                        <div class="form-group">
                                            <label for="account_digit">&nbsp;</label>
                                            <input class="form-control" placeholder="Dígito" type="text"
                                                   id="account_digit"
                                                   v-model="account.account_digit">
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-sm-8">
                                        <div class="form-group">
                                            <label for="agency"> Agência</label>
                                            <input class="form-control" placeholder="Número da Agência" type="text"
                                                   id="agency"
                                                   v-model="account.agency">
                                        </div>
                                    </div>
                                    <div class="col-sm-4">
                                        <div class="form-group">
                                            <label for="agency_digit">&nbsp;</label>
                                            <input class="form-control" placeholder="Dígito da Agência" type="text"
                                                   id="agency_digit"
                                                   v-model="account.agency_digit">
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="observations_"> Observações</label>
                                    <input class="form-control" placeholder="Observações" type="text" id="observations_"
                                           v-model="account.observation">
                                </div>
                                <div class="form-buttons-w text-right">
                                    <button class="btn btn-primary" type="submit"> Salvar</button>
                                </div>
                            </form>
                        </fieldset>

                    </div>
                </div>
            </div>

            <div class="col-sm-6">
                <payment-accounts-list refs="accountList"></payment-accounts-list>
            </div>
        </div>

        <div class="row" v-else>
            <div class="col-md-12 alert alert-info">
                Your profile does not allow bank account registration.
            </div>
        </div>

    </div>
</template>

<script>
	import PaymentAccountsList from './PaymentAccountsList'
	import {ModelListSelect} from 'vue-search-select'

	export default {
		name: "PaymentAccountNew",
		data() {
			return {
				loader: true,
				banks: [],
				providers: [],
				account: {
					agency: null,
					account: null,
					agency_digit: null,
					account_digit: null,
					observation: null,
					nickname: null,
					email: null,
					bank_id: 22,
					category: 1,
					type: 1
				},
				accounts: {}
			}
		},
		methods: {
			storeAccount() {
				this.loader = true
				if (this.account.type === 1) {
					this.account.provider_id = 1
				}

				this.$store.dispatch('storeAccount', {
					agency: this.account.agency,
					account: this.account.account,
					agency_digit: this.account.agency_digit,
					account_digit: this.account.account_digit,
					observation: this.account.observation,
					nickname: this.account.nickname,
					email: this.account.email,
					bank_id: this.account.bank_id,
					category: this.account.category,
					type: this.account.type
				})
					.then(this.$toasted.show('salvando seus dados...', {position: 'bottom-left'}).goAway(5000))
					.then(response => {
						this.$toasted.show(response.data.message, {position: 'bottom-left'}).goAway(3000)
						this.$refs.accountList.retrieveAccounts()
						this.loader = false
					})
					.catch(error => {
						if (error.response) {
							this.handleErrors(error.response)
						}
						this.loader = false
					})

			},
			loadBanks() {
				this.$store.dispatch('retrieveBanks')
					.then(response => {
						this.banks = response.data
						this.loader = false
					}).catch(error => {
					if (error.response) {
						this.handleErrors(error.response)
					}
				})
			}
		},
		components: {
			PaymentAccountsList,
			ModelListSelect
		},
		mounted() {
			this.loadBanks()
		}
	}
</script>

<style scoped>
    .content-box {
        height: 100vh;
    }
</style>
