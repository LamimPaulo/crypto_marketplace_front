<template>
  <div class="element-wrapper">
    <div class="loader" v-if="loader"></div>
    <h6 class="element-header">
      Suas Contas
    </h6>
    <div class="element-box">
      <table class="table table-clean">
        <tr v-if="loading">
          <td>
            carregando listagem...
          </td>
        </tr>
        <tr v-if="!count&&!loading">
          <td>
            ainda não existem contas cadastradas
          </td>
        </tr>
        <tr v-for="account in accounts">
          <td>
            <div class="value">
              {{ account.nickname }}
            </div>
            <span class="sub-value" v-if="account.category===1">Conta Corrente</span>
            <span class="sub-value" v-else>Conta Poupança</span>
          </td>
          <td class="text-right">
            <div class="value">
              <router-link class="btn btn-sm btn-primary" :to="{ name: 'payment-account', params: { id: account.id }}">alterar</router-link>
            </div>
            <span class="sub-value">{{ account.bank.code + ' - '+ account.bank.name }}</span>
          </td>
        </tr>

      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PaymentAccountsList",
    data() {
      return {
        loader: true,
        accounts: [],
        count: null,
        loading: true
      }
    },
    methods: {
      retrieveAccounts() {
        this.loader = true
        this.$store.dispatch('retrieveAccounts')
          .then(response => {
            this.accounts = response.data.accounts
            this.count = response.data.count
            this.loading = false
            this.loader = false
          })
          .catch(error => {
            this.loading = false
            this.loader = false
          })
      }
    },
    mounted() {
      this.retrieveAccounts()
    }
  }
</script>

<style scoped>

</style>
