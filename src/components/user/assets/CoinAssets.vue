<template>
  <div>
    <div class="loader" v-if="loader"></div>
    <vue-headful title="Crypto Ativos" description="Liquidex"/>

    <div class="element-wrapper compact">
      <h6 class="element-header">
        Cypto Ativos
      </h6>
      <div class="element-box-tp" v-show="count">
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
                  <pie-chart ref="chartComponent"></pie-chart>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="col-sm-8">
            <table class="table table-clean" v-if="coins.length">
              <thead>
              <tr>
                <th></th>
                <th>Moeda</th>
                <th>Preço</th>
                <th>Quantidade</th>
                <th v-if="user.country_id===31">BRL</th>
                <th v-if="user.country_id!==31">USD</th>
                <th>-</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(coin, i) in coins">
                <td></td>
                <td><span :class="'marker-left color-' + i">{{coin.symbol}}</span></td>
                <td>{{coin.price}}</td>
                <td>{{coin.balance}}</td>
                <td v-if="user.country_id===31">R$ {{coin.brl_equivalence}}</td>
                <td v-if="user.country_id!==31">$ {{coin.usd_equivalence}}</td>
                <td>
                  <button class="mr-2 mb-2 btn btn-success btn-rounded" type="button"
                          @click="showModal(coin.symbol, 'buy')">
                    <i class="os-icon os-icon-shopping-cart"></i>
                  </button>
                  <button class="mr-2 mb-2 btn btn-primary btn-rounded" type="button"
                          @click="showModal(coin.symbol, 'sell')">
                    <i class="os-icon os-icon-dollar-sign"></i>
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="element-box-tp">
        <div class="row pt-2">

          <div class="col-sm-6 col-md-4 col-xxl-2" v-for="price in coin_prices"  v-tooltip="price.name">
            <a class="element-box el-tablo centered trend-in-corner smaller mb-1"
               @click.prevent="showModal(price.symbol, 'buy')" href="#">
              <div class="pt-avatar-w">
                <img alt="" width="30vw" :src="require(`@/assets/img/${price.icon}`)">
              </div>
              <div class="label">
                {{ price.symbol }}
              </div>
              <div class="value">
                {{ parseFloat(price.price) | fixValue }}
              </div>

              <div class="trending trending-down" v-if="price.price_change_percent<0">
                <span>{{parseFloat(price.price_change_percent)}}%</span>
                <i class="os-icon os-icon-arrow-down6"></i> 24h
              </div>

              <div class="trending trending-up" v-if="price.price_change_percent>=0">
                <span>{{parseFloat(price.price_change_percent)}}%</span>
                <i class="os-icon os-icon-arrow-up6"></i> 24h
              </div>
            </a>
            <button class="btn btn-primary btn-block mb-3" @click.prevent="showModal(price.symbol, 'buy')">Comprar
            </button>
          </div>


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
              <label class="col-form-label col-sm-2"> Produto</label>
              <div class="col-sm-4">
                <input class="form-control" type="text" disabled :value="orderBuy.symbol + ' / BTC'">
              </div>
            </div>

            <hr>

            <div class="form-group row">
              <label class="col-form-label col-sm-2" for="buyQuantity"> Quantidade</label>
              <div class="col-sm-4">
                <div class="input-group">
                  <input id="buyQuantity" class="form-control" type="text" @input="retrieveBuyTax"
                         v-model="orderBuy.quantity" required>
                  <div class="input-group-append">
                    <div class="input-group-text">
                      {{ orderBuy.symbol }}
                    </div>
                  </div>
                </div>
              </div>

              <label class="col-form-label col-sm-2" for="buyMarket"> Preço</label>
              <div class="col-sm-4">
                <div class="input-group">
                  <input id="buyMarket" class="form-control" type="text"
                         v-model="orderBuy.price" required disabled>
                  <div class="input-group-append">
                    <div class="input-group-text">
                      BTC
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-form-label col-sm-2"> Taxas</label>
              <div class="col-sm-4">
                <div class="input-group">
                  <input id="buyTax" class="form-control" type="text" v-model="orderBuy.tax" disabled>
                  <div class="input-group-append">
                    <div class="input-group-text">
                      BTC
                    </div>
                  </div>
                </div>
              </div>

              <label class="col-form-label col-sm-2" for="buyTotal"> Valor</label>
              <div class="col-sm-4">
                <div class="input-group">
                  <input id="buyTotal" class="form-control" type="text" v-model="orderBuy.total" disabled>
                  <div class="input-group-append">
                    <div class="input-group-text">
                      BTC
                    </div>
                  </div>
                </div>
                <div class="text-danger" v-if="!orderBuy.is_valid"><br>Mínimo: {{orderBuy.min_trade_amount}}</div>
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
              <label class="col-form-label col-sm-2"> Produto</label>
              <div class="col-sm-4">
                <input class="form-control" type="text" disabled :value="orderSell.symbol + ' / BTC'">
              </div>
            </div>

            <hr>

            <div class="form-group row">
              <label class="col-form-label col-sm-2" for="buyQuantity"> Quantidade</label>
              <div class="col-sm-4">
                <div class="input-group">
                  <input id="sellQuantity" class="form-control" type="text" @input="retrieveSellTax"
                         v-model="orderSell.quantity" required>
                  <div class="input-group-append">
                    <div class="input-group-text">
                      {{ orderSell.symbol }}
                    </div>
                  </div>
                </div>
              </div>

              <label class="col-form-label col-sm-2" for="sellMarket"> Preço</label>
              <div class="col-sm-4">
                <div class="input-group">
                  <input id="sellMarket" class="form-control" type="text"
                         v-model="orderSell.price" required disabled>
                  <div class="input-group-append">
                    <div class="input-group-text">
                      BTC
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-form-label col-sm-2"> Taxas</label>
              <div class="col-sm-4">
                <div class="input-group">
                  <input id="sellTax" class="form-control" type="text" v-model="orderSell.tax" disabled>
                  <div class="input-group-append">
                    <div class="input-group-text">
                      BTC
                    </div>
                  </div>
                </div>
              </div>

              <label class="col-form-label col-sm-2" for="sellTotal"> Valor</label>
              <div class="col-sm-4">
                <div class="input-group">
                  <input id="sellTotal" class="form-control" type="text" v-model="orderSell.total" disabled>
                  <div class="input-group-append">
                    <div class="input-group-text">
                      BTC
                    </div>
                  </div>
                </div>
                <div class="text-danger" v-if="!orderSell.is_valid"><br>Mínimo: {{orderSell.min_trade_amount}}</div>
              </div>
            </div>

            <div class="row mt-5">
              <div class="col-12 text-center">
                <button class="btn btn-grey" type="button" @click="closeModal"> Fechar</button>
                <button class="btn btn-primary" type="button"
                        @click.prevent="showPinModal('sendOrderSell')" :disabled="!isOrderSellFilled">
                  Confirmar
                </button>
              </div>
            </div>

          </form>
        </div>
      </template>

      <template slot="footer">
        <span><i class="os-icon os-icon-wallet-loaded"></i> {{wallet.balance_rounded}} {{ orderBuy.symbol}}</span>
      </template>
    </modal>

    <pin v-show="isPinVisible" ref="pinComponent"
               @close-pin-modal="closePinModal" @pin-data="handlePinData"/>
  </div>
