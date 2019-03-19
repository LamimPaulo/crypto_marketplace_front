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
            <span class="sub-value">{{ account.provider.name }}</span>
          </td>
          <td class="text-right">
            <div class="value">
              <router-link :to="{ name: 'payment-account', params: { id: account.id }}">alterar</router-link>
            </div>
            <span class="sub-value" v-if="account.type==='1'">{{ account.bank.code + ' - '+ account.bank.name }}</span>
            <span class="sub-value" v-if="account.type==='2'">{{ account.email }}</span>
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
