<template>
  <div>
    <vue-headful title="Nanotech BTC" description="Liquidex"/>
    <div class="loader" v-if="loader"></div>

    <div class="content-box">
      <div class="element-wrapper">
        <div class="element-actions d-sm-block">
          <button class="btn btn-primary btn-sm" type="button"
                  @click="showModal('pendingOperations')"
          >
            <i class="fas fa-business-time"></i><span> Operaçoes pendentes</span>
          </button>

          <button class="btn btn-primary btn-sm" type="button"
                  @click="showModal('profitOperations')"
          >
            <i class="fas fa-coins"></i><span>Operações de Lucros</span>
          </button>
        </div>
        <h6 class="element-header mb-3">
          {{ investment_data.name }}
          <span class="container">
                    <a class="btn btn-success border-0 btn-sm" href="/nanotech/lqx">
                        <i class="os-icon os-icon-external-link"></i><span> Nanotech LQX</span>
                    </a>
                    </span>
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
                  <button class="btn btn-success" @click="showModal('invest')"
                          type="button"> Investir
                  </button>
                  <button class="btn btn-grey" disabled
                          v-if="investment_data.user_investment<=0&&investment_data.user_profit<=0"
                          type="button"> Saque
                  </button>
                  <button class="btn btn-grey" @click="showModal('withdrawal')"
                          v-else
                          type="button"> Saque
                  </button>
                </div>
              </a>
            </div>

          </div>
        </div>
      </div>

      <modal @close="closeModal" v-show="isModalVisible">
        <template slot="header">
          <div class="os-tabs-w">
            <div class="os-tabs-controls os-tabs-complex">
              <ul v-if="isPendingOperations == true" class="nav nav-tabs">
                <li class="nav-item col-md-12 text-center">
                  <a class="nav-link active">
                    <span class="tab-label">Operaçoes Pendentes</span>
                  </a>
                </li>

              </ul>

              <ul v-else-if="isProfitOperations == true" class="nav nav-tabs">
                <li class="nav-item col-md-12 text-center">
                  <a class="nav-link active">
                    <span class="tab-label">Operações de Lucro</span>
                  </a>
                </li>

              </ul>

              <ul v-else class="nav nav-tabs">
                <li class="nav-item col-md-6 text-center">
                  <a :class="tabclass_invest" href="#" @click="showInvestWindow">
                    <span class="tab-label">Investir</span>
                  </a>
                </li>
                <li class="nav-item col-md-6 text-center">
                  <a :class="tabclass_withdrawal" href="#"
                     v-if="investment_data.user_investment<=0&&investment_data.user_profit<=0"
                  >
                    <span class="tab-label">Saque</span>
                  </a>
                  <a :class="tabclass_withdrawal" href="#"
                     v-else
                     @click="showWithdrawalWindow">
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
                      Reinvestir
                    </button>
                    <button type="button" class="btn btn-success btn-md"
                            v-if="investment_in.operation_type === 5"
                            @click="setSourceInvestment(5)">
                      Reinvestir
                    </button>
                  </div>


                </div>
              </div>

              <hr>

              <div class="form-group row">
                <label class="col-form-label col-sm-4" for="amount_in"> Quantidade</label>
                <div class="col-sm-8">
                  <div class="input-group">

                    <vue-numeric class="form-control"
                                 :min="0" :minus="false" :precision="5"
                                 v-model="investment_in.amount" currency="" decimal-separator="."
                                 thousand-separator=" "></vue-numeric>

                    <div class="input-group-append">
                      <div class="input-group-text">
                        BTC
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

          <div v-show="isWithdrawalWindowVisible">
            <form>
              <div class="form-group row mb-0">
                <label class="col-form-label col-sm-4"> Origem</label>
                <div class="col-sm-8">
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

                    <vue-numeric class="form-control"
                                 :disabled="investment_out.operation_type===6"
                                 :min="0" :minus="false" :precision="5"
                                 v-model="investment_out.amount" currency="" decimal-separator="."
                                 thousand-separator=" "></vue-numeric>

                    <div class="input-group-append">
                      <div class="input-group-text">
                        BTC
                      </div>
                    </div>
                  </div>
                </div>
              </div>

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

          <div v-show="isPendingOperationsVisible">
            <div class="form group row mb-0">
              <div class="col-sm-12 text-center align-center">
                                    <span class="aler alert-warning block py-1 mb-2"
                                    >As seguintes transações encontram-se pendentes</span>
                <table class="table table-padded">
                  <thead>
                  <tr>
                    <th class="text-center">Data</th>
                    <th class="text-center">Moeda</th>
                    <th class="text-center">Valor</th>
                    <th class="text-center">Tipo</th>
                    <th class="text-center">Estado</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(list, index) in lists" v-bind:key="index">
                    <td>{{ list.createdLocal }}</td>
                    <td>BTC</td>
                    <td>{{ list.amountLocal }}</td>
                    <td>{{ list.typeName }}</td>
                    <td>{{ list.statusName }}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-12 text-center">
                <button type="button" class="btn btn-grey btn-md"
                        @click.prevent="closeModal()">
                  Fechar
                </button>
              </div>
            </div>

          </div>

          <div v-show="isProfitOperationsVisible">
            <div class="form group row mb-0">
              <div class="col-sm-12 text-center align-center">
                                    <span class="aler alert-warning block py-1 mb-2"
                                    >Todas as suas Transações de lucro </span>
                <table class="table table-padded">
                  <thead>
                  <tr>
                    <th class="text-center">Data</th>
                    <th class="text-center">Moeda</th>
                    <th class="text-center">Valor</th>
                    <th class="text-center">Tipo</th>
                    <th class="text-center">Estado</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(lst, index) in profitPaginate.data" v-bind:key="index">
                    <td>{{ lst.createdLocal }}</td>
                    <td>BTC</td>
                    <td>{{ lst.amountLocal }}</td>
                    <td>{{ lst.typeName }}</td>
                    <td>{{ lst.statusName }}</td>
                  </tr>
                  </tbody>
                </table>
                <pagination :pagination="profitPaginate" @paginate="retrieveProfitBtcOperations()" :offset="5"/>
              </div>
              <div class="col-12 text-center">
                <button type="button" class="btn btn-grey btn-md"
                        @click.prevent="closeModal()">
                  Fechar
                </button>
              </div>
            </div>

          </div>
        </template>

        <template slot="footer">
                    <span v-if="isInvestWindowVisible"> Taxa de Corretagem: {{ investment_data.brokerage_fee }} <i
                      class="os-icon os-icon-percent"></i></span>
          <span v-if="isWithdrawalWindowVisible"> Taxa de Corretagem: 0 <i
            class="os-icon os-icon-percent"></i></span>
          <span v-if="isPendingOperationsVisible"> </span>
          <span v-if="isProfitOperationsVisible"> </span>
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
  import Vue from 'vue'
  import VueNumeric from 'vue-numeric'
  import Pagination from './../layouts/Pagination'

  Vue.use(VueNumeric)

  export default {
    name: "Arbitrage",
    data() {
      return {
        loader: true,
        isPinVisible: false,
        isModalVisible: false,
        isInvestWindowVisible: false,
        isWithdrawalWindowVisible: false,
        isPendingOperations: false,
        isPendingOperationsVisible: false,
        isProfitOperations: false,
        isProfitOperationsVisible: false,
        tabclass_invest: 'nav-link active',
        tabclass_withdrawal: 'nav-link',
        lists: [''],
        offset: 5,
        profitPaginate: {
          total: 0,
          per_page: 5,
          from: 1,
          to: 0,
          current_page: 1
        },
        investment_in: {
          amount: 0,
          coin: 1,
          operation_type: 1
        },
        investment_out: {
          amount: 0,
          coin: 1,
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
          coin: 'BTC',
          name: 'Nanotech',
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
          this.showWithdrawalWindow()
        }
        if (type === 'pendingOperations') {
          this.showPendingOperations()
        }
        if (type === 'profitOperations') {
          this.showProfitOperations()
        }
      },
      setSourceInvestment(source) {
        this.investment_in.operation_type = source
        if (source === 5) {
          this.investment_in.amount = this.investment_data.user_profit
        }
      },
      closeModal() {
        this.isModalVisible = false;
        this.isPendingOperations = false;
        this.isPendingOperationsVisible = false;
        this.isProfitOperations = false;
        this.isProfitOperationsVisible = false;
        this.isInvestWindowVisible = false
        this.isWithdrawalWindowVisible = false
      },
      showInvestWindow() {
        this.isInvestWindowVisible = true
        this.isWithdrawalWindowVisible = false
        this.tabclass_invest = 'nav-link active'
        this.tabclass_withdrawal = 'nav-link'
      },
      showPendingOperations() {
        this.isPendingOperations = true
        this.isPendingOperationsVisible = true
        this.isWithdrawalWindowVisible = false
      },
      showProfitOperations() {
        this.isProfitOperations = true
        this.isProfitOperationsVisible = true
      },
      showWithdrawalWindow() {
        this.isWithdrawalWindowVisible = true
        this.isInvestWindowVisible = false
        this.tabclass_invest = 'nav-link'
        this.tabclass_withdrawal = 'nav-link active'
      },
      retrieveInvestmentData() {
        this.loader = true
        this.$store.dispatch('retrieveInvestmentData', 2)
          .then(response => {
            this.investment_data.name = response.data.name
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
          type: 2,
          coin: 1,
          operation_type: this.investment_in.operation_type,
          pin: this.token.pin,
        })
          .then(response => {
            this.$toasted.show(response.data.message, {
              position: 'bottom-left',
              type: 'success'
            }).goAway(3000)
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
          type: 2,
          coin: this.investment_out.coin,
          operation_type: this.investment_out.operation_type,
          pin: this.token.pin,
        })
          .then(response => {
            this.$toasted.show(response.data.message, {
              position: 'bottom-left',
              type: 'success'
            }).goAway(3000)
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
        this.retrievePendingBtcOperations()
        this.retrieveProfitBtcOperations()
        this.investment_in.amount = 0
        this.investment_in.coin = 1
        this.investment_in.operation_type = 1

        this.investment_out.amount = 0
        this.investment_out.coin = 1
        this.investment_out.operation_type = null
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
      retrievePendingBtcOperations() {
        this.$store.dispatch('retrievePendingBtcOperations')
          .then(response => {
            this.lists = response.data
          })
          .catch(error => {
            if (error.response) {
              this.handleErrors(error.response)
            }
          })
      },
      retrieveProfitBtcOperations() {
        this.loader = true
        this.$store.dispatch('retrieveProfitBtcOperations', this.profitPaginate.current_page)
          .then(response => {
            this.profitPaginate = response.data
            this.loader = false
          })
          .catch(error => {
            if (error.response) {
              this.handleErrors(error.response)
            }
          })
      },
    },
    mounted() {
      this.retrieveInvestmentData()
      this.retrievePendingBtcOperations()
      this.retrieveProfitBtcOperations()
    },
    computed: {
      ...mapGetters([
        'user'
      ]),
      isReinvestmentFilled() {
        return this.investment_in.amount > 0 && true
      },
      isWithdrawalFilled() {
        return this.investment_out.amount > 0 && this.investment_out.operation_type && true
      }
    },
    components: {
      LqxAreaChart,
      LastTrades,
      Modal,
      Pin,
      VueNumeric,
      Pagination
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
