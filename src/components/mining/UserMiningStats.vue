<template>
  <div>
    <vue-headful title="Status Mineração" description="Navi Capital"
    />
    <div class="content-box">
      <div class="loader" v-if="loader"></div>

      <div class="row">

        <div class="col-12 mb-2" v-if="gateway.count>0">
          <span class="alert alert-warning block">Você possui um pagamento pendente via Gateway. <a
            href="javascript:void()" @click.prevent="openGateway(gateway.payment.tx)">Clique aqui</a> para realizar o pagamento.</span>
        </div>
      </div>
      <div class="row">

        <div class="col-sm-12 col-md-12 col-xl-12 col-xxl-6">
          <div class="element-wrapper">
            <div class="element-actions d-sm-block">
              <a class="btn btn-success btn-sm" href="#" @click.prevent="showModal()">
                <i class="os-icon os-icon-ui-22"></i><span> Contratar</span>
              </a>
            </div>
            <h6 class="element-header">
              Mineração
            </h6>
            <div class="element-content">
              <div class="tablo-with-chart">
                <div class="row">

                  <div class="col-sm-6">
                    <!--START - Chart Box-->
                    <div class="element-box">
                      <div class="el-tablo bigger highlight bold-label">
                        <div class="pull-left">
                          <div class="value">
                            {{ plan_user.ths_quota }} Th/s
                          </div>
                          <div class="label">
                            Hash Rate Contratado
                          </div>
                        </div>
                        <div class="pull-right">
                          <img alt="" width="60vw" :src="require(`@/assets/img/asic.png`)">
                        </div>
                        <div class="clearfix"></div>
                      </div>
                    </div>
                    <div class="row">

                      <div class="col-sm-12 col-md-6">
                        <a class="element-box el-tablo centered trend-in-corner padded bold-label" href="#">
                          <div class="value">
                            {{ pool.round_duration }}
                          </div>
                          <div class="label">
                            Duração da Rodada
                          </div>
                        </a>
                      </div>
                      <div class="col-sm-6">
                        <a class="element-box el-tablo centered trend-in-corner padded bold-label" href="#">
                          <div class="value">
                            {{ reward_estimate }}
                          </div>
                          <div class="label">
                            Total do Dia
                          </div>
                        </a>
                      </div>
                    </div>
                    <!--END - Chart Box-->
                  </div>

                  <div class="col-sm-6">
                    <div class="tablos">
                      <div class="row">
                        <div class="col-sm-6">
                          <a class="element-box el-tablo centered trend-in-corner padded bold-label" href="#">
                            <div class="value">
                              {{ workers.alive }}
                            </div>
                            <div class="label">
                              Workers
                            </div>
                            <div class="trending trending-up">
                              <span>Online</span><i class="os-icon os-icon-arrow-up2"></i>
                            </div>
                          </a>
                        </div>
                        <div class="col-sm-6">
                          <a class="element-box el-tablo centered trend-in-corner padded bold-label" href="">
                            <div class="value">
                              0
                            </div>

                            <div class="label">
                              Workers
                            </div>
                            <div class="trending trending-down">
                              <span>Down</span><i class="os-icon os-icon-arrow-down"></i>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-6">
                          <a class="element-box el-tablo centered trend-in-corner padded bold-label" href="#">
                            <div class="value">
                              {{ confirmed_reward }}
                            </div>
                            <div class="label">
                              Confirmados
                            </div>
                            <div class="trending trending-up">
                              <span>Recompensas</span>
                            </div>
                          </a>
                        </div>
                        <div class="col-sm-6">
                          <a class="element-box el-tablo centered trend-in-corner padded bold-label" href="#">
                            <div class="value">
                              {{ unconfirmed_reward }}
                            </div>
                            <div class="label">
                              Não confirmadas
                            </div>
                            <div class="trending trending-unconfirmed">
                              <span>Recompensas</span>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                <div class="row">
                  <div class="col-12">
                    <div class="element-box el-tablo centered padded">
                      <div class="os-progress-bar primary">
                        <div class="bar-labels">
                          <div class="bar-label-left">
                            <a href="https://en.wikipedia.org/wiki/Cumulative_distribution_function"
                               target="_blank" class="bigger">CDF</a>
                          </div>
                          <div class="bar-label-right">
                            <span class="info">{{ pool.shares_cdf}} %</span>
                          </div>
                        </div>
                        <div class="bar-level-1" style="width: 100%">
                          <div class="bar-level-2" :style="'width:' + pool.shares_cdf +'%'">
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

        <div class="col-sm-12 col-md-12  col-xl-12 col-xxl-6">
          <div class="element-wrapper">
            <h6 class="element-header">
              Recompensas
            </h6>
            <div class="element-box-tp">
              <div class="table-responsive">
                <table class="table table-padded">
                  <thead>
                  <tr>
                    <th class="text-center"><i class="os-icon os-icon-bar-chart"></i> Bloco</th>
                    <th class="text-center"><i class="os-icon os-icon-calendar-time"></i> Tempo</th>
                    <th class="text-center"><i class="os-icon os-icon-coins-4"></i> Recompensa</th>
                    <th class="text-center"><i class="os-icon os-icon-check-circle"></i> Confirmação</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="block in blocks">
                    <td>
                      <a :href="'https://www.blockchain.com/btc/block/' + block.hash" target="_blank">{{ block.block
                        }}</a>
                    </td>
                    <td>{{ block.diff }}</td>
                    <td>{{ ((block.reward * profit) / plan.ths_total) * plan_user.ths_quota | fixValue }}</td>
                    <td>{{ block.confirmations }}%</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>


        </div>

      </div>

      <div class="row">
        <div class="col-12">
          <div class="element-box el-tablo centered padded">
            <highcharts :options="chartOptions"></highcharts>
          </div>
        </div>
      </div>

      <modal v-show="isModalVisible">
        <template slot="header">
          <div class="os-tabs-w">
            <div class="os-tabs-controls os-tabs-complex">
              <ul class="nav nav-tabs">
                <li class="nav-item col-md-12 text-center">
                  <a class="nav-link active" href="#">
                    <span class="tab-label">Contratar Th/s</span>
                  </a>
                </li>

              </ul>
            </div>
          </div>
        </template>

        <template slot="body">
          <form @submit.prevent="sendBuyThs">
            <div class="form-group row">
              <label class="col-form-label col-sm-2 offset-1" for="buyQuantity"> Quantidade</label>
              <div class="col-sm-4">
                <div class="input-group">
                  <input id="buyQuantity" class="form-control" type="number" required
                         v-model="orderBuy.ths_quantity" @input="calcTotal()" min="0" :max="quotas_remaining">
                  <div class="input-group-append">
                    <div class="input-group-text">
                      Th/s
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-2">
                <div class="input-group">
                  <div class="input-group-append">
                    <div class="input-group-text">
                      {{quotas_remaining}} restantes
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr>

            <div class="form-group row">
              <div v-if="user.country_id===31" class="col-sm-4 offset-2">
                <label for="buyMarket"> Preço</label>
                <div class="input-group">
                  <input id="buyMarket" class="form-control" type="text"
                         v-model="plan.thsQuotaPriceBrl" required disabled>
                  <div class="input-group-append">
                    <div class="input-group-text">
                      R$
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="user.country_id===31" class="col-sm-4">
                <label for="buyTotal"> Total</label>
                <div class="input-group">
                  <input id="buyTotal" class="form-control" type="text" :value="totalBrl | currency" disabled>
                  <div class="input-group-append">
                    <div class="input-group-text">
                      R$
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="user.country_id!==31" class="col-sm-4 offset-2">
                <label for="buyMarketUsd"> Price</label>
                <div class="input-group">
                  <input id="buyMarketUsd" class="form-control" type="text"
                         v-model="plan.thsQuotaPriceUsd" required disabled>
                  <div class="input-group-append">
                    <div class="input-group-text">
                      $
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-sm-4" v-if="user.country_id!==31">
                <label for="buyTotalUsd"> Total</label>
                <div class="input-group">
                  <input id="buyTotalUsd" class="form-control" type="text" :value="totalUsd" disabled>
                  <div class="input-group-append">
                    <div class="input-group-text">
                      $
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="form-group row mb-0"  v-if="card_active">
              <div class="col-sm-6 offset-4">
                <div class="pt-btn">
                  <button type="button" class="btn btn-grey btn-md"
                          v-if="orderBuy.payment !== 2"
                          @click="orderBuy.payment = 2">
                    R$
                  </button>
                  <button type="button" class="btn btn-primary btn-md"
                          v-if="orderBuy.payment === 2"
                          @click="orderBuy.payment = 2">
                    R$
                  </button>
                </div>

                <div class="pt-btn">
                  <button type="button" class="btn btn-grey btn-md"
                          v-if="orderBuy.payment !== 1"
                          @click="orderBuy.payment = 1">
                    Carteiras
                  </button>
                  <button type="button" class="btn btn-primary btn-md"
                          v-if="orderBuy.payment === 1"
                          @click="orderBuy.payment = 1">
                    Carteiras
                  </button>
                </div>

              </div>
            </div>

          </form>
        </template>

        <template slot="footer">
          <div class="col-12 text-center">
            <button class="btn btn-grey" type="button" @click="closeModal"> Fechar</button>
            <button class="btn btn-success" type="submit"
                    @click.prevent="showPinModal('sendBuyThs')" :disabled="isFilled"> Contratar
            </button>
          </div>
        </template>
      </modal>

      <pin v-show="isPinVisible" ref="pinComponent"
                 @close-pin-modal="closePinModal" @pin-data="handlePinData"/>

    </div>
  </div>
