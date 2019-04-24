<template>
    <div>
        <vue-headful title="Masternode" description="Liquidex"/>
        <div class="loader" v-if="loader"></div>

        <div class="content-box">
            <div class="element-wrapper">
                <h6 class="element-header">
                    Investimento Masternode
                </h6>

                <div class="element-box-tp mb-2">
                    <div class="row">

                        <div class="col-6 col-sm-3 col-xxl-3">
                            <a class="element-box el-tablo centered trend-in-corner smaller mb-3" href="#">
                                <div class="label"> {{ investment_data.coin }} Sob Gestão</div>
                                <div class="value"> {{ investment_data.under_managment }}</div>
                            </a>
                        </div>

                        <div class="col-6 col-sm-3 col-xxl-3">
                            <a class="element-box el-tablo centered trend-in-corner smaller mb-3" href="#">
                                <div class="label"> Lucro Médio</div>
                                <div class="value"> {{ investment_data.average_profits.base }} %</div>
                            </a>
                        </div>

                        <div class="col-6 col-sm-3 col-xxl-3">
                            <a class="element-box el-tablo centered trend-in-corner smaller mb-3" href="#">
                                <div class="label"> Lucro Médio Mensal</div>
                                <div class="value"> {{ investment_data.average_profits.current_month }} %</div>
                            </a>
                        </div>

                        <div class="col-6 col-sm-3 col-xxl-3">
                            <a class="element-box el-tablo centered trend-in-corner smaller mb-3" href="#">
                                <div class="label"> Lucro Médio Diário</div>
                                <div class="value"> {{ investment_data.average_profits.current_day }} %</div>
                            </a>
                        </div>

                    </div>

                    <div class="row">

                        <div class="col-6 col-sm-3 col-xxl-3">
                            <a class="element-box el-tablo centered trend-in-corner smaller mb-3" href="#">
                                <div class="label"> Meu Investimento</div>
                                <div class="value"> {{ investment_data.user_investment }}</div>
                            </a>
                        </div>

                        <div class="col-6 col-sm-3 col-xxl-3">
                            <a class="element-box el-tablo centered trend-in-corner smaller mb-3" href="#">
                                <div class="label"> Meu Lucro</div>
                                <div class="value"> {{ investment_data.user_profit }}</div>
                            </a>
                        </div>

                        <div class="col-6 col-sm-3 col-xxl-3">
                            <a class="element-box el-tablo centered trend-in-corner smaller mb-3" href="#">
                                <div class="label"> Total</div>
                                <div class="value"> {{ investment_data.total_user_investment }}</div>
                            </a>
                        </div>

                        <div class="col-6 col-sm-3 col-xxl-3">
                            <a class="element-box el-tablo centered trend-in-corner smaller mb-3" href="#">
                                <div class="label mb-1"></div>
                                <div class="value">
                                    <button class="btn btn-success" @click="showModal('invest')" type="button">
                                        Investir
                                    </button>
                                    <button class="btn btn-grey" @click="showModal('withdrawal')"
                                            v-if="investment_data.user_profit>0"
                                            type="button"> Saque
                                    </button>
                                    <button class="btn btn-grey" disabled v-if="investment_data.user_profit<=0"
                                            type="button"> Saque
                                    </button>
                                </div>
                            </a>
                        </div>

                    </div>
                </div>
            </div>

            <modal v-show="isModalVisible">
                <template slot="header">
                    <div class="os-tabs-w">
                        <div class="os-tabs-controls os-tabs-complex">
                            <ul class="nav nav-tabs">
                                <li class="nav-item col-md-6 text-center">
                                    <a :class="tabclass_invest" href="#" @click="showInvestWindow">
                                        <span class="tab-label">Investir</span>
                                    </a>
                                </li>
                                <li class="nav-item col-md-6 text-center">
                                    <a :class="tabclass_withdrawal" href="#" v-if="investment_data.user_profit>0"
                                       @click="showWithdrawaltWindow">
                                        <span class="tab-label">Saque</span>
                                    </a>
                                    <a :class="tabclass_withdrawal" href="#" v-if="investment_data.user_profit<=0">
                                        <span class="tab-label">Saque</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </template>

                <template slot="body">
                    <div v-show="isInvestWindowVisible">
                        <form>
                            <div class="form-group row mb-0">
                                <label class="col-form-label col-sm-4"> Investimento</label>
                                <div class="col-sm-8">
                                    <div class="pt-btn">
                                        <button type="button" class="btn btn-grey btn-md"
                                                v-if="investment_in.operation_type !== 1"
                                                @click="setSourceInvestment(1)">
                                            Saldo
                                        </button>
                                        <button type="button" class="btn btn-success btn-md"
                                                v-if="investment_in.operation_type === 1"
                                                @click="setSourceInvestment(1)">
                                            Saldo
                                        </button>
                                    </div>

                                    <div class="pt-btn" v-if="investment_data.user_profit<=0">
                                        <button type="button" class="btn btn-grey btn-md" disabled> Lucro</button>
                                    </div>

                                    <div class="pt-btn" v-if="investment_data.user_profit>0">
                                        <button type="button" class="btn btn-grey btn-md"
                                                v-if="investment_in.operation_type !== 5"
                                                @click="setSourceInvestment(5)">
                                            Lucro
                                        </button>
                                        <button type="button" class="btn btn-success btn-md"
                                                v-if="investment_in.operation_type === 5"
                                                @click="setSourceInvestment(5)">
                                            Lucro
                                        </button>
                                    </div>


                                </div>
                            </div>

                            <hr>

                            <div class="form-group row">
                                <label class="col-form-label col-sm-4" for="amount_in"> Quantidade</label>
                                <div class="col-sm-8">
                                    <div class="input-group">
                                        <input id="amount_in" class="form-control" type="text" required
                                               v-model="investment_in.amount" min="0">
                                        <div class="input-group-append">
                                            <div class="input-group-text">
                                                LQX
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <hr>

                            <div class="row mt-5 mb-0">
                                <div class="col-12 text-center">
                                    <button class="btn btn-grey" type="button" @click="closeModal"> Fechar</button>
                                    <button class="btn btn-primary" type="button"
                                            @click.prevent="showPinModal('sendInvestment')"> Confirmar
                                    </button>
                                </div>
                            </div>

                        </form>
                    </div>

                    <div v-show="isWithdrawaltWindowVisible">
                        <form>
                            <div class="form-group row mb-0">
                                <label class="col-form-label col-sm-3"> Valor</label>
                                <div class="col-sm-9">
                                    <div class="pt-btn">
                                        <button type="button" class="btn btn-grey btn-md"
                                                v-if="investment_out.operation_type !== 3"
                                                @click="investment_out.operation_type = 3">
                                            Saldo
                                        </button>
                                        <button type="button" class="btn btn-success btn-md"
                                                v-if="investment_out.operation_type === 3"
                                                @click="investment_out.operation_type = 3">
                                            Saldo
                                        </button>
                                    </div>

                                    <div class="pt-btn" v-if="investment_data.user_profit<=0">
                                        <button type="button" class="btn btn-grey btn-md" disabled> Lucro</button>
                                    </div>

                                    <div class="pt-btn" v-if="investment_data.user_profit>0">
                                        <button type="button" class="btn btn-grey btn-md"
                                                v-if="investment_out.operation_type !== 4"
                                                @click="investment_out.operation_type = 4">
                                            Lucro
                                        </button>
                                        <button type="button" class="btn btn-success btn-md"
                                                v-if="investment_out.operation_type === 4"
                                                @click="investment_out.operation_type = 4">
                                            Lucro
                                        </button>
                                    </div>

                                    <div class="pt-btn">
                                        <button type="button" class="btn btn-grey btn-md"
                                                v-if="investment_out.operation_type !== 6"
                                                @click="investment_out.operation_type = 6">
                                            Total
                                        </button>
                                        <button type="button" class="btn btn-success btn-md"
                                                v-if="investment_out.operation_type === 6"
                                                @click="investment_out.operation_type = 6">
                                            Total
                                        </button>
                                    </div>


                                </div>
                            </div>

                            <hr>

                            <div class="form-group row">
                                <label class="col-form-label col-sm-4" for="amount_out"> Quantidade</label>
                                <div class="col-sm-8">
                                    <div class="input-group">
                                        <input id="amount_out" class="form-control" type="text" required
                                               v-model="investment_out.amount" min="0"
                                               :disabled="investment_out.operation_type===6">
                                        <div class="input-group-append">
                                            <div class="input-group-text">
                                                LQX
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <hr>

                            <div class="row mt-5 mb-0">
                                <div class="col-12 text-center">
                                    <button class="btn btn-grey" type="button" @click="closeModal"> Fechar</button>
                                    <button class="btn btn-primary" type="button"
                                            @click.prevent="showPinModal('withdrawalInvestment')"> Confirmar
                                    </button>
                                </div>
                            </div>

                        </form>
                    </div>
                </template>

                <template slot="footer">
                    <span v-if="isInvestWindowVisible"> Taxa de Corretagem: {{ investment_data.brokerage_fee }} <i
                            class="os-icon os-icon-percent"></i></span>
                    <span v-if="isWithdrawaltWindowVisible"> Taxa de Corretagem: 0 <i
                            class="os-icon os-icon-percent"></i></span>
                </template>
            </modal>

            <div class="row">
                <div class="col-12">
                    <masternode-data></masternode-data>
                </div>
            </div>

        </div>

        <pin v-show="isPinVisible" ref="pinComponent"
             @close-pin-modal="closePinModal" @pin-data="handlePinData"/>
    </div>
