<template>
  <div>
    <div class="element-wrapper mb-0 pb-0">
      <div class="element-box">

        <div class="element-info">
          <div class="element-info-with-icon">
            <div class="element-info-icon">
              <img alt="" :src="require(`@/assets/img/${wallet.coin.icon}`)">
            </div>
            <div class="element-info-text">
              <h5 class="element-inner-header">
                Transferir {{wallet.coin.shortname}}
              </h5>
              <div class="element-inner-desc">
                preencha os dados solicitados para realizar uma tranferência
              </div>
            </div>
          </div>
        </div>

        <form @submit.prevent="" v-if="user.user_level_id>1">

          <div class="row">

            <div class="col-sm-6 col-md-4 col-lg-4">
              <div class="form-group">
                <label> Quanto quer transferir?</label>

                <vue-numeric class="form-control" v-if="user.country_id===31" placeholder="Valor"
                           :min="0" :max="wallet.balance" :minus="false" :precision="2"
                           v-model="transfer.amount" currency="R$" decimal-separator=","
                           thousand-separator="."></vue-numeric>

                <vue-numeric class="form-control" v-else placeholder="Value"
                           :min="0" :max="wallet.balance" :minus="false" :precision="2"
                           v-model="transfer.amount" currency="$" decimal-separator="."
                           thousand-separator=","></vue-numeric>
              </div>
            </div>

            <div class="col-sm-6 col-md-4 col-lg-4">
              <label> Para:</label>
              <input class="form-control" placeholder="Selecione um beneficiário"
                     :value="account.name" type="text" readonly>
            </div>

            <div class="col-sm-6 col-md-4 col-lg-4">
              <label> &nbsp;</label>
              <input class="form-control" placeholder="Selecione um beneficiário"
                     :value="account.email" type="text" readonly>
            </div>

          </div>

        </form>

        <span class="badge badge-danger-inverted" v-if="user.user_level_id===1">
          É necessário confirmar sua conta para realizar transferências entre contas.
        <a href="/profile">Clique para Confirmar</a></span>

      </div>

    </div>

    <div class="element-wrapper compact pt-4">
      <h6 class="element-header">
        Selecione o Beneficiário
      </h6>
      <div class="element-box-tp">
        <div class="inline-profile-tiles">
          <div class="row">
            <div class="col-sm-6 col-md-4 col-xxl-2">
              <div class="profile-tile profile-tile-inlined">
                <a class="profile-tile-box faded" href="#" @click.prevent="modalFavAccount()">
                  <div class="pt-new-icon">
                    <i class="os-icon os-icon-plus"></i>
                  </div>
                  <div class="pt-user-name">
                    Novo<br><br>
                  </div>
                </a>
              </div>
            </div>

            <div class="col-sm-6 col-md-4 col-xxl-2" v-for="account in accounts">
              <div class="profile-tile profile-tile-inlined">
                <a class="profile-tile-box" href="#" @click.prevent="selectBeneficiary(account)">
                  <div class="pt-avatar-w">
                    <img :src="require(`@/assets/img/avatar-dev.png`)" :alt="account.name"
                         class="avatar">
                  </div>
                  <div class="pt-user-name">
                    {{account.name}}<br>
                    {{account.email}}
                  </div>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="form-buttons-w text-right mb-5">
      <button :disabled='!isFilled' @click.prevent="showTokenPinModal('sendTransfer', 13)"
              class="btn btn-success" type="button"> Enviar
      </button>
    </div>

    <modal v-show="isModalFavAccountVisible" >
      <template slot="header">
        <div class="os-tabs-w">
          <div class="os-tabs-controls os-tabs-complex">
            <ul class="nav nav-tabs">
              <li class="nav-item col-md-12 text-center">
                <a class="nav-link active" href="#">
                  <span class="tab-label">Cadastrar Beneficiário</span>
                </a>
              </li>

            </ul>
          </div>
        </div>
      </template>

      <template slot="body">
        <form @submit.prevent="storeFavAccount()" class="form-fav">
          <div class="form-group row">
            <label class="col-form-label col-sm-2" for="email"> Email</label>

            <div class="col-sm-10">
              <input id="email" class="form-control" type="email" required
                     v-model="beneficiary.email" @input="retrieveSearchEmail">
            </div>

          </div>

          <hr>

          <p v-if="beneficiary.name">Nome: <strong>{{beneficiary.name}}</strong></p>
          <p v-if="beneficiary.email_">Email: <strong>{{beneficiary.email_}}</strong></p>

        </form>
      </template>

      <template slot="footer">
        <div class="col-12 text-center">
          <button class="btn btn-grey" type="button" @click="closeModal"> Fechar</button>
          <button class="btn btn-success" type="submit" @click.prevent="storeFavAccount()"
                  :disabled="!isAccountFilled"> Cadastrar
          </button>
        </div>
      </template>
    </modal>


    <token-pin v-show="isTokenPinVisible" ref="tokenPinComponent"
               @close-token-pin-modal="closeTokenPinModal" @token-data="handleTokenPinData"/>
  </div>

