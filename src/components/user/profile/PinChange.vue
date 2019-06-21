<template>

<div>
    <div class="post-box">

        <div class="post-media pin-seg"></div>

        <fieldset class="post-content form-group">
            <legend v-if="pin_group" @click.prevent="pin_group=false">
                <span class="pull-left">Pin de Segurança</span>
                <span class="badge badge-danger mb-2" v-if="!user.pin_filled">não habilitado</span>
                <span class="badge badge-success mb-2" v-else>criado</span>
                <span class="pull-right"><i class="os-icon os-icon-arrow-down2"></i></span>
            </legend>
            <legend v-if="!pin_group" @click.prevent="pin_group=true">
                <span class="pull-left">Pin de Segurança</span>
                <span class="badge badge-danger mb-2" v-if="!user.pin_filled">não habilitado</span>
                <span class="badge badge-success mb-2" v-else>criado</span>
                <span class="pull-right"><i class="os-icon os-icon-arrow-right3"></i></span>
            </legend>
            <div class="element-inner-desc text-danger mb-2" @click.prevent="pin_group=true">
                Seu pin é necessário para realização de operações na plataforma.<br>
                Ele torna sua conta mais segura, pois possibilita que somente você confirme as ações realizadas.<br>
                Seu pin deve conter 4 números à sua escolha.
            </div>
            <form @submit.prevent="updatePin" v-if="pin_group">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label for="pin"> PIN</label>
                            <input class="form-control" data-minlength="6" placeholder="Pin" id="pin" autocomplete="off"
                                   required="required" type="password" v-model="pin.pin">
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label for="pin_confirmation"> Confirmação</label>
                            <input class="form-control" data-minlength="6" placeholder="Confirmação do pin"
                                   id="pin_confirmation" autocomplete="off"
                                   required="required" type="password" v-model="pin.pin_confirmation">
                        </div>
                    </div>
                </div>

                <div class="form-buttons-w text-right">
                    <button class="btn btn-grey pull-left" type="button" @click.prevent="pin_group=false"> Cancelar
                    </button>
                    <button class="btn btn-primary" type="button"
                            @click.prevent="showTokenModal('updatePin', 7)" :disabled="!isPinFilled"> Atualizar
                    </button>
                </div>
            </form>

            <div class="form-desc pb-0 mb-0" v-if="!pin_group&&user.pin_filled" @click.prevent="pin_group=true"><em>clique
                para atualizar seu pin</em></div>
            <span v-if="!pin_group&&!user.pin_filled" class="badge badge-danger">você deve criar um pin para realizar as operações na plataforma</span>


        </fieldset>
    </div>
    <token v-show="isTokenVisible" ref="tokenComponent"
           @close-token-modal="closeTokenModal" @token-data="handleTokenData"/>
</div>

</template>

<script>
	import Token from '../../verifications/Token'

	export default {
		name: "PinChange",
		props: ['user'],
		data() {
			return {
				pin_group: false,
				pin: {
					pin: null,
					pin_confirmation: null,
					action: 7
				},
				isTokenVisible: false,
				token: {
					code: null,
					pin: null
				},

			}
		},
		methods: {
			updatePin() {
				this.$store.dispatch('updatePin', {
					pin: this.pin.pin,
					pin_confirmation: this.pin.pin_confirmation,
					code: this.token.code,
					action: this.pin.action
				})
					.then(this.$toasted.show('atualizando seu pin...', {position: 'bottom-left', type: 'info'}).goAway(5000))
					.then(response => {
						this.$toasted.show(response.data.message, {position: 'bottom-left', type: 'success'}).goAway(3000)
						this.$emit('refresh')
					})
					.catch(error => {
						if (error.response) {
							this.handleErrors(error.response)
							this.$emit('reset-token')
						}
					})
			},
			showTokenModal(method, action) {
				this.isTokenVisible = true
				this.$refs.tokenComponent.setData(method, action)
			},
			closeTokenModal() {
				this.isTokenVisible = false;
			},
			handleTokenData(data) {
				this.token.code = data.code
				this.updatePin()
			},
		},
		components: {
			Token
		},
		computed: {
			isPinFilled() {
				return this.pin.pin && this.pin.pin_confirmation && true;
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

    .pin-seg {
        background-image: url(../../../assets/img/icons/pin-seg.png);
        background-size: 80px;
        background-repeat: no-repeat;
    }
</style>
