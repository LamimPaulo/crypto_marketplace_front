<template>
  <div>
    <div class="loader" v-if="loader"></div>
    <vue-headful title="Minhas Carteiras - Liquidex" description="Liquidex"/>

    <div class="element-wrapper compact pt-0 pb-0">
      <div class="element-actions d-none d-sm-block">
        <a class="btn btn-primary btn-sm" href="/wallets/list">
          <i class="os-icon os-icon-arrow-left"></i><span> Ver Carteiras</span>
        </a>
      </div>

      <h6 class="element-header mb-0">
        <i class="os-icon os-icon-wallet-loaded"></i> {{ wallet.coin.name }}
      </h6>
      <div class="element-box-tp" v-if="wallet.type===1">
        <div class="row">
          <div class="col-12">
            <div class="element-balances justify-content-between mobile-full-width">
              <div class="balance balance-v2">
                <div class="balance-title">
                  Meu Saldo
                </div>
                <div class="balance-value">
                  <span class="font-50">{{wallet.balance_rounded}}</span>
                </div>
              </div>

            </div>

            <div class="row">
              <div class="col-xl-6 col-sm-6 mb-3">
                <button @click="openAddressWindow" class="three">
                    <h4 class="text-white">Receber</h4>
                </button>
              </div>
              <div class="col-xl-6 col-sm-6 mb-3">
                  <button @click="openSendWindow" class="two">
                      <h4 class="text-white">Enviar</h4>
                  </button>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <crypto-address v-if="addressWindow && wallet.type===1" :address="wallet.address" :icon="wallet.coin.icon" :abbr="wallet.coin.abbr"/>

    <crypto-send :icon="wallet.coin.icon" :address="wallet.address" :abbr="wallet.coin.abbr" v-if="sendWindow && wallet.type===1" @retrieve-transactions="retrieveTransactions"></crypto-send>

    <transactions-list-wallet :symbol="wallet.coin.abbr" :address="wallet.address" v-if="wallet.type===1" ref="transactionsList" ></transactions-list-wallet>

    <div class="alert alert-danger" v-if="wallet.type!==1">Você não possui nenhuma carteira para a moeda selecionada</div>
  </div>
</template>

<script>
  import CryptoAddress from './CryptoAddress';
  import CryptoSend from './CryptoSend';
  import TransactionsListWallet from './../transactions/TransactionsListWallet';

  export default {
    name: "WalletCrypto",
    data() {
      return {
        transactions: {},
        count: null,
        loading: false,
        wallet: {
          coin: {
            name: '...',
            icon: 'btc_icon.png'
          },
          balance_rounded: 'carregando...',
          address: 'carregando...',
        },
        loader: true,
        addressWindow: false,
        sendWindow: false,
      }
    },
    methods: {
      openAddressWindow() {
        this.addressWindow = true
        this.sendWindow = false
      },
      openSendWindow() {
        this.sendWindow = true
        this.addressWindow = false
      },
      retrieveWallet() {
        this.$store.dispatch('retrieveWallet', this.$route.params.symbol)
          .then(response => {
            this.wallet = response.data.wallet
            this.loader = false
          })
          .catch(error => {
            if (error.response) {
              this.handleErrors(error.response)
              this.loader = false
            }
          })
      },
      retrieveTransactions(){
        this.$refs.transactionsList.retrieveTransactions()
      }
    },
    components: {
      CryptoAddress,
      CryptoSend,
      TransactionsListWallet
    },
    mounted() {
      this.retrieveWallet()
    },
  }
</script>

<style scoped>

  .three, .two {
      border: none;
      border-radius: 4px;
      text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.48);
      overflow: hidden;
      padding: 20px 50px 20px 70px;
      margin-bottom: 20px;
      font-size: 20px;
      position: relative;
      color: white;
      outline: none;
      cursor: pointer;
      width: 100%;
      transition: background-position 0.7s, box-shadow 0.4s;
      background-size: 110%;
      font-family: "Oswald", sans-serif;
  }
  .three:hover, .two:hover {
      background-position: 0% 30%;
  }
  .three:hover:after, .two:hover:after {
      right: -40px;
      transition: right 0.4s, transform 30s 0.2s linear;
  }
  .three:before, .two:before, .three:after, .two:after {
      font-family: FontAwesome;
      display: block;
      position: absolute;
  }
  .three:before, .two:before {
      transition: all 1s;
      font-size: 30px;
      left: 25px;
      top: 19px;
  }
  .three:after, .two:after {
      transition: right 0.4s, transform 0.2s;
      font-size: 100px;
      opacity: 0.3;
      right: -120px;
      top: -17px;
  }

  .two {
      background-image: linear-gradient(to bottom, #293144, rgba(41, 49, 68, 0.38)), url("http://www.eatweartravel.com/wp-content/uploads/2015/04/i-love-shopping_1920x1200_83206.jpg");
  }
  .two:hover {
      box-shadow: 0px 0px 0px 2px rgba(41, 49, 68, 0.38) inset, 0px 0px 30px 0px #293144;
  }
  .two:hover:after {
      transform: scale(1);
  }
  .two:hover:before {
      transform: scale(1.2);
  }
  .two:after, .two:before {
      font-family: "Font Awesome 5 Free"; font-weight: 900; content: "\f1d8";
  }
  .two b {
      color: #FFD9B4;
      font-weight: 700;
  }

  .three {
      background: #36C176;
  }
  .three:hover {
      box-shadow: 0px 0px 0px 2px rgba(255, 255, 255, 0.16) inset, 0px 0px 30px 0px #36C176;
  }
  .three:hover:after {
      transform: scale(1);
  }
  .three:hover:before {
      transform: scale(1.2);
  }
  .three:after, .three:before {
      font-family: "Font Awesome 5 Free"; font-weight: 900; content: "\f4c0";
  }
  .three b {
      color: #63FFAC;
      font-weight: 700;
  }
</style>
