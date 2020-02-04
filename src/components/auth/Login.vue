<template>
  <div>
    <vue-headful title="Liquidex - Acessar Conta" description="Entrar na Liquidex"/>

    <login-modal v-if="isModalVisible" @close="closeModal"></login-modal>

    <div class="auth-wrapper">
      <div class="loader" v-if="loader"></div>
      <div class="all-wrapper menu-side with-pattern">
        <div class="auth-box-w">
          <div class="logo-w">
            <a href="">
              <img src="https://navi.inf.br/storage/api/clients/3/liquidex.png"
                   alt="Liquidex" class="logo">
            </a>
          </div>
          <h4 class="text-center pb-3">
            Login
          </h4>
          <form action="#" @submit.prevent="FormSubmit">
            <div class="form-group">
              <label>Usuário, Email ou Telefone</label>
              <input class="form-control" placeholder="Seu Login"
                     type="text"
                     name="username"
                     v-model="username" required>
            </div>

            <div class="form-group">
              <label>Senha </label>
              <router-link to="/recover/password" class="pull-right">Recuperar senha?</router-link>
              <input class="form-control" placeholder="Sua Senha" type="password" name="password"
                     v-model="password" required>
            </div>

            <div class="form-group">
              <label>2FA </label>
              <i class="os-icon os-icon-info pull-right"
                 v-tooltip="'Preencha apenas se tiver ativado a Autenticação em 2 fatores'"></i>
              <input class="form-control" placeholder="Código 2FA" type="text" name="code_2fa"
                     v-model="code_2fa">
            </div>

            <div class="form-group">
              <vue-recaptcha
                ref="recaptcha"
                @verify="onCaptchaVerified"
                size="invisible"
                :sitekey="recaptcha_key">
              </vue-recaptcha>
            </div>

            <button type="submit" :disabled='!isFilled' class="btn btn-block btn-success btn-login">
              <strong>Entrar</strong>
            </button>

            <div class="alert alert-danger mt-3" v-if="error" v-html="error">
            </div>

            <div class="buttons-w">
              <router-link class="pull-right" to="/register">
                <i class="fas fa-sign-in-alt"></i> Criar Conta
              </router-link>
            </div>

          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import VueRecaptcha from 'vue-recaptcha';
  import LoginModal from "./LoginModal";

  export default {
    name: 'Login',
    data() {
      return {
        error: null,
        username: null,
        password: null,
        recaptcha: '',
        code_2fa: null,
        loader: false,
        recaptcha_key: `${process.env.INVISIBLE_RECAPTCHA_KEY}`,
        isModalVisible: true
      }
    },
    computed: {
      isFilled() {
        return this.password && this.username;
      }
    },
    methods: {

      FormSubmit() {
        this.loader = true;
        this.$refs.recaptcha.execute()

      },
      onCaptchaVerified(token) {
        this.error = null
        this.loader = true;
        this.$store.dispatch('retrieveToken', {
          username: this.username,
          password: this.password,
          recaptcha: token,
          code_2fa: this.code_2fa,
        })
          .then(this.$toasted.show('Verificando seus dados', {position: 'top-center'}).goAway(3000))
          .then(this.password = null)
          .then(this.$refs.recaptcha.reset())
          .then(response => {
            this.$store.dispatch('retrieveUser')
            location.reload()
          }).catch(error => {
          this.loader = false;
          if (error.response) {
            this.error = error.response.data.message
          }
          this.$refs.recaptcha.reset();
        })
      },
      closeModal() {
        this.isModalVisible = false
      }
    },
    components: {LoginModal, VueRecaptcha},
  }
</script>

<style scoped>
  img.logo {
    width: 235px;
  }

  .auth-wrapper.with-pattern {
    position: relative;
  }

  .auth-wrapper:after, .auth-wrapper:before {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    content: "";
    z-index: -1;
  }


  .auth-wrapper {
    min-height: 100%;
    min-width: 1024px;
    width: 100%;
    height: auto;
    position: fixed;
    top: 0;
    left: 0;
    background: linear-gradient(-45deg, #020024, #090979, #00d4ff);
    background-size: 400% 400%;
    -webkit-animation: Gradient 15s ease infinite;
    -moz-animation: Gradient 15s ease infinite;
    animation: Gradient 15s ease infinite;
  }

  .btn-login {
    padding: 20px;
  }

  @-webkit-keyframes Gradient {
    0% {
      background-position: 0% 50%
    }
    50% {
      background-position: 100% 50%
    }
    100% {
      background-position: 0% 50%
    }
  }

  @-moz-keyframes Gradient {
    0% {
      background-position: 0% 50%
    }
    50% {
      background-position: 100% 50%
    }
    100% {
      background-position: 0% 50%
    }
  }

  @keyframes Gradient {
    0% {
      background-position: 0% 50%
    }
    50% {
      background-position: 100% 50%
    }
    100% {
      background-position: 0% 50%
    }
  }
</style>
