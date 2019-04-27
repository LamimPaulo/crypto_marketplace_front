<template>
    <div>
        <vue-headful title="Nanotech LQX" description="Liquidex"/>
        <div class="loader" v-if="loader"></div>

        <div class="content-box">
            <div class="element-wrapper">
                <div class="element-actions d-sm-block">
                    <a class="btn btn-primary btn-sm" href="/nanotech/btc">
                        <i class="os-icon os-icon-external-link"></i><span> Nanotech BTC</span>
                    </a>
                </div>
                <h6 class="element-header">
                    Nanotech {{ investment_data.coin }}
                </h6>

                <div class="element-box-tp mb-2">
                    <div class="row">

                        <div class="col-12 col-sm-4 col-xxl-3">
                            <a class="element-box el-tablo centered trend-in-corner smaller mb-3" href="#">
                                <div class="label"> {{ investment_data.coin }} Sob Gestão</div>
                                <div class="value"> {{ investment_data.under_managment }}</div>
                            </a>
                        </div>

                        <div class="col-12 col-sm-4 col-xxl-3">
                            <a class="element-box el-tablo centered trend-in-corner smaller mb-3" href="#">
                                <div class="label"> Lucro Médio</div>
                                <div class="value"> {{ investment_data.average_profits.base }} %</div>
                            </a>
                        </div>

                        <div class="col-12 col-sm-4 col-xxl-3">
                            <a class="element-box el-tablo centered trend-in-corner smaller mb-3" href="#">
                                <div class="label"> Lucro Médio Mensal</div>
                                <div class="value"> {{ investment_data.average_profits.current_month }} %</div>
                            </a>
                        </div>

                        <div class="col-12 col-sm-4 col-xxl-3">
                            <a class="element-box el-tablo centered trend-in-corner smaller mb-3" href="#">
                                <div class="label"> Lucro Médio Diário</div>
                                <div class="value"> {{ investment_data.average_profits.current_day }} %</div>
                            </a>
                        </div>

                        <div class="col-12 col-sm-4 col-xxl-3">
                            <a class="element-box el-tablo centered trend-in-corner smaller mb-3" href="#">
                                <div class="label"> Meu Investimento</div>
                                <div class="value"> {{ investment_data.user_investment }}</div>
                            </a>
                        </div>

                        <div class="col-12 col-sm-4 col-xxl-3">
                            <a class="element-box el-tablo centered trend-in-corner smaller mb-3" href="#">
                                <div class="label"> Meu Lucro <i class="os-icon os-icon-external-link"></i></div>
                                <div class="value"> {{ investment_data.user_profit }}</div>
                            </a>
                        </div>

                        <div class="col-12 col-sm-4 col-xxl-3">
                            <a class="element-box el-tablo centered trend-in-corner smaller mb-3" href="#">
                                <div class="label"> Total</div>
                                <div class="value"> {{ investment_data.total_user_investment }}</div>
                            </a>
                        </div>

                        <div class="col-12 col-sm-4 d-sm-inline-block d-xxl-none">
                            <a class="element-box el-tablo centered trend-in-corner smaller mb-3" href="#">
                                <div class="label mb-1"></div>
                                <div class="value">
                                    <button class="btn btn-success" type="button"
                                            @click="showModal('invest')"
                                            v-if="investment_data.user_profit>0"
                                    >
                                        Reinvestir
                                    </button>
                                    <button class="btn btn-grey" disabled v-else type="button">
                                        Reinvestir
                                    </button>
                                </div>
                            </a>
                        </div>

                        <div class="col-12 col-sm-4 d-sm-inline-block d-xxl-none">
                            <a class="element-box el-tablo centered trend-in-corner smaller mb-3" href="#">
                                <div class="label mb-1"></div>
                                <div class="value">
                                    <button class="btn btn-primary" type="button"
                                            @click="showModal('withdrawal')"
                                            v-if="investment_data.user_investment>0||investment_data.user_profit>0"
                                    >
                                        Saque
                                    </button>
                                    <button class="btn btn-grey" disabled v-else
                                            type="button"> Saque
                                    </button>
                                </div>
                            </a>
                        </div>

                        <div class="col-12 col-xxl-3 d-none d-sm-none d-xxl-inline-block">
                            <a class="element-box el-tablo centered trend-in-corner smaller mb-3" href="#">
                                <div class="label mb-1"></div>
                                <div class="value">
                                    <button class="btn btn-success" type="button"
                                            @click="showModal('invest')"
                                            v-if="investment_data.user_profit>0"
                                    >
                                        Reinvestir
                                    </button>
                                    <button class="btn btn-grey" disabled v-else type="button">
                                        Reinvestir
                                    </button>

                                    <button class="btn btn-primary" type="button"
                                            @click="showModal('withdrawal')"
                                            v-if="investment_data.user_investment>0"
                                    >
                                        Saque
                                    </button>
                                    <button class="btn btn-grey" disabled v-else
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
                                    <a :class="tabclass_invest" href="#"
                                       v-if="investment_data.user_profit>0"
                                       @click.prevent="showInvestWindow">
                                        <span class="tab-label">Reinvestir</span>
                                    </a>
                                    <a :class="tabclass_invest" href="#" v-else>
                                        <span class="tab-label">Reinvestir</span>
                                    </a>
                                </li>
                                <li class="nav-item col-md-6 text-center">
                                    <a :class="tabclass_draft" href="#"
                                       v-if="investment_data.user_investment>0||investment_data.user_profit>0"
                                       @click.prevent="showDraftWindow">
                                        <span class="tab-label">Saque</span>
                                    </a>
                                    <a :class="tabclass_draft" href="#" v-else>
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
                                <label class="col-form-label col-sm-4"> Disponível</label>
                                <div class="col-sm-8">
                                    <span class="alert alert-success py-1"
                                          v-tooltip="'clique para adicionar o total'"
                                          @click.prevent="investment_in.amount=investment_data.user_profit">{{ investment_data.user_profit }}</span>
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
                                                {{ investment_data.coin }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <hr>

                            <div class="row mt-5 mb-0">
                                <div class="col-12 text-center">
                                    <button class="btn btn-grey" type="button" @click.prevent="closeModal"> Fechar
                                    </button>
                                    <button class="btn btn-primary" type="button"
                                            :disabled="!isReinvestmentFilled"
                                            @click.prevent="showPinModal('sendInvestment')"> Confirmar
                                    </button>
                                </div>
                            </div>

                        </form>
                    </div>

                    <div v-show="isDraftWindowVisible">
                        <form>
                            <div class="form-group row mb-0">
                                <div class="col-sm-12 text-center align-center">
                                    <span class="aler alert-warning block py-1 mb-2"
                                          v-if="!this.investment_out.operation_type">Selecione o valor para retirada.</span>
                                    <div class="pt-btn" v-if="investment_data.user_investment>0">
                                        <button type="button" class="btn btn-success btn-md"
                                                v-if="investment_out.operation_type === 3"
                                                @click.prevent="() => { investment_out.operation_type = 3; investment_out.amount = investment_data.user_investment }">
                                            Saldo ({{investment_data.user_investment | fixValue}} {{
                                            investment_data.coin}})
                                        </button>
                                        <button type="button" class="btn btn-grey btn-md"
                                                v-else
                                                @click.prevent="() => { investment_out.operation_type = 3; investment_out.amount = investment_data.user_investment }">
                                            Saldo ({{investment_data.user_investment | fixValue}} {{
                                            investment_data.coin}})
                                        </button>
                                    </div>

                                    <div class="pt-btn" v-if="investment_data.user_profit>0">
                                        <button type="button" class="btn btn-success btn-md"
                                                v-if="investment_out.operation_type === 4"
                                                @click.prevent="() => { investment_out.operation_type = 4; investment_out.amount = investment_data.user_profit }">
                                            Lucro ({{investment_data.user_profit | fixValue}} {{ investment_data.coin}})
                                        </button>

                                        <button type="button" class="btn btn-grey btn-md"
                                                v-else
                                                @click.prevent="() => { investment_out.operation_type = 4; investment_out.amount = investment_data.user_profit }">
                                            Lucro ({{investment_data.user_profit | fixValue}} {{ investment_data.coin}})
                                        </button>

                                    </div>

                                    <div class="pt-btn">
                                        <button type="button" class="btn btn-success btn-md"
                                                v-if="investment_out.operation_type === 6"
                                                @click.prevent="() => { investment_out.operation_type = 6; investment_out.amount = investment_data.total_user_investment }">
                                            Total ({{investment_data.total_user_investment | fixValue}}
                                            {{ investment_data.coin}})
                                        </button>

                                        <button type="button" class="btn btn-grey btn-md"
                                                v-else
                                                @click.prevent="() => { investment_out.operation_type = 6; investment_out.amount = investment_data.total_user_investment }">
                                            Total ({{investment_data.total_user_investment | fixValue}}
                                            {{investment_data.coin}})
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
                                                {{ investment_data.coin }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <hr>

                            <div class="row mt-5 mb-0">
                                <div class="col-12 text-center">
                                    <button class="btn btn-grey" type="button" @click.prevent="closeModal"> Fechar
                                    </button>
                                    <button class="btn btn-primary" type="button"
                                            :disabled="!isWithdrawalFilled"
                                            @click.prevent="showPinModal('withdrawalInvestment')"> Confirmar
                                    </button>
                                </div>
                            </div>

                        </form>
                    </div>
                </template>

                <template slot="footer">
                    <span> Taxa de Corretagem: 0 <i class="os-icon os-icon-percent"></i></span>
                </template>
            </modal>

            <div class="row">
                <div class="col-12">
                    <h6>
                        Lucros Diários
                        <span class="animate-border my-3"></span>
                    </h6>

                    <div class="element-box-tp mb-2">
                        <lqx-area-chart :chartData="investment_data.chart"></lqx-area-chart>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-12">
                    <last-trades></last-trades>
                </div>
            </div>

        </div>

        <pin v-show="isPinVisible" ref="pinComponent"
             @close-pin-modal="closePinModal" @pin-data="handlePinData"/>
    </div>
</template>

<script>
	import {mapGetters} from 'vuex'
	import LastTrades from './LastTrades'
	import Modal from './../layouts/Modal'
	import Pin from './../verifications/Pin'
	import LqxAreaChart from './../charts/LqxAreaChart'

	export default {
		name: "Arbitrage",
		data() {
			return {
				loader: true,
				isPinVisible: false,
				isModalVisible: false,
				isInvestWindowVisible: false,
				isDraftWindowVisible: false,
				tabclass_invest: 'nav-link active',
				tabclass_draft: 'nav-link',
				investment_in: {
					amount: 0,
					coin: 3,
				},
				investment_out: {
					amount: 0,
					coin: 3,
					operation_type: null
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
					coin: 'LQX',
                    chart: []
				},
				token: {
					pin: null
				},
			}
		},
		methods: {
			showModal(type) {
				this.isModalVisible = true
				if (type === 'invest') {
					this.showInvestWindow()
				}
				if (type === 'withdrawal') {
					this.showDraftWindow()
				}
			},
			closeModal() {
				this.isModalVisible = false;
			},
			showInvestWindow() {
				this.isInvestWindowVisible = true
				this.isDraftWindowVisible = false
				this.tabclass_invest = 'nav-link active'
				this.tabclass_draft = 'nav-link'
			},
			showDraftWindow() {
				this.isDraftWindowVisible = true
				this.isInvestWindowVisible = false
				this.tabclass_invest = 'nav-link'
				this.tabclass_draft = 'nav-link active'
			},
			retrieveInvestmentData() {
				this.loader = true
				this.$store.dispatch('retrieveInvestmentData', 1)
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
						this.investment_data.chart = response.data.chart_data
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
				this.loader = true
				this.isModalVisible = false

				this.$store.dispatch('sendInvestment', {
					amount: this.investment_in.amount,
					type: 1,
					coin: this.investment_in.coin,
					operation_type: 5,
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
						this.loader = false
					})
			},
			withdrawalInvestment() {
				this.loader = true
				this.isModalVisible = false

				this.$store.dispatch('withdrawalInvestment', {
					amount: this.investment_out.amount,
					type: 1,
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
						this.loader = false
					})
			},
			resetPin() {
				this.token.pin = null
				this.$refs.pinComponent.resetData()
			},
			refresh() {
				this.loader = false
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
			isReinvestmentFilled() {
				return (parseFloat(this.investment_in.amount) <= parseFloat(this.investment_data.user_profit)) && this.investment_in.amount > 0 && true
			},
			isWithdrawalFilled() {
				return (parseFloat(this.investment_out.amount) <= parseFloat(this.investment_data.total_user_investment)) && this.investment_out.amount > 0 && this.investment_out.operation_type && true
			}
		},
		components: {
			LqxAreaChart,
			LastTrades,
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
