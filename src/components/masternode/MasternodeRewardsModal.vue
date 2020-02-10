<template>
  <div>
    <div class="loader" v-if="loader"></div>

    <modal @close="closeModal" v-show="isModalVisible" modal_size="large">

      <template slot="header">
        <h6 class="pull-left mt-1">Recompensas do Endereço</h6>
        <button class="btn btn-grey pull-right mr-1" type="button" @click="closeModal">
          <i class="os-icon os-icon-close"></i>
        </button>
      </template>

      <template slot="body">


        <div class="element-box-tp mb-2">

          <div class="row">
            <div class="col-sm-12">
              <div class="table-responsive">
                <table-transactions-list :transactions="rewards.data"
                                         @retrieve-transactions="get"/>
              </div>

              <pagination :pagination="rewards" @paginate="get()" :offset="4"/>
            </div>
          </div>

        </div>

      </template>

      <template slot="footer">
        <div class="col-12 text-center">
          <button class="btn btn-grey" type="button" @click="closeModal"> Fechar</button>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
  import Modal from './../layouts/Modal'
  import TableTransactionsList from "./../user/transactions/TableTransactionsList";
  import Pagination from "./../layouts/Pagination";

  export default {
    name: "MasternodeRewardsModal",
    data() {
      return {
        isModalVisible: false,
        address: null,
        loader: false,
        rewards: {
          total: 0,
          per_page: 10,
          from: 1,
          to: 0,
          current_page: 1
        },
      }
    },
    methods: {
      get() {
        this.loader = true
        this.$store.dispatch('getMasternodeRewards', {
          address: this.address,
          page: this.rewards.current_page
        })
          .then(response => {
            this.rewards = response.data
            this.loader = false
          })
          .catch(error => {
            if (error.response) {
              this.handleErrors(error.response)
            }
            this.loader = false
          })
      },
      setData(address) {
        this.address = address
        this.get()
        this.isModalVisible = true
      },
      closeModal() {
        this.isModalVisible = false;
      },
    },
    mounted() {

    },
    components: {
      Pagination,
      TableTransactionsList,
      Modal
    }
  }
</script>

<style>
  .modal-body {
    background: #f4f4f4 !important;
  }
</style>
