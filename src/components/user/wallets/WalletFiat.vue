<template>
  <div>
    <div class="loader" v-if="loader"></div>
    <vue-headful title="Minhas Carteiras - Navi Capital" description="Navi Capital"/>

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
                <a class="btn btn-success d-sm-inline-flex mb-1 " href="#" @click="openDepositWindow">
                  <i class="os-icon os-icon-arrow-down-left"></i><span>Depositar</span>
                </a>

                <a class="btn btn-grey d-sm-inline-flex mb-1" href="#" @click="openDraftWindow">
                  <i class="os-icon os-icon-arrow-up-right"></i><span>Saque</span>
                </a>

                <a class="btn btn-primary d-sm-inline-flex mb-1" @click="openSendWindow" href="#">
                  <i class="os-icon os-icon-refresh-cw"></i><span>Transferir</span>
                </a>
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

</style>
