<template>
  <div>
    <vue-headful title="Index Funds" description="Navi Capital"/>
    <div class="loader" v-if="loader"></div>
    <div class="element-wrapper compact pt-2">
      <h6 class="element-header">
        Index Funds
      </h6>

      <div class="element-box-tp">
        <div class="row pt-2">

          <div class="col-6 col-sm-3 col-xxl-2" v-for="fund in funds">
            <a class="element-box el-tablo centered trend-in-corner smaller mb-1" href="#">

              <div class="pt-avatar-w mt-2">
                <img class="mt-1 fund_icon" width="60vw" alt="" :src="require(`@/assets/img/navi_index_fund.png`)">

              </div>

              <hr>

              <div class="label mt-2 ">
                {{ fund.name }}
              </div>

              <div class="value mb-1 mt-2">
                R$ {{ fund.valueLocal }}
              </div>

              <div class="trending trending-up" v-if="fund.percentChange > 0">
                <span>{{fund.percentChange}} %</span>
                <i class="os-icon os-icon-arrow-up6"></i>
              </div>

              <div class="trending trending-down" v-if="fund.percentChange < 0">
                <span>{{fund.percentChange}} %</span>
                <i class="os-icon os-icon-arrow-down6"></i>
              </div>
            </a>
            <button class="btn btn-primary btn-block mb-0" @click.prevent="showDetailedFund(fund)">Detalhes</button>
            <button class="btn btn-success btn-block mb-3" @click.prevent="showModal(fund, 'buy')">Comprar</button>
          </div>

        </div>
      </div>

      <modal v-show="isModalVisible" >
        <template slot="header">
          <div class="os-tabs-w">
            <div class="os-tabs-controls os-tabs-complex">
              <ul class="nav nav-tabs">
                <li class="nav-item col-md-6 text-center">
                  <a :class="tabclass_buy" href="#" @click="showBuyWindow">
                    <span class="tab-label">Comprar</span>
                  </a>
                </li>
                <li class="nav-item col-md-6 text-center">
                  <a :class="tabclass_sell" href="#" @click="showSellWindow">
                    <span class="tab-label">Vender</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </template>

        <template slot="body">
          <div v-show="isBuyWindowVisible">
            <form @submit.prevent="sendOrderBuy">
              <div class="form-group row">
                <div class="offset-3"></div>
                <label class="col-form-label col-sm-2"> Index Fund</label>
                <div class="col-sm-4">
                  <input class="form-control" type="text" disabled :value="orderBuy.fundName">
                </div>
              </div>

              <hr>

              <div class="form-group row" v-if="user.country_id==31">
                <label class="col-form-label col-sm-2" for="buyQuantity"> Quantidade</label>
                <div class="col-sm-4">
                  <div class="input-group">
                    <input id="buyQuantity" class="form-control" type="text" @input="retrieveBuyTax"
                           v-model="orderBuy.quotes" required>
                    <div class="input-group-append">
                      <div class="input-group-text">
                        cotas
                      </div>
                    </div>
                  </div>
                </div>

                <label class="col-form-label col-sm-2" for="buyMarket"> Preço</label>
                <div class="col-sm-4">
                  <div class="input-group">
                    <input id="buyMarket" class="form-control" type="text"
                           :value="orderBuy.price | currency" required disabled>
                    <div class="input-group-append">
                      <div class="input-group-text">
                        R$
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group row" v-else>
                <label class="col-form-label col-sm-2" for="buyQuantity"> Amount</label>
                <div class="col-sm-4">
                  <div class="input-group">
                    <input id="buyQuantity" class="form-control" type="text" @input="retrieveBuyTax"
                           v-model="orderBuy.quotes" required>
                    <div class="input-group-append">
                      <div class="input-group-text">
                        quotes
                      </div>
                    </div>
                  </div>
                </div>

                <label class="col-form-label col-sm-2" for="buyMarket"> Price</label>
                <div class="col-sm-4">
                  <div class="input-group">
                    <input id="buyMarket" class="form-control" type="text"
                           :value="orderBuy.price | fixUsdCurrency" required disabled>
                    <div class="input-group-append">
                      <div class="input-group-text">
                        USD
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="form-group row" v-if="user.country_id==31">
                <label class="col-form-label col-sm-2"> Corretagem</label>
                <div class="col-sm-4">
                  <div class="input-group">
                    <input id="buyTax" class="form-control" type="text" :value="orderBuy.tax | currency" disabled>
                    <div class="input-group-append">
                      <div class="input-group-text">
                        R$
                      </div>
                    </div>
                  </div>
                </div>

                <label class="col-form-label col-sm-2" for="buyTotal"> Valor</label>
                <div class="col-sm-4">
                  <div class="input-group">
                    <input id="buyTotal" class="form-control" type="text" :value="orderBuy.total | currency" disabled>
                    <div class="input-group-append">
                      <div class="input-group-text">
                        R$
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group row" v-else>
                <label class="col-form-label col-sm-2"> Brokerage</label>
                <div class="col-sm-4">
                  <div class="input-group">
                    <input id="buyTax" class="form-control" type="text" :value="orderBuy.tax | fixUsdCurrency" disabled>
                    <div class="input-group-append">
                      <div class="input-group-text">
                        USD
                      </div>
                    </div>
                  </div>
                </div>

                <label class="col-form-label col-sm-2" for="buyTotal"> Total</label>
                <div class="col-sm-4">
                  <div class="input-group">
                    <input id="buyTotal" class="form-control" type="text" :value="orderBuy.total | fixUsdCurrency" disabled>
                    <div class="input-group-append">
                      <div class="input-group-text">
                        USD
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row mt-5">
                <div class="col-12 text-center">
                  <button class="btn btn-grey" type="button" @click="closeModal"> Fechar</button>
                  <button class="btn btn-primary" type="submit"
                          @click.prevent="showPinModal('sendOrderBuy')" :disabled="!isOrderBuyFilled">
                    Confirmar
                  </button>
                </div>
              </div>

            </form>

          </div>

          <div v-show="isSellWindowVisible">
            <form @submit.prevent="sendOrderSell">
              <div class="form-group row">
                <div class="offset-3"></div>
                <label class="col-form-label col-sm-2"> Index Fund</label>
                <div class="col-sm-4">
                  <input class="form-control" type="text" disabled :value="orderSell.fundName">
                </div>
              </div>

              <hr>

              <div class="form-group row" v-if="user.country_id==31">
                <label class="col-form-label col-sm-2" for="buyQuantity"> Quantidade</label>
                <div class="col-sm-4">
                  <div class="input-group">
                    <input id="sellQuantity" class="form-control" type="text" @input="retrieveSellTax"
                           v-model="orderSell.quotes" :disabled="!balance.quote>0" required>
                    <div class="input-group-append">
                      <div class="input-group-text">
                        cotas
                      </div>
                    </div>
                  </div>
                </div>

                <label class="col-form-label col-sm-2" for="sellMarket"> Preço</label>
                <div class="col-sm-4">
                  <div class="input-group">
                    <input id="sellMarket" class="form-control" type="text"
                           :value="orderSell.price | currency" required disabled>
                    <div class="input-group-append">
                      <div class="input-group-text">
                        R$
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="form-group row" v-else>
                <label class="col-form-label col-sm-2" for="buyQuantity"> Amount</label>
                <div class="col-sm-4">
                  <div class="input-group">
                    <input id="sellQuantity" class="form-control" type="text" @input="retrieveSellTax"
                           v-model="orderSell.quotes" :disabled="!balance.quote>0" required>
                    <div class="input-group-append">
                      <div class="input-group-text">
                        quotes
                      </div>
                    </div>
                  </div>
                </div>

                <label class="col-form-label col-sm-2" for="sellMarket"> Price</label>
                <div class="col-sm-4">
                  <div class="input-group">
                    <input id="sellMarket" class="form-control" type="text"
                           :value="orderSell.price | fixUsdCurrency" required disabled>
                    <div class="input-group-append">
                      <div class="input-group-text">
                        USD
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="form-group row" v-if="user.country_id==31">
                <label class="col-form-label col-sm-2"> Corretagem</label>
                <div class="col-sm-4">
                  <div class="input-group">
                    <input id="sellTax" class="form-control" type="text" :value="orderSell.tax | currency" disabled>
                    <div class="input-group-append">
                      <div class="input-group-text">
                        R$
                      </div>
                    </div>
                  </div>
                </div>

                <label class="col-form-label col-sm-2"> Taxas</label>
                <div class="col-sm-4">
                  <div class="input-group">
                    <input id="sellAdminTax" class="form-control" type="text" :value="orderSell.admTax | currency"
                           disabled>
                    <div class="input-group-append">
                      <div class="input-group-text">
                        R$
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="form-group row" v-else>
                <label class="col-form-label col-sm-2"> Brokerage</label>
                <div class="col-sm-4">
                  <div class="input-group">
                    <input id="sellTax" class="form-control" type="text" :value="orderSell.tax | fixUsdCurrency" disabled>
                    <div class="input-group-append">
                      <div class="input-group-text">
                        USD
                      </div>
                    </div>
                  </div>
                </div>

                <label class="col-form-label col-sm-2"> Tax</label>
                <div class="col-sm-4">
                  <div class="input-group">
                    <input id="sellAdminTax" class="form-control" type="text" :value="orderSell.admTax | fixUsdCurrency"
                           disabled>
                    <div class="input-group-append">
                      <div class="input-group-text">
                        USD
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row" v-if="user.country_id==31">
                <div class="col-sm-6"></div>
                <label class="col-form-label col-sm-2" for="sellTotal"> Valor</label>
                <div class="col-sm-4">
                  <div class="input-group">
                    <input id="sellTotal" class="form-control" type="text" :value="orderSell.total | currency" disabled>
                    <div class="input-group-append">
                      <div class="input-group-text">
                        USD
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row" v-else>
                <div class="col-sm-6"></div>
                <label class="col-form-label col-sm-2" for="sellTotal"> Total</label>
                <div class="col-sm-4">
                  <div class="input-group">
                    <input id="sellTotal" class="form-control" type="text" :value="orderSell.total | fixUsdCurrency" disabled>
                    <div class="input-group-append">
                      <div class="input-group-text">
                        USD
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row mt-5">
                <div class="col-12 text-center">
                  <button class="btn btn-grey" type="button" @click="closeModal"> Fechar</button>
                  <button class="btn btn-primary" type="submit"
                          @click.prevent="showPinModal('sendOrderSell')" :disabled="!isOrderSellFilled">
                    Confirmar
                  </button>
                </div>
              </div>

            </form>

          </div>
        </template>

        <template slot="footer">
          <span><i class="os-icon os-icon-wallet-loaded"></i> {{ balance.quote }}</span>
        </template>
      </modal>

    </div>

    <pin v-show="isPinVisible" ref="pinComponent"
               @close-pin-modal="closePinModal" @pin-data="handlePinData"/>

    <detailed-fund v-show="isFundVisible" :fund="fund" ref="detailedComponent"
                   @close-detailed-modal="closeDetailedModal"></detailed-fund>

    <div class="element-wrapper compact pt-4" v-if="userFunds.length">
      <h6 class="element-header">
        Meus Index Funds
      </h6>
      <div class="element-box-tp">
        <div class="row">
          <div class="col-sm-4">
            <table class="table table-clean">
              <thead>
              <tr>
                <th>Alocação por ativos</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>
                  <pie-chart ref="userChartComponent"></pie-chart>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="col-sm-8">
            <table class="table table-clean">
              <thead>
              <tr>
                <th></th>
                <th>Index Fund</th>
                <th>Valor</th>
                <th>Cotas</th>
                <th>Total</th>
                <th>-</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(fund, i) in userFunds">
                <td></td>
                <td><span :class="'marker-left color-' + i">{{fund.fund.name}}</span></td>
                <td>R$ {{ fund.fund.value | currency}}</td>
                <td>{{ fund.quote }}</td>
                <td>R$ {{parseFloat(fund.quote) * parseFloat(fund.fund.value) | currency}}</td>
                <td>
                  <button class="mr-2 mb-2 btn btn-success btn-rounded" type="button"
                          @click="showModal(fund.fund, 'buy')">
                    <i class="os-icon os-icon-shopping-cart"></i>
                  </button>
                  <button class="mr-2 mb-2 btn btn-primary btn-rounded" type="button"
                          @click="showModal(fund.fund, 'sell')">
                    <i class="os-icon os-icon-dollar-sign"></i>
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Modal from './../../layouts/Modal'
  import DetailedFund from './DetailedFund'
  import Pin from './../../verifications/Pin'
  import PieChart from './../../charts/PieChart';
  import debounce from 'lodash/debounce'

  export default {
    name: "IndexFunds",
    data() {
      return {
        loader: true,
        isFundVisible: false,
        isModalVisible: false,
        isBuyWindowVisible: true,
        isSellWindowVisible: false,
        isPinVisible: false,
        tabclass_buy: 'nav-link active',
        tabclass_sell: 'nav-link',
        funds: {},
        orderBuy: {
          fundName: 'carregando...',
          quotes: 0,
          price: 0,
          tax: 0,
          total: 0,
          fund_id: 0,
          action: 16,
        },
        orderSell: {
          fundName: 'carregando...',
          quotes: 0,
          price: 0,
          tax: 0,
          admTax: 0,
          total: 0,
          fund_id: 0,
          action: 17
        },
        token: {
          pin: null
        },
        count: 0,
        fund: {},
        userFunds: {},
        balance: {
          quote: 0,
          value: 0
        },
        timer: '',
        chartData: [1, 2, 3]
      }
    },
    methods: {
      showModal(fund, type) {
        this.retrieveFundBalance(fund.id)
        this.isModalVisible = true
        this.orderBuy.fund_id = fund.id
        this.orderSell.fund_id = fund.id
        this.orderBuy.fundName = fund.name
        this.orderSell.fundName = fund.name
        if (type === 'buy') {
          this.showBuyWindow()
        }

        if (type === 'sell') {
          this.showSellWindow()
        }
      },
      closeModal() {
        this.isModalVisible = false;
      },
      showBuyWindow() {
        this.isBuyWindowVisible = true
        this.isSellWindowVisible = false
        this.tabclass_buy = 'nav-link active'
        this.tabclass_sell = 'nav-link'
      },
      showSellWindow() {
        this.isSellWindowVisible = true
        this.isBuyWindowVisible = false
        this.tabclass_buy = 'nav-link'
        this.tabclass_sell = 'nav-link active'
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
        this.$store.dispatch('retrieveFundsList')
          .then(response => {
            this.funds = response.data.funds
            this.count = response.data.count
            this.loader = false
          })
          .catch(error => {
            if (error.response) {
              this.handleErrors(error.response)
            }
            this.loader = false
          })
      },
      retrieveFundBalance(fund) {
        this.$store.dispatch('retrieveFundBalance', fund)
          .then(response => {
            this.balance.quote = response.data.balance.quote
            this.balance.value = response.data.balance.value
          })
          .catch(error => {
            if (error.response) {
              this.handleErrors(error.response)
            }
          })
      },
      buyIndexFund() {
        this.$store.dispatch('buyIndexFund',
          {
            fund_id: this.orderBuy.fund_id,
            quotes: this.orderBuy.quotes,
            action: this.orderBuy.action,
            pin: this.token.pin,
          })
          .then(response => {
            this.$toasted.show(response.data.message, {position: 'bottom-left'}).goAway(3000)
            this.refresh()
          })
          .catch(error => {
            if (error.response) {
              this.handleErrors(error.response)
            }
          })
      },
      sellIndexFund() {
        this.$store.dispatch('sellIndexFund',
          {
            fund_id: this.orderSell.fund_id,
            quotes: this.orderSell.quotes,
            action: this.orderSell.action,
            pin: this.token.pin,
          })
          .then(response => {
            this.$toasted.show(response.data.message, {position: 'bottom-left'}).goAway(3000)
            this.refresh()
          })
          .catch(error => {
            if (error.response) {
              this.handleErrors(error.response)
            }
          })
      },
      retrieveBuyTax: debounce(function (e) {
        if (e.target.value > 0) {
          this.$store.dispatch('retrieveBuyTaxFund', {
            fund_id: this.orderBuy.fund_id,
            quotes: this.orderBuy.quotes,
          })
            .then(response => {
              this.orderBuy.price = response.data.price
              this.orderBuy.tax = response.data.tax
              this.orderBuy.total = response.data.total
            }).catch(error => {
            if (error.response) {
              this.handleErrors(error.response)
            }
          })
        }
      }, 500),
      retrieveSellTax: debounce(function (e) {
        if (e.target.value > 0) {
          this.$store.dispatch('retrieveSellTaxFund', {
            fund_id: this.orderSell.fund_id,
            quotes: this.orderSell.quotes,
          })
            .then(response => {
              this.orderSell.price = response.data.price
              this.orderSell.tax = response.data.tax
              this.orderSell.admTax = response.data.admin_tax
              this.orderSell.total = response.data.total
            }).catch(error => {
            if (error.response) {
              this.handleErrors(error.response)
            }
          })
        }
      }, 500),
      showPinModal(method) {
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
        this.token.pin = data.pin

        if (data.method === 'sendOrderBuy') {
          this.buyIndexFund()
        }

        if (data.method === 'sendOrderSell') {
          this.sellIndexFund()
        }
      },
      retrieveUserFunds() {
        if (!this.userFunds.length) {
          this.$store.dispatch('retrieveUserFunds')
            .then(response => {
              this.userFunds = response.data.funds
              this.$refs.userChartComponent.setData(response.data.chart)
            })
            .catch(error => {
              if (error.response) {
                this.handleErrors(error.response)
              }
            })
        }
      },
    },
    computed: {
      ...mapGetters([
        'user'
      ]),
      isOrderBuyFilled() {
        return this.orderBuy.quotes > 0 && this.orderBuy.total > 0
      },
      isOrderSellFilled() {
        return this.orderSell.quotes > 0 && this.orderSell.total > 0
      }
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

      this.timer = setInterval(function () {
        this.retrieveFunds();
        this.retrieveUserFunds()
      }.bind(this), 30000);
    }
  }
</script>

<style scoped>
  .element-wrapper .element-info {
    margin-bottom: 0px;
  }

  .os-tabs-controls.os-tabs-complex .nav-item .nav-link {
    padding: 30px 50px;
  }

  .nav-item.col-md-6 {
    padding-right: 0px;
    padding-left: 0px;
  }

  form {
    padding: 1.5em;
  }

</style>
