<template>
    <div>
        <vue-headful
                title="Navi - Acessar Conta"
                description="Entrar na Navi Capital"
        />
        <div class="auth-wrapper">
            <div class="loader" v-if="loader"></div>
            <div class="all-wrapper menu-side with-pattern">
                <div class="auth-box-w">
                    <div class="logo-w">
                        <a href="">
                            <img src="https://s3.amazonaws.com/navi-public/api/navicapital.png" alt="Navi" class="logo">
                        </a>
                    </div>
                    <h4 class="auth-header">
                        Acessar sua Conta
                    </h4>
                    <form action="#" @submit.prevent="login">
                        <div class="form-group">
                            <label>Usuário, Email ou Telefone</label><input class="form-control" placeholder="Seu Login"
                                                                            type="text"
                                                                            name="username"
                                                                            v-model="username" required>
                            <div class="pre-icon os-icon os-icon-user-male-circle"></div>
                        </div>

                        <div class="form-group">
                            <label>Senha </label>
                            <router-link to="/recover/password" class="pull-right">Recuperar senha?</router-link>
                            <input class="form-control" placeholder="Sua Senha" type="password" name="password"
                                   v-model="password" required>
                            <div class="pre-icon os-icon os-icon-fingerprint"></div>
                        </div>

                        <div class="form-group">
                            <label>2FA </label>
                            <i class="os-icon os-icon-info pull-right" v-tooltip="'Preencha apenas se tiver ativado a Autenticação em 2 fatores'"></i>
                            <input class="form-control" placeholder="Código 2FA" type="text" name="code_2fa"
                                   v-model="code_2fa">

                            <div class="pre-icon os-icon os-icon-clock"></div>
                        </div>

                        <div class="form-group">
                            <vue-recaptcha ref="recaptcha" @verify="onVerify"
                                           :sitekey="recaptcha_key"></vue-recaptcha>
                        </div>

                        <div class="buttons-w">
                            <router-link to="/register">Criar Conta</router-link>
                            <button type="submit" :disabled='!isFilled' class="btn btn-primary pull-right">Entrar
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
	import VueRecaptcha from 'vue-recaptcha';

	export default {
		name: 'Login',
		data() {
			return {
				username: null,
				password: null,
				recaptcha: '',
				code_2fa: null,
				loader: false,
				recaptcha_key: process.env.RECAPTCHA_KEY
			}
		},
		computed: {
			isFilled() {
				return this.recaptcha && this.password && this.username;
			}
		},
		methods: {
			login() {

				this.loader = true;
				this.$store.dispatch('retrieveToken', {
					username: this.username,
					password: this.password,
					recaptcha: this.recaptcha,
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
						this.handleErrors(error.response)
					}
					this.$refs.recaptcha.reset();
				})
			},
			onVerify(response) {
				this.recaptcha = response;
			}
		},
		components: {VueRecaptcha},
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
