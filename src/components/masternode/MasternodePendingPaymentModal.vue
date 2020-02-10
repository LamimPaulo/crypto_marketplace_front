<template>
  <div>
    <div class="loader" v-if="loader"></div>

    <modal @close="closeModal" v-show="isModalVisible" modal_size="large">

      <template slot="header">
        <h6 class="pull-left mt-1">Pagamentos Pendentes</h6>
        <button class="btn btn-grey pull-right mr-1" type="button" @click="closeModal">
          <i class="os-icon os-icon-close"></i>
        </button>
      </template>

      <template slot="body">

        <div class="element-box-tp mb-2">

          <div class="row">
            <div class="col-sm-12">

              <div class="alert alert-warning">
                Caros usuários, <br>
                A partir do dia 01/03/2020 o masternode com pagamento pendente a mais de um mês será automaticamente
                desfeito, portanto não possibilitando o recebimento de recompensas apartir desta data.
              </div>

                <div class="table-responsive">

                  <table class="table table-lightborder table-striped">
                    <thead>
                    <tr>
                      <th> Criado em</th>
                      <th> Masternode</th>
                      <th> Validade</th>
                      <th> Valor</th>
                      <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="pp in pending_plans.data">
                      <td>
                        {{ pp.masternode.createdLocal }}
                      </td>
                      <td>
                        {{ pp.masternode.fee_address }}
                      </td>
                      <td>
                        {{ pp.startDateLocal }} <br>
                        {{ pp.endDateLocal }}
                      </td>
                      <td>
                        {{ parseInt(pp.plan.value) }} LQX
                      </td>
                      <td>
                        <button class="btn btn-rounded btn-md btn-success"
                                v-tooltip.top="'Pagar e Liberar Recompensas'"
                                @click.prevent="showTokenPinModal('acceptPayment', 23, pp.id, 'Confirma o pagamento da mensalidade no perído selecionado?')">
                          <i class="os-icon os-icon-dollar-sign"></i></button>

                        <button class="btn btn-rounded btn-md btn-danger"
                                v-tooltip.top="'Recusar as recompensas do período e receber somente recompensas apartir do próximo período.'"
                                @click.prevent="showTokenPinModal('refusePayment', 22, pp.id, 'Confirma a Recusa das recompensas do período e receber somente recompensas apartir do próximo período?')">
                          <i class="fa fa-trash"></i></button>
                      </td>
                    </tr>
                    </tbody>
                  </table>

                </div>
                <pagination :pagination="pending_plans" @paginate="get()" :offset="10"/>

            </div>
          </div>

        </div>

      </template>

      <template slot="footer">
        <div class="col-12 text-center">
          <button class="btn btn-grey" type="button" @click="closeModal"> Fechar</button>
        </div>
      </template>
    </modal>

    <token-pin v-show="isTokenPinVisible" ref="tokenPinComponent"
               @close-token-pin-modal="closeTokenPinModal" @token-data="handleTokenPinData"/>

  </div>
</template>

<script>
  import Modal from './../layouts/Modal'
  import Pagination from "./../layouts/Pagination";
  import TokenPin from './../verifications/TokenPin'

  export default {
    name: "MasternodePendingPaymentModal",
    data() {
      return {
        // action MASTERNODE_REFUSE = 22;
        // action MASTERNODE_PAYMENT = 23;
        // action MASTERNODE_UNDO = 24;
        isTokenPinVisible: false,
        isModalVisible: false,
        tabSelected: 'pending_plans',
        loader: false,
        plans: [],
        pending_masternodes: {
          total: 0,
          per_page: 10,
          from: 1,
          to: 0,
          current_page: 1
        },
        pending_plans: {
          total: 0,
          per_page: 10,
          from: 1,
          to: 0,
          current_page: 1
        },
        token: {
          code: null,
          pin: null,
          action: null
        },
        id: null
      }
    },
    methods: {
      acceptPayment() {
        this.loader = true
        this.$store.dispatch('acceptMasternodePayment', {
          id: this.id,
          code: this.token.code,
          pin: this.token.pin,
          action: this.token.action
        })
          .then(response => {
            this.$toasted.show(response.data.message, {position: 'bottom-left', type: 'success'}).goAway(3000)
            this.get()
          })
          .catch(error => {
            if (error.response) {
              this.handleErrors(error.response)
            }
            this.loader = false
          })
      },
      refusePayment() {
        this.loader = true
        this.$store.dispatch('refuseMasternodePayment', {
          id: this.id,
          code: this.token.code,
          pin: this.token.pin,
          action: this.token.action
        })
          .then(response => {
            this.$toasted.show(response.data.message, {position: 'bottom-left', type: 'success'}).goAway(3000)
            this.get()
          })
          .catch(error => {
            if (error.response) {
              this.handleErrors(error.response)
            }
            this.loader = false
          })
      },
      get() {
        this.loader = true
        this.$store.dispatch('getMasternodePendingPayments', {
          page: this.plans.current_page
        })
          .then(response => {
            this.pending_plans = response.data.pending_plans
            this.pending_masternodes = response.data.pending_masternodes
            this.plans = response.data.plans
            this.loader = false
          })
          .catch(error => {
            if (error.response) {
              this.handleErrors(error.response)
            }
            this.loader = false
          })
      },
      showModal() {
        this.get()
        this.isModalVisible = true
      },
      closeModal() {
        this.isModalVisible = false;
      },
      resetToken() {
        this.token.code = null
        this.token.pin = null
        this.token.action = null
        this.$refs.tokenPinComponent.resetData()
      },
      showTokenPinModal(method, action, id, message) {
        this.token.code = null
        this.token.pin = null

        if (confirm(message)) {
          this.id = id
          this.isTokenPinVisible = true
          this.$refs.tokenPinComponent.setData(method, action)
        } else {
          this.resetToken()
        }
      },
      closeTokenPinModal() {
        this.isTokenPinVisible = false;
      },
      handleTokenPinData(data) {
        this.token.code = data.code
        this.token.pin = data.pin
        this.token.action = data.action

        if (data.method === 'acceptPayment') {
          this.acceptPayment()
        }

        if (data.method === 'refusePayment') {
          this.refusePayment()
        }
      },

    },
    components: {
      Pagination,
      TokenPin,
      Modal
    }
  }
</script>

<style>
  .modal-body {
    background: #f4f4f4 !important;
  }
</style>
