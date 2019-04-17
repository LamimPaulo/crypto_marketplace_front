<template>
  <div>
    <div class="post-box">

      <div class="post-media psw-change"></div>

      <fieldset class="post-content form-group">
        <legend v-if="password_group" @click.prevent="password_group=false">
          <span class="pull-left">Gerenciamento de Senha</span>
          <span class="pull-right"><i class="os-icon os-icon-arrow-down2"></i></span>
        </legend>
        <legend v-if="!password_group" @click.prevent="password_group=true">
          <span class="pull-left">Gerenciamento de Senha</span>
          <span class="pull-right"><i class="os-icon os-icon-arrow-right3"></i></span>
        </legend>
        <form @submit.prevent="updatePassword" v-if="password_group">
          <div class="form-group">
            <label for="email"> Email</label>
            <input id="email" class="form-control" type="email" value="" :value="user.email" disabled>
          </div>
          <div class="row">
            <div class="col-sm-6">
              <div class="form-group">
                <label for="password"> Senha</label>
                <input class="form-control" data-minlength="6" placeholder="Password" id="password"
                       autocomplete="off"
                       required="required" type="password" v-model="password.password">
              </div>
            </div>
            <div class="col-sm-6">
              <div class="form-group">
                <label for="password_confirmation"> Confirmação da Senha</label>
                <input class="form-control" data-minlength="6" placeholder="Confirmação da senha"
                       autocomplete="off"
                       id="password_confirmation"
                       required="required" type="password" v-model="password.password_confirmation">
              </div>
            </div>
          </div>
          <div class="form-buttons-w text-right">
            <button class="btn btn-grey pull-left" type="button" @click.prevent="password_group=false">
              Cancelar
            </button>
            <button class="btn btn-primary" type="button"
                    @click.prevent="showTokenPinModal('updatePassword', 6)" :disabled="!isPassFilled"> Atualizar
            </button>
          </div>
        </form>

        <div class="form-desc pb-0 mb-0" v-if="!password_group" @click.prevent="password_group=true"><em>clique
          para modificar sua senha</em></div>
      </fieldset>
    </div>
    <token-pin v-show="isTokenPinVisible" ref="tokenPinComponent"
               @close-token-pin-modal="closeTokenPinModal" @token-data="handleTokenPinData"/>
  </div>
</template>

<script>
  import TokenPin from '../../verifications/TokenPin'

  export default {
    name: "PasswordChange",
    props: ['user'],
    data() {
      return {
        password_group: false,
        password: {
          password: null,
          password_confirmation: null,
          action: 6
        },
        isTokenPinVisible: false,
        token: {
          code: null,
          pin: null
        },

      }
    },
    methods: {
      updatePassword() {
        this.$store.dispatch('updatePassword', {
          password: this.password.password,
          password_confirmation: this.password.password_confirmation,
          action: this.password.action,
          pin: this.token.pin,
          code: this.token.code,
        })
                .then(this.$toasted.show('atualizando sua senha...', {position: 'bottom-left'}).goAway(5000))
                .then(response => {
                  this.$toasted.show(response.data.message, {position: 'bottom-left'}).goAway(3000)
                  this.$emit('refresh')
                })
                .catch(error => {
                  if (error.response) {+
                          this.handleErrors(error.response)
                    this.$emit('reset-token')
                  }
                })
      },
      showTokenPinModal(method, action) {
        if (this.password.password === this.password.password_confirmation) {
          this.isTokenPinVisible = true
          this.$refs.tokenPinComponent.setData(method, action)
        } else {
          this.$toasted.show('As senhas não correspondem. Tente novamente.', {position: 'bottom-left'}).goAway(5000)
        }
      },
      closeTokenPinModal() {
        this.isTokenPinVisible = false;
      },
      handleTokenPinData(data) {
        this.token.code = data.code
        this.token.pin = data.pin
        this.updatePassword()

      },
    },
    components: {
      TokenPin
    },
    computed: {
      isPassFilled() {
        return this.password.password && this.password.password_confirmation && true;
      },
    }
  }
</script>

<style scoped>
  .form-desc, legend {
    cursor: pointer;
  }

  .form-desc {
    border-bottom: none;
  }
  .psw-change {
    background-image: url(../../../assets/img/icons/psw-change.png);
    background-size: 80px;
    background-repeat: no-repeat;
  }
</style>
