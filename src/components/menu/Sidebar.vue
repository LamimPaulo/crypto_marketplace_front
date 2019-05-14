<template>
    <div class="content-panel compact color-scheme-light">
        <!-- <div class="content-panel-close">
          <i class="os-icon os-icon-close"></i>
        </div> -->
        <div class="element-wrapper">
            <h5 class="element-header">
                <strong><img :src="require(`@/assets/img/svg_icons/accounting.svg`)" width="30px" alt=""> Conversão
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
                                            v-if="coin.abbr!=='LQX'"> {{coin.abbr}}
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

        <div class="element-wrapper compact" v-if="transactions.length">
            <h6 class="element-header">
                Histórico
            </h6>
            <div class="element-box-tp">
                <table class="table table-compact smaller text-faded mb-0">
                    <thead>
                    <tr>
                        <th>
                            Tipo
                        </th>
                        <th class="text-center">
                            Data
                        </th>
                        <th class="text-right">
                            Total
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="conversion in transactions">
                        <td>
                            <span>{{conversion.coin.abbr}}</span>
                            <i class="os-icon os-icon-arrow-down-left text-success" v-if="conversion.type===1"></i>
                            <i class="os-icon os-icon-arrow-down-right text-danger" v-if="conversion.type===2"></i>
                        </td>
                        <td class="text-center">
                            {{conversion.dateLocal}}
                        </td>
                        <td class="text-right text-bright">
                            {{ conversion.amountRounded }}
                        </td>
                    </tr>
                    </tbody>
                </table>
                <a class="centered-load-more-link smaller" href="/transactions/list"
                   v-if="count > 10"><span>Ver todas</span></a>
            </div>
        </div>

        <div class="element-wrapper compact">
            <h6>
                <img :src="require(`@/assets/img/svg_icons/id-card.svg`)" width="30px" alt=""> Verificação de Perfil
                <span class="animate-border mt-2 mb-3"></span>
            </h6>
            <div class="element-box-tp">

                <div class="todo-list">
                    <a class="todo-item" href="/levels" v-if="!user.api_key"
                       style="border: 1px solid rgb(4, 123, 248);">
                        <div class="ti-info">
                            <div class="ti-header"> Key Code</div>
                            <div class="ti-sub-header"> Você não possui Key Code</div>
                        </div>
                        <div class="ti-icon">
                            <i class="os-icon os-icon-arrow-right7"></i>
                        </div>
                    </a>

                    <a class="todo-item" v-tooltip.right="'Clique para Copiar'" @click="copyAddress" v-else
                       style="border: 1px solid rgb(4, 123, 248);">
                        <div class="ti-success">
                            <div class="ti-header"> Key Code</div>
                            <div class="ti-sub-header"> {{ user.api_key }}</div>
                        </div>
                        <div class="ti-icon">
                            <i class="os-icon os-icon-copy"></i>
                        </div>
                    </a>

                    <div v-if="user.country_id===31">
                        <a class="todo-item" href="/payment-accounts" v-if="!count_accounts">
                            <div class="ti-info">
                                <div class="ti-header"> Contas Bancárias</div>
                                <div class="ti-sub-header"> Você não possui contas cadastradas</div>
                            </div>
                            <div class="ti-icon">
                                <i class="os-icon os-icon-arrow-right7"></i>
                            </div>
                        </a>

                        <a class="todo-item complete" href="/payment-accounts" v-if="count_accounts">
                            <div class="ti-info">
                                <div class="ti-header"> Contas Bancárias</div>
                                <div class="ti-sub-header"> Você possui {{count_accounts}} conta{{count_accounts>1 ? 's'
                                    :
                                    ''}}
                                    cadastrada{{count_accounts>1 ? 's' : ''}}
                                </div>
                            </div>
                            <div class="ti-icon">
                                <i class="os-icon os-icon-check"></i>
                            </div>
                        </a>
                    </div>

                    <a class="todo-item error" href="/profile"
                       v-if="!user.pin_filled">
                        <div class="ti-info">
                            <div class="ti-header"> Pin de Segurança</div>
                            <div class="ti-sub-header"> Você ainda não criou seu pin</div>
                        </div>
                        <div class="ti-icon"><i class="os-icon os-icon-info"></i></div>
                    </a>

                    <a class="todo-item complete" href="/profile"
                       v-if="user.pin_filled">
                        <div class="ti-info">
                            <div class="ti-header"> Pin de Segurança</div>
                            <div class="ti-sub-header"> pin de segurança criado</div>
                        </div>
                        <div class="ti-icon"><i class="os-icon os-icon-check"></i></div>
                    </a>

                    <p v-if="user.document_verified">
                        <a class="todo-item complete" href="#">
                            <div class="ti-info">
                                <div class="ti-header"> Identificado</div>
                                <div class="ti-sub-header"> Dados pessoais preenchidos</div>
                            </div>
                            <div class="ti-icon"><i class="os-icon os-icon-check"></i></div>
                        </a>
                    </p>

                    <p v-if="!user.document_verified">
                        <a class="todo-item error" href="/profile"
                           v-if="!user.document">
                            <div class="ti-info">
                                <div class="ti-header"> Dados Pessoais</div>
                                <div class="ti-sub-header"> Seus dados estão incompletos</div>
                            </div>
                            <div class="ti-icon"><i class="os-icon os-icon-info"></i></div>
                        </a>
                    </p>

                    <p v-if="user.user_level_id>1||user.country_id!==31">
                        <a class="todo-item complete" href="#" v-if="documents.document_status==='valid'">
                            <div class="ti-info">
                                <div class="ti-header"> Envio de Documento</div>
                                <div class="ti-sub-header"> {{ documents.document_message }}</div>
                            </div>
                            <div class="ti-icon"><i class="os-icon os-icon-check"></i></div>
                        </a>

                        <a class="todo-item pending" href="#" v-if="documents.document_status==='pending'">
                            <div class="ti-info">
                                <div class="ti-header"> Envio de Documento</div>
                                <div class="ti-sub-header"> {{ documents.document_message }}</div>
                            </div>
                            <div class="ti-icon"><i class="os-icon os-icon-eye"></i></div>
                        </a>

                        <a class="todo-item error" href="/profile"
                           v-if="documents.document_status==='not_found'||documents.document_status==='invalid'">
                            <div class="ti-info">
                                <div class="ti-header"> Envio de Documento</div>
                                <div class="ti-sub-header"> {{ documents.document_message }}</div>
                            </div>
                            <div class="ti-icon"><i class="os-icon os-icon-info"></i></div>
                        </a>

                        <a class="todo-item complete" href="#" v-if="documents.selfie_status==='valid'">
                            <div class="ti-info">
                                <div class="ti-header"> Selfie de Segurança</div>
                                <div class="ti-sub-header"> {{ documents.selfie_message }}</div>
                            </div>
                            <div class="ti-icon"><i class="os-icon os-icon-check"></i></div>
                        </a>

                        <a class="todo-item pending" href="#" v-if="documents.selfie_status==='pending'">
                            <div class="ti-info">
                                <div class="ti-header"> Selfie de Segurança</div>
                                <div class="ti-sub-header"> {{ documents.selfie_message }}</div>
                            </div>
                            <div class="ti-icon"><i class="os-icon os-icon-eye"></i></div>
                        </a>

                        <a class="todo-item error" href="/profile"
                           v-if="documents.selfie_status==='not_found'||documents.selfie_status==='invalid'">
                            <div class="ti-info">
                                <div class="ti-header"> Selfie de Segurança</div>
                                <div class="ti-sub-header"> {{ documents.selfie_message }}</div>
                            </div>
                            <div class="ti-icon"><i class="os-icon os-icon-info"></i></div>
                        </a>
                    </p>

                    <p v-if="user.user_level_id===3">
                        <a class="todo-item error" href="/profile"
                           v-if="!user.document">
                            <div class="ti-info">
                                <div class="ti-header"> Dados Pessoais</div>
                                <div class="ti-sub-header"> Seus dados estão incompletos</div>
                            </div>
                            <div class="ti-icon"><i class="os-icon os-icon-info"></i></div>
                        </a>
                    </p>

                </div>
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
				documents: {
					selfie_status: 'not_found',
					selfie_message: 'Arquivo ainda não enviado',
					document_status: 'not_found',
					document_message: 'Arquivo ainda não enviado',
				},
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
					.then(this.$toasted.show('enviando solicitação...', {position: 'bottom-left'}).goAway(5000))
					.then(response => {
						this.$toasted.show(response.data.message, {position: 'bottom-left'}).goAway(3000)
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
			retrieveDocuments() {
				this.$store.dispatch('retrieveDocuments')
					.then(response => {
						this.documents.selfie_status = response.data.selfie.status
						this.documents.selfie_message = response.data.selfie.message
						this.documents.document_status = response.data.document.status
						this.documents.document_message = response.data.document.message
					}).catch(error => {
					if (error.response) {
						this.handleErrors(error.response)
					}
				})
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
				this.$toasted.show('Copiado!', {position: 'bottom-left'}).goAway(3000)
			}
		},
		mounted() {
			this.conversionList()
			this.retrieveDocuments()
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

    .content-panel {
        border: 1px solid #cecece;
        border-top: none;
        background-color: #e6e6ea;
    }

    .element-header {
        font-weight: 500;
        line-height: 1.2;
    }

    select option {
        color: #000;
    }

    /* Animated heading border */
    @keyframes primary-short {
        0% {
            width: 15%;
        }
        50% {
            width: 90%;
        }
        100% {
            width: 10%;
        }
    }

    @keyframes primary-long {
        0% {
            width: 80%;
        }
        50% {
            width: 0%;
        }
        100% {
            width: 80%;
        }
    }
</style>
