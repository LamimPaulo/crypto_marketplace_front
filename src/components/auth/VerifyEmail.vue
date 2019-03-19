<template>
  <div>
    <vue-headful
      title="Navi - Verificação de Email"
      description="Criação de conta na Navi Capital"
    />
    <div class="auth-wrapper">
      <div class="all-wrapper menu-side with-pattern">
        <div class="auth-box-w">
          <div class="logo-w">
            <a href="">
              <img src="https://s3.amazonaws.com/navi-public/api/navicapital.png" class="logo">
            </a>
          </div>
          <form action="">
            <div class="form-group">
              <div class="pre-icon os-icon os-icon-user-male-circle"></div>
              Seu email foi verificado com sucesso, agora você já pode logar.
            </div>
            <router-link to="/login" class="btn btn-primary">Entrar</router-link>
          </form>

        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'VerifyEmail',
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
