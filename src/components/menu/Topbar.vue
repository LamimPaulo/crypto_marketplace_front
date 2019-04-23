<template>
  <div class="sub-menu-i">
      <marquee-text class="dark-bg" :repeat="5" :duration="60">
          <div>
              <div class="market" v-for="coin in quotes">
                  <div class="market-share">
                      <h5 class="share-name"><a href="#">{{ coin.abbr }}</a></h5>
                      <div class="marketdata">
                          <div class="marketlastchange red" v-if="user.country_id===31"
                               @click="showModalOrder(coin, 'sell', 'BRL')">
                              R$ {{ coin.quote[0].sell_quote | currency }}
                          </div>
                          <div class="marketlastchange red" v-else
                               @click="showModalOrder(coin, 'sell', 'USD')">
                              $ {{ coin.quote[0].sell_quote }}
                          </div>
                      </div>
                  </div>
                  <div class="marketchangedata">
                      <div class="marketLast">
                          <i class="fa fa-caret-up green"></i>
                          <i class="fa fa-caret-down red"></i>
                      </div>
                      <div class="marketpercent green" v-if="user.country_id===31"
                           @click="showModalOrder(coin, 'buy', 'BRL')">
                          R$ {{ coin.quote[0].buy_quote | currency }}
                      </div>
                      <div class="marketlastchange green" v-else
                           @click="showModalOrder(coin, 'buy', 'USD')">
                          $ {{ coin.quote[0].buy_quote }}
                      </div>
                  </div>
              </div>

          </div>
      </marquee-text>


      <order-window :coin="coin" ref="orderWindow" @close-modal="closeModalOrder"
                    v-show="isOrderWindowVisible"></order-window>

  </div>
</template>

<script>
  import DropdownProfile from './DropdownProfile'
  import {mapGetters} from 'vuex'
  import Vue from 'vue'
  import MarqueeText from 'vue-marquee-text-component'
  import OrderWindow from './../user/orders/OrderWindow'

  Vue.component('marquee-text', MarqueeText)

  export default {
    name: "Topbar",
    data() {
      return {
        isOrderWindowVisible: false,
        quotes: [],
        timer: '',
        coin: [],
      }
    },
    methods: {
      closeModalOrder() {
        this.isOrderWindowVisible = false
      },
      showModalOrder(coin, type, fiat) {
        this.coin = coin
        this.$refs.orderWindow.setOrderCoins(coin.abbr, fiat)
        if (type === 'buy') {
          this.$refs.orderWindow.showBuyWindow()
        } else {
          this.$refs.orderWindow.showSellWindow()
        }

        this.isOrderWindowVisible = true
      },
      retrieveQuotes() {
        this.$store.dispatch('retrieveQuotes')
          .then(response => {
            this.quotes = response.data

          }).catch(error => {
          if (error.response) {
            this.handleErrors(error.response)
          }
        })
      },
    },
    mounted() {
      this.retrieveQuotes();
      this.timer = setInterval(function () {
        this.retrieveQuotes();
      }.bind(this), 60000);

    },
    components: {
      DropdownProfile,
      MarqueeText,
      OrderWindow
    },
    computed: {
      ...mapGetters([
        'user'
      ]),
    }
  }
</script>

<style scoped>
  .dark-bg {
      background-color: #293144;
      padding: 3px 10px;
  }
  .market {
      width: 150px;
      display: inline-block;
      height: 36px;
      margin-right: 10px;
      border-right: 3px solid #293144;
      padding-right: 10px;
      box-shadow: 1px 0 0px #6f6f6f;
  }
  .market .market-share {
      float: left;
      width: 100%;
  }
  .market .market-share .share-name {
      float: left;
      margin: 0;
      font-size: .9rem;
  }
  .market .market-share .share-name a {
      color: #fff;
  }
  .market .market-share .marketdata {
      float: right;
  }
  .market .marketchangedata {
      float: left;
      width: 100%;
  }
  .market .marketchangedata .marketLast {
      color: #fff;
      float: left;
      font-size: 1.3em;
  }
  .market .marketchangedata .marketlastchange {
      float: left;
      color: #fff;
  }
  .market .marketchangedata .marketpercent {
      float: right;
      color: #fff;
  }
  .market .marketchangedata .marketpercent i {
      padding-right: 5px;
  }
  .market .marketpercent.red i, .market .marketlastchange.red, .market .marketpercent.red {
      color: #f44336;
      font-size: .9em;
      cursor: pointer;
  }
  .market .marketpercent.green i, .market .marketlastchange.green, .market .marketpercent.green {
      color: #26c281;
      font-size: 1.1em;
      cursor: pointer;
  }

    .red {color: #f44336;}
    .green {color: #26c281;}

</style>
