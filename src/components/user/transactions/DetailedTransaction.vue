<template>
  <div>
    <modal>
      <template slot="header">
        <h6 class="pull-left ml-3 mt-2">
          Detalhes da Transação
        </h6>
        <button class="btn btn-grey pull-right mt-3 mr-3 mb-3" type="button" @click="closeThisModal"><i
          class="os-icon os-icon-close"></i></button>
      </template>

      <template slot="body">
        <table class="table table-striped" v-if="transaction.coin">
          <tr class="background-dark">
            <td> Criação</td>
            <td>{{transaction.dateLocal}}</td>
          </tr>
          <tr>
            <td> Transação</td>
            <td>
              <!--transactions-->
              <div class="value" v-if="transaction.category===1">
                {{ transaction.coin.abbr}} {{ transaction.type === 1 ? 'Recebido' : 'Enviado' }}
              </div>
              <!--orders-->
              <div class="value" v-if="transaction.category===2">
                {{ transaction.type === 1 ? 'Ordem de Compra' : 'Ordem de Venda' }}
              </div>
              <!--deposits-->
              <div class="value" v-if="transaction.category===3">
                Depósito {{ transaction.coin.abbr}}
              </div>
              <!--drafts-->
              <div class="value" v-if="transaction.category===4">
                Saque {{ transaction.coin.abbr}}
              </div>
              <!--conversions-->
              <div class="value" v-if="transaction.category===6">
                Conversão {{ transaction.coin.abbr}}
                <i class="os-icon os-icon-arrow-down-left text-success" v-if="transaction.type===1"></i>
                <i class="os-icon os-icon-arrow-down-right text-danger" v-if="transaction.type===2"></i>
              </div>
              <!--mining-->
              <div class="value" v-if="transaction.category===7">
                <span v-if="transaction.type===1">Lucro </span>
                <span v-if="transaction.type===2">Contratação </span>
                Mineração
              </div>
              <!--transfer-->
              <div class="value" v-if="transaction.category===8">
                Transferência
                <span v-if="transaction.type===1">Recebida</span>
                <span v-if="transaction.type===2">Efetuada</span>
              </div>
              <!--Investimento-->
              <div class="value" v-if="transaction.category===9">
                <span v-if="transaction.type===1">Resgate</span>
                <span v-if="transaction.type===2">Investimento</span>
                Nanotech
              </div>
              <!--Index Fund-->
              <div class="value" v-if="transaction.category===10">
                <span v-if="transaction.type===1">Venda</span>
                <span v-if="transaction.type===2">Aquisição</span>
                Index Fund
              </div>
            </td>
          </tr>

          <tr class="background-dark">
            <td> Moeda</td>
            <td> {{ transaction.coin.name }}</td>
          </tr>

          <tr>
            <td> toAddress</td>
            <td> {{ transaction.toAddress ? transaction.toAddress : '-'}}</td>
          </tr>

          <tr class="background-dark">
            <td> Valor</td>
            <td> {{ transaction.amountRounded }}</td>
          </tr>
          <tr>
            <td> Fee</td>
            <td> {{ transaction.feeRounded }}</td>
          </tr>
          <tr class="background-dark">
            <td> Taxas</td>
            <td> {{ transaction.taxRounded }}</td>
          </tr>
          <tr>
            <td> Tx</td>
            <td>
              <!--transactions-->
              <a target="_blank" :href="transaction.coin.tx_explorer + transaction.tx"
                 v-if="transaction.category===1">
                {{ transaction.tx }}
              </a>
              <!--orders-->
              <a target="_blank" :href="'/order/' + transaction.tx" v-else-if="transaction.category===2">
                {{ transaction.tx }}
              </a>
              <!--conversions-->
              <a target="_blank" :href="'/conversion/' + transaction.tx" v-else-if="transaction.category===6">
                {{ transaction.tx }}
              </a>
              <span v-else> {{ transaction.tx }} </span>
            </td>
          </tr>
          <tr class="background-dark">
            <td> Info</td>
            <td> {{ transaction.info }}</td>
          </tr>
          <tr>
            <td> Status</td>
            <td> {{ transaction.statusName }}</td>
          </tr>
          <tr class="background-dark">
            <td> Tipo</td>
            <td> {{ transaction.typeName }}</td>
          </tr>

          <tr>
            <td> Atualização</td>
            <td> {{ transaction.updatedLocal }}</td>
          </tr>

        </table>

      </template>
      <template slot="footer">
        <div class="col-12 text-center">
          <button class="btn btn-grey" type="button" @click="closeThisModal"> Fechar</button>
          <button class="btn btn-success" type="submit"
                  @click.prevent="showTokenPinModal('cancelDraft', 18, transaction)"
                  v-if="transaction.category===4&&transaction.status===1">Cancelar Saque
          </button>
        </div>
      </template>
    </modal>

    <token-pin v-show="isTokenPinVisible" ref="tokenPinComponent"
               @close-token-pin-modal="closeTokenPinModal"
               @token-data="handleTokenPinData"/>
  </div>
</template>

<script>
  import Modal from './../../layouts/Modal'
  import TokenPin from './../../verifications/TokenPin'

  export default {
    name: "DetailedTransaction",
    props: ['transaction'],
    data() {
      return {
        isTokenPinVisible: false,
        token: {
          code: null,
          pin: null,
          action: 18,
          transaction: null
        }
      }
    },
    methods: {
      closeThisModal() {
        this.$emit('close-token-modal')
      },
      cancelDraft() {
        this.$toasted.show('enviando solicitação...', {position: 'bottom-left'}).goAway(3000)
        this.$store.dispatch('sendCancelDraft', this.token)
          .then(response => {
            this.$toasted.show(response.data.message, {position: 'bottom-left'}).goAway(3000)
            this.closeThisModal()
            this.$emit('retrieve-transactions')
          })
          .catch(error => {
            if (error.response) {
              this.handleErrors(error.response)
            }
          })
      },
      showTokenPinModal(method, action, transaction) {
        this.isTokenPinVisible = true
        this.token.transaction = transaction.id
        this.$refs.tokenPinComponent.setData(method, action)
      },
      closeTokenPinModal() {
        this.isTokenPinVisible = false;
      },
      handleTokenPinData(data) {
        this.token.code = data.code
        this.token.pin = data.pin

        if (data.method === 'cancelDraft') {
          this.cancelDraft()
        }
      },
    },
    components: {
      Modal,
      TokenPin
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
