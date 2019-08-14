<template>
  <div>
    <vue-headful title="Liquidex - Acessar Conta" description="Recuperação de Senha"/>
    <div class="auth-wrapper">
      <div class="all-wrapper menu-side with-pattern">
        <div class="auth-box-w">
          <div class="logo-w">
            <a href="">
              <img src="https://s3.amazonaws.com/navi-public/api/clients/3/cbed47c0-5323-4873-baf7-0284f80bbf0a.png" class="logo">
            </a>
          </div>
          <h4 class="text-center">
            Troca de Senha
          </h4>
          <form action="#" @submit.prevent="sendResetPassword">
            <div class="form-group">
              <label>Email</label>
              <input class="form-control" placeholder="Seu Email" type="email" name="email"
                     v-model="email" required>
              <div class="pre-icon os-icon os-icon-mail"></div>
            </div>

            <button type="submit" :disabled='!isFilled' class="btn btn-primary btn-block btn-reset">Enviar</button>

            <div class="buttons-w">
              <router-link to="/login" class="pull-right"><i class="fas fa-sign-in-alt"></i> Login</router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'SendResetPassword',
    data() {
      return {
        email: ''
      }
    },
    computed: {
      isFilled() {
        return this.email;
      }
    },
    methods: {
      sendResetPassword() {
        this.$store.dispatch('retrievePassword', {
          email: this.email,
        })
          .then(this.$toasted.show('Verificando seus dados', {position: 'top-center'}).goAway(3000))
          .then(this.email = '')

          .then(response => {
            this.$toasted.show(response.data.message, {position: 'top-center'}).goAway(3000)
          }).catch(error => {
          if (error.response) {
            this.handleErrors(error.response)
          }
          this.$refs.recaptcha.reset();
        })
      }
    }
  }
</script>

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