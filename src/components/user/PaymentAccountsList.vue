<template>
    <div class="element-wrapper">
        <div class="loader" v-if="loader"></div>
        <h6 class="element-header">
            Suas Contas
        </h6>
        <div class="element-box">
            <table class="table table-clean">
                <tr v-if="loading">
                    <td>
                        carregando listagem...
                    </td>
                </tr>
                <tr v-if="!count&&!loading">
                    <td>
                        ainda não existem contas cadastradas
                    </td>
                </tr>
                <tr v-for="account in accounts">
                    <td>
                        <div class="value">
                            Apelido: {{ account.nickname }} <br>
                            Conta: {{ account.account }} <br>
                            Dígito Conta: {{ account.account_digit }} <br>
                            Agência:{{ account.agency }} <br>
                            Dígito Agência:{{ account.agency_digit }} <br>
                        </div>
                        <span class="sub-value" v-if="user.country_id===31">{{ account.bank.code + ' - '+ account.bank.name }}</span>
                        <span class="sub-value" v-else>{{ account.bank_name }}</span>
                        <br>
                        <div v-if="user.country_id===31">
                            <span class="sub-value" v-if="account.category===1">Conta Corrente</span>
                            <span class="sub-value" v-else>Conta Poupança</span>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="value">
                            <a href="#" class="btn btn-danger btn-sm"
                               @click.prevent="showTokenPinModal('deleteAccount', 9, account.id)">
                                Excluir</a>
                            <!--              <router-link class="btn btn-sm btn-primary" :to="{ name: 'payment-account', params: { id: account.id }}">alterar</router-link>-->
                        </div>

                    </td>
                </tr>

            </table>
        </div>
        <token-pin v-show="isTokenPinVisible" ref="tokenPinComponent"
                   @close-token-pin-modal="closeTokenPinModal" @token-data="handleTokenPinData"/>
    </div>
</template>

<script>
	import TokenPin from './../verifications/TokenPin'
	import {mapGetters} from "vuex";

	export default {
		name: "PaymentAccountsList",
		data() {
			return {
				loader: true,
				isTokenPinVisible: false,
				accounts: [],
				count: null,
				loading: true,
				token: {
					code: null,
					pin: null
				},
				delete_account: null
			}
		},
		methods: {
			retrieveAccounts() {
				this.loader = true
				this.$store.dispatch('retrieveAccounts')
					.then(response => {
						this.accounts = response.data.accounts
						this.count = response.data.count
						this.loading = false
						this.loader = false
					})
					.catch(error => {
						this.loading = false
						this.loader = false
					})
			},
			showTokenPinModal(method, action, delete_account = null) {
				this.delete_account = delete_account
				this.isTokenPinVisible = true
				this.$refs.tokenPinComponent.setData(method, action)
			},
			closeTokenPinModal() {
				this.isTokenPinVisible = false;
			},
			handleTokenPinData(data) {
				this.token.code = data.code
				this.token.pin = data.pin

				if (data.method === 'deleteAccount') {
					this.deleteAccount()
				}

				if (data.method === 'storeAccount') {
					this.storeAccount()
				}
			},
			resetToken() {
				this.token.code = null
				this.token.pin = null
				this.$refs.tokenPinComponent.resetData()
			},
			deleteAccount() {
				this.$store.dispatch('deleteAccount', {
					account: this.delete_account,
					action: 9,
					code: this.token.code,
					pin: this.token.pin,
				})
					.then(this.$toasted.show('salvando seus dados...', {
						position: 'bottom-left',
						type: 'info'
					}).goAway(5000))
					.then(response => {
						this.$toasted.show(response.data.message, {
							position: 'bottom-left',
							type: 'success'
						}).goAway(3000)
						this.$router.push({name: 'payment-accounts'})
						location.reload()
					})
					.catch(error => {
						if (error.response) {
							this.handleErrors(error.response)
							this.resetToken()
							this.delete_account = null
						}
					})
			},
		},
		components: {
			TokenPin
		},
		computed: {
			...mapGetters(["user"])
		},
		mounted() {
			this.retrieveAccounts()
		}
	}
</script>

<style scoped>

</style>
