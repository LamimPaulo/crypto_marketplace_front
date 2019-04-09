<template>
  <div class="sub-menu-i">

    <marquee-text :repeat="5" :duration="60">
       <ul class="sub-menu">
         <div v-for="coin in quotes">
          <li class="badge badge-white ml-1"> <strong>{{ coin.abbr }}</strong> </li>

          <li v-tooltip="'Vender '+coin.name" @click="showModalOrder(coin, 'sell', 'BRL')"
                class="badge badge-danger" v-if="user.country_id===31">R$ {{ coin.quote[0].sell_quote | currency }}</li>

          <li v-tooltip="'Vender '+coin.name" @click="showModalOrder(coin, 'sell', 'USD')"
                class="badge badge-danger" v-else>$ {{ coin.quote[0].sell_quote }}</li>

          <li v-tooltip="'Comprar '+coin.name" @click="showModalOrder(coin, 'buy', 'BRL')"
                class="badge badge-success" v-if="user.country_id===31">R$ {{ coin.quote[0].buy_quote | currency }}</li>

          <li v-tooltip="'Comprar '+coin.name" @click="showModalOrder(coin, 'buy', 'USD')"
                class="badge badge-success" v-else>$ {{ coin.quote[0].buy_quote }}</li>
         </div>
       </ul>
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
  .badge {
    cursor: pointer;
  }

  .badge-white {
    background-color: #fff;
    color: #3E4B5B;
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
  .vue-tooltip {
    top: -20px !important;
  }
</style>
