<template>
  <div class="all-wrapper solid-bg-all">
    <div class="loader" v-if="loader"></div>

    <vue-headful title="Pagamentos Multinível" description="Liquidex"/>

    <div class="layout-w">
      <menubar></menubar>
      <div class="content-w">

        <!-- <topbar></topbar> -->

        <div class="content-i">

          <div class="content-box">
            <div class="row">
              <div class="col-12">
                <div class="element-wrapper mb-0 pb-0 pt-0">
                  <div class="element-box">

                    <div class="element-info mb-0 ">
                      <h5 class="element-inner-header">
                        Gateway de pagamentos Multinível
                      </h5>
                      <div class="element-inner-desc">
                        autenticação da API
                      </div>
                    </div>

                    <table class="table table-clean" v-if="isApiDataVisible">
                      <tr>
                        <td>
                          <div class="value mb-2" v-if="count"><strong>Api Key:</strong> {{ key.api_key }}</div>
                          <div class="value mb-2 alert alert-warning" v-if="!count">você ainda não possui nenhuma chave gerada
                          </div>

                          <div class="sub-value mb-2" v-if="!isRecentKey&&count"><strong>Secret:</strong> {{ key.secret
                            }}
                          </div>
                          <div class="value mb-2" v-if="isRecentKey"><strong>Secret:</strong> {{ key.secret }}</div>

                          <div class="value mb-2" v-if="count"><strong>IP de Acesso:</strong> {{ key.ip }}</div>

                        </td>
                        <td class="text-right">
                          <div class="value">
                            <button class="btn btn-success" v-if="!count && !isFormGenerateVisible"
                                    @click.prevent="showFormGenerate()">
                              <i class="os-icon os-icon-lock"></i> Gerar
                            </button>
                          </div>
                          <div class="sub-value">
                            <button class="btn btn-primary" v-if="count"
                                    @click.prevent="showFormUpdate()">
                              <i class="os-icon os-icon-edit"></i> Alterar
                            </button>
                          </div>
                        </td>
                      </tr>
                    </table>

                    <div class="alert alert-warning" v-if="isRecentKey">
                      Guarde o <strong><em>secret</em></strong> em local seguro, pois para sua segurança ele não será
                      mostrado novamente.
                    </div>

                    <form @submit.prevent="storeKey" v-if="isFormGenerateVisible">
                      <hr>
                      <div class="row">
                        <div class="col-sm-6 col-lg-6">
                          <div class="form-group">
                            <label> IP de acesso?</label>
                            <input class="form-control" placeholder="IP de acesso" v-model="newKey.ip" type="text">
                          </div>
                          <div class="form-desc">
                            Você pode limitar o acesso de sua API escolhendo um IP acima ou pode deixar em branco para
                            tornar sua API acessível de qualquer IP
                          </div>
                        </div>
                      </div>
                      <div class="form-buttons-w text-right">
                        <button class="btn btn-grey pull-left" @click.prevent="isFormGenerateVisible=false"
                                type="button"> Fechar
                        </button>
                        <button class="btn btn-primary" type="button"
                                @click.prevent="showPinModal('storeKey', 12)"> Confirmar
                        </button>
                      </div>
                    </form>

                    <form @submit.prevent="updateKey" v-if="isFormUpdateVisible">
                      <div class="alert alert-primary">
                        Confirmando a alteração de dados você receberá uma nova Api Key e um novo Secret
                      </div>
                      <div class="row">
                        <div class="col-sm-6 col-lg-6">
                          <div class="form-group">
                            <label> IP de acesso?</label>
                            <input class="form-control" placeholder="IP de acesso" v-model="newKey.ip" type="text">
                          </div>
                          <div class="form-desc">
                            Você pode limitar o acesso de sua API escolhendo um IP acima ou pode deixar em branco para
                            tornar sua API acessível de qualquer IP
                          </div>
                        </div>

                      </div>
                      <div class="form-buttons-w text-right">
                        <button class="btn btn-grey pull-left" @click.prevent="closeFormUpdate()" type="button"> Fechar
                        </button>
                        <button class="btn btn-primary" type="button"
                                @click.prevent="showPinModal('updateKey', 12)"> Confirmar
                        </button>
                      </div>
                    </form>

                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-12">

                <div class="element-wrapper mb-0 pb-0 pt-0">
                  <div class="element-box">

                    <div class="element-info mb-0 ">
                      <h5 class="element-inner-header">
                        Como Integrar a API
                      </h5>
                      <div class="element-inner-desc">
                        informações de integração
                      </div>
                    </div>

                    <div class="element-box-content pt-1">

                      <div class="row mb-3">
                        <div class="col-12">
                          <div class="request-api">
                            Endpoint base da api: "{{base_url}}"
                          </div>
                        </div>
                      </div>

                      <div class="row mb-3">
                        <div class="col-6">
                          <div class="request-api">
                            <h6>Saldos do Usuário na Plataforma Liquidex</h6>
                            <hr>
                            endpoint: <strong>/pharaos-gateway/balances</strong><br>
                            method: <strong>POST</strong>
                            <hr>
                            headers:<br>
                            <strong>Authorization</strong>: 'seu secret'
                            <hr>
                            body:<br>
                            <strong>api_key</strong>: 'Sua Api Key',<br>
                          </div>
                        </div>

                        <div class="col-6">
                          <div class="request-api">
                            <h6>Resposta (json)</h6>
                            <hr>
                            <code>
                              {<br>
                              &nbsp;&nbsp;&nbsp;"message": "success",<br>
                              &nbsp;&nbsp;&nbsp;"balances": [<br>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"coin_name": "Bitcoin",<br>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"coin_abbr": "BTC",<br>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"balance": "1.003341346500000000",<br>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"fiat_coin_abbr": "BRL",<br>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"fiat_balance": 14496.205540337745<br>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"coin_name": "Litecoin",<br>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"coin_abbr": "LTC",<br>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"balance": "0.400000000000000000",<br>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"fiat_coin_abbr": "BRL",<br>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"fiat_balance": 69.392<br>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>
                              &nbsp;&nbsp;&nbsp;]<br>
                            }<br>
                            </code>
                            <hr>
                            <small>São retornados todos os saldos do usuário juntamento com a conversão de valor para moeda fiat</small>
                          </div>
                        </div>
                      </div>

                      <hr>

                      <div class="row">
                        <div class="col-6">
                          <div class="request-api">
                            <h6>Conversão de Moeda</h6>
                            <hr>
                            endpoint: <strong>/pharaos-gateway/convert</strong><br>
                            method: <strong>POST</strong>
                            <hr>
                            <small>A tx deve ser enviada como parametro no endpoint</small>
                            <hr>
                            body:<br>
                            <strong>api_key</strong>: 'Sua Api Key'<br>
                            <strong>amount</strong>: 'Valor para converter' (Ex.: 700.00)<br>
                            <strong>coin</strong>: 'Abbr da moeda para converter' (Ex.: 'BTC')
                          </div>
                        </div>

                        <div class="col-6">
                          <div class="request-api">
                            <h6>Resposta (json)</h6>
                            <hr>
                            <code>
                              {<br>
                              &nbsp;&nbsp;&nbsp;"message": "success",<br>
                              &nbsp;&nbsp;&nbsp;"amount_request": 700,<br>
                              &nbsp;&nbsp;&nbsp;"coin_wallet": "BRL",<br>
                              &nbsp;&nbsp;&nbsp;"amount_result": 0.04852309560713483,<br>
                              &nbsp;&nbsp;&nbsp;"fiat_wallet": "BRL",<br>
                              &nbsp;&nbsp;&nbsp;"has_balance": false<br>
                              }
                            </code>
                            <hr>
                            <small>O parametro 'has_balance' mostra se o usuário possui saldo suficiente na moeda convertida</small>
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

      </div>
    </div>
    <div class="display-type"></div>

    <pin v-show="isPinVisible" ref="pinComponent"
               @close-pin-modal="closePinModal" @pin-data="handlePinData"/>
  </div>
