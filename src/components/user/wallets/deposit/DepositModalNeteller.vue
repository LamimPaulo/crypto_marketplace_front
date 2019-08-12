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
                <form @submit.prevent="sendNetellerDeposit">
                    <label class="hidden">
                        <input class="form-check-input hidden" name="system_account_id" type="radio"
                               v-model="deposit.system_account_id">
                    </label>
                    <div class="form-group">
                        <label class="col-form-label">Pague com Neteller. Insira o valor</label>
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
                </form>
            </template>

            <template slot="footer">
                <button class="btn btn-primary btn-block" :disabled='!isFilled' type="submit"
                        @click="sendNetellerDeposit">
                    Enviar
                </button>
            </template>

        </modal>
    </div>
</template>

<script>
	import Modal from "./../../../layouts/Modal";
	import VueNumeric from "vue-numeric";
	import {mapGetters} from "vuex";

	export default {
		name: "DepositModalNeteller",
		data() {
			return {
				accounts: {},
				deposit: {
					amount: 0,
					system_account_id: null
				},
				formData: new FormData()
			};
		},
		methods: {
			setAccount(account) {
				this.account = account
			},
			sendNetellerDeposit() {
				this.formData.append("amount", this.deposit.amount);
				this.formData.append("system_account_id", this.deposit.system_account_id);

				this.$store
					.dispatch("sendNetellerDeposit", this.formData)
					.then(
						this.$toasted
							.show("enviando...", {position: 'bottom-left', type: 'info'})
							.goAway(3000)
					)
					.then(response => {
						this.$toasted
							.show(response.data.message, {position: 'bottom-left', type: 'success'})
							.goAway(3000);
						setTimeout(function () {
							location.reload();
						}, 3000);
					})
					.catch(error => {
						if (error.response) {
							this.handleErrors(error.response);
						}
					});
			},
			closeDepositModal() {
				this.$emit('close-deposit-modal')
				this.isDepositVisible = false;
			}
		},
		computed: {
			...mapGetters(["user"]),
			isFilled() {
				return this.deposit.amount;
			}
		},
		components: {
			Modal,
			VueNumeric
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
