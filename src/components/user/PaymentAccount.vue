<template>
  <div class="content-box">
    <vue-headful title="Dados de Pagamento - Navi" description="Navi Capital"/>
    <div class="loader" v-if="loader"></div>
    <div class="row">

      <div class="col-sm-6">
        <div class="element-wrapper">
          <div class="element-box">

            <div class="element-info">
              <div class="element-info-with-icon">
                <div class="element-info-icon">
                  <div class="os-icon os-icon-edit"></div>
                </div>
                <div class="element-info-text">
                  <h5 class="element-inner-header">
                    Modificar Conta
                  </h5>
                  <div class="element-inner-desc">
                    você pode modificar ou excluir a conta
                  </div>
                </div>
              </div>
            </div>


            <fieldset class="form-group" v-if="account.type==1">
              <form @submit.prevent="storeAccount">
                <legend><span>Dados da Conta Bancária</span></legend>
                <div class="form-group row">

                  <div class="col-sm-6">
                    <div class="form-check">
                      <label class="form-check-label">
                        <input class="form-check-input" name="account_type" type="radio" value="1"
                               v-model="account.type">Conta Bancária</label>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label> Banco</label>
                      <model-list-select :list="banks" v-model="account.bank_id" option-value="id" option-text="name"
                                         placeholder="buscar banco">
                      </model-list-select>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label for="name">Apelido da Conta</label>
                      <input class="form-control" placeholder="Apelido da Conta" type="text" id="name"
                             v-model="account.nickname"
                      >
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-8">
                    <div class="form-group">
                      <label for="account"> Número</label>
                      <input class="form-control" placeholder="Número da Conta" type="text" id="account"
                             v-model="account.account">
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-group">
                      <label for="account_digit">&nbsp;</label>
                      <input class="form-control" placeholder="Dígito" type="text" id="account_digit"
                             v-model="account.account_digit">
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-sm-8">
                    <div class="form-group">
                      <label for="agency"> Agência</label>
                      <input class="form-control" placeholder="Número da Agência" type="text" id="agency"
                             v-model="account.agency">
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-group">
                      <label for="agency_digit">&nbsp;</label>
                      <input class="form-control" placeholder="Dígito da Agência" type="text" id="agency_digit"
                             v-model="account.agency_digit">
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <label for="observations"> Observações</label>
                  <input class="form-control" placeholder="Observações" type="text" id="observations"
                         v-model="account.observation">
                </div>
                <div class="form-buttons-w text-right">
                  <a href="#" class="btn btn-danger pull-left" @click.prevent="showTokenPinModal('deleteAccount', 9)">
                    Excluir</a>
                  <button class="btn btn-primary" @click.prevent="showTokenPinModal('storeAccount', 9)" type="button">
                    Atualizar
                  </button>
                </div>
              </form>
            </fieldset>

            <fieldset class="form-group" v-if="account.type==2">
              <form @submit.prevent="storeAccount">
                <legend><span>Dados da Conta Online</span></legend>
                <div class="form-group row">

                  <div class="col-sm-6">
                    <div class="form-check">
                      <label class="form-check-label">
                        <input class="form-check-input" name="account_type" type="radio" value="2"
                               v-model="account.type">Pagamentos Online</label>
                    </div>

                  </div>
                </div>

                <div class="row">
                  <div class="col-sm-6">
                    <label for="provider_id">Provedor</label>
                    <select class="form-control" name="provider_id" id="provider_id" v-model="account.provider_id"
                            required>
                      <option v-for="provider in providers" :value="provider.id" selected>{{provider.name}}</option>
                    </select>
                  </div>
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label for="nickname">Apelido da Conta</label>
                      <input class="form-control" placeholder="Apelido da Conta" type="text" id="nickname"
                             v-model="account.nickname"
                      >
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <label for="email">Email do Provedor</label>
                  <input id="email" class="form-control" type="email" value="" v-model="account.email" required>
                </div>

                <div class="form-group">
                  <label for="observations"> Observações</label>
                  <input class="form-control" placeholder="Observações" type="text" id="observations"
                         v-model="account.observation">
                </div>
                <div class="form-buttons-w text-right">
                  <a href="#" class="btn btn-danger pull-left" @click.prevent="showTokenPinModal('deleteAccount', 9)">
                    Excluir</a>
                  <button class="btn btn-primary" @click.prevent="showTokenPinModal('storeAccount', 9)" type="button">
                    Atualizar
                  </button>
                </div>
              </form>

            </fieldset>

          </div>
        </div>
      </div>

      <div class="col-sm-6">
        <payment-accounts-list refs="accountList"></payment-accounts-list>
      </div>

      <token-pin v-show="isTokenPinVisible" ref="tokenPinComponent"
                 @close-token-pin-modal="closeTokenPinModal" @token-data="handleTokenPinData"/>
    </div>

  </div>