</template>

<script>
  import Menubar from '../../menu/Menubar'
  import Topbar from '../../menu/Topbar'
  import Sidebar from '../../menu/Sidebar'
  import Pin from './../../verifications/Pin'
  import {mapGetters} from 'vuex'

  export default {
    name: "UserGateway",
    data() {
      return {
        base_url: process.env.API_ROOT,
        loader: true,
        isFormNewPaymentVisible: false,
        isApiDataVisible: true,
        isFormGenerateVisible: false,
        isFormUpdateVisible: false,
        isRecentKey: false,
        isPinVisible: false,
        key: {
          api_key: null,
          ip: null,
          secret: '************',
          wallet_abbr: '...',
          ip_front: '...'
        },
        count: null,
        newKey: {
          ip: null,
          action: 12
        },
        newPayment: {
          amount: 1
        },
        token: {
          pin: null
        },
        count_payments: 0,
      }
    },
    methods: {
      showFormGenerate() {
        this.isFormGenerateVisible = true
      },
      showFormUpdate() {
        this.isFormUpdateVisible = true
        this.isApiDataVisible = false
        this.isRecentKey = false
        this.newKey.ip = this.key.ip
      },
      closeFormUpdate() {
        this.isFormUpdateVisible = false
        this.isApiDataVisible = true
        this.newKey.ip = null
      },
      retrieveKey() {
        this.$store.dispatch('retrievePharaosGatewayKey', this.conversor)
          .then(response => {
            if (response.data.count > 0) {
              this.key.api_key = response.data.key.api_key
              this.key.ip = response.data.key.ip
              this.key.wallet_abbr = response.data.key.wallet_abbr
              this.key.ip_front = response.data.key.ip_front
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
      storeKey() {
        this.$store.dispatch('storePharaosGatewayKey', {
          ip: this.newKey.ip,
          pin: this.token.pin,
          action: this.newKey.action
        })
          .then(this.$toasted.show('gerando chave...', {position: 'bottom-left', type: 'info'}).goAway(3000))
          .then(response => {
            this.key.api_key = response.data.key.api_key
            this.key.secret = response.data.key.secret
            this.key.ip = response.data.key.ip
            this.count = 1
            this.isFormGenerateVisible = false
            this.isRecentKey = true
          })
          .catch(error => {
            if (error.response) {
              this.handleErrors(error.response)
            }
          })
        this.resetPin()
      },
      updateKey() {
        this.$store.dispatch('updatePharaosGatewayKey', {
          ip: this.newKey.ip,
          pin: this.token.pin,
          action: this.newKey.action
        })
          .then(this.$toasted.show('atualizando sua chave...', {position: 'bottom-left', type: 'info'}).goAway(3000))
          .then(response => {
            this.key.api_key = response.data.key.api_key
            this.key.secret = response.data.key.secret
            this.key.ip = response.data.key.ip
            this.count = 1
            this.isFormUpdateVisible = false
            this.isRecentKey = true
            this.isApiDataVisible = true
          })
          .catch(error => {
            if (error.response) {
              this.handleErrors(error.response)
            }
          })
        this.resetPin()
      },
      resetPin() {
        this.token.pin = null
        this.$refs.pinComponent.resetData()
      },
      showPinModal(method) {
        this.isPinVisible = true
        this.$refs.pinComponent.setData(method)
      },
      closePinModal() {
        this.isPinVisible = false;
      },
      handlePinData(data) {
        this.token.pin = data.pin
        if (data.method === 'storeKey') {
          this.storeKey()
        }
        if (data.method === 'updateKey') {
          this.updateKey()
        }
      },
    },
    mounted() {
      this.retrieveKey()
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
      Pin,
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

  .request-api {
    padding: 15px 20px;
    background-color: #f3f3f7;
    border-radius: 6px;
  }

</style>
