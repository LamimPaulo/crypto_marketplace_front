<template>
  <modal @close="closeModal" v-show="isModalVisible" modal_size="large">

    <template slot="header">
      <h6 v-if="processing.id">Ativar Masternode </h6>
      <h6 v-else>Detalhes do Masternode</h6>
    </template>

    <template slot="body">

      <div class="os-tabs-controls os-tabs-complex mb-3">

        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a class="nav-link active" href="#" v-if="tabSelected==='resume'">
              <span class="tab-label">Resumo</span>
            </a>

            <a class="nav-link" href="#" v-else @click="tabSelected='resume'">
              <span class="tab-label">Resumo</span>
            </a>
          </li>

          <li class="nav-item">
            <a class="nav-link active" href="#" v-if="tabSelected==='payments'">
              <span class="tab-label">Mensalidades</span>
            </a>

            <a class="nav-link" href="#" v-else @click="tabSelected='payments'">
              <span class="tab-label">Mensalidades</span>
            </a>
          </li>

          <li class="nav-item">
            <a class="nav-link active" href="#" v-if="tabSelected==='undo'">
              <span class="tab-label">Cancelamento</span>
            </a>

            <a class="nav-link" href="#" v-else @click="tabSelected='undo'">
              <span class="tab-label">Cancelamento</span>
            </a>
          </li>
        </ul>

      </div>

      <div v-if="tabSelected==='resume'">

        <div v-if="(processing.id && processing.status>1) ||masternode.id">


          <div class="element-box-tp mb-2">
            <div class="row">
              <div class="col-sm-12 col-md-6">
                <div class="element-box">
                  <h5 class="element-box-header">Ubuntu Server 18.04</h5>

                  <div class="os-progress-bar primary">
                    <div class="bar-labels">
                      <div class="bar-label-left">
                        <i class="mdi mdi-wan size-5"></i>
                        <span class="bigger">IP</span>
                      </div>
                      <div class="bar-label-right"><span class="info">{{ processing.ip || masternode.ip }}</span></div>
                    </div>
                    <hr>
                  </div>
                  <div class="os-progress-bar primary">
                    <div class="bar-labels">
                      <div class="bar-label-left">
                        <i class="mdi mdi-cpu-64-bit size-5"></i>
                        <span class="bigger">CPU</span>
                      </div>
                      <div class="bar-label-right">
                        <span class="info">1 núcleo ({{ machine.cpu }})</span>
                      </div>
                    </div>
                    <hr>
                  </div>
                  <div class="os-progress-bar primary">
                    <div class="bar-labels">
                      <div class="bar-label-left">
                        <i class="mdi mdi-memory size-5"></i>
                        <span class="bigger">RAM</span>
                      </div>
                      <div class="bar-label-right">
                        <span class="info">{{ machine.ram }}</span>
                      </div>
                    </div>
                    <hr>
                  </div>
                  <div class="os-progress-bar primary">
                    <div class="bar-labels">
                      <div class="bar-label-left">
                        <i class="mdi mdi-harddisk size-5"></i>
                        <span class="bigger">HD</span>
                      </div>
                      <div class="bar-label-right"><span class="info">1.6GB / 10GB</span></div>
                    </div>
                    <hr>
                  </div>
                  <div class="os-progress-bar primary">
                    <div class="bar-labels">
                      <div class="bar-label-left">
                        <i class="mdi mdi-lan size-5"></i>
                        <span class="bigger">Rede</span>
                      </div>
                      <div class="bar-label-right"><span class="info">10/ 100 / 1000</span></div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-sm-12 col-md-6">
                <div class="element-box">
                  <h5 class="element-box-header" v-if="masternode.status===3">Masternode Ativado</h5>
                  <h5 class="element-box-header" v-else>Dados para Ativação</h5>

                  <div class="os-progress-bar primary"
                       v-tooltip.top="'Enviar 1000LQX para este endereço de ativação'"
                       v-if="processing.id&&processing.status>1">
                    <span class="text-info">Endereço de Ativação </span>
                    <br>
                    <div class="bar-labels">
                      <div class="bar-label-left">
                        <span class="bigger">{{ processing.payment_address}}</span>
                      </div>
                      <div class="bar-label-right"><span class="info">
                        <a style="cursor: pointer" @click="copyAddress(processing.payment_address)">copiar</a>
                      </span></div>
                    </div>
                    <hr>
                  </div>

                  <div class="os-progress-bar primary"
                       v-tooltip.top="'Enviar 0.10000LQX para este endereço da fee de ativação'"
                       v-if="processing.id&&processing.status>1">
                    <span class="text-info">Endereço da Fee para Ativação </span><br>
                    <div class="bar-labels">
                      <div class="bar-label-left">
                        <span class="bigger">{{ processing.fee_address}}</span>
                      </div>
                      <div class="bar-label-right"><span class="info">
                        <a style="cursor: pointer" @click="copyAddress(processing.fee_address)">copiar</a>
                      </span></div>
                    </div>
                    <hr>
                  </div>

                  <div class="os-progress-bar primary" v-if="masternode.fee_address">
                    <span class="text-success">Endereço das Recompensas</span><br>
                    <div class="bar-labels">
                      <div class="bar-label-left">
                        <span class="bigger">{{ masternode.fee_address}}</span>
                      </div>
                    </div>
                    <hr>
                  </div>

                  <div class="alert alert-info" v-if="processing.id&&processing.status===2">
                    <h6>Atenção</h6>

                    <small>Para ativar seu masternode você deve enviar 1000LQX para o endereço de ativação.</small>
                    <small>Também deve ser enviado 0.10000LQX para o endereço da Fee de Ativação.</small>
                    <small>Após isso aguardar o processamento da blockchain e em algum tempo seu masternode estará
                      operacional.
                    </small>
                    <br>
                    <small>Se o envio já foi realizado, é necessário aguardar o término da configuração do servidor que
                      se dará automaticamente.
                    </small>
                  </div>

                  <div class="alert alert-success" v-else>
                    <h6>Informação</h6>

                    <small>As recompensas do seu masternode são recebidas automáticamente no endereço acima.
                    </small>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </div>

        <div class="alert alert-warning" v-if="processing.id && !processing.status">
          <h6>Atenção</h6>

          <small>Seu servidor está sendo criado no momento, volte mais tarde para verificar a situação.
          </small>
        </div>

      </div>

      <div v-if="tabSelected==='payments'">
        <div class="table-responsive">

          <table class="table table-lightborder table-striped">
            <thead>
            <tr>
              <th> Criado em</th>
              <th> Masternode</th>
              <th> Validade</th>
              <th> Valor</th>
              <th> Status</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="pp in masternode_plans.data">
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
                {{ pp.statusName }}
              </td>
            </tr>
            </tbody>
          </table>

        </div>
        <pagination :pagination="masternode_plans" @paginate="getMasternodePayments()" :offset="10"/>
      </div>

      <div v-if="tabSelected==='undo'">
        <div class="alert alert-danger" v-if="masternode.status==3 || masternode.status==7">

          <button class="btn btn-danger" type="button"
                  @click.prevent="showTokenPinModal(masternode.id)"> DESFAZER MASTERNODE
          </button>
          <br>
          <br>

          Antes de desfazer este masternode tenha em mente que:<br/>
          <ul>
            <li>Esta ação não pode ser desfeita.</li>

            <li>
              você não receberá mais recompensas apartir do momento do cancelamento do masternode
            </li>

            <li>
              As 1000LQX de custódia serão creditadas em sua carteira na Liquidex
            </li>
          </ul>
          Ao clicar em "DESFAZER MASTERNODE" você declara estar ciente dos itens mencionados acima. Você
          receberá um email de confirmação do cancelamento.

          <token-pin v-show="isTokenPinVisible" ref="tokenPinComponent"
                     @close-token-pin-modal="closeTokenPinModal" @token-data="handleTokenPinData"/>

        </div>
      </div>

    </template>

    <template slot="footer">
      <div class="col-12 text-center">
        <button class="btn btn-grey" type="button" @click="closeModal"> Fechar</button>
      </div>
    </template>
  </modal>
