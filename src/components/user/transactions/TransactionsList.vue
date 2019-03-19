<template>
  <div>
    <div class="loader" v-if="loader"></div>
    <vue-headful title="Minhas Transações - Navi Capital" description="Navi Capital"/>

    <div class="element-box">

      <h5 class="form-header">
        Histórico de Transações
      </h5>
      <div class="form-desc"></div>

      <div class="table-responsive">
        <table-transactions-list :transactions="transactions.data"
                                 @retrieve-transactions="retrieveTransactions"></table-transactions-list>
      </div>

      <pagination :pagination="transactions" @paginate="retrieveTransactions()" :offset="10"/>
    </div>
  </div>

</template>

<script>
  import Pagination from './../../layouts/Pagination'

  import TableTransactionsList from './../transactions/TableTransactionsList'

  export default {
    name: "TransactionsList",
    components: {
      Pagination,
      TableTransactionsList
    },
    data() {
      return {
        transactions: {
          total: 0,
          per_page: 10,
          from: 1,
          to: 0,
          current_page: 1
        },
        offset: 10,
        loader: true
      }
    },
    methods: {
      retrieveTransactions() {
        this.loader = true
        this.$store.dispatch('retrieveTransactions', this.transactions.current_page)
          .then(response => {
            this.transactions = response.data
            this.loader = false
          })
          .catch(error => {
            if (error.response) {
              this.handleErrors(error.response)
            }
          })
      },
    },
    mounted() {
      this.retrieveTransactions()
    }
  }
</script>

<style scoped>
  .table-responsive {
    margin-bottom: 2em;
  }
</style>
