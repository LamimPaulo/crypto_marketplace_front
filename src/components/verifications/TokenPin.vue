<template>
  <div>
    <modal>
      <template slot="header">
        <h6>
          <i class="os-icon os-icon-lock"></i>
          Confirmação de Segurança
        </h6>
      </template>

      <template slot="body">

        <form @submit.prevent="sendForm">
          <div class="form-group row">
            <div class="offset-2"></div>
            <label class="col-form-label col-sm-2"> Token</label>
            <div class="col-sm-6">
              <input class="form-control" type="text" v-model="data.code">
            </div>
          </div>

          <hr>

          <div v-if="user.pin_filled" class="form-group row">
            <div class="offset-2"></div>
            <label class="col-form-label col-sm-2"> PIN</label>
            <div class="col-sm-6">
              <input class="form-control" type="password" v-model="data.pin">
            </div>
          </div>

          <div class="text-center" v-if="!user.pin_filled">
            <span
              class="badge badge-danger">você deve criar um pin para realizar as operações na plataforma</span><br><br>
            <a href="/profile"> Criar um PIN</a>
          </div>

          <div class="row mt-5">
            <div class="col-12 text-center">
              <button class="btn btn-grey" type="button" @click="closeThisModal"> Fechar</button>
              <button class="btn btn-primary" :disabled='!isFilled' type="submit"> Confirmar</button>
            </div>
          </div>

        </form>
      </template>
      <template slot="footer">
        o código de segurança é enviado para seu email
      </template>
    </modal>
  </div>
</template>

<script>
  import Modal from './../layouts/Modal'
  import {mapGetters} from 'vuex'

  export default {
    name: "TokenPin",
    data() {
      return {
        data: {
          code: null,
          action: null,
          method: null,
          pin: null
        }
      }
    },
    methods: {
      setData(method, action) {
        this.data.action = action
        this.data.method = method

        if (this.user.pin_filled) {
          this.$store.dispatch('sendMailToken', {
            action: this.data.action
          })
            .then(this.$toasted.show('enviando seu código...', {position: 'bottom-left'}).goAway(5000))
            .then(response => {
              this.$toasted.show(response.data.message, {position: 'bottom-left'}).goAway(3000)
            })
            .catch(error => {
              if (error.response) {
                this.handleErrors(error.response)
              }
            })
        }
      },
      resetData() {
        this.data.code = null
        this.data.action = null
        this.data.method = null
        this.data.pin = null
      },
      sendForm() {
        this.$emit('token-data', this.data)
        this.$emit('close-token-pin-modal')
      },
      closeThisModal() {
        this.$emit('close-token-pin-modal')
      },
    },
    computed: {
      ...mapGetters([
        'user'
      ]),
      isFilled() {
        return this.data.pin && this.data.code
      }
    },
    components: {
      Modal
    }
  }
</script>

<style scoped>
  h6 {
    padding-top: 15px;
    text-align: center;
    font-size: 1.26rem;
    line-height: 1.25;
    color: #334152 !important;
  }

  h6 .os-icon {
    color: #047bf8;
  }

  .form-control {
    color: #495057 !important;
    background-color: #fff !important;
    background-clip: padding-box;
    border: 2px solid #dde2ec !important;
  }
</style>
