<template>
  <div>
    <div class="loader" v-if="loader"></div>
    <vue-headful
      title="Gateway Liquidex"
      description="Pagamento"
    />
    <div class="auth-wrapper">
      <div class="all-wrapper menu-side with-pattern">
        <div class="auth-box-w">
          <div class="logo-w">
            <a href="">
              <img src="https://navi.inf.br/storage/api/clients/3/liquidex.png"
                   alt="Liquidex" class="logo">
            </a>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="element-wrapper mb-0 pb-0 pt-0">
                <div class="element-box">

                  <div class="element-info mb-0 ">
                    <h5 class="element-inner-header center">
                      Gateway de Pagamentos
                    </h5>
                    <div class="element-inner-desc">
                      situação do pagamento
                    </div>
                  </div>

                  <table class="table table-lightborder" v-if="exists">
                    <tr>
                      <td class="qr_code">
                        <qr-code :text="'bitcoin:'+payment.address+'?amount='+payment.amount" :size="qrcode_size" error-level="L"></qr-code>
                      </td>
                    </tr>

                    <tr>
                      <td class="text-center">
                        {{ payment.address }}
                      </td>
                    </tr>

                    <tr>
                      <td class="text-center">
                        <div class="row">
                          <div class="col-md-6 col-sm-12">
                            {{ payment.amount }} <span v-if="payment.coin">{{payment.coin.abbr}}</span>
                          </div>
                          <div class="col-md-6 col-sm-12">
                            <Timer :starttime="payment.startTime" :endtime="payment.endTime"></Timer>
                          </div>
                        </div>
                      </td>
                    </tr>

                    <tr v-if="payment.statusName">
                      <td class="text-center">
                        {{ payment.statusName }}
                      </td>
                    </tr>

                  </table>
                  <div class="alert alert-warning" v-if="!exists">O pagamento requisitado não existe.</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Timer from './../../layouts/Timer'
  import Vue from 'vue'
  import VueQRCodeComponent from 'vue-qrcode-component'

  Vue.component('qr-code', VueQRCodeComponent)

  export default {
    name: 'Gateway',
    data() {
      return {
        loader: true,
        qrcode_size: 256,
        exists: false,
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
        coins: []
      }
    },
    computed: {},
    methods: {
      retrieveGatewayPayment() {
        this.loader = true
        this.$store.dispatch('retrieveGatewayPayment', this.$route.params.tx)
          .then(response => {
            if (response.data.message === "success") {
              this.payment = response.data.payment
              this.exists = true
            } else {
              this.exists = false
            }
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
    components: {
      Timer
    },
    mounted() {
      this.retrieveGatewayPayment()
      this.timer = setInterval(function () {
				this.retrieveGatewayPayment();
			}.bind(this), 60000);
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  img.logo {
    width: 235px;
  }

  .auth-box-w .logo-w {
    padding: 2em 1em !important;
  }

  .auth-wrapper::before {
    content: "";
    position: absolute;
    z-index: -1;
    background: -webkit-gradient(linear, left top, right bottom, from(#D7BBEA), to(#65A8F1));
    background: linear-gradient(to bottom right, #D7BBEA, #65A8F1);
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
  }

  .auth-wrapper {
    margin: 0;
    font-family: 'Ubuntu', sans-serif;
    font-size: 0.9rem;
    font-weight: 400;
    line-height: 1.5;
    color: #3E4B5B;
    text-align: left;
  }

  .box-tp .el-tablo {
    border: 1px solid #e7e7e7
  }

</style>
