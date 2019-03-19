<template>
    <div>

        <modal>

            <template slot="header">
                <h6 class="pull-left ml-3 mt-2">
                    <i class="os-icon os-icon-paper-plane"></i>
                    Quanto quer depositar?
                </h6>
                <button class="btn btn-grey pull-right m-3" type="button" @click="closeDepositModal"><i
                        class="os-icon os-icon-close"></i></button>
            </template>

            <template slot="body">
                <label class="hidden">
                    <input class="form-check-input hidden" name="system_account_id" type="radio"
                           v-model="deposit.system_account_id">
                </label>
                <div class="form-group">
                    <label class="col-form-label">Pague com Paypal. Insira o valor</label>
                    <vue-numeric
                            class="form-control"
                            v-if="user.country_id===31"
                            placeholder="Valor"
                            :min="0"
                            :minus="false"
                            :precision="2"
                            v-model="deposit.amount"
                            currency="R$"
                            decimal-separator=","
                            thousand-separator="."
                    ></vue-numeric>

                    <vue-numeric
                            class="form-control"
                            v-else
                            placeholder="Value"
                            :min="0"
                            :minus="false"
                            :precision="2"
                            v-model="deposit.amount"
                            currency="$"
                            decimal-separator="."
                            thousand-separator=","
                    ></vue-numeric>
                </div>
            </template>

            <template slot="footer">
                <PayPal
                        :amount="deposit.amount"
                        currency="BRL"
                        :button-style="btnPaypal"
                        :experience="experienceOptions"
                        :client="credentials"
                        v-on:payment-authorized="paymentAuthorized"
                        v-on:payment-completed="paymentCompleted"
                        v-on:payment-cancelled="paymentCancelled">
                </PayPal>
            </template>

        </modal>
    </div>
</template>

<script>
	import Modal from "./../../../layouts/Modal";
	import PayPal from 'vue-paypal-checkout';
	import {mapGetters} from "vuex";

	export default {
		name: "DepositModalPaypal",
		data() {
			return {
				account: [],
				deposit: {
					amount: '0',
					system_account_id: null
				},
				credentials: {
					sandbox: `${process.env.PAYPAL_SANDBOX_KEY}`,
					production: `${process.env.PAYPAL_LIVE_KEY}`,
				},
				experienceOptions: {
					input_fields: {
						no_shipping: 1
					}
				},
				btnPaypal: {
					label: 'checkout',
					size: 'responsive',
					shape: 'rect',
					color: 'blue',
				},
				braintreeSdk: window.braintree,
			};
		},
		methods: {
			setAccount(account) {
				this.account = account
				this.deposit.system_account_id = account.id;
			},
			closeDepositModal() {
				this.$emit('close-deposit-modal')
			},
			paymentAuthorized: function (data) {
			},
			paymentCompleted: function (data) {
				this.$store
					.dispatch("sendPaypalDeposit", {
						payment_id: data.id,
						system_account_id: this.deposit.system_account_id,
						amount: data.transactions[0].amount.total,
                        currency: data.transactions[0].currency,
                    })
					.then(
						this.$toasted
							.show("enviando...", {position: "bottom-left"})
							.goAway(3000)
					)
					.then(response => {
						this.$toasted
							.show(response.data.message, {position: "bottom-left"})
							.goAway(3000);
						this.refresh()
					})
					.catch(error => {
						if (error.response) {
							this.handleErrors(error.response);
						}
					});
			},
			paymentCancelled: function (data) {

			},
			refresh() {
				setTimeout(function () {
					location.reload();
				}, 3000);
			}
		},
		computed: {
			...mapGetters(["user"]),
			isFilled() {
				// return this.deposit.system_account_id;
				return this.deposit;
			}
		},
		components: {
			PayPal,
			Modal
		},
	};
</script>

<style scoped>
    h6 {
        padding-top: 15px;
        text-align: center;
        font-size: 1.26rem;
        line-height: 1.25;
        color: #334152 !important;
    }

    h6 .os-icon {
        color: #047bf8;
    }

    .form-control {
        color: #495057 !important;
        background-color: #fff !important;
        background-clip: padding-box;
        border: 2px solid #dde2ec !important;
    }
</style>
