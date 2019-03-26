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

            <div class="element-wrapper pb-4 mb-0" v-if="wallet.type===1">
              <div class="element-box-tp">
                <a class="btn btn-success" href="#" @click="openAddressWindow">
                  <i class="os-icon os-icon-arrow-down-left"></i><span>Receber</span>
                </a>

                <a class="btn btn-grey" @click="openSendWindow" href="#">
                  <i class="os-icon os-icon-arrow-up-right"></i><span>Enviar</span>
                </a>
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

</style>