</template>

<script>
  import PaymentAccountsList from './PaymentAccountsList'
  import TokenPin from './../verifications/TokenPin'
  import {ModelListSelect} from 'vue-search-select'

  export default {
    name: "PaymentAccount",
    data() {
      return {
        loader: true,
        isTokenPinVisible: false,
        banks: [],
        providers: [],
        account: {
          agency: null,
          account: null,
          agency_digit: null,
          account_digit: null,
          observation: null,
          nickname: null,
          email: null,
          bank_id: 1,
          provider_id: 2,
          type: 1,
        },
        token: {
          code: null,
          pin: null
        },
        accounts: {}
      }
    },
    methods: {
      retrieveAccount() {
        this.loader = true
        this.$store.dispatch('retrieveAccount', this.$route.params.id)
          .then(response => {
            this.account = response.data.account
            this.loader = false
          })
          .catch(error => {
            if (error.response) {
              this.handleErrors(error.response)
            }
            this.loader = false
          })
      },
      storeAccount() {
        this.loader = true
        this.$store.dispatch('updateAccount', {
          agency: this.account.agency,
          account: this.account.account,
          agency_digit: this.account.agency_digit,
          account_digit: this.account.account_digit,
          observation: this.account.observation,
          nickname: this.account.nickname,
          email: this.account.email,
          bank_id: this.account.bank_id,
          provider_id: this.account.provider_id,
          type: this.account.type,
          id: this.$route.params.id,
          action: 9,
          code: this.token.code,
          pin: this.token.pin,
        })
          .then(this.$toasted.show('salvando seus dados...', {position: 'bottom-left'}).goAway(5000))
          .then(response => {
            this.$toasted.show(response.data.message, {position: 'bottom-left'}).goAway(3000)
            this.$router.push({name: 'payment-accounts'})
          })
          .catch(error => {
            if (error.response) {
              this.handleErrors(error.response)
            }
          })
      },
      deleteAccount() {
        this.$store.dispatch('deleteAccount', {
          account: this.$route.params.id,
          action: 9,
          code: this.token.code,
          pin: this.token.pin,
        })
          .then(this.$toasted.show('salvando seus dados...', {position: 'bottom-left'}).goAway(5000))
          .then(response => {
            this.$toasted.show(response.data.message, {position: 'bottom-left'}).goAway(3000)
            this.$router.push({name: 'payment-accounts'})
          })
          .catch(error => {
            if (error.response) {
              this.handleErrors(error.response)
              this.resetToken()
            }
          })
      },
      loadBanks() {
        this.$store.dispatch('retrieveBanks')
          .then(response => {
            this.banks = response.data
            this.loader = false
          }).catch(error => {
          if (error.response) {
            this.handleErrors(error.response)
          }
        })
      },
      loadProviders() {
        this.$store.dispatch('retrievePaymentProviders')
          .then(response => {
            this.providers = response.data
          }).catch(error => {
          if (error.response) {
            this.handleErrors(error.response)
          }
        })
      },
      resetToken() {
        this.token.code = null
        this.token.pin = null
        this.$refs.tokenPinComponent.resetData()
      },
      refresh() {
        setTimeout(function () {
          location.reload()
        }, 3000)
      },
      showTokenPinModal(method, action) {
        this.isTokenPinVisible = true
        this.$refs.tokenPinComponent.setData(method, action)
      },
      closeTokenPinModal() {
        this.isTokenPinVisible = false;
      },
      handleTokenPinData(data) {
        this.token.code = data.code
        this.token.pin = data.pin

        if (data.method === 'deleteAccount') {
          this.deleteAccount()
        }

        if (data.method === 'storeAccount') {
          this.storeAccount()
        }
      },

    },
    components: {
      PaymentAccountsList,
      TokenPin,
      ModelListSelect
    },
    mounted() {
      this.loadBanks()
      this.loadProviders()
      this.retrieveAccount()
    }
  }
</script>

<style scoped>
  .content-box {
    height: 100vh;
  }
</style>
