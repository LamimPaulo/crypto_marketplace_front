<template>
    <div>
        <vue-headful title="Fundos de Investimentos" description="Liquidex"/>
        <div class="loader" v-if="loader"></div>
        <div class="element-wrapper pt-2">
            <h6 class="element-header">
                Fundos de Investimento
            </h6>

            <div class="element-box-tp">

                <div class="os-tabs-controls os-tabs-complex mb-3">

                    <ul class="nav nav-tabs">
                        <li class="nav-item col-md-6 text-center">
                            <a class="nav-link active" href="#" v-if="tabSelected==='available'">
                                <span class="tab-label">Disponíveis</span>
                            </a>
                            <a class="nav-link" href="#" v-if="tabSelected!=='available'"
                               @click="tabSelected='available'">
                                <span class="tab-label">Disponíveis</span>
                            </a>
                        </li>

                        <li class="nav-item col-md-6 text-center">
                            <a class="nav-link active" href="#" v-if="tabSelected==='acquired'">
                                <span class="tab-label">Meus Fundos</span>
                            </a>
                            <a class="nav-link" href="#" v-if="tabSelected!=='acquired'"
                               @click="tabSelected='acquired'">
                                <span class="tab-label">Meus Fundos</span>
                            </a>
                        </li>
                    </ul>
                </div>

                <div class="row">
                    <div class="col-12" v-if="tabSelected==='available'">

                        <div class="row">
                            <div class="col-sm-12" v-for="fund in funds">
                                <div class="post-box">

                                    <div class="post-content">
                                        <h6 class="post-title">
                                            {{ fund.name }}
                                        </h6>
                                        <div class="post-text">

                                            <table class="table table-lightborder table-bordered table-v-compact mb-0">
                                                <tr>
                                                    <td>
                                                        <strong>{{ fund.monthly_profit }}%</strong>
                                                        <div class="balance-label smaller lighter text-nowrap">
                                                            lucro mensal
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <strong>{{ fund.buy_tax }}%</strong>
                                                        <div class="balance-label smaller lighter text-nowrap">
                                                            corretagem
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <strong>{{ fund.early_redemption_tax
                                                            }}%</strong>
                                                        <div class="balance-label smaller lighter text-nowrap">
                                                            taxa de antecipação
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <strong>{{ fund.validity }}</strong>
                                                        <div class="balance-label smaller lighter text-nowrap">
                                                            meses
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr v-if="fund.description">
                                                    <td colspan="4">{{ fund.description }}</td>
                                                </tr>

                                            </table>

                                        </div>
                                        <div class="post-foot">
                                            <div class="post-tags">
                                                <div class="badge badge-primary p-2" v-if="fund.coin.is_crypto">
                                                    {{ fund.priceLocal}} {{ fund.coin.abbr}}
                                                </div>
                                                <div class="badge badge-primary p-2" v-else>
                                                    {{ fund.coin.abbr}} {{ fund.priceLocal}}
                                                </div>
                                                <div class="badge badge-success p-2">
                                                    {{ fund.monthly_profit }}% lucro mensal
                                                </div>
                                            </div>
                                            <div class="post-link">
                                                <button class="btn btn-primary"
                                                        @click.prevent="showDetailedFund(fund)"> Moedas
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div><!--listagem de fundos-->

                    <div class="col-12" v-if="tabSelected==='acquired'">
                        <div class="row" v-if="userFunds.length">
                            <div class="col-sm-12" v-for="balance in userFunds">
                                <div class="post-box">

                                    <div class="post-content">
                                        <h6 class="post-title">
                                            {{ balance.fund.name }}
                                        </h6>
                                        <div class="post-text">
                                            <div class="element-balances justify-content-between mobile-full-width">
                                                <div class="balance balance-v2">
                                                    <div class="balance-title">
                                                        Lucros Disponíveis
                                                    </div>
                                                    <div class="balance-value" v-if="balance.fund.coin.is_crypto">
                                                        <span class="d-xxl-none">
                                                            {{ balance.balance_free | fixValue }}
                                                            {{ balance.fund.coin.abbr}}
                                                        </span>
                                                        <span class="d-none d-xxl-inline-block">
                                                            {{ balance.balance_free | fixValue }}
                                                            {{ balance.fund.coin.abbr}}
                                                        </span>
                                                        <button class="btn btn-primary mr-1"
                                                                v-if="balance.balance_free > 0"
                                                                @click.prevent="showPinModal('withdrawal', balance.id)">
                                                            Retirada
                                                        </button>
                                                    </div>

                                                    <div class="balance-value" v-else>
                                                        <span class="d-xxl-none">
                                                            {{ balance.fund.coin.abbr}}
                                                            {{ balance.balance_free | formatValue}}
                                                        </span>
                                                        <span class="d-none d-xxl-inline-block">
                                                            {{ balance.fund.coin.abbr}}
                                                            {{ balance.balance_free | formatValue }}]
                                                        </span>

                                                        <button class="btn btn-primary mr-1"
                                                                v-if="balance.balance_free > 0"
                                                                @click.prevent="showPinModal('withdrawal', balance.id)">
                                                            Retirada
                                                        </button>
                                                    </div>
                                                    <hr>
                                                    <div class="balance-title">
                                                        Investimento
                                                    </div>
                                                    <div class="balance-value" v-if="balance.fund.coin.is_crypto">
                                                        <span class="d-xxl-none">
                                                            {{ balance.balance_blocked | fixValue }}
                                                            {{ balance.fund.coin.abbr}}
                                                        </span>
                                                        <span class="d-none d-xxl-inline-block">
                                                            {{ balance.balance_blocked | fixValue }}
                                                            {{ balance.fund.coin.abbr}}
                                                        </span>

                                                        <button class="btn btn-danger mr-1"
                                                                v-if="balance.balance_blocked > 0"
                                                                v-tooltip.top="'A retirada antecipada ocasiona a cobrança de taxa de '+ balance.fund.early_redemption_tax +'% do valor investido.'"
                                                                @click.prevent="showPinModal('earlyWithdrawal', balance.id)">
                                                            Retirada
                                                        </button>
                                                    </div>

                                                    <div class="balance-value" v-else>
                                                        <span class="d-xxl-none">
                                                            {{ balance.fund.coin.abbr}}
                                                            {{ balance.balance_blocked | formatValue}}
                                                        </span>
                                                        <span class="d-none d-xxl-inline-block">
                                                            {{ balance.fund.coin.abbr}}
                                                            {{ balance.balance_blocked | formatValue }}]
                                                        </span>

                                                        <button class="btn btn-danger mr-1"
                                                                v-if="balance.balance_blocked > 0"
                                                                v-tooltip.top="'A retirada antecipada ocasiona a cobrança de taxa de '+ balance.fund.early_redemption_tax +'% do valor investido.'"
                                                                @click.prevent="showPinModal('earlyWithdrawal', balance.id)">
                                                            Retirada
                                                        </button>
                                                    </div>
                                                </div>
                                                <div class="balance-table pl-sm-2 text-center">
                                                    <table class="table table-lightborder table-bordered table-v-compact mb-0">
                                                        <tr>
                                                            <td>
                                                                <strong>{{ balance.fund.monthly_profit }}%</strong>
                                                                <div class="balance-label smaller lighter text-nowrap">
                                                                    lucro mensal
                                                                </div>
                                                            </td>

                                                            <td>
                                                                <strong>{{ balance.fund.buy_tax }}%</strong>
                                                                <div class="balance-label smaller lighter text-nowrap">
                                                                    corretagem
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <strong>{{ balance.fund.early_redemption_tax
                                                                    }}%</strong>
                                                                <div class="balance-label smaller lighter text-nowrap">
                                                                    taxa antecipação
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <strong>{{ balance.fund.validity }}</strong>
                                                                <div class="balance-label smaller lighter text-nowrap">
                                                                    meses
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <strong>{{ balance.startDateLocal }}</strong>
                                                                <div class="balance-label smaller lighter text-nowrap">
                                                                    Início
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <strong>{{ balance.finalDateLocal }}</strong>
                                                                <div class="balance-label smaller lighter text-nowrap">
                                                                    Prazo Final
                                                                </div>
                                                            </td>
                                                        </tr>

                                                    </table>
                                                    <button class="btn btn-primary mt-3"
                                                            @click.prevent="showDetailedFund(balance.fund)">
                                                        Moedas
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-else>
                            <div class="col-12">
                                <span class="alert alert-primary block">Você ainda não adquiriu nenhum fundo de investimento.</span>
                            </div>
                        </div>
                    </div><!--user funds-->
                </div>
            </div>

        </div>

        <detailed-fund v-show="isFundVisible" :fund="fund" ref="detailedComponent"
                       @close-detailed-modal="closeDetailedModal"></detailed-fund>

        <pin v-show="isPinVisible" ref="pinComponent"
             @close-pin-modal="closePinModal" @pin-data="handlePinData"/>

    </div>
