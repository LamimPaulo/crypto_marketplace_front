<template>
  <div>
    <modal>
      <template slot="header">
        <h6>
          <i class="os-icon os-icon-coins-4"></i>
          {{ fund.name }}
        </h6>
      </template>

      <template slot="body">
        <div style="width: 65vw">
          <form>
            <div class="form-group row mb-0 full-width">
              <div class="col-md-6 col-sm-12 text-center mobile-none">
                <br>
                <pie-chart ref="chartComponent"></pie-chart>
                <br>
              </div>
              <div class="col-md-6 col-sm-12">
                <table class="table table-clean table-compact" v-if="fund.coins">
                  <thead>
                  <tr>
                    <th></th>
                    <th>Moeda</th>
                    <th>Compõe</th>
                    <th>Variação</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(coin, i) in fund.coins">
                    <td><span :class="'marker-left color-' + i">{{coin.coin.symbol}}</span></td>
                    <td>{{coin.coin.abbr}}</td>
                    <td>{{coin.percent}} %</td>
                    <td>
                      <div class="badge badge-success" v-if="coin.percentChange > 0">
                        <span>{{coin.percentChange}} %</span>
                        <i class="os-icon os-icon-arrow-up6"></i>
                      </div>

                      <div class="badge badge-primary" v-if="coin.percentChange == 0">
                        <span>{{coin.percentChange}} %</span>
                        <i class="os-icon os-icon-arrow-right6"></i>
                      </div>

                      <div class="badge badge-danger" v-if="coin.percentChange < 0">
                        <span>{{coin.percentChange}} %</span>
                        <i class="os-icon os-icon-arrow-down6"></i>
                      </div>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </form>
        </div>
      </template>
      <template slot="footer">
        <div class="col-12 text-center">
          <button class="btn btn-grey" type="button" @click="closeThisModal"> Fechar</button>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
  import Modal from './../../layouts/Modal'
  import PieChart from './../../charts/PieChart'

  export default {
    name: "DetailedFund",
    props: ['fund'],
    methods: {
      closeThisModal() {
        this.$emit('close-detailed-modal')
      },
      generateChart(fund) {
        this.$store.dispatch('retrieveFundChart', fund)
          .then(response => {
            this.$refs.chartComponent.setData(response.data)
          })
          .catch(error => {
            if (error.response) {
              this.handleErrors(error.response)
            }
          })
      },
    },
    computed: {},
    components: {
      Modal,
      PieChart
    }
  }
</script>

<style scoped>
  h6 {
    padding-top: 15px;
    text-align: center;
    font-size: 1.26rem;
    line-height: 1.25;
  }

  h6 .os-icon {
    color: #047bf8;
  }


</style>
