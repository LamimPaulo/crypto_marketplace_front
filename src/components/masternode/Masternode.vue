<template>
  <div>
    <vue-headful title="Masternode" description="Liquidex"/>
    <div class="loader" v-if="loader"></div>

    <div class="content-box">

      <div class="element-box mb-5">

        <div class="alert alert-warning" v-if="pending_plans||pending_masternodes">
          Existem um ou mais pagamentos pendentes para liberação das recompensas, para regularizar
          <a href="#" @click="showPendingPlans">clique aqui.</a>
        </div>

        <div class="alert alert-info">
          Caros usuários, <br>
          A partir do dia 15/02 estaremos com nosso sistema de masternodes completo.
          Aguardem as novidades.
        </div>

        <div class="padded m-b">
          <div class="centered-header"><h6>Masternode PIN FOUNDER</h6></div>
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
                <div class="value size-5">{{ info.mynodes }} (mín. 3)</div>
              </div>
            </div>
          </div>
        </div>
        <div class="padded m-b">
          <div class="centered-header"><h6>Realizações</h6></div>
          <div class="os-progress-bar primary">
            <div class="bar-labels">
              <div class="bar-label-left"><span>Progresso: </span><span
                class="positive">{{ info.mynodes }} de 3 ativos</span>
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

      <masternode-data-modal ref="dataModalComponent" @refresh="get"/>

      <masternode-rewards-modal ref="rewardsModalComponent"/>

      <masternode-pending-payment-modal ref="pendingPaymentModalComponent"/>

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
                          @click.prevent="setModalData('show',masternode)">
                    <i class="os-icon os-icon-search"></i></button>

                  <button class="btn btn-rounded btn-sm btn-primary"
                          v-else
                          @click.prevent="setModalData('activate',masternode)">
                    <i class="os-icon os-icon-search"></i></button>
                </td>
                <td> {{ masternode.createdLocal }}</td>
                <td> {{ masternode.fee_address }}</td>

                <td v-if="masternode.status > 2">
                  <button class="btn btn-rounded btn-sm btn-primary"
                          @click.prevent="setRewardModalData(masternode.fee_address)">
                    <i class="os-icon os-icon-search"></i></button>
                </td>
                <td v-else> -</td>

                <td>
                  <span :class="'badge badge-' + masternode.statusColor">
                    {{masternode.statusName}}
                  </span>
                </td>
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
  import MasternodeDataModal from "./MasternodeDataModal";
  import MasternodeRewardsModal from "./MasternodeRewardsModal";
  import MasternodePendingPaymentModal from "./MasternodePendingPaymentModal";


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
        info: {
          nodes: 1400,
          mynodes: 0,
          rewards: 1400,
          percent: 0,
        },
        pending_plans: false,
        pending_masternodes: false
      }
    },
    methods: {
      showPendingPlans() {
        this.$refs.pendingPaymentModalComponent.showModal()
      },
      setModalData(type, data) {
        this.$refs.dataModalComponent.setData(type, data)
      },
      setRewardModalData(data) {
        this.$refs.rewardsModalComponent.setData(data)
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
      verifyPendingPayments() {
        this.loader = true
        this.$store.dispatch('verifyMasternodePendingPayments')
          .then(response => {
            this.pending_plans = response.data.pending_plans
            this.pending_masternodes = response.data.pending_masternodes
            this.loader = false

            if (this.pending_plans || this.pending_masternodes) {
              this.showPendingPlans()
            }
          })
          .catch(error => {
            if (error.response) {
              this.handleErrors(error.response)
            }
            this.loader = false
          })
      },
    },
    mounted() {
      this.get()
      this.getInfo()
      this.verifyPendingPayments()
    },
    computed: {
      ...mapGetters([
        'user'
      ]),
    },
    components: {
      MasternodePendingPaymentModal,
      MasternodeRewardsModal,
      MasternodeDataModal,
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