</template>

<script>
	import {mapGetters} from 'vuex'
	import Modal from './../../layouts/Modal'
	import DetailedFund from './DetailedFund'
	import Pin from './../../verifications/Pin'
	import PieChart from './../../charts/PieChart';

	export default {
		name: "IndexFunds",
		data() {
			return {
				loader: true,
				isFundVisible: false,
				isBuyWindowVisible: false,
				isWithdrawalModalVisible: false,
				isPinVisible: false,
				tabSelected: 'available',
				funds: {},
				orderBuy: {
					fundName: 'carregando...',
					quotes: 0,
					price: 0,
					priceLocal: 0,
					tax: 0,
					total: 0,
					abbr: "...",
					balance: 0,
					fund_id: 0,
					action: 16,
					is_valid: false
				},
				token: {
					pin: null
				},
				count: 0,
				fund: {},
				userFunds: [],
				timer: '',
				chartData: [1, 2, 3],
				action_id: null,
				balance: []
			}
		},
		methods: {
			closeModal() {
				this.isBuyWindowVisible = false;
			},
			showDetailedFund(fund) {
				this.fund = fund
				this.isFundVisible = true
				this.$refs.detailedComponent.generateChart(fund.id)
			},
			closeDetailedModal() {
				this.isFundVisible = false;
			},
			retrieveFunds() {
				this.loader = true
				this.$store.dispatch('retrieveFundsList')
					.then(response => {
						this.funds = response.data.funds
						this.count = response.data.count
						this.loader = false
					})
					.catch(error => {
						this.loader = false
						if (error.response) {
							this.handleErrors(error.response)
						}
					})
			},
			earlyWithdrawal() {
				this.loader = true
				this.$store.dispatch('fundEarlyRedemption', {
					id: this.action_id,
					pin: this.token.pin
				})
					.then(response => {
						this.$toasted.show(response.data.message, {position: 'bottom-left', type: 'success'}).goAway(3000)
						this.retrieveUserFunds()
					}).catch(error => {
					this.loader = false
					if (error.response) {
						this.handleErrors(error.response)
					}
				})
			},
			withdrawal() {
				this.loader = true
				this.$store.dispatch('fundWithdrawal', {
					id: this.action_id,
					pin: this.token.pin
				})
					.then(response => {
						this.$toasted.show(response.data.message, {position: 'bottom-left', type: 'success'}).goAway(3000)
						this.retrieveUserFunds()
					}).catch(error => {
					this.loader = false
					if (error.response) {
						this.handleErrors(error.response)
					}
				})
			},
			showPinModal(method, id = null) {
				this.action_id = id
				this.isPinVisible = true
				this.$refs.pinComponent.setData(method)
			},
			refresh() {
				setTimeout(function () {
					location.reload()
				}, 3000)
			},
			closePinModal() {
				this.isPinVisible = false;
			},
			handlePinData(data) {
				this.isFundVisible = false,
				this.isBuyWindowVisible = false,
				this.isWithdrawalModalVisible = false,
				this.isPinVisible = false,
				this.token.pin = data.pin

				if (data.method === 'earlyWithdrawal') {
					this.earlyWithdrawal()
				}

				if (data.method === 'withdrawal') {
					this.withdrawal()
				}
			},
			retrieveUserFunds() {
				this.loader = true
				this.$store.dispatch('retrieveUserFunds')
					.then(response => {
						this.userFunds = response.data.funds
						this.loader = false
					})
					.catch(error => {
						this.loader = false
						if (error.response) {
							this.handleErrors(error.response)
						}
					})
			},
		},
		computed: {
			...mapGetters([
				'user'
			]),
			isOrderBuyFilled() {
				return this.orderBuy.quotes > 0 && this.orderBuy.total > 0 && this.orderBuy.is_valid
			},
		},
		components: {
			Modal,
			DetailedFund,
			Pin,
			PieChart
		},
		mounted() {
			this.retrieveFunds()
			this.retrieveUserFunds()
		}
	}
</script>

<style scoped>
    .element-wrapper .element-info {
        margin-bottom: 0px;
    }

    form {
        padding: 1.5em;
    }

    h6 {
        padding-top: 15px;
        text-align: center;
        font-size: 1.26rem;
        line-height: 1.25;
    }

    h6 .os-icon {
        color: #047bf8;
    }

    .os-tabs-controls.os-tabs-complex .nav-item .nav-link {
        padding: 30px 30px;
    }

    .nav-item.col-md-6 {
        padding-right: 0px;
        padding-left: 0px;
    }

    .element-balances .balance.balance-v2 .balance-value {
        font-size: 1.5rem;
    }
</style>
