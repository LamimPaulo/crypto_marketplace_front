<template>
  <div class="post-box">

    <div class="post-media phone-verify"></div>

    <fieldset class="post-content form-group">

      <legend v-if="phone_group" @click.prevent="phone_group=false">
        <span class="pull-left">Verificação de Telefone</span>
        <span class="pull-right"><i class="os-icon os-icon-arrow-down2"></i></span>
      </legend>
      <legend v-if="!phone_group" @click.prevent="phone_group=true">
        <span class="pull-left">Verificação de Telefone</span>
        <span class="pull-right"><i class="os-icon os-icon-arrow-right3"></i></span>
      </legend>
      <div class="row" v-if="phone_group">
        <div class="col-sm-6">
          <div class="form-group">
            <form @submit.prevent="updatePhone" id="updatePhone">
              <label for="phone"> Telefone
                <span v-if="user.phone_verified_at" class="badge badge-success">Verificado</span>
                <span v-if="!user.phone_verified_at" class="badge badge-danger">Não verificado</span>
              </label>
              <input class="form-control" placeholder="Telefone" required="required" type="text"
                     id="phone" v-model="user.phone">
            </form>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group">
            <form @submit.prevent="validatePhone" id="validatePhone">
              <label> Digite o Token de Verificação:</label>
              <input class="form-control" placeholder="Seu código recebido" required="required"
                     type="text" id="code" v-model="code">
            </form>
          </div>
        </div>
      </div>

      <div class="form-buttons-w" v-if="phone_group">
        <button class="btn btn-grey pull-left" type="button" @click.prevent="phone_group=false">
          Cancelar
        </button>
        <button class="btn btn-primary" form="updatePhone" type="submit" v-if="!codigo"> Enviar Verificação
        </button>

        <button class="btn btn-success pull-right" form="validatePhone" type="submit" :disabled="!code">
          Confirmar e Atualizar
        </button>

      </div>

      <div class="form-desc pb-0 mb-0" v-if="!phone_group&&user.phone_verified_at"
           @click.prevent="phone_group=true"><em>clique para atualizar seu telefone</em></div>
      <span v-if="!phone_group&&!user.phone_verified_at" @click.prevent="phone_group=true"
            class="badge badge-danger">você ainda não verificou seu número de telefone</span>

    </fieldset>
  </div>
</template>

<script>

  export default {
    name: "PhoneVerify",
    props: ['user'],
    data() {
      return {
        phone_group: false,
        isTokenPinVisible: false,
        token: {
          code: null,
          pin: null
        },
        codigo: false,
        code: null,
      }
    },
    methods: {
      updatePhone() {
        this.$store.dispatch('updatePhone', {
          phone: this.user.phone
        })
          .then(this.$toasted.show('enviando mensagem para seu telefone...', {position: 'bottom-left'}).goAway(5000))
          .then(response => {
            this.$toasted.show(response.data.message, {position: 'bottom-left'}).goAway(3000)
          })
          .catch(error => {
            if (error.response) {
              this.handleErrors(error.response)
            }
          })
      },
      validatePhone() {
        this.$store.dispatch('validatePhone', {
          code: this.code
        })
          .then(this.$toasted.show('verificando seu código...', {position: 'bottom-left'}).goAway(5000))
          .then(response => {
            this.$toasted.show(response.data.message, {position: 'bottom-left'}).goAway(3000)
            this.refresh()
          })
          .catch(error => {
            if (error.response) {
              this.codigo = true
              this.handleErrors(error.response)
            }
          })
      },
    },
  }
</script>

<style scoped>
  .form-desc, legend {
    cursor: pointer;
  }

  .form-desc {
    border-bottom: none;
  }

  .phone-verify {
    background-image: url(../../../assets/img/icons/phone-verify.png);
    background-size: 80px;
    background-repeat: no-repeat;
  }
</style>