</template>

<script>
  import Vue from 'vue'
  import VueNumeric from 'vue-numeric'
  import TokenPin from './../../verifications/TokenPin'
  import Modal from './../../layouts/Modal'
  import {mapGetters} from 'vuex'
  import debounce from 'lodash/debounce'

  Vue.use(VueNumeric)

  export default {
    name: "FiatSend",
    data() {
      return {
        isTokenPinVisible: false,
        isModalFavAccountVisible: false,
        accounts: {},
        account: [],
        transfer: {
          amount: 0,
          beneficiary: null,
          action: 13
        },
        beneficiary: {
          email: null,
          email_: null,
          name: null,
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
      isFilled() {
        return this.transfer.beneficiary && (this.transfer.amount > 0);
      },
      isAccountFilled() {
        return this.beneficiary.email && this.beneficiary.name && this.beneficiary.email_;
      },
      ...mapGetters([
        'user'
      ]),
    },
    methods: {
      modalFavAccount() {
        this.isModalFavAccountVisible = true
      },
      closeModal() {
        this.isModalFavAccountVisible = false;
      },
      selectBeneficiary(account) {
        this.account = account
        this.transfer.beneficiary = account.email
      },
      sendTransfer() {
        this.$store.dispatch('sendTransfer', {
          amount: this.transfer.amount,
          email: this.transfer.beneficiary,
          code: this.token.code,
          pin: this.token.pin,
          action: this.transfer.action
        })
          .then(
            this.$toasted.show('enviando...', {position: 'bottom-left'}).goAway(3000)
          )
          .then(response => {
            this.$toasted.show(response.data.message, {position: 'bottom-left'}).goAway(3000)
            this.refresh()
          }).catch(error => {
          if (error.response) {
            this.handleErrors(error.response)
          }
        })
      },
      storeFavAccount() {
        this.$store.dispatch('storeFavAccount', this.beneficiary.email)
          .then(response => {
            this.account = response.data.account
            this.transfer.beneficiary = response.data.account.email
            this.beneficiary.name = null
            this.beneficiary.email_ = null
            this.isModalFavAccountVisible = false
            this.retrieveFavAccounts()
          })
          .catch(error => {
            if (error.response) {
              this.handleErrors(error.response)
            }
          })
      },
      retrieveSearchEmail: debounce(function (e) {
        if (this.beneficiary.email) {
          this.$store.dispatch('retrieveSearchEmail', this.beneficiary.email)
            .then(response => {
              this.account = response.data.account
              this.beneficiary.name = response.data.account.name
              this.beneficiary.email_ = response.data.account.email
            })
            .catch(error => {
              if (error.response) {
                this.handleErrors(error.response)
              }
            })
        }
      }, 500),
      retrieveFavAccounts() {
        this.$store.dispatch('retrieveFavAccounts')
          .then(response => {
            this.accounts = response.data.accounts
          })
          .catch(error => {
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
        this.sendTransfer()
      },
    },
    mounted() {
      this.retrieveFavAccounts()
    },

    components: {
      TokenPin,
      Modal,
      VueNumeric
    }
  }
</script>

<style scoped>
  .form-fav {
    min-width: 20vw;
    padding: 1em;
  }
</style>
