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
                <div @click="openAddressWindow" class="btn-receber text-white bg-success o-hidden h-100">
                  <div class="card-body">
                    <div class="card-body-icon">
                      <i class="fas fa-hand-holding-usd"></i>
                    </div>
                    <h4 class="text-white mr-5">Receber</h4>
                  </div>
                </div>
              </div>
              <div class="col-xl-6 col-sm-6 mb-3">
                <div @click="openSendWindow" class="btn-receber text-white bg-primary o-hidden h-100">
                  <div class="card-body">
                    <div class="card-body-icon">
                      <i class="fas fa-paper-plane"></i>
                    </div>
                    <h4 class="text-white mr-5">Enviar</h4>
                  </div>
                </div>
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
  .btn-receber {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.25rem;
    cursor: pointer;
  }
  .card-body-icon {
    position: absolute;
    z-index: 0;
    top: -1.25rem;
    right: -1rem;
    opacity: 0.4;
    font-size: 5rem;
    -webkit-transform: rotate(15deg);
    transform: rotate(15deg);
  }
  .card-body {
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    padding: 1.25rem;
  }
  .card-footer {
    padding: 0.75rem 1.25rem;
    background-color: rgba(0, 0, 0, 0.03);
    border-top: 1px solid rgba(0, 0, 0, 0.125);
  }
</style>
