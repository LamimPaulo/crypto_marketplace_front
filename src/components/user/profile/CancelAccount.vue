<template>

    <div>
        <div class="post-box">

            <div class="post-media pin-seg"></div>

            <fieldset class="post-content form-group">
                <legend>
                    <span class="pull-left">EXCLUIR CONTA DA LIQUIDEX</span>
                </legend>

                <div class="element-inner-desc text-danger mb-2">
                    <span class="alert alert-danger">Cuidado esta ação não pode ser desfeita.</span><br><br><br>
                    Antes de cancelar sua conta tenha em mente que:<br/>
                    <ul>
                        <li>você perderá totalmente o acesso à plataforma, à suas carteiras, e qualquer saldo ainda
                            existente após o
                            cancelamento, por tanto efetue as retiradas necessárias antes de efetuar o cancelamento.
                        </li>

                        <li>você não poderá cadastrar uma nova conta utilizando o mesmo email, cpf e telefone confirmados na atual
                            conta.
                        </li>

                        <li>
                            Estará excluindo sua conta da Liquidex, e não a sua conta bancária, para conta bancária, acesse o menu Dados de Pagamentos.
                        </li>
                    </ul>
                    Ao clicar em "EXCLUIR CONTA DA LIQUIDEX" você declara estar ciente dos itens mencionados acima. Você receberá um email de confirmação do cancelamento.
                </div>

                <button class="btn btn-danger" type="button"
                        @click.prevent="showTokenPinModal()"> EXCLUIR CONTA DA LIQUIDEX
                </button>
            </fieldset>
        </div>

        <token-pin v-show="isTokenPinVisible" ref="tokenPinComponent"
                   @close-token-pin-modal="closeTokenPinModal" @token-data="handleTokenPinData"/>
    </div>

</template>

<script>
    import TokenPin from '../../verifications/TokenPin'

    export default {
        name: "CancelAccount",
        props: ['user'],
        data() {
            return {
                isTokenPinVisible: false,
                token: {
                    code: null,
                    pin: null,
                    action: 20
                },

            }
        },
        methods: {
            cancelUser() {
                this.$store.dispatch('cancelUser', {
                    code: this.token.code,
                    pin: this.token.pin,
                    action: this.token.action
                })
                    .then(this.$toasted.show('solicitando cancelamento...', {
                        position: 'bottom-left',
                        type: 'info'
                    }).goAway(5000))
                    .then(response => {
                        this.$toasted.show(response.data.message, {
                            position: 'bottom-left',
                            type: 'success'
                        }).goAway(3000)
                        setTimeout(function () {
                            location.reload()
                        }, 2000)
                    })
                    .catch(error => {
                        if (error.response) {
                            this.handleErrors(error.response)
                            this.$emit('reset-token')
                        }
                    })
            },
            showTokenPinModal() {
                this.isTokenPinVisible = true
                this.$refs.tokenPinComponent.setData('', this.token.action)
            },
            closeTokenPinModal() {
                this.isTokenPinVisible = false;
            },
            handleTokenPinData(data) {
                this.token.code = data.code
                this.token.pin = data.pin
                this.cancelUser()
            },
        },
        components: {
            TokenPin
        },
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
        background-image: url(../../../assets/img/cancel_user.png);
        background-size: 80px;
        background-repeat: no-repeat;
    }
</style>
