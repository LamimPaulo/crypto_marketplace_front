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
                    <div class="plan-body">
                        <div class="plan-price-w">
                            <img
                                    v-if="account.type==1"
                                    width="90px"
                                    src="@/assets/img/logo-caixa-economica-federal-256.png"
                                    alt
                            >
                            <img v-if="account.type==2" width="90px" src="@/assets/img/paypal.png" alt>
                        </div>
                        <div class="plan-btn-w">
                            <button
                                    class="btn btn-primary btn-rounded"
                                    v-if="account.type==1"
                                    @click.prevent="depositModalBank(account)"
                            >Selecionar
                            </button>

                            <button class="btn btn-primary btn-rounded"
                                    v-else
                                    @click.prevent="depositModalPaypal(account)">
                                Selecionar
                            </button>

                        </div>
                    </div>
                    <div class="plan-description">
                        <h6>{{account.name}}</h6>
                        <p>
                            <span>Identificação:</span>
                            <strong>{{account.document}}</strong>
                        </p>
                        <p v-if="account.type==2">Você pode enviar fundos para nossa conta paypal!</p>
                        <p>
                            <span v-if="account.type==2">Email:</span>
                            <strong>{{account.email}}</strong>
                        </p>
                        <h6 v-if="account.type==1">CAIXA ECONÔMICA FEDERAL</h6>
                        <p v-if="account.type==1">
                            <span>Agência</span>
                            <strong>{{account.agency}} {{account.agency_digit}}</strong>
                            <br>
                            <span>Conta</span>
                            <strong>{{account.account}} {{account.account_digit}}</strong>
                            <br>
                        </p>
                    </div>
                </div>

                <div class="pricing-plan with-hover-effect col-md-4 col-sm-12 col-xs-12">
                    <div class="plan-body">
                        <div class="plan-price-w">
                            <img width="90px" src="@/assets/img/neteller.png" alt>
                        </div>
                        <div class="plan-btn-w">
                            <button class="btn btn-primary btn-rounded"
                                    @click.prevent="depositModalNeteller(account)">
                                Selecionar
                            </button>
                        </div>
                    </div>
                    <div class="plan-description">
                        <h6>NAVI Serviços Digitais LTDA</h6>
                        <p>
                            <span>Identificação</span>
                            <strong>20.924.974/0001-79</strong>
                        </p>
                        <p>Você pode enviar fundos para nossa conta paypal!</p>
                        <p>
                            <span>Email:</span>
                            <strong>vendasnavi@hotmail.com</strong>
                        </p>
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

        <deposit-modal-paypal
                v-show="isDepositPaypalVisible"
                @close-deposit-modal="closeDepositModalPaypal"
                ref="DepositModalPaypal"
        ></deposit-modal-paypal>

        <deposit-modal-neteller
                v-show="isDepositNetellerVisible"
                @close-deposit-modal="closeDepositModalNeteller"
                ref="DepositModalNeteller"
        ></deposit-modal-neteller>

    </div>
</template>

<script>
	import Vue from "vue";
	import VueNumeric from "vue-numeric";
	import DepositModalBank from "./deposit/DepositModalBank";
	import DepositModalPaypal from "./deposit/DepositModalPaypal";
	import DepositModalNeteller from "./deposit/DepositModalNeteller";
	import {mapGetters} from "vuex";

	Vue.use(VueNumeric);

	export default {
		name: "Deposit",
		data() {
			return {
				isDepositBankVisible: false,
				isDepositPaypalVisible: false,
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
			DepositModalPaypal,
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
			depositModalPaypal(account) {
				this.isDepositPaypalVisible = true;
				this.$refs.DepositModalPaypal.setAccount(account);
			},
			depositModalNeteller(account) {
				this.isDepositNetellerVisible = true;
				this.$refs.DepositModalNeteller.setAccount(account);
			},
			closeDepositModalBank() {
				this.$emit("close-deposit-modal");
				this.isDepositBankVisible = false;
			},
			closeDepositModalPaypal() {
				this.$emit("close-deposit-modal");
				this.isDepositPaypalVisible = false;
			},
			closeDepositModalNeteller() {
				this.$emit("close-deposit-modal");
				this.isDepositNetellerVisible = false;
			}
		},
		mounted() {
			this.retrieveSystemAccounts()
		}
	};
</script>

<style scoped>
</style>
