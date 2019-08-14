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

  export default {
    name: "Token",
    data() {
      return {
        data: {
          code: null,
          action: null,
          method: null
        }
      }
    },
    methods: {
      setData(method, action) {
        this.data.action = action
        this.data.method = method

        this.$store.dispatch('sendMailToken', {
          action: this.data.action
        })
          .then(this.$toasted.show('enviando seu código...', {position: 'bottom-left', type: 'info'}).goAway(5000))
          .then(response => {
            this.$toasted.show(response.data.message, {position: 'bottom-left', type: 'success'}).goAway(3000)
          })
          .catch(error => {
            if (error.response) {
              this.handleErrors(error.response)
            }
          })
      },
      resetToken() {
        this.data.code = null
        this.data.action = null
        this.data.method = null
      },
      sendForm() {
        this.$emit('token-data', this.data)
        this.$emit('close-token-modal')
      },
      closeThisModal() {
        this.$emit('close-token-modal')
      },
    },
    computed: {
      isFilled() {
        return this.data.code
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
  }

  h6 .os-icon {
    color: #047bf8;
  }
</style>
