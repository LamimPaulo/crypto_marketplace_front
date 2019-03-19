<template>
  <div>
    <vue-headful
      title="Navi - Criar Conta"
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
          <h4 class="auth-header">
            Criar sua Conta
          </h4>
          <form action="#" @submit.prevent="register">
            <div class="form-group">
              <label>Username</label>
              <input class="form-control" placeholder="Username" type="text" name="name" v-model="username" required>
              <div class="pre-icon os-icon os-icon-user-male-circle"></div>
            </div>

            <div class="form-group">
              <label>Email</label>
              <input class="form-control" placeholder="Seu Email" type="email" name="email" v-model="email" required>
              <div class="pre-icon os-icon os-icon-mail"></div>
            </div>

            <div class="form-group">
              <label>País</label>
              <select name="country_id" class="form-control" v-model="country_id" required>
                <option v-for="country in countries" :value="country.id" :selected="country.id===31">{{country.text}}
                </option>
              </select>
              <div class="pre-icon os-icon os-icon-map"></div>
            </div>

            <div class="form-group">
              <label>Telefone</label>
              <input class="form-control" placeholder="Seu telefone com DDD" type="tel" name="phone" v-model="phone"
                     required>
              <div class="pre-icon os-icon os-icon-phone-call"></div>
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
              <router-link to="/login">Voltar</router-link>
              <button type="submit" :disabled='!isFilled' class="btn btn-primary pull-right">Criar Conta</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'Register',
    data() {
      return {
        username: null,
        email: null,
        password: null,
        password_confirmation: null,
        phone: null,
        country_id: 31,
        countries: []
      }
    },
    computed: {
      isFilled() {
        return this.email && this.password && this.password_confirmation && this.phone;
      }
    },
    mounted() {
      this.loadCountries()
    },
    methods: {
      loadCountries() {
        this.$store.dispatch('retrieveCountries')
          .then(response => {
            this.countries = response.data.results
          }).catch(error => {
          if (error.response) {
            this.handleErrors(error.response)
          }
        })
      },
      register() {
        this.$store.dispatch('register', {
          username: this.username,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
          phone: this.phone,
          country_id: this.country_id,
        })
          .then(this.$toasted.show('Cadastrando seus dados...', {position: 'top-center'}).goAway(3000))
          .then(response => {
            this.$toasted.show(response.data.message, {position: 'bottom-center'}).goAway(3000)
            this.$router.push({name: 'login'})
          })
          .catch(error => {
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
