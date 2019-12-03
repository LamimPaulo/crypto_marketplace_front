<template>
  <div>
    <vue-headful title="Masternode" description="Liquidex"/>
    <div class="loader" v-if="loader"></div>

    <div class="content-box">

      <div class="element-box mb-5">
        <div class="padded m-b">
          <div class="centered-header"><h6>Masternode LQX Mondial Founder</h6></div>
          <div class="row">
            <div class="col-6 b-r b-b">
              <div class="el-tablo centered padded-v-big highlight bigger">
                <div class="label">Recompensas da Rede</div>
                <div class="value size-5">{{ info.rewards }}
                  <small>LQX</small>
                </div>
              </div>
            </div>
            <div class="col-6 b-b">
              <div class="el-tablo centered padded-v-big highlight bigger">
                <div class="label">Meus Nodes</div>
                <div class="value size-5">{{ masternodes.total }} (mín. 3)</div>
              </div>
            </div>
          </div>
        </div>
        <div class="padded m-b">
          <div class="centered-header"><h6>Realizações</h6></div>
          <div class="os-progress-bar primary">
            <div class="bar-labels">
              <div class="bar-label-left"><span>Progresso</span><span class="positive">+ {{ masternodes.total }}</span>
              </div>
              <div class="bar-label-right"><span class="info">{{ info.percent }}/100</span></div>
            </div>
            <div class="bar-level-1" style="width: 100%">
              <div class="bar-level-2" :style="'width:' + (info.percent > 99 ? 100 : info.percent) +'%'">
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="element-wrapper" v-if="(processing.id && processing.status>1) ||masternode.id">
        <h6 v-if="processing.id"> Ativar Masternode <span class="animate-border mt-2 mb-3"></span></h6>
        <h6 v-else> Detalhes do Masternode <span class="animate-border mt-2 mb-3"></span></h6>

        <div class="element-box-tp mb-2">
          <div class="row">
            <div class="col-sm-12 col-md-6">

              <div class="element-wrapper">
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
            </div>

            <div class="col-sm-12 col-md-6">

              <div class="element-wrapper">
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
      </div>

      <div class="alert alert-warning" v-if="processing.id && !processing.status">
        <h6>Atenção</h6>

        <small>Seu servidor está sendo criado no momento, volte mais tarde para verificar a situação.
        </small>
      </div>

      <div class="element-wrapper">
        <h6>
          Meus Masternodes <span class="animate-border mt-2 mb-3"></span>
        </h6>

        <div class="element-box-tp mb-2">
          <div class="row">

            <table class="table table-lightborder table-striped">
              <thead>
              <tr>
                <th></th>
                <th> Solicitado em</th>
                <th> Carteira</th>
                <th> Recompensa</th>
                <th> Status</th>
                <th> Últ. Atualização</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="masternode in masternodes.data">
                <td>
                  <button class="btn btn-rounded btn-sm btn-primary"
                          v-if="masternode.status > 2"
                          @click.prevent="showMasternode(masternode)">
                    <i class="os-icon os-icon-search"></i></button>

                  <button class="btn btn-rounded btn-sm btn-primary"
                          v-else
                          @click.prevent="activateMasternode(masternode)">
                    <i class="os-icon os-icon-search"></i></button>
                </td>
                <td> {{ masternode.createdLocal }}</td>
                <td> {{ masternode.fee_address }}</td>
                <td> {{ masternode.balance }}</td>
                <td><span :class="'badge badge-' + masternode.statusColor">{{masternode.statusName}}</span></td>
                <td> {{ masternode.updatedLocal }}</td>
              </tr>
              </tbody>
            </table>

          </div>
          <pagination :pagination="masternodes" @paginate="get()" :offset="10"/>
        </div>
      </div>

    </div>

  </div>

</template>

<script>
  import {mapGetters} from 'vuex'
  import Pagination from "./../layouts/Pagination";

  export default {
    name: "Masternode",
    data() {
      return {
        loader: false,
        tabclass_invest: 'nav-link active',
        tabclass_draft: 'nav-link',
        masternodes: {
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
        info: {
          nodes: 1400,
          mynodes: 0,
          rewards: 1400,
          percent: 0,
        }
      }
    },
    methods: {
      getRandomNumber(min, max) {
        return Math.random() * (max - min) + min;
      },
      showMasternode(masternode) {
        this.masternode = masternode
        this.processing = []
        this.machine.ram = masternode.status >= 4 ? "0MB / 8GB" : (masternode.status === 2 ? (this.getRandomNumber(1, 5).toFixed(2) + "GB / 8GB") : (this.getRandomNumber(300, 500).toFixed() + 'MB / 8GB'));
        this.machine.cpu = masternode.status >= 4 ? "0MB / 8GB" : (masternode.status === 2 ? this.getRandomNumber(50, 80).toFixed() + "%" : this.getRandomNumber(1, 10).toFixed() + '%');
      },
      activateMasternode(masternode) {
        this.processing = masternode
        this.masternode = []
        this.machine.ram = this.getRandomNumber(300, 500).toFixed() + 'MB / 8GB';
        this.machine.cpu = this.getRandomNumber(1, 10).toFixed() + '%';
      },
      get() {
        this.loader = true
        this.$store.dispatch('getMasternodes', this.masternodes.current_page)
          .then(response => {
            this.loader = false
            this.masternodes = response.data
          })
          .catch(error => {
            if (error.response) {
              this.handleErrors(error.response)
              this.loader = false
            }
          })
      },
      getInfo() {
        this.loader = true
        this.$store.dispatch('getMasternodesInfo')
          .then(response => {
            this.loader = false
            this.info = response.data
          })
          .catch(error => {
            if (error.response) {
              this.handleErrors(error.response)
              this.loader = false
            }
          })
      },
      getProcessing() {
        this.loader = true
        this.$store.dispatch('processingMasternode')
          .then(response => {
            this.loader = false
            this.activateMasternode(response.data)
          })
          .catch(error => {
            if (error.response) {
              this.handleErrors(error.response)
              this.loader = false
            }
          })
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
      scrollToTop() {
        window.scrollTo(0, 600);
      }
    },
    mounted() {
      this.get()
      this.getProcessing()
      this.getInfo()
    },
    computed: {
      ...mapGetters([
        'user'
      ]),
      processing_address() {
        return this.processing.reward_address
      },
      masternode_address() {
        return this.masternode.reward_address
      }
    },
    watch: {
      processing_address: function (val) {
        this.scrollToTop();
      },
      masternode_address: function (val) {
        this.scrollToTop();
      },


    },
    components: {
      Pagination
    }
  }
</script>

<style scoped>
  .size-5 {
    font-size: 20px !important;
    padding: 0 !important;
    margin: 0 !important;
  }
</style>
