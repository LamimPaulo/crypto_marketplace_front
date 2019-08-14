<template>
    <div>
        <vue-headful
                title="Liquidex - Criar Conta"
                description="Criação de conta na Liquidex"
        />
        <div class="auth-wrapper">
            <div class="all-wrapper menu-side with-pattern">
                <div class="auth-box-w">
                    <div class="logo-w">
                        <a href="">
                            <img src="https://s3.amazonaws.com/navi-public/api/clients/3/cbed47c0-5323-4873-baf7-0284f80bbf0a.png"
                                 class="logo">
                        </a>
                    </div>
                    <h4 class="text-center pb-3">
                        Criar Conta
                    </h4>
                    <form action="#" @submit.prevent="FormSubmit">
                        <div class="form-group">
                            <label>Username</label>
                            <input class="form-control" placeholder="Username" type="text" name="name"
                                   v-model="username" required>
                        </div>

                        <div class="form-group">
                            <label>Seu Email</label>
                            <input class="form-control" placeholder="Seu Email" type="email" name="email"
                                   v-model="email" required>
                        </div>

                        <div class="form-group">
                            <label>Seu número</label>
                            <vue-phone-number-input
                                    class="mb-3"
                                    @update="onUpdate"
                                    :default-country-code="phone_number_input_defaults.defaultCountryCode"
                                    :preferred-countries="phone_number_input_defaults.preferredCountries"
                                    :translations="phone_number_input_defaults.translations"
                                    v-model="phone_number"
                                    required/>
                        </div>

                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for=""> Senha</label>
                                    <input class="form-control" placeholder="Password" type="password" name="password"
                                           v-model="password">
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="">Confirme a senha</label>
                                    <input class="form-control" placeholder="Password" type="password"
                                           name="password_confirmation"
                                           v-model="password_confirmation">
                                </div>
                            </div>

                            <vue-recaptcha
                                    ref="recaptcha"
                                    @verify="onCaptchaVerified"
                                    size="invisible"
                                    :sitekey="recaptcha_key">
                            </vue-recaptcha>
                        </div>

                        <button type="submit" :disabled='!isFilled' class="btn btn-primary btn-block btn-register">Criar
                            Conta
                        </button>

                        <div class="buttons-w">
                            <router-link to="/login" class="pull-left"><i class="fas fa-arrow-left"></i> Voltar
                            </router-link>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	import {settings} from './../../settings'
	import VueRecaptcha from 'vue-recaptcha';

	export default {
		name: 'Register',
		data() {
			return {
				username: null,
				email: null,
				password: null,
				password_confirmation: null,
				phone: null,
				phone_number_input_defaults: settings.PHONE_NUMBER_INPUT,
				isValid: false,
				countryCode: 'BR',
				recaptcha_key: `${process.env.INVISIBLE_RECAPTCHA_KEY}`,
                phone_number: null
			}
		},
		computed: {
			isFilled() {
				return this.email && this.password && this.password_confirmation && this.phone && this.isValid;
			}
		},
		methods: {
			onUpdate: function (data) {
				this.phone = data.nationalNumber;
				this.countryCode = data.countryCode;
				this.isValid = data.isValid;
			},
			FormSubmit() {
				this.loader = true;
				this.$refs.recaptcha.execute()
			},
			onCaptchaVerified(token) {
				this.$store.dispatch('register', {
					username: this.username,
					email: this.email,
					password: this.password,
					password_confirmation: this.password_confirmation,
					phone: this.phone,
					countryCode: this.countryCode,
					recaptcha: token,
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
		},
		components: {
			VueRecaptcha
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

    .auth-wrapper:after, .auth-wrapper:before {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        content: "";
        z-index: -1;
    }

    .btn-register {
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
        background: linear-gradient(-45deg, #020024, #090979, #00d4ff);
        background-size: 400% 400%;
        -webkit-animation: Gradient 15s ease infinite;
        -moz-animation: Gradient 15s ease infinite;
        animation: Gradient 15s ease infinite;
    }

    #VuePhoneNumberInput_phone_number {
        background-color: #FFF !important;
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
