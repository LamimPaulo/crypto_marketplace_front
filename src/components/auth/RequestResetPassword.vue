<template>
  <div>
    <vue-headful
      title="Liquidex - Acessar Conta"
      description="Recuperação de Senha"
    />
    <div class="auth-wrapper">
      <div class="all-wrapper menu-side with-pattern">
        <div class="auth-box-w">
          <div class="logo-w">
            <a href="">
              <img src="https://s3.amazonaws.com/navi-public/api/clients/3/cbed47c0-5323-4873-baf7-0284f80bbf0a.png" class="logo">
            </a>
          </div>
          <h4 class="text-center pb-3">
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

            <button type="submit" :disabled='!isFilled' class="btn btn-success btn-block btn-reset">Enviar</button>

            <div class="buttons-w">
              <router-link to="/login" class="pull-right"><i class="fas fa-sign-in-alt"></i> Entrar</router-link>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    img.logo {
        width: 235px;
    }

    .auth-wrapper.with-pattern {
        position: relative;
    }
     
    .auth-wrapper:after, .auth-wrapper:before{
        position:absolute;
        top:0;
        bottom:0;
        left:0;
        right:0;
        content:"";
        z-index:-1;
    }

    .btn-reset {
      padding: 10px;
    }

    .auth-wrapper {    
        min-height: 100%;
        min-width: 1024px;            
        width: 100%;
        height: auto;            
        position: fixed;
        top: 0;
        left: 0;
        color: #fff;
        background: linear-gradient(-45deg, #020024, #090979, #00d4ff);
        background-size: 400% 400%;
        -webkit-animation: Gradient 15s ease infinite;
        -moz-animation: Gradient 15s ease infinite;
        animation: Gradient 15s ease infinite;
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