</template>

<script>
  import Modal from './../layouts/Modal'
  import Pagination from "./../layouts/Pagination";
  import TokenPin from "../verifications/TokenPin";


  export default {
    name: "MasternodeDataModal",
    data() {
      return {
        isModalVisible: false,
        masternode_plans: {
          total: 0,
          per_page: 10,
          from: 1,
          to: 0,
          current_page: 1
        },
        processing: [],
        masternode: [],
        machine: {
          cpu: '',
          ram: '',
        },
        isTokenPinVisible: false,
        token: {
          code: null,
          pin: null,
          action: null,
        },
        tabSelected: 'resume',
        undo: null,
      }
    },
    methods: {
      setData(type, data) {
        if (type === 'show') {
          this.showMasternode(data)
        }

        if (type === 'activate') {
          this.activateMasternode(data)
        }

        this.isModalVisible = true
      },
      closeModal() {
        this.isModalVisible = false;
      },
      getRandomNumber(min, max) {
        return Math.random() * (max - min) + min;
      },
      undoMasternode() {
        this.loader = true
        this.$store.dispatch('undoMasternode', {
          id: this.undo,
          code: this.token.code,
          pin: this.token.pin,
          action: this.token.action
        })
          .then(response => {
            this.$toasted.show(response.data.message, {position: 'bottom-left', type: 'success'}).goAway(3000)
            this.isModalVisible = false
            this.$emit('refresh')
          })
          .catch(error => {
            if (error.response) {
              this.handleErrors(error.response)
            }
            this.loader = false
          })
      },
      showMasternode(masternode) {
        this.masternode = masternode
        this.processing = []
        this.machine.ram = masternode.status >= 4 ? "0MB / 8GB" : (masternode.status === 2 ? (this.getRandomNumber(1, 5).toFixed(2) + "GB / 8GB") : (this.getRandomNumber(300, 500).toFixed() + 'MB / 8GB'));
        this.machine.cpu = masternode.status >= 4 ? "0MB / 8GB" : (masternode.status === 2 ? this.getRandomNumber(50, 80).toFixed() + "%" : this.getRandomNumber(1, 10).toFixed() + '%');
        this.getMasternodePayments()
      },
      getMasternodePayments() {
        this.loader = true
        this.$store.dispatch('getMasternodePayments', {
          page: this.masternode_plans.current_page
        })
          .then(response => {
            this.masternode_plans = response.data.masternode_plans
            this.loader = false
          })
          .catch(error => {
            if (error.response) {
              this.handleErrors(error.response)
            }
            this.loader = false
          })
      },
      activateMasternode(masternode) {
        this.processing = masternode
        this.masternode = []
        this.machine.ram = this.getRandomNumber(300, 500).toFixed() + 'MB / 8GB';
        this.machine.cpu = this.getRandomNumber(1, 10).toFixed() + '%';
      },
      copyAddress(address) {
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = address;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
        this.$toasted.show('Copiado!', {position: 'bottom-left', type: 'info'}).goAway(3000)
      },

      resetToken() {
        this.token.code = null
        this.token.pin = null
        this.token.action = null
        this.$refs.tokenPinComponent.resetData()
      },
      showTokenPinModal(masternode) {
        this.token.code = null
        this.token.pin = null
        this.undo = masternode
        this.isTokenPinVisible = true
        this.$refs.tokenPinComponent.setData('', 24)
      },
      closeTokenPinModal() {
        this.isTokenPinVisible = false;
      },
      handleTokenPinData(data) {
        this.token.code = data.code
        this.token.pin = data.pin
        this.token.action = data.action

        this.undoMasternode()

      },
    },
    mounted() {

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
