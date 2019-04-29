<template>
  <div>
    <div class="loader" v-if="loader"></div>
    <vue-headful title="Minhas Carteiras - Liquidex" description="Liquidex"/>

    <div class="element-wrapper compact pt-0 pb-0">
      <div class="element-actions d-sm-block">
        <a class="btn btn-primary btn-sm" href="/wallets/list">
          <i class="os-icon os-icon-arrow-left"></i><span> Ver Carteiras</span>
        </a>
      </div>

      <h6 class="element-header mb-0">
        <i class="os-icon os-icon-wallet-loaded"></i> {{ wallet.coin.name }}
      </h6>
      <div class="element-box-tp">
        <div class="row">
          <div class="col-12">
            <div class="element-balances justify-content-between mobile-full-width">
              <div class="balance balance-v2">
                <div class="balance-title">
                  Meu Saldo
                </div>
                <div class="balance-value">
                  <span class="font-50">{{ wallet.coin.shortname }} {{wallet.balance_rounded}}</span>
                </div>
              </div>

            </div>

            <div class="element-wrapper pb-4 mb-0">
              <div class="element-box-tp">

                <div class="row">
                  <div class="col-sm-4">
                      <button @click="openDraftWindow" class="three">
                          <h4 class="text-white">Saque</h4>
                      </button>
                  </div>
                  <div class="col-sm-4">
                      <button @click="openDepositWindow" class="two">
                          <h4 class="text-white">Depositar</h4>
                      </button>
                  </div>
                  <div class="col-sm-4">
                    <button @click="openSendWindow" class="four">
                      <h4 class="text-white">Transferir</h4>
                    </button>
                  </div>
                </div>


              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <deposit :wallet="wallet" v-if="depositWindow"></deposit>
    <draft :wallet="wallet" v-if="draftWindow"></draft>
    <fiat-send :wallet="wallet" v-if="sendWindow"></fiat-send>

    <transactions-list-wallet :symbol="wallet.coin.abbr" :address="wallet.address" v-if="wallet.type===1" ref="transactionsList" ></transactions-list-wallet>

  </div>
</template>

<script>
  import Deposit from './Deposit';
  import Draft from './Draft';
  import FiatSend from './FiatSend';
  import TransactionsListWallet from './../transactions/TransactionsListWallet';

  export default {
    name: "WalletFiat",
    data() {
      return {
        transactions: {
          data: []
        },
        count: null,
        loading: false,
        wallet: {
          coin: {
            name: 'carregando...',
            icon: 'brl_icon.png',
            shortname: 'R$'
          },
          balance_rounded: 'carregando...',
          address: 'carregando...',
        },
        loader: true,
        depositWindow: false,
        draftWindow: false,
        sendWindow: false,
      }
    },
    methods: {
      openSendWindow() {
        this.draftWindow = this.depositWindow = false
        this.sendWindow = true
      },
      openDepositWindow() {
        this.draftWindow = this.sendWindow = false
        this.depositWindow = true
      },
      openDraftWindow() {
        this.depositWindow = this.sendWindow = false
        this.draftWindow = true
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
            }
          })
      },
    },
    components: {
      Deposit,
      Draft,
      FiatSend,
      TransactionsListWallet
    },
    mounted() {
      this.retrieveWallet()
    },
  }
</script>

<style scoped>
  .four, .three, .two {
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
  .four:hover, .three:hover, .two:hover {
      background-position: 0% 30%;
  }
  .four:hover:after, .three:hover:after, .two:hover:after {
      right: -40px;
      transition: right 0.4s, transform 30s 0.2s linear;
  }
  .four:before, .three:before, .two:before, .four:after, .three:after, .two:after {
      font-family: FontAwesome;
      display: block;
      position: absolute;
  }
  .four:before, .three:before, .two:before {
      transition: all 1s;
      font-size: 30px;
      left: 25px;
      top: 19px;
  }
  .four:after, .three:after, .two:after {
      transition: right 0.4s, transform 0.2s;
      font-size: 100px;
      opacity: 0.3;
      right: -120px;
      top: -17px;
  }

  .two {
      box-shadow: 0px 0px 0px 2px rgba(255, 255, 255, 0.16) inset, 0px 0px 10px 0px #E48A3C;
      background-image: linear-gradient(to bottom, #E48A3C, rgba(222, 135, 61, .55)), url("~@/assets/img/btn-deposit-bck.jpg");
  }
  .two:hover {
      box-shadow: 0px 0px 0px 2px rgba(255, 255, 255, 0.16) inset, 0px 0px 30px 0px #E48A3C;
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

  .four {
      background-image: linear-gradient(to bottom, #293144, rgba(41, 49, 68, 0.38)), url("~@/assets/img/btn-transfer-bkp.jpg");
  }
  .four:hover {
      box-shadow: 0px 0px 0px 2px rgba(41, 49, 68, 0.38) inset, 0px 0px 30px 0px #293144;
  }
  .four:hover:after {
      transform: rotate(3000deg);
  }
  .four:hover:before {
      transform: rotate(360deg);
  }
  .four:after, .four:before {
      font-family: "Font Awesome 5 Free"; font-weight: 900; content: "\f079";
  }
</style>
