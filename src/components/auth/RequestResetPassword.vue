<template>
  <div>
    <vue-headful
      title="Navi - Acessar Conta"
      description="Recuperação de Senha"
    />
    <div class="auth-wrapper">
      <div class="all-wrapper menu-side with-pattern">
        <div class="auth-box-w">
          <div class="logo-w">
            <a href="">
              <img src="https://s3.amazonaws.com/navi-public/api/navicapital.png" class="logo">
            </a>
          </div>
          <h4 class="auth-header">
            Troca de Senha
          </h4>
          <form action="#" @submit.prevent="requestResetPassword">
            <div class="form-group">
              <label>Email</label>
              <input class="form-control" placeholder="Seu Email" type="text" name="email"
                     v-model="email" required>
              <div class="pre-icon os-icon os-icon-user-male-circle"></div>
            </div>
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group">
                  <label for=""> Senha</label>
                  <input class="form-control" placeholder="Password" type="password" name="password" v-model="password">
                  <div class="pre-icon os-icon os-icon-fingerprint"></div>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label for="">Confirme a senha</label>
                  <input class="form-control" placeholder="Password" type="password" name="password_confirmation"
                         v-model="password_confirmation">
                </div>
              </div>
            </div>

            <div class="buttons-w">
              <router-link to="/login">Entrar</router-link>
              <button type="submit" :disabled='!isFilled' class="btn btn-primary pull-right">Enviar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  export default {
    name: 'RequestResetPassword',
    data() {
      return {
        email: '',
        password: null,
        password_confirmation: null,
        token: ''
      }
    },
    computed: {
      isFilled() {
        return this.password && this.password_confirmation && this.email;
      }
    },
    mounted() {
      this.token = this.$route.query.token
    },
    methods: {
      requestResetPassword() {
        this.$store.dispatch('resetPassword', {
          email: this.email,
          token: this.token,
          password: this.password,
          password_confirmation: this.password_confirmation
        })
          .then(this.$toasted.show('Verificando seus dados', {position: 'top-center'}).goAway(3000))
          .then(this.email = '')
          .then(this.password = '')
          .then(this.password_confirmation = '')

          .then(response => {
            this.$toasted.show(response.data.message, {position: 'top-center'}).goAway(3000)
          }).catch(error => {
          if (error.response) {
            this.handleErrors(error.response)
          }
        })
      }
    }
  }
</script>

<style scoped>
  img.logo {
    width: 235px;
  }

  .auth-wrapper::before {
    content: "";
    position: absolute;
    z-index: -1;
    background: -webkit-gradient(linear, left top, right bottom, from(#D7BBEA), to(#65A8F1));
    background: linear-gradient(to bottom right, #D7BBEA, #65A8F1);
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
  }

  .auth-wrapper {
    margin: 0;
    font-family: "Avenir Next W01", "Proxima Nova W01", "Rubik", -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 0.9rem;
    font-weight: 400;
    line-height: 1.5;
    color: #3E4B5B;
    text-align: left;
  }
</style>
