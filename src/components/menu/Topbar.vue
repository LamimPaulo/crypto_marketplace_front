<template>
  <div class="top-bar color-scheme-dark">
    <marquee-text :repeat="5" :duration="60">
       <span v-for="coin in quotes">

         <span class="badge badge-white mr-1"> {{ coin.abbr }}</span>

         <span v-tooltip="'Vender '+coin.name" @click="showModalOrder(coin, 'sell', 'BRL')"
               class="badge badge-danger mr-1" v-if="user.country_id===31">R$ {{ coin.quote[0].sell_quote | currency }}</span>

         <span v-tooltip="'Vender '+coin.name" @click="showModalOrder(coin, 'sell', 'USD')"
               class="badge badge-danger mr-1" v-else>$ {{ coin.quote[0].sell_quote }}</span>

         <span v-tooltip="'Comprar '+coin.name" @click="showModalOrder(coin, 'buy', 'BRL')"
               class="badge badge-success mr-2" v-if="user.country_id===31">R$ {{ coin.quote[0].buy_quote | currency }}</span>

         <span v-tooltip="'Comprar '+coin.name" @click="showModalOrder(coin, 'buy', 'USD')"
               class="badge badge-success mr-2" v-else>$ {{ coin.quote[0].buy_quote }}</span>
       </span>
    </marquee-text>

    <order-window :coin="coin" ref="orderWindow" @close-modal="closeModalOrder"
                  v-show="isOrderWindowVisible"></order-window>
  </div>
</template>

<script>
  import DropdownProfile from './DropdownProfile';
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
  .badge {
    cursor: pointer;
  }

  .badge-white {
    background-color: #fff;
  }

  .fs-img {
    background: #fff;
    border-radius: 15px;
    margin: 10px;
    padding: 0 !important;
  }

  .top-bar {
    min-height: 40px;
  }
</style>
