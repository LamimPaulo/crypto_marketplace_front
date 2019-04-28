<template>
    <div class="post-box">

        <div class="post-media personal-data"></div>

        <fieldset class="post-content form-group">
            <legend v-if="data_group" @click.prevent="data_group=false">
                <span class="pull-left">Dados Pessoais</span>
                <span class="pull-right"><i class="os-icon os-icon-arrow-down2"></i></span>
            </legend>
            <legend v-if="!data_group" @click.prevent="data_group=true">
                <span class="pull-left">Dados Pessoais</span>
                <span class="pull-right"><i class="os-icon os-icon-arrow-right3"></i></span>
            </legend>

            <form @submit.prevent="updateUser" v-if="data_group">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label for="username">Username</label>
                            <input class="form-control" placeholder="Seu Nome" type="text" id="username"
                                   v-model="user.username"
                                   disabled>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label for="cpf"> Cpf</label>
                            <input class="form-control" placeholder="Cpf" required="required" type="text" id="cpf"
                                   @input="retrieveCpf"
                                   autocomplete="false"
                                   v-model="user.document" v-mask="['###.###.###-##']">
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label for="name">Nome</label>
                            <input class="form-control" placeholder="Seu Nome" type="text" id="name"
                                   v-model="user.name"
                                   disabled>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label for="nascimento"> Data de Nascimento</label>
                            <input class="form-control" placeholder="Data de Nascimento" type="text" id="nascimento"
                                   disabled v-model="user.birthdate">
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label for="gender">Gênero</label>
                            <input class="form-control" placeholder="Gênero" type="text" id="gender"
                                   v-model="user.gender" disabled>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label for="mothersname"> Nome da Mãe</label>
                    <input class="form-control" placeholder="Nome da Mãe" type="text" id="mothersname" disabled
                           v-model="user.mothers_name">
                </div>
                <div class="form-buttons-w text-right">
                    <button class="btn btn-grey pull-left" type="button" @click.prevent="data_group=false"> Cancelar
                    </button>
                    <button class="btn btn-primary" type="button"
                            @click.prevent="showTokenPinModal('updateUser', 9)" :disabled="!isUserFilled"> Atualizar
                    </button>
                </div>
            </form>

            <div class="form-desc pb-0 mb-0" v-if="!data_group" @click.prevent="data_group=true"><em>clique para
                atualizar seus dados pessoais</em></div>

            <token-pin v-show="isTokenPinVisible" ref="tokenPinComponent"
                       @close-token-pin-modal="closeTokenPinModal" @token-data="handleTokenPinData"/>

        </fieldset>
    </div>
</template>

<script>
	import TokenPin from '../../verifications/TokenPin'
	import {mask} from 'vue-the-mask'
	import debounce from 'lodash/debounce'

	export default {
		name: "DadosPessoais",
		props: ['user'],
		data() {
			return {
				cpf: null,
				data_group: false,
				isTokenPinVisible: false,
				token: {
					code: null,
					pin: null
				},

			}
		},
		methods: {
			retrieveCpf: debounce(function (e) {
				if (e.target.value.length === 14 && !this.cpf) {
					this.$store.dispatch('retrieveCpf', {
						document: this.user.document
					})
						.then(this.$toasted.show('buscando seus dados...', {position: 'bottom-left'}).goAway(3000))
						.then(response => {
							this.user.name = response.data.user.name
							this.user.birthdate = response.data.user.birthdate
							this.user.document = response.data.user.document
							this.user.mothers_name = response.data.user.mothers_name
							this.user.gender = response.data.user.gender
							this.cpf = response.data.user.document
						}).catch(error => {
						if (error.response) {
							this.handleErrors(error.response)
							this.cpf = null
						}

					})
				}
			}, 500),
			updateUser() {
				this.$store.dispatch('updateUser', {
					document: this.cpf,
					action: 9,
					code: this.token.code,
					pin: this.token.pin,
				})
					.then(this.$toasted.show('salvando seus dados...', {position: 'bottom-left'}).goAway(5000))
					.then(response => {
						this.$toasted.show(response.data.message, {position: 'bottom-left'}).goAway(3000)
						this.$emit('refresh')
					})
					.catch(error => {
						if (error.response) {
							this.handleErrors(error.response)
							this.$refs.tokenPinComponent.resetData()
						}
					})
			},
			showTokenPinModal(method, action) {
				this.isTokenPinVisible = true
				this.$refs.tokenPinComponent.setData(method, action)
			},
			closeTokenPinModal() {
				this.isTokenPinVisible = false;
			},
			handleTokenPinData(data) {
				this.token.code = data.code
				this.token.pin = data.pin
				this.updateUser()

			},
		},
		components: {
			TokenPin
		},
		directives: {
			mask
		},
		computed: {
			isUserFilled() {
				return this.user.document && true;
			},
		},
		mounted() {
			this.cpf = this.user.document
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

    .personal-data {
        background-image: url(../../../assets/img/icons/personal-data.png);
        background-size: 80px;
        background-repeat: no-repeat;
    }
</style>
