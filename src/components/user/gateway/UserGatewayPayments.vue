<template>
  <div class="all-wrapper solid-bg-all">
    <div class="loader" v-if="loader"></div>

    <vue-headful title="Seu Gateway de Pagamentos" description="Liquidex"/>

    <div class="layout-w">
      <menubar></menubar>
      <div class="content-w">

        <topbar></topbar>

        <div class="content-i">

          <div class="content-box">
            <div class="row">
              <div class="col-12">
                <div class="element-wrapper mb-0 pb-0 pt-0">
                  <div class="element-box">

                    <div class="element-info mb-0 ">
                      <h5 class="element-inner-header">
                        Meus Pagamentos
                      </h5>
                      <div class="element-box-content">
                        <div class="table-responsive">
                          <table class="table table-lightborder table-striped">
                            <thead>
                            <tr>
                              <th><i class="os-icon os-icon-info"></i></th>
                              <th><i class="os-icon os-icon-calendar-time"></i> Criada em</th>
                              <th><i class="os-icon os-icon-calendar-time"></i> Tempo Limite</th>
                              <th><i class="os-icon os-icon-dollar-sign"></i> Valor</th>
                              <th><i class="os-icon os-icon-coins-4"></i> Crypto</th>
                              <th><i class="os-icon os-icon-coins-4"></i> Quantidade</th>
                              <th><i class="os-icon os-icon-info"></i> Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="payment in transactions.data">
                              <td>
                                <button @click.prevent="detailedPayment(payment)"
                                        class="btn btn-rounded btn-sm btn-primary"><i
                                  class="os-icon os-icon-search"></i>
                                </button>
                              </td>
                              <td>{{ payment.createdLocal }}</td>
                              <td>{{ payment.timeLimitLocal }}</td>
                              <td>{{ payment.fiatAmountLocal }}</td>
                              <td v-if="payment.coin">{{ payment.coin.name }}</td>
                              <td v-else>-</td>
                              <td>{{ payment.amount }}</td>
                              <td>{{ payment.statusName }}</td>
                            </tr>
                            <tr v-if="transactions.total===0">
                              <td colspan="7">
                                ainda não existem pagamentos
                              </td>
                            </tr>
                            </tbody>
                          </table>
                        </div>
                        <pagination :pagination="transactions" @paginate="retrieveGatewayPaymentsList()" :offset="10"/>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
    <div class="display-type"></div>

    <detailed-gateway-payment :payment="payment" v-show="isDetalisVisible" ref="detailedGatewayComponent"
                              @close-token-modal="closeTokenModal"/>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Menubar from '../../menu/Menubar'
  import Topbar from '../../menu/Topbar'
  import Sidebar from '../../menu/Sidebar'
  import Pagination from './../../layouts/Pagination'
  import DetailedGatewayPayment from './DetailedGatewayPayment'

  export default {
    name: "UserGatewayPayments",
    data() {
      return {
        isDetalisVisible: false,
        loader: true,
        payment: {
          address: '...',
          amount: 0,
          received: 0.00000000,
          tx: '-',
          txid: null,
          confirmations: 0,
          fiatAmountLocal: 0,
          time_limit: '2050-01-01 00:00:00',
          createdLocal: '',
          statusName: 'NEW',
          coin: {
            name: 'BITCOIN',
            abbr: 'BTC'
          },
          fiat_coin: {
            name: 'REAL',
            abbr: 'BRL'
          }
        },
        transactions: {
          total: 0,
          per_page: 10,
          from: 1,
          to: 0,
          current_page: 1
        },
        offset: 10,
        timer: null
      }
    },
    methods: {
      detailedPayment(payment) {
        this.payment = payment
        this.isDetalisVisible = true
      },
      closeTokenModal() {
        this.isDetalisVisible = false;
      },
      retrieveGatewayPaymentsList() {
        this.$store.dispatch('retrieveGatewayPaymentsList', this.transactions.current_page)
          .then(response => {
            this.transactions = response.data
            this.loader = false
          })
          .catch(error => {
            if (error.response) {
              this.handleErrors(error.response)
            }
            this.loader = false
          })
      },
    },
    mounted() {
      this.retrieveGatewayPaymentsList()
      this.timer = setInterval(function () {
        this.retrieveGatewayPaymentsList()
      }.bind(this), 60000);
    },
    computed: {
      ...mapGetters([
        'user'
      ]),
    },
    components: {
      Menubar,
      Sidebar,
      Topbar,
      Pagination,
      DetailedGatewayPayment
    },
    beforeCreate: function () {
      document.body.className = 'menu-position-side menu-side-left full-screen with-content-panel';
    }
  }
</script>

<style scoped>
  .layout-w {
    min-height: 100vh;
  }

  .form-desc {
    border-bottom: 0;
  }

</style>
