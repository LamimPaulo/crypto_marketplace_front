<template>
  <div class="row">
    <div class="col-12">
      <div class="element-box">
        Ordem: <strong> {{ this.$route.params.id }}</strong>
      </div>
    </div>
    <div class="col-12">
      <div class="element-box">
        <h5 class="form-header">
          {{ transaction.type === 1 ? 'Compra de' : 'Venda de' }} {{transaction.coin.abbr}}
        </h5>
        <div class="table-responsive">

          <table class="table table-lightborder">
            <tr>
              <td> Criação</td>
              <td class="text-right"> {{transaction.dateLocal}}</td>
            </tr>
            <tr>
              <td> Transação</td>
              <td class="text-right"> {{transaction.info}}</td>
            </tr>
            <tr>
              <td> Moeda</td>
              <td class="text-right"> {{ transaction.coin.name }}</td>
            </tr>
            <tr>
              <td> Valor</td>
              <td class="text-right"> {{ transaction.amountRounded }}</td>
            </tr>
            <tr>
              <td> Fee</td>
              <td class="text-right"> {{ transaction.feeRounded }}</td>
            </tr>
            <tr>
              <td> Taxas</td>
              <td class="text-right"> {{ transaction.taxRounded }}</td>
            </tr>
            <tr>
              <td> Status</td>
              <td class="text-right"> {{ transaction.statusClient }}</td>
            </tr>
            <tr>
              <td> Atualização</td>
              <td v-if="transaction.status===3" class="text-right"> {{ transaction.updatedLocal }}</td>
              <td v-if="transaction.status!==3" class="text-right"> {{ transaction.timestamp }}</td>
            </tr>

            <tr v-if="loading">
              <td colspan="2">
                carregando a ordem...
              </td>
            </tr>
            <tr v-if="!count&&!loading">
              <td colspan="2">
                a ordem não existe
              </td>
            </tr>
          </table>

        </div>
      </div>
    </div>
  </div>


</template>

<script>
  export default {
    name: "Order",
    data() {
      return {
        transaction: {
          coin: {
            abbr: 'BTC'
          },
          status: 1
        },
        count: null,
        loading: true,
        timer: '',
        orderStatus: 'NEW'
      }
    },
    methods: {
      retrieveOrder() {
        if(this.transaction.status===1) {
          this.$store.dispatch('retrieveOrder', this.$route.params.id)
            .then(response => {
              this.transaction = response.data.order
              this.count = response.data.count
              this.orderStatus = response.data.status
              this.loading = false
            })
            .catch(error => {
              this.count = 0
              this.loading = false
              if (error.response) {
                this.handleErrors(error.response)
              }
            })
        }
      },
    },
    mounted() {
      this.retrieveOrder()
      this.timer = setInterval(function () {
        this.retrieveOrder();
      }.bind(this), 5000);
    },
    beforeDestroy() {
      clearInterval(this.timer)
    }
  }
</script>

<style scoped>

</style>
