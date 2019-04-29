<template>
  <div class="all-wrapper solid-bg-all">
    <div class="loader" v-if="loader"></div>
    <vue-headful title="Seu Gateway de Pagamentos" description="Liquidex"
    />

    <div class="layout-w">
      <menubar></menubar>
      <div class="content-w">

        <!-- <topbar v-if="user.country_id===31"></topbar> -->

        <div class="content-i">

          <div class="content-box">
            <div class="row">
              <div class="col-12">
                <div class="element-wrapper mb-0 pb-0 pt-0">
                  <div class="element-box">

                    <div class="element-info mb-0 ">
                      <h5 class="element-inner-header">
                        PDV Gateway
                      </h5>
                      <div class="element-inner-desc">
                        solicitar pagamento
                      </div>
                    </div>

                    <div class="alert alert-warning" v-if="!count">
                      Para usar o PDV você precisa <a href="/gateway">ativar sua Api Key.</a>
                    </div>

                    <form @submit.prevent="storeNewPayment()" class="mt-3" v-else>
                      <div class="row">
                        <div class="col-sm-6 col-lg-6">
                          <div class="form-group">
                            <label> Valor do Pagamento</label>

                            <vue-numeric class="form-control" v-if="user.country_id===31" @input="estimatePayment"
                                         :min="0" :minus="false" :precision="2"
                                         v-model="newPayment.amount" currency="R$" decimal-separator=","
                                         thousand-separator="."></vue-numeric>

                            <vue-numeric class="form-control" v-else @input="estimatePayment"
                                         :min="0" :minus="false" :precision="2"
                                         v-model="newPayment.amount" currency="$" decimal-separator="."
                                         thousand-separator=","></vue-numeric>
                          </div>
                        </div>

                        <div class="col-sm-12">
                          <div class="form-group">
                            <label> Estimativa do Pagamento</label>
                            <div class="pt-btn">
                              <button type="button" v-tooltip="rate.coin_name" class="btn btn-primary mr-1 mb-1"
                                      v-for="rate in rates">
                                {{ rate.amount | fixValue }} {{rate.coin_abbr}}
                              </button>
                            </div>

                          </div>
                        </div>
                      </div>
                      <div class="form-buttons-w text-right">
                        <button class="btn btn-success" type="submit"> Gerar Pagamento</button>
                      </div>
                    </form>

                  </div>
                </div>
              </div>
            </div>

            <div class="row" v-if="isRecentKey">
              <div class="col-12">
                <div class="element-wrapper mb-0 pb-0 pt-0">
                  <div class="element-box">

                    <div class="element-info mb-0 ">
                      <h5 class="element-inner-header">
                        Acompanhamento da Solicitação
                      </h5>
                      <div class="element-inner-desc">
                        acompanhamento do pagamento solicitado
                      </div>
                    </div>

                    <table class="table table-lightborder">
                      <tr>
                        <td class="text-center">
                          <a class="btn btn-primary" :href="gateway_link" target="_blank">Acompanhar pela Api</a>
                          <button class="btn btn-success" @click.prevent="openGateway(payment.tx)">Acompanhar como
                            Cliente
                          </button>
                        </td>
                      </tr>

                      <tr>
                        <td class="text-center">
                          <div class="row">
                            <div class="col-md-6 col-sm-12">
                              Valor Solicitado:<br>
                              {{ payment.fiatAmountLocal }}
                            </div>
                            <div class="col-md-6 col-sm-12">
                              Tempo restante:<br>
                              <Timer :starttime="payment.startTime" :endtime="payment.endTime"></Timer>
                            </div>
                          </div>
                        </td>
                      </tr>

                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
    <div class="display-type"></div>

  </div>
</template>

<script>
  import Menubar from '../../menu/Menubar'
  import Topbar from '../../menu/Topbar'
  import Sidebar from '../../menu/Sidebar'
  import Timer from './../../layouts/Timer'

  import Vue from 'vue'
  import VueNumeric from 'vue-numeric'

  import {mapGetters} from 'vuex'
  import debounce from 'lodash/debounce'

  import VueQRCodeComponent from 'vue-qrcode-component'

  Vue.component('qr-code', VueQRCodeComponent)
  Vue.use(VueNumeric)

  export default {
    name: "UserGatewayPdv",
    data() {
      return {
        loader: true,
        isRecentKey: false,
        key: {
          api_key: null,
          wallet_abbr: '...',
        },
        qrcode_size: 256,
        payment: {
          address: "...",
          amount: "0.00000000",
          received: null,
          tx: "...",
          txid: null,
          confirmations: 0,
          fiatAmountLocal: "0,00",
          createdLocal: "...",
          statusName: "...",
          time_limit: '2050-01-01 01:00:00'
        },
        count: null,
        newPayment: {
          amount: 0,
        },
        rates: [],
        gateway_link: ''
      }
    },
    methods: {
      retrieveKey() {
        this.$store.dispatch('retrieveGatewayKey', this.conversor)
          .then(response => {
            if (response.data.count > 0) {
              this.key.api_key = response.data.key.api_key
              this.key.wallet_abbr = response.data.key.wallet_abbr
            }
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
      estimatePayment: debounce(function (e) {
        if (this.newPayment.amount > 0) {
          this.$store.dispatch('estimateGatewayPayment', {
            amount: this.newPayment.amount,
          })
            .then(response => {
              this.rates = response.data
            }).catch(error => {
            if (error.response) {
              this.handleErrors(error.response)
            }
          })
        }

      }, 500),
      storeNewPayment() {
        this.$store.dispatch('storeGatewayPayment', {
          amount: this.newPayment.amount
        }).then(response => {
          this.$toasted.show(response.data.message, {position: 'bottom-left'}).goAway(3000)
          this.payment = response.data.payment
          this.gateway_link = process.env.API_ROOT + '/gateway/tx/' + response.data.payment.tx
          this.isRecentKey = true
        })
          .catch(error => {
            if (error.response) {
              this.handleErrors(error.response)
            }
          })
      },
      openGateway(tx) {
        let routeData = this.$router.resolve({name: 'gateway-tx', params: {tx: tx}});
        window.open(routeData.href, '_blank');
      },
    },
    mounted() {
      this.retrieveKey()
    },
    computed: {
      ...mapGetters([
        'user'
      ]),
      isFilled() {
        return this.newPayment.amount
      }
    },
    components: {
      Menubar,
      Sidebar,
      Topbar,
      Timer,
      VueNumeric
    },
    beforeCreate: function () {
      document.body.className = 'menu-position-side menu-side-left full-screen with-content-panel';
    }
  }
</script>

<style scoped>
  .layout-w {
    /*min-height: 100vh;*/
  }

  .form-desc {
    border-bottom: 0;
  }

</style>


