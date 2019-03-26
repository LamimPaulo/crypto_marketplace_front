<template>
  <div>
    <div class="loader" v-if="loader"></div>
    <vue-headful title="Minhas Carteiras - Liquidex" description="Liquidex"/>

    <div class="element-wrapper compact pt-4">
      <h6 class="element-header">
        Minhas Carteiras
      </h6>
      <div class="element-box-tp">
        <div class="inline-profile-tiles">
          <div class="row">

            <div class="col-sm-6 col-md-4 col-xxl-2" v-for="wallet in wallets">
              <div class="profile-tile profile-tile-inlined">

                <a class="profile-tile-box" :href="`/wallet/f/${wallet.abbr}`" v-if="!wallet.is_crypto">
                  <div class="pt-avatar-w">
                    <img alt="" :src="require(`@/assets/img/${wallet.icon}`)">
                  </div>
                  <div class="pt-user-name">
                    {{ wallet.name}}<br/>
                    {{ wallet.shortname}} {{ wallet.wallets[0].balance_rounded}}
                  </div>
                </a>

                <a class="profile-tile-box" :href="`/wallet/c/${wallet.abbr}`" v-if="wallet.is_crypto">
                  <div class="pt-avatar-w">
                    <img alt="" :src="require(`@/assets/img/${wallet.icon}`)">
                  </div>
                  <div class="pt-user-name">
                    {{ wallet.name}}<br/>
                    {{ wallet.wallets[0].balance_rounded}}
                  </div>
                </a>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "WalletList",
    data() {
      return {
        wallets: [],
        count: null,
        loader: true,
      }
    },
    methods: {
      retrieveWallets() {
        this.$store.dispatch('retrieveWallets')
          .then(response => {
            this.wallets = response.data.wallets
            this.count = response.data.count
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
      this.retrieveWallets()
    },
  }
</script>

<style scoped>

</style>
