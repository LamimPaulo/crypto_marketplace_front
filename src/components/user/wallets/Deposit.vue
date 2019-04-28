<template>
    <div class="element-wrapper mb-0 pb-0">
        <div class="element-box">
            <div class="element-info">
                <div class="element-info-with-icon">
                    <div class="element-info-icon">
                        <img alt :src="require(`@/assets/img/${wallet.coin.icon}`)">
                    </div>
                    <div class="element-info-text">
                        <h5 class="element-inner-header">Depositar {{wallet.coin.shortname}}</h5>
                        <div
                                class="element-inner-desc"
                        >preencha os dados solicitados para realizar um depósito na sua carteira
                        </div>
                    </div>
                </div>
            </div>

            <!-- <form @submit.prevent="sendDeposit"> -->
            <div class="pricing-plans row no-gutters">

                <div class="pricing-plan with-hover-effect col-md-4 col-sm-12 col-xs-12"
                     v-for="account in accounts"
                >
                    <div class="plan-description">
                        <h6>{{account.name}}</h6>
                        <p>
                            <span>Identificação:</span>
                            <strong>{{account.document}}</strong>
                        </p>
                        <p>
                            <span v-if="account.type==2">Email:</span>
                            <strong>{{account.email}}</strong>
                        </p>
                        <h6 v-if="account.type==1">{{ account.bank.name }}</h6>
                        <p v-if="account.type==1">
                            <span>Agência</span>
                            <strong>{{account.agency}} {{account.agency_digit}}</strong>
                            <br>
                            <span>Conta</span>
                            <strong>{{account.account}} {{account.account_digit}}</strong>
                            <br>
                        </p>
                        <div class="plan-btn-w">
                            <button
                                    class="btn btn-primary btn-rounded"
                                    v-if="account.type==1"
                                    @click.prevent="depositModalBank(account)"
                            >Selecionar
                            </button>

                        </div>
                    </div>
                </div>
            </div>

            <!-- </form> -->
        </div>

        <deposit-modal-bank
                v-show="isDepositBankVisible"
                @close-deposit-modal="closeDepositModalBank"
                ref="DepositModalBank"
        ></deposit-modal-bank>


    </div>
</template>

<script>
	import Vue from "vue";
	import VueNumeric from "vue-numeric";
	import DepositModalBank from "./deposit/DepositModalBank";
	import DepositModalNeteller from "./deposit/DepositModalNeteller";
	import {mapGetters} from "vuex";

	Vue.use(VueNumeric);

	export default {
		name: "Deposit",
		data() {
			return {
				isDepositBankVisible: false,
				isDepositNetellerVisible: false,
				accounts: {},
				deposit: {
					amount: 0,
					system_account_id: null
				},
				file: null,
				formData: new FormData()
			};
		},
		props: {
			wallet: {
				coin: {
					name: "-",
					shortname: "-",
					abbr: "-",
					is_crypto: 0,
					icon: "brl_icon.png"
				}
			}
		},
		computed: {
			...mapGetters(["user"]),
			isFilled() {
				return this.deposit.system_account_id;
			}
		},
		components: {
			VueNumeric,
			DepositModalBank,
			DepositModalNeteller
		},
		methods: {
			loadFile() {
				this.file = this.$refs.file.files[0];
			},
			retrieveSystemAccounts() {
				this.$store
					.dispatch("retrieveSystemAccounts")
					.then(response => {
						this.accounts = response.data.accounts;
					})
					.catch(error => {
						if (error.response) {
							this.handleErrors(error.response);
						}
					});
			},
			depositModalBank(account) {
				this.isDepositBankVisible = true;
				this.$refs.DepositModalBank.setAccount(account);
			},
			closeDepositModalBank() {
				this.isDepositBankVisible = false;
			},

		},
		mounted() {
			this.retrieveSystemAccounts()
		}
	};
</script>

<style scoped>
</style>
