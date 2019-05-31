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
                        Gateway de pagamentos
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

                          <div class="value mb-2" v-if="count"><strong>IP de Acesso:</strong> {{ key.ip_front }}</div>

                          <div class="value" v-if="count"><strong>Carteira Recebimento:</strong> {{ key.wallet_abbr }}
                          </div>

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

                        <div class="col-sm-6 col-lg-6">
                          <div class="form-group">
                            <label> Como deseja receber seus pagamentos?</label>
                            <select class="form-control" v-model="newKey.payment_coin">
                              <option value="1" selected> Carteira Crypto</option>
                              <option value="2" v-if="user.country_id===31"> Carteira BRL</option>
                              <option value="2" v-if="user.country_id!==31"> USD Wallet</option>
                            </select>
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

                        <div class="col-sm-6 col-lg-6">
                          <div class="form-group">
                            <label> Como deseja receber seus pagamentos?</label>
                            <select class="form-control" v-model="newKey.payment_coin">
                              <option value="1" selected> Carteira Crypto</option>
                              <option value="2" v-if="user.country_id===31"> Carteira BRL</option>
                              <option value="2" v-if="user.country_id!==31"> USD Wallet</option>
                            </select>
                          </div>
                          <div class="form-desc">
                            * O recebimento por BTC gera adicionalmente uma taxa de acordo com seu nível
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
                            <h6>Novo Pagamento</h6>
                            <hr>
                            endpoint: <strong>/payments/new</strong><br>
                            method: <strong>POST</strong>
                            <hr>
                            headers:<br>
                            <strong>Authorization</strong>: 'seu secret'
                            <hr>
                            body:<br>
                            <strong>api_key</strong>: 'Sua Api Key',<br>
                            <strong>amount</strong>: 'Valor do Pagamento' (Ex.: 1200.00)
                          </div>
                        </div>

                        <div class="col-6">
                          <div class="request-api">
                            <h6>Resposta (json)</h6>
                            <hr>
                            <code>
                              { <br>
                              &nbsp;&nbsp;&nbsp;"payment": "9dae9917-3edd-4e05-a87c-5009efb5af7c"<br>
                              }
                            </code>
                            <hr>
                            <small>Uma tx de identificação é retornada para consulta posterior</small>
                          </div>
                        </div>
                      </div>

                      <hr>

                      <div class="row">
                        <div class="col-6">
                          <div class="request-api">
                            <h6>Status do Pagamento</h6>
                            <hr>
                            endpoint: <strong>/payments/status/{tx}</strong><br>
                            method: <strong>GET</strong>
                            <hr>
                            <small>A tx deve ser enviada como parametro no endpoint</small>
                            <hr>
                            body:<br>
                            <strong>api_key</strong>: 'Sua Api Key'
                          </div>
                        </div>

                        <div class="col-6">
                          <div class="request-api">
                            <h6>Resposta (json)</h6>
                            <hr>
                            <code>
                              {<br>
                              &nbsp;&nbsp;&nbsp;"message": "success",<br>
                              &nbsp;&nbsp;&nbsp;"payment": {<br>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "address":
                              "2be92e1c-42fe-4d41-84c7-099bd315654b",<br>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "amount": "0.01023671",<br>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "received": "0.00000000",<br>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "tx": "34fa3a56-7222-4559-b93e-3ed49b36a545",<br>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "txid": "",<br>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "confirmations": 0,<br>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "created_at": "2019-01-07 17:21:32",<br>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "updated_at": "2019-01-07 17:21:32",<br>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "time_limit": "2019-01-07 16:21:32",<br>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "statusName": "NEW",<br>
                              &nbsp;&nbsp;&nbsp;}<br>
                              }
                            </code>
                            <hr>
                            <small>O parametro 'time_limit' mostra a data e horário máximos de pagamento</small>
                          </div>
                        </div>
                      </div>

                      <hr>

                      <div class="row">
                        <div class="col-6">
                          <div class="request-api">
                            <h6>Lista dos Pagamentos</h6>
                            <hr>
                            endpoint: <strong>/payments/list?page={page}</strong><br>
                            method: <strong>GET</strong>
                            <hr>
                            <small>o número da pagina deve ser enviado na query string do endpoint</small>
                            <hr>
                            body:<br>
                            <strong>api_key</strong>: 'Sua Api Key'
                          </div>
                        </div>

                        <div class="col-6">
                          <div class="request-api">
                            <h6>Resposta (json)</h6>
                            <hr>
                            <code>
                              {
                              "current_page": 1,
                              "data": [<br>
                              &nbsp;&nbsp;&nbsp;{<br>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "address":"34fa3a56-7222-4559-b93e-3ed49b36a545",<br>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "amount": "0.01023671",<br>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "received": "0.00000000",<br>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "tx": "34fa3a56-7222-4559-b93e-3ed49b36a545",<br>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "txid": "34fa3a56-7222-4559-b93e-3ed49b36a545",<br>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "confirmations": 0,<br>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "created_at": "2019-01-07 17:21:32",<br>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "updated_at": "2019-01-07 17:21:32",<br>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "time_limit": "2019-01-07 16:21:32",<br>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "statusName": "NEW",<br>
                              &nbsp;&nbsp;&nbsp;}<br>
                              ],<br>
                              "first_page_url": {{base_url}}/payments/list?page=1",<br>
                              "from": 1,<br>
                              "last_page": 2,<br>
                              "last_page_url": {{base_url}}/payments/list?page=2",<br>
                              "next_page_url": {{base_url}}/payments/list?page=2,<br>
                              "path": {{base_url}}/payments/list",<br>
                              "per_page": 10,<br>
                              "prev_page_url": null,<br>
                              "to": 1,<br>
                              "total": 2<br>
                              }

                            </code>
                            <hr>
                            <small>A lista é ordenada por ordem decrescente da data de criação</small><br>
                            <small>São retornados 10 registros por página</small>
                          </div>
                        </div>
                      </div>

                      <hr>

                      <div class="row">
                        <div class="col-6">
                          <div class="request-api">
                            <h6>Gateway</h6>
                            <hr>
                            url: <strong>{{gateway_url}}{tx}</strong><br>
                            <hr>
                            <small>deve ser informada a tx na url</small>

                          </div>
                        </div>

                        <div class="col-6">
                          <div class="request-api">
                            <h6>Resposta (html)</h6>
                            <hr>
                            É mostrada a página de pagamento do gateway<br>
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
        gateway_url: process.env.API_ROOT+'/gateway/tx/',
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
          payment_coin: 1,
          wallet_abbr: '...',
          ip_front: '...'
        },
        count: null,
        newKey: {
          ip: null,
          payment_coin: 1,
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
        this.newKey.payment_coin = this.key.payment_coin
      },
      closeFormUpdate() {
        this.isFormUpdateVisible = false
        this.isApiDataVisible = true
        this.newKey.ip = null
        this.newKey.payment_coin = null
      },
      retrieveKey() {
        this.$store.dispatch('retrieveGatewayKey', this.conversor)
          .then(response => {
            if (response.data.count > 0) {
              this.key.api_key = response.data.key.api_key
              this.key.ip = response.data.key.ip
              this.key.payment_coin = response.data.key.payment_coin
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
        this.$store.dispatch('storeGatewayKey', {
          ip: this.newKey.ip,
          payment_coin: this.newKey.payment_coin,
          pin: this.token.pin,
          action: this.newKey.action
        })
          .then(this.$toasted.show('gerando chave...', {position: 'bottom-left'}).goAway(3000))
          .then(response => {
            this.key.api_key = response.data.key.api_key
            this.key.secret = response.data.key.secret
            this.key.ip = response.data.key.ip
            this.key.payment_coin = response.data.key.payment_coin
            this.key.wallet_abbr = response.data.key.wallet_abbr
            this.key.ip_front = response.data.key.ip_front
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
        this.$store.dispatch('updateGatewayKey', {
          ip: this.newKey.ip,
          payment_coin: this.newKey.payment_coin,
          pin: this.token.pin,
          action: this.newKey.action
        })
          .then(this.$toasted.show('atualizando sua chave...', {position: 'bottom-left'}).goAway(3000))
          .then(response => {
            this.key.api_key = response.data.key.api_key
            this.key.secret = response.data.key.secret
            this.key.ip = response.data.key.ip
            this.key.payment_coin = response.data.key.payment_coin
            this.key.wallet_abbr = response.data.key.wallet_abbr
            this.key.ip_front = response.data.key.ip_front
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
