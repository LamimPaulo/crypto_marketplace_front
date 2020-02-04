<template>
  <modal @close="closeModal" v-show="isModalVisible">

    <template slot="header">
      <h6 v-if="processing.id">Ativar Masternode </h6>
      <h6 v-else>Detalhes do Masternode</h6>
    </template>

    <template slot="body">

      <div class="element-wrapper" v-if="(processing.id && processing.status>1) ||masternode.id">


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

  export default {
    name: "MasternodeDataModal",
    data() {
      return {
        isModalVisible: false,
        processing: [],
        masternode: [],
        machine: {
          cpu: '',
          ram: '',
        },
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
    },
    mounted() {

    },
    components: {
      Modal
    }
  }
</script>

<style>
  .modal-dialog {
    max-width: 80% !important;
  }
  .modal-body{
    background: #f4f4f4 !important;
  }
</style>
