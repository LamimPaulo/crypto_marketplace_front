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
              <div class="row">
                <div class="col-md-6 col-sm-12 text-center mobile-none">
                  <br>
                  <pie-chart ref="chartComponent"></pie-chart>
                  <br>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 col-sm-12">
                  <table class="table table-clean table-compact" v-if="fund.coins">
                    <thead>
                    <tr>
                      <th></th>
                      <th>Moeda</th>
                      <th>Compõe</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(coin, i) in fund.coins">
                      <td><span :class="'marker-left color-' + i">{{coin.coin.symbol}}</span></td>
                      <td>{{coin.coin.abbr}}</td>
                      <td>{{coin.percent}} %</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
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