</template>

<script>
  import PieChart from './../../charts/PieChart';
  import {mapGetters} from 'vuex'
  import Modal from './../../layouts/Modal';
  import Pin from './../../verifications/Pin'
  import debounce from 'lodash/debounce'

  export default {
    name: "CoinAssets",
    data() {
      return {
        loader: false,
        coins: {},
        count: 0,
        coin: null,
        isPinVisible: false,
        isModalVisible: false,
        isBuyWindowVisible: true,
        isSellWindowVisible: false,
        tabclass_buy: 'nav-link active',
        tabclass_sell: 'nav-link',
        balanceBTC: 0,
        wallet: {},
        orderBuy: {
          symbol: 'XRP',
          quantity: 0,
          quantity_quote: 0,
          price: 0,
          tax: 0,
          total: 0,
          is_valid: 0,
          action: 3,
          min_trade_amount: 0.001
        },
        orderSell: {
          symbol: 'XRP',
          quantity: 0,
          quantity_quote: 0,
          price: 0,
          tax: 0,
          total: 0,
          is_valid: 0,
          action: 4,
          min_trade_amount: 0.001
        },
        token: {
          pin: null
        },
        coin_prices: [],
        order_symbol: 'BTC',
        timer: ''
      }
    },
    methods: {
      showModal(symbol, type) {
        this.isModalVisible = true
        this.orderBuy.symbol = symbol
        this.orderSell.symbol = symbol
        this.retrievePrice()
        this.retrieveWallet()
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
      generateChart() {
        this.$store.dispatch('retrieveCoinAssetsChart')
          .then(response => {
            this.$refs.chartComponent.setData(response.data)
          })
          .catch(error => {
            if (error.response) {
              this.handleErrors(error.response)
            }
          })
      },
      retrieveCoinAssets() {
        this.loader = true
        this.$store.dispatch('retrieveCoinAssets')
          .then(response => {
            this.coins = response.data.coins
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
      retrievePrices() {
        this.loader = true
        this.$store.dispatch('retrievePrices')
          .then(response => {
            this.coin_prices = response.data.prices
            this.loader = false
          })
          .catch(error => {
            if (error.response) {
              this.handleErrors(error.response)
            }
            this.loader = false
          })
      },
      sendOrderBuy() {
        if (this.orderBuy.quantity > 0)
          this.$store.dispatch('sendOrderBuy', {
            symbol: this.orderBuy.symbol + 'BTC',
            quantity: this.orderBuy.quantity,
            action: this.orderBuy.action,
            pin: this.token.pin,
          }).then(
            this.$toasted.show('enviando...', {position: 'bottom-left', type: 'info'}).goAway(3000)
          )
            .then(response => {
              this.$toasted.show(response.data.message, {position: 'bottom-left', type: 'success'}).goAway(3000)
              this.$router.push({name: 'order', params: {id: response.data.transaction.tx}})
            }).catch(error => {
            if (error.response) {
              this.handleErrors(error.response)
              this.resetPin()
            }
          })
      },
      sendOrderSell() {
        if (this.orderSell.quantity > 0)
          this.$store.dispatch('sendOrderSell', {
            symbol: this.orderSell.symbol + 'BTC',
            quantity: this.orderSell.quantity,
            action: this.orderSell.action,
            pin: this.token.pin,
          }).then(
            this.$toasted.show('enviando...', {position: 'bottom-left', type: 'info'}).goAway(3000)
          )
            .then(response => {
              this.$toasted.show(response.data.message, {position: 'bottom-left', type: 'success'}).goAway(3000)
              this.$router.push({name: 'order', params: {id: response.data.transaction.tx}})
            }).catch(error => {
            if (error.response) {
              this.handleErrors(error.response)
              this.resetPin()
            }
          })
      },
      retrievePrice() {
        this.$store.dispatch('retrievePrice', this.orderBuy.symbol)
          .then(response => {
            this.orderBuy.price = response.data.price
            this.orderSell.price = response.data.price
          })
          .catch(error => {
            if (error.response) {
              this.handleErrors(error.response)
            }
          })
      },
      retrieveWallet() {
        this.$store.dispatch('retrieveWallet', this.orderBuy.symbol)
          .then(response => {
            this.wallet = response.data.wallet
          })
          .catch(error => {
            if (error.response)
              this.wallet = 0.00
          })
      },
      retrieveBuyTax: debounce(function (e) {
        if (e.target.value > 0) {
          this.$store.dispatch('retrieveBuyTax', {
            symbol: this.orderBuy.symbol + 'BTC',
            quantity: this.orderBuy.quantity,
          })
            .then(response => {
              this.orderBuy.price = response.data.quote_price
              this.orderBuy.quantity_quote = response.data.quantity_quote
              this.orderBuy.tax = response.data.tax
              this.orderBuy.total = response.data.total
              this.orderBuy.is_valid = response.data.is_valid
              this.orderBuy.min_trade_amount = response.data.min_trade_amount
            }).catch(error => {
            if (error.response) {
              this.handleErrors(error.response)
            }

          })
        }
      }, 500),
      retrieveSellTax: debounce(function (e) {
        if (e.target.value > 0) {
          this.$store.dispatch('retrieveSellTax', {
            symbol: this.orderSell.symbol + 'BTC',
            quantity: this.orderSell.quantity,
          })
            .then(response => {
              this.orderSell.price = response.data.quote_price
              this.orderSell.quantity_quote = response.data.quantity_quote
              this.orderSell.tax = response.data.tax
              this.orderSell.total = response.data.total
              this.orderSell.is_valid = response.data.is_valid
              this.orderSell.min_trade_amount = response.data.min_trade_amount
            }).catch(error => {
            if (error.response) {
              this.handleErrors(error.response)
            }

          })
        }
      }, 500),
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

        if (data.method === 'sendOrderBuy') {
          this.sendOrderBuy()
        }

        if (data.method === 'sendOrderSell') {
          this.sendOrderSell()
        }
      },
    },
    computed: {
      ...mapGetters([
        'user'
      ]),
      isOrderBuyFilled() {
        return this.orderBuy.quantity > 0 && this.orderBuy.is_valid
      },
      isOrderSellFilled() {
        return this.orderSell.quantity > 0 && this.orderSell.is_valid
      }
    },
    components: {
      PieChart,
      Modal,
      Pin
    },
    mounted() {
      this.retrieveCoinAssets()
      this.generateChart()
      this.retrievePrices()
      this.timer = setInterval(function () {
        this.retrievePrices();
      }.bind(this), 60000);
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