</template>

<script>

  import {mapGetters} from 'vuex'
  import Vue from 'vue'
  import Modal from './../layouts/Modal';
  import Pin from './../verifications/Pin'
  import HighchartsVue, {Chart} from 'highcharts-vue'

  Vue.use(HighchartsVue)

  export default {
    name: "UserMiningStats",
    data() {
      return {
        loader: true,
        card_active: false,
        chartOptions: {
          title: {
            text: "Histórico de Recompensas"
          },
          series: [{
            data: [
              [2, 3]
            ]// sample data
          }],
          xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
              day: '%e de %b'
            }
          },
          yAxis: {
            title: {
              text: 'Quantidade em BTC'
            }
          },
        },
        isModalVisible: false,
        isPinVisible: false,
        orderBuy: {
          ths_quantity: 1,
          total: 0,
          payment: 1,
          action: 11
        },
        token: {
          pin: null
        },
        pool: {
          unconfirmed_reward: '...',
          rating: '...',
          nmc_send_threshold: '...',
          unconfirmed_nmc_reward: '...',
          estimated_reward: '...',
          hashrate: '...',
          confirmed_nmc_reward: '...',
          send_threshold: '...',
          confirmed_reward: '...'
        },
        plan: {
          name: '...',
          ths_total: 0,
          ths_quota_price: 0,
          thsQuotaPriceUsd: 0,
          thsQuotaPriceBtc: 0,
          thsQuotaPriceBrl: 0
        },
        plan_user: {
          ths_quota: 0,
        },
        workers: {
          alive: 0,
          dead: 0
        },
        reward_estimate: 0,
        unconfirmed_reward: 0,
        confirmed_reward: 0,
        quotas_remaining: 0,
        blocks: {},
        timer: null,
        reward_chart: {},
        profit: 0,
        totalBrl: 0,
        totalUsd: 0,
        totalBtc: 0,
        gateway: {
          payment: null,
          count: 0
        }
      }
    },
    methods: {
      showModal() {
        this.calcTotal()
        this.isModalVisible = true
      },
      closeModal() {
        this.isModalVisible = false;
      },
      openGateway(tx) {
        let routeData = this.$router.resolve({name: 'gateway-tx', params: {tx: tx}});
        window.open(routeData.href, '_blank');
      },
      sendBuyThs() {
        if (this.orderBuy.ths_quantity > 0)
          this.loader = true
        this.$store.dispatch('sendBuyThs', {
          ths_quantity: this.orderBuy.ths_quantity,
          payment: this.orderBuy.payment,
          action: this.orderBuy.action,
          pin: this.token.pin,
        }).then(
          this.$toasted.show('enviando...', {position: 'bottom-left'}).goAway(3000)
        )
          .then(response => {
            if (response.data.tx) {
              let routeData = this.$router.resolve({name: 'gateway-tx', params: {tx: response.data.tx}});
              window.open(routeData.href, '_blank');
            }
            this.$toasted.show(response.data.message, {position: 'bottom-left'}).goAway(3000)
            this.refresh()
          }).catch(error => {
          if (error.response) {
            this.handleErrors(error.response)
            this.resetPin()
          }
          this.loader = false
        })
      },
      resetPin() {
        this.token.pin = null
        this.$refs.pinComponent.resetData()
      },
      refresh() {
        setTimeout(function () {
          location.reload()
        }, 3000)
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

        if (data.method === 'sendBuyThs') {
          this.sendBuyThs()
        }

      },
      calcTotal() {
        this.totalBrl = this.plan.ths_quota_price * this.orderBuy.ths_quantity
        this.totalUsd = this.plan.thsQuotaPriceUsd * this.orderBuy.ths_quantity
        this.totalBtc = this.plan.thsQuotaPriceBtc * this.orderBuy.ths_quantity
      },
      retrieveMiningGatewayPending() {
        this.loader = true
        this.$store.dispatch('retrieveUserMiningGatewayPending')
          .then(response => {
            this.gateway.payment = response.data.payment
            this.gateway.count = response.data.count
            this.loader = false
          })
          .catch(error => {
            if (error.response) {
              this.handleErrors(error.response)
            }
            this.loader = false
          })
      },
      retrieveMiningStats() {
        this.loader = true
        this.$store.dispatch('retrieveUserMiningStats')
          .then(response => {
            this.pool = response.data.pool
            this.plan = response.data.plan
            this.plan_user = response.data.plan_user
            this.blocks = response.data.blocks
            this.reward_estimate = response.data.reward_estimate
            this.unconfirmed_reward = response.data.unconfirmed_reward
            this.confirmed_reward = response.data.confirmed_reward
            this.profit = response.data.profit
            this.quotas_remaining = response.data.quotas_remaining
            this.workers.alive = response.data.workers_alive
            this.workers.dead = response.data.workers_dead
            this.loader = false
          })
          .catch(error => {
            if (error.response) {
              this.handleErrors(error.response)
            }
            this.loader = false
          })
      },
      retrieveRewardChart() {
        this.loader = true
        this.$store.dispatch('retrieveUserRewardChart')
          .then(response => {
            this.chartOptions.series = response.data
            this.loader = false
          })
          .catch(error => {
            if (error.response) {
              this.handleErrors(error.response)
            }
            this.loader = false
          })
      }
    },
    mounted() {
      this.retrieveMiningStats();
      this.retrieveRewardChart();
      this.retrieveMiningGatewayPending();
      this.timer = setInterval(function () {
        this.retrieveMiningStats();
        this.retrieveRewardChart();
        this.retrieveMiningGatewayPending();
      }.bind(this), 60000);
    },
    components: {
      Modal,
      Pin,
      highcharts: Chart
    },
    computed: {
      ...mapGetters([
        'user'
      ]),
      total_workers() {
        return this.workers.alive + this.workers.dead
      },
      isFilled() {
        return this.quotas_remaining <= this.orderBuy.ths_quantity
      }
    },
  }
</script>

<style scoped>
  .el-tablo.bigger .value {
    font-size: 2rem !important;
  }

  .trending-unconfirmed {
    background: #047bf8;
    color: #fff
  }

  .element-wrapper {
    padding-bottom: 0 !important;
  }

  .os-tabs-controls.os-tabs-complex .nav-item .nav-link {
    padding: 30px 50px;
  }

  .nav-item.col-md-12 {
    padding-right: 0px;
    padding-left: 0px;
  }

  form {
    padding: 1.5em;
  }

  .pt-btn {
    float: left;
    margin-top: 5px;
    margin-right: 5px;
  }

</style>
