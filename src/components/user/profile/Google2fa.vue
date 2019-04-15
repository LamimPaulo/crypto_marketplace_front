<template>
    <div class="post-box">
        <div class="post-media g2fa"></div>

        <fieldset class="post-content form-group">
            <legend v-if="g2fa_group" @click.prevent="g2fa_group=false">
                <span class="pull-left">Google 2FA</span>
                <span class="badge badge-danger mb-2" v-if="!g2fa_activate.status">não habilitada</span>
                <span class="badge badge-success mb-2" v-else>ativa</span>
                <span class="pull-right"><i class="os-icon os-icon-arrow-down2"></i></span>
            </legend>
            <legend v-if="!g2fa_group" @click.prevent="g2fa_group=true">
                <span class="pull-left">Google 2FA</span>
                <span class="badge badge-danger mb-2" v-if="!g2fa_activate.status">não habilitada</span>
                <span class="badge badge-success mb-2" v-else>ativa</span>
                <span class="pull-right"><i class="os-icon os-icon-arrow-right3"></i></span>
            </legend>

            <div v-if="g2fa_group">
                <form @submit.prevent="activate2Fa" v-if="!g2fa_activate.status">
                    <div class="row">
                        <div class="col-sm-12">
                            <strong>1º</strong> Abra seu App Google Authenticator 2FA em seu <a
                                href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"
                                target="_blank">Android</a> ou <a
                                href="https://itunes.apple.com/br/app/google-authenticator/id388497605?mt=8"
                                target="_blank">Ios</a> e escaneie o QRCode abaixo:
                        </div>

                        <div class="col-sm-12 text-center mt-3 mb-3">
                            <img :src="g2fa_activate.url" alt="">
                        </div>

                    </div>

                    <hr>

                    <div class="row">
                        <div class="col-sm-12 mt-3">
                            <div class="form-group">
                                <label for="code"><strong>2º</strong> Digite o Código gerado no Aplicativo</label>
                                <input class="form-control" data-minlength="6" placeholder="Código de Ativação" id="code"
                                       autocomplete="off"
                                       required="required" type="text" v-model="g2fa_activate.code">
                            </div>
                        </div>
                    </div>

                    <div class="element-inner-desc text-danger mb-2" @click.prevent="pin_group=true">
                        ATENÇÃO! Após ativar 2FA você vai precisar obrigatoriamente do Google Authenticator 2FA para acessar
                        sua conta!
                    </div>

                    <div class="form-buttons-w text-right">
                        <button class="btn btn-grey pull-left" type="button" @click.prevent="g2fa_group=false">
                            Cancelar
                        </button>

                        <button class="btn btn-primary" type="button"
                                @click.prevent="showPinModal('activate2Fa')" :disabled="!isActivateFilled"> Ativar
                        </button>

                    </div>
                </form>

                <form @submit.prevent="deactivate2Fa" v-if="g2fa_activate.status">

                    <div class="element-inner-desc text-danger mb-2" @click.prevent="pin_group=true">
                        ATENÇÃO! Após desativar 2FA você não vai precisar do Google Authenticator 2FA para acessar
                        sua conta!<br><br>

                        Sua conta fica mais segura com a 2FA ativa.
                    </div>

                    <div class="form-buttons-w text-right">
                        <button class="btn btn-grey pull-left" type="button" @click.prevent="g2fa_group=false">
                            Cancelar
                        </button>

                        <button class="btn btn-primary" type="button"
                                @click.prevent="showPinModal('deactivate2Fa')"> Desativar
                        </button>

                    </div>
                </form>
            </div>

            <div class="form-desc pb-0 mb-0" v-if="!g2fa_group" @click.prevent="g2fa_group=true">
                <em>Clique para alterar a autenticação em 2 fatores:</em>
            </div>

            <pin v-show="isPinVisible" ref="pinComponent"
                 @close-pin-modal="closePinModal" @pin-data="handlePinData"/>

        </fieldset>
    </div>
</template>

<script>
	import Pin from '../../verifications/Pin'

	export default {
		name: "Google2fa",
		props: ['user'],
		data() {
			return {
				g2fa_group: false,
				g2fa_activate: {
					secret: null,
					code: null,
					url: null,
					status: false
				},
				isPinVisible: false,
				token: {
					pin: null
				},
			}
		},
		methods: {
			getQrCodeUrl() {
				this.$store.dispatch('get2FaQrCode')
					.then(response => {
						this.g2fa_activate.secret = response.data.secret
						this.g2fa_activate.url = response.data.qr_code
						this.g2fa_activate.status = response.data.status
					})
					.catch(error => {
						if (error.response) {
							this.handleErrors(error.response)
							this.$emit('reset-pin')
						}
					})
			},
			activate2Fa() {
				this.$store.dispatch('activate2Fa', {
					secret: this.g2fa_activate.secret,
					code: this.g2fa_activate.code,
					action: this.g2fa_activate.action,
					pin: this.token.pin,
				})
					.then(this.$toasted.show('atualizando autenticação...', {position: 'bottom-left'}).goAway(5000))
					.then(response => {
						this.$toasted.show(response.data.message, {position: 'bottom-left'}).goAway(3000)
						this.$emit('refresh')
					})
					.catch(error => {
						if (error.response) {
							this.handleErrors(error.response)
							this.$emit('reset-pin')
						}
					})
			},
			deactivate2Fa() {
				this.$store.dispatch('deactivate2Fa', {
					pin: this.token.pin,
				})
					.then(this.$toasted.show('atualizando autenticação...', {position: 'bottom-left'}).goAway(5000))
					.then(response => {
						this.$toasted.show(response.data.message, {position: 'bottom-left'}).goAway(3000)
						this.$emit('refresh')
					})
					.catch(error => {
						if (error.response) {
							this.handleErrors(error.response)
							this.$emit('reset-pin')
						}
					})
			},
			showPinModal(method) {
				this.isPinVisible = true
				this.$refs.pinComponent.setData(method)
			},
			closePinModal() {
				this.isPinVisible = false;
			},
			handlePinData(data) {
				this.token.pin = data.pin
				if (data.method === 'activate2Fa') {
					this.activate2Fa()
				}
				if (data.method === 'deactivate2Fa') {
					this.deactivate2Fa()
				}
			},
		},
		mounted() {
			this.getQrCodeUrl();
		},
		components: {
			Pin
		},
		computed: {
			isActivateFilled() {
				return this.g2fa_activate.secret && this.g2fa_activate.code && true;
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

    .g2fa {
        background-image: url(../../../assets/img/icons/g2fa.png);
        background-size: 80px;
        background-repeat: no-repeat;
    }
</style>