</template>

<script>
	import {mapGetters} from 'vuex'
	import Modal from '../layouts/Modal'
	import Pin from '../verifications/Pin'
    import MasternodeData from '../masternode/MasternodeData'

	export default {
		name: "Masternode",
		data() {
			return {
				loader: true,
				isPinVisible: false,
				isModalVisible: false,
				isInvestWindowVisible: false,
				isWithdrawaltWindowVisible: false,
				tabclass_invest: 'nav-link active',
				tabclass_withdrawal: 'nav-link',
				investment_in: {
					amount: 0,
					type: 3,
					action: 14,
					coin: 3,
					operation_type: 1
				},
				investment_out: {
					amount: 0,
					type: 3,
					action: 15,
					coin: 3,
					operation_type: 3
				},
				investment_data: {
					average_profits: {
						base: 0,
						current_month: 0,
						current_day: 0,
					},
					brokerage_fee: 0,
					under_managment: 0,
					user_investment: 0,
					user_profit: 0,
					total_user_investment: 0,
					coin: 'LQX'
				},
				token: {
					pin: null
				},
			}
		},
		methods: {
			setSourceInvestment(source) {
				this.investment_in.operation_type = source
				if (source === 5) {
					this.investment_in.coin = 3
				}
			},
			showModal(type) {
				this.isModalVisible = true
				if (type === 'invest') {
					this.showInvestWindow()
				}
				if (type === 'withdrawal') {
					this.showWithdrawaltWindow()
				}
			},
			closeModal() {
				this.isModalVisible = false;
			},
			showInvestWindow() {
				this.isInvestWindowVisible = true
				this.isWithdrawaltWindowVisible = false
				this.tabclass_invest = 'nav-link active'
				this.tabclass_withdrawal = 'nav-link'
			},
			showWithdrawaltWindow() {
				this.isWithdrawaltWindowVisible = true
				this.isInvestWindowVisible = false
				this.tabclass_invest = 'nav-link'
				this.tabclass_withdrawal = 'nav-link active'
			},
			retrieveInvestmentData() {
				this.$store.dispatch('retrieveInvestmentData',  this.investment_out.type)
					.then(response => {
						this.investment_data.average_profits.base = response.data.average_profits.base
						this.investment_data.average_profits.current_month = response.data.average_profits.current_month
						this.investment_data.average_profits.current_day = response.data.average_profits.current_day

						this.investment_data.brokerage_fee = response.data.brokerage_fee
						this.investment_data.under_managment = response.data.under_managment
						this.investment_data.user_investment = response.data.user_investment
						this.investment_data.user_profit = response.data.user_profit
						this.investment_data.total_user_investment = response.data.total_user_investment
						this.investment_data.coin = response.data.coin
						this.loader = false
					})
					.catch(error => {
						if (error.response) {
							this.handleErrors(error.response)
							this.loader = false
						}
					})
			},
			sendInvestment() {
				this.$store.dispatch('sendInvestment', {
					amount: this.investment_in.amount,
					type: this.investment_in.type,
					action: this.investment_in.action,
					coin: this.investment_in.coin,
					operation_type: this.investment_in.operation_type,
					pin: this.token.pin,
				})
					.then(response => {
						this.$toasted.show(response.data.message, {position: 'bottom-left'}).goAway(3000)
						this.refresh()
					})
					.catch(error => {
						if (error.response) {
							this.handleErrors(error.response)
							this.resetPin()
						}

					})
			},
			withdrawalInvestment() {
				this.$store.dispatch('withdrawalInvestment', {
					amount: this.investment_out.amount,
					type: this.investment_out.type,
					action: this.investment_out.action,
					coin: this.investment_out.coin,
					operation_type: this.investment_out.operation_type,
					pin: this.token.pin,
				})
					.then(response => {
						this.$toasted.show(response.data.message, {position: 'bottom-left'}).goAway(3000)
						this.refresh()
					})
					.catch(error => {
						if (error.response) {
							this.handleErrors(error.response)
							this.resetPin()
						}

					})
			},
			resetPin() {
				this.token.pin = null
				this.$refs.pinComponent.resetData()
			},
			refresh() {
				this.isModalVisible = false
                this.retrieveInvestmentData()
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

				if (data.method === 'sendInvestment') {
					this.sendInvestment()
				}

				if (data.method === 'withdrawalInvestment') {
					this.withdrawalInvestment()
				}
			},
		},
		mounted() {
			this.retrieveInvestmentData()
		},
		computed: {
			...mapGetters([
				'user'
			]),
		},
		components: {
			MasternodeData,
			Modal,
			Pin
		}
	}
</script>

<style scoped>
    .el-tablo.bigger .value {
        font-size: 2rem !important;
    }

    .trending-unconfirmed {
        background: #047bf8;
        color: #fff
    }

    .element-wrapper {
        padding-bottom: 0 !important;
    }

    .os-tabs-controls.os-tabs-complex .nav-item .nav-link {
        padding: 30px 50px;
    }

    .nav-item.col-md-6 {
        padding-right: 0px;
        padding-left: 0px;
    }

    form {
        padding: 1em;
    }

    .pt-btn {
        float: left;
        margin-top: 5px;
        margin-right: 5px;
    }
</style>