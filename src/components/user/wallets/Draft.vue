<template>
  <div class="element-wrapper mb-0 pb-0">
    <div class="element-box">

      <div class="element-info">
        <div class="element-info-with-icon">
          <div class="element-info-icon">
            <img alt="" :src="require(`@/assets/img/${wallet.coin.icon}`)">
          </div>
          <div class="element-info-text">
            <h5 class="element-inner-header">
              Saque {{wallet.coin.shortname}}
            </h5>
            <div class="element-inner-desc">
              preencha os dados solicitados para realizar um pedido de saque da sua carteira
            </div>
          </div>
        </div>
      </div>

      <form @submit.prevent="sendDraft" v-if="user.user_level_id>1">
        <div class="row">
          <div class="col-sm-6 col-md-8 col-lg-8">
            <div class="row">
              <div class="col-12">
                  <label> Selecione a conta de destino:</label>
              </div>
              <div class="col-sm-12 col-md-12 col-lg-6" v-for="account in accounts">
                <div class="profile-tile">
                  <div class="profile-tile-meta">
                    <ul>
                      <li>
                        <label class="hidden">
                          <input class="form-check-input" name="user_account_id" type="radio"
                                 v-model="draft.user_account_id" :value="account.id">
                        </label>
                        <strong>{{account.nickname}}</strong>
                      </li>

                      <li v-if="account.type==2">
                        Email:<strong>{{account.email}}</strong>
                      </li>

                      <li v-if="account.type==1">
                        <strong>{{account.bank.name}}</strong>
                      </li>


                    </ul>
                    <div class="pt-btn">
                      <button type="button" class="btn btn-grey btn-sm"
                              v-if="draft.user_account_id !== account.id"
                              @click="draft.user_account_id = account.id">
                        Selecionar
                      </button>
                      <button type="button" class="btn btn-success btn-sm"
                              v-if="draft.user_account_id === account.id"
                              @click="draft.user_account_id = account.id">
                        Selecionado
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-md-4 col-lg-4" v-if="draft.user_account_id">
            <div class="col-12">
              <div class="form-group">
                <label> Quanto quer sacar?</label>

                <vue-numeric class="form-control" v-if="user.country_id===31" placeholder="Valor"
                             :min="0" :max="wallet.balance" :minus="false" :precision="2"
                             @input="retrieveDraftTax" v-model="draft.amount" currency="R$" decimal-separator=","
                             thousand-separator="."></vue-numeric>

                <vue-numeric class="form-control" v-else placeholder="Value"
                             :min="0" :max="wallet.balance" :minus="false" :precision="2"
                             @input="retrieveDraftTax" v-model="draft.amount" currency="$" decimal-separator="."
                             thousand-separator=","></vue-numeric>
              </div>
            </div>
            <div class="col-12">
              <div class="form-group">
                <span>Taxa: </span>
                <input class="form-control" v-model="draft.fee" disabled type="text">
              </div>
            </div>
            <div class="col-12">
              <div class="form-group">
                <span>Ted: </span>
                <input class="form-control" v-model="draft.tax" disabled type="text">
              </div>
            </div>
          </div>

        </div>
        <div class="form-buttons-w text-right">
          <span
            class="pull-left badge badge-primary p-2">Total da Transação: {{ draft.total }} {{wallet.coin.abbr}}</span>
          <button class="btn btn-primary" :disabled='!isFilled' @click.prevent="showTokenPinModal('sendDraft', 1)"
                  type="button"> Solicitar
          </button>
        </div>
      </form>

      <span class="badge badge-danger-inverted" v-if="user.user_level_id===1">É necessário confirmar sua conta para realizar saques.
        <a href="/profile">Clique para Confirmar</a></span>

    </div>

    <token-pin v-show="isTokenPinVisible" ref="tokenPinComponent"
               @close-token-pin-modal="closeTokenPinModal" @token-data="handleTokenPinData"/>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueNumeric from 'vue-numeric'
  import TokenPin from './../../verifications/TokenPin'
  import {mapGetters} from 'vuex'
  import debounce from 'lodash/debounce'

  Vue.use(VueNumeric)

  export default {
    name: "Draft",
    data() {
      return {
        isTokenPinVisible: false,
        accounts: {},
        draft: {
          amount: 0,
          tax: 0,
          fee: 0,
          total: 0,
          user_account_id: null,
          action: 1
        },
        token: {
          code: null,
          pin: null
        },
      }
    },
    props: {
      wallet: {
        coin: {
          name: "-",
          shortname: "-",
          abbr: "-",
          is_crypto: 0,
          icon: "brl_icon.png"
        },
        balance: 0
      },
    },
    computed: {
      ...mapGetters([
        'user'
      ]),
      isFilled() {
        return this.draft.user_account_id && this.draft.total;
      },
    },
    methods: {
      sendDraft() {
        this.$store.dispatch('sendDraft', {
          user_account_id: this.draft.user_account_id,
          amount: this.draft.amount,
          code: this.token.code,
          pin: this.token.pin,
          action: this.draft.action
        })
          .then(
            this.$toasted.show('solicitando...', {position: 'bottom-left'}).goAway(3000)
          )
          .then(response => {
            this.$toasted.show(response.data.message, {position: 'bottom-left'}).goAway(3000)
            setTimeout(function () {
              location.reload()
            }, 3000)
          }).catch(error => {
          if (error.response) {
            this.handleErrors(error.response)
          }
        })
      },
      retrieveAccounts() {
        this.$store.dispatch('retrieveAccounts')
          .then(response => {
            this.accounts = response.data.accounts
          })
          .catch(error => {

          })
      },
      retrieveDraftTax: debounce(function (e) {
        if (this.draft.amount > 0) {
          this.$store.dispatch('retrieveDraftTax', {
            user_account_id: this.draft.user_account_id,
            amount: this.draft.amount,
          })
            .then(response => {
              this.draft.fee = response.data.fee
              this.draft.tax = response.data.tax
              this.draft.total = response.data.total
            }).catch(error => {
            if (error.response) {
              this.handleErrors(error.response)
            }

          })
        }
      }, 500),
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
        this.sendDraft()
      },

    },
    mounted() {
      this.retrieveAccounts()
    },

    components: {
      TokenPin,
      VueNumeric
    }
  }
</script>

<style scoped>

</style>
