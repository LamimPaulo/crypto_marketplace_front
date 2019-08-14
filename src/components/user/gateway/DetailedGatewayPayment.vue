<template>
  <div>
    <modal>
      <template slot="header">
        <h6 class="pull-left ml-3 mt-2">
          Detalhes do Pagamento
        </h6>
        <button class="btn btn-grey pull-right mt-3 mr-3 mb-3" type="button" @click="closeThisModal"><i
          class="os-icon os-icon-close"></i></button>
      </template>

      <template slot="body">
        <table class="table table-striped">
          <tr class="background-dark">
            <td> Criação</td>
            <td>{{payment.createdLocal}}</td>
          </tr>
          <tr>
            <td> Horário Limite</td>
            <td>

              {{payment.timeLimitLocal}}
              <button @click.prevent="openGateway(payment.tx)" v-if="payment.statusName==='NEW'"
                      class="btn btn-rounded btn-sm btn-primary pull-right"><i class="os-icon os-icon-arrow-up-right"></i>
              </button>
            </td>
          </tr>

          <tr class="background-dark">
            <td> Moeda</td>
            <td v-if="payment.coin"> {{ payment.coin.name }}</td>
            <td v-else> </td>
          </tr>

          <tr class="background-dark">
            <td> Valor</td>
            <td> {{ payment.amount }}</td>
          </tr>
          <tr class="background-dark">
            <td> Recebido</td>
            <td> {{ payment.received }}</td>
          </tr>
          <tr>
            <td> Fiat</td>
            <td> {{ payment.fiat_coin.name }}</td>
          </tr>
          <tr class="background-dark">
            <td> Valor</td>
            <td> {{ payment.fiatAmountLocal }}</td>
          </tr>
          <tr>
            <td> Tx Interna</td>
            <td>
              {{ payment.tx }}
            </td>
          </tr>
          <tr>
            <td> TXID</td>
            <td>
              <!--payments-->
              <a target="_blank" v-if="payment.txid" :href="payment.coin.tx_explorer + payment.txid">
                {{ payment.txid }}
              </a>
              <span v-else>ainda não processada</span>
            </td>
          </tr>
          <tr>
            <td> Status</td>
            <td> {{ payment.statusName }}</td>
          </tr>

        </table>

      </template>
      <template slot="footer">
        &nbsp;
      </template>
    </modal>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Modal from './../../layouts/Modal'

  export default {
    name: "DetailedGatewayPayment",
    props: ['payment'],
    methods: {
      closeThisModal() {
        this.$emit('close-token-modal')
      },
      openGateway(tx) {
        let routeData = this.$router.resolve({name: 'gateway-tx', params: {tx: tx}});
        window.open(routeData.href, '_blank');
      },
    },
    computed: {
      ...mapGetters([
        'user'
      ]),
    },
    components: {
      Modal,
    }
  }
</script>

<style scoped>
  h6 {
    padding-top: 15px;
    text-align: center;
    font-size: 1.26rem;
    line-height: 1.25;
    color: #334152 !important;
  }

  h6 .os-icon {
    color: #047bf8;
  }

  .background-dark {
    background: #f7f9fa;
  }
</style>
