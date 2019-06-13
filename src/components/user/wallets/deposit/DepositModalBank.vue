<template>
    <div>

        <modal>

            <template slot="header">
                <h6 class="pull-left ml-3 mt-2">
                    <i class="os-icon os-icon-paper-plane"></i>
                    Quanto quer depositar?
                </h6>
                <button class="btn btn-grey pull-right mt-3 mr-3 mb-3" type="button" @click="closeDepositModal"><i
                        class="os-icon os-icon-close"></i></button>
            </template>

            <template slot="body">
                <form @submit.prevent="sendDeposit">
                    <label class="hidden">

                    </label>
                    <div class="form-group">
                        <label class="col-form-label">Insira o valor e anexe o comprovante de depósito</label>
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

                    <div class="form-group">
                        <div class="upload-btn-wrapper">
                            <button class="btn btn-block">{{ file ? file.name : 'Anexar Comprovante'}}</button>
                            <input type="file" id="file" ref="file" v-on:change="loadFile()" required>
                        </div>
                    </div>
                </form>
            </template>

            <template slot="footer">
                <!-- <button class="btn btn-grey btn-block"  type="button" @click="closeDepositModal">
                    Fechar
                </button> -->
                <button class="btn btn-primary btn-block" :disabled='!isFilled' type="submit" @click="sendDeposit">
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
		name: "DepositModalBank",
		data() {
			return {
				account: [],
				deposit: {
					amount: 0,
					system_account_id: null
				},
				file: null,
				formData: new FormData()
			};
		},
		methods: {
			setAccount(account) {
				this.account = account
				this.deposit.system_account_id = account.id;
			},
			loadFile() {
				this.file = this.$refs.file.files[0];
			},
			sendDeposit() {
				this.loader = true
				this.formData.append("file", this.file);
				this.formData.append("amount", this.deposit.amount);
				this.formData.append("system_account_id", this.deposit.system_account_id);

				this.$store
					.dispatch("sendDeposit", this.formData)
					.then(
						this.$toasted
							.show("enviando...", {position: "bottom-left"})
							.goAway(3000)
					)
					.then(response => {
						this.$toasted
							.show(response.data.message, {position: "bottom-left"})
							.goAway(3000);
						this.closeDepositModal();
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
				return this.deposit && this.file;
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
