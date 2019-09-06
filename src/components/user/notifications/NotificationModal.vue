<template>
    <div class="vue-modal-backdrop" v-if="user.fiat_balance_">
        <div class="modal" id="modal-one" aria-hidden="true">
            <nav class="nav-container">
                <svg viewBox="0 0 13 20" class="nav nav--prev" @click="nav(-1)" title="Prev">
                    <polyline points="10,3 3,10 10,17"></polyline>
                </svg>

                <svg viewBox="0 0 13 20" class="nav nav--next" @click="nav(1)" title="Next">
                    <polyline points="10,3 3,10 10,17" transform="rotate(180 6.5,10)"></polyline>
                </svg>
            </nav>
            <transition-group tag="div" class="slide-group"
                              :name="transitionName"
                              @before-leave="sgBeforeLeave">
                <h1 class="text-white" key="title">Aviso Liquidex </h1>
                <div :key="current" class="slide" @click="nav(1)">
                    <h4>Prezado(a) Parceiro(a)</h4>
                    <div style="font-size: 16px">
                        <p>
                            Tendo em vista as diversas dificuldades operacionais ocasionadas fundamentalmente pela
                            ausência de tratamento legal e regulatório específico para o mercado de criptoeconomia no
                            Brasil, e a desejo de oferecer aos seus clientes segurança e estabilidade, a Liquidex
                            Leadger Safe informa que passará a operar com criptomoedas a partir da Alemanha, país onde o
                            referido regulado.
                        </p>

                        <p>
                            Nesse sentido, a partir de 05/09 todas as operações da empresa ocorrerão a partir de sua
                            nova sede, localizada em Berlim na Alemanha.
                        </p>

                        <p>
                            Da mesma forma, caso desejem, nossos clientes poderão liquidar suas criptomoedas diretamente
                            com as exchanges parceiras da Liquidex, disponíveis em nosso site.
                        </p>

                        <p>
                            Por fim, caso desejem manter seu saldo em moeda nacional (R$), ofereceremos aos nossos
                            clientes a possibilidade de abrirem sua conta digital, GRATUITAMENTE, na PAY2P Brasil,
                            também a partir de 30/09.
                        </p>

                        <p>
                            Em qualquer dos casos, pedimos especial atenção para as regras fiscais aplicáveis ao caso.
                        </p>

                        <p>
                            Atenciosamente: <br>
                            IDBT ADVOGADOS
                        </p>

                        <p>
                            Todas as demais operações: Robô Nanotech, Masternode, Keycode e Recebimentos de
                            Criptomoedas CONTINUARÃO funcionando normalmente.
                        </p>

                        <p class="text-center">
                            Seu saldo disponível em reais na plataforma é:
                            <span class="badge-success badge">{{ user.fiat_balance }}</span>

                            <br>

                            Migrando para Bitcoin terá: <span
                                class="badge-warning badge">{{ user.fiat_to_btc }}</span>

                            <br>

                            Migrando para LQX terá:
                            <span class="badge-info badge">
                            {{ user.fiat_to_lqx }}</span> +
                            10% de bônus
                        </p>

                        <p class="text-center mb-5 mt-4" >
                            <span class="alert alert-danger">
                                O BÔNUS DE 10% NA CONVERSÃO PARA LQX SÓ É VÁLIDO PARA CONVERSÕES REALIZADAS NESTA PÁGINA.
                            </span>
                        </p>

                        <p class="text-center">

                            <button class="btn btn-info" type="button" @click="confirm('LQX')"> CONVERSÃO PARA LQX
                            </button>

                            <button class="btn btn-warning" type="button" @click="confirm('BTC')"> CONVERSÃO PARA BTC
                            </button>

                        </p>

                    </div>
                </div>
                <footer class="slide-group__footer text-info" key="footer" @click="closeThisModal">
                    <h4 class="pointer text-info" @click="closeThisModal">X FECHAR</h4>
                </footer>
            </transition-group>
        </div>

        <modal @close="closeConfirmModal" v-show="isConfirmModalVisible">
            <template slot="header">
                <span class="tab-label text-dark">Confirmação de Operação</span>
            </template>
            <template slot="body">
                <p class="alert alert-danger">
                    Esta ação é IRREVERSÍVEL, ao clicar em "CONFIRMO A CONVERSÃO",
                    seus {{user.fiat_balance }} serão convertidos em
                    <span v-if="conversion_abbr==='LQX'">{{ user.fiat_to_lqx }}</span>
                    <span v-else>{{ user.fiat_to_btc  }}</span>
                </p>

                <p class="text-center">
                    <button class="btn btn-success" type="button" @click.prevent="showTokenPinModal('convert', action)">
                        CONFIRMO A CONVERSÃO {{ conversion_abbr}}
                    </button>

                </p>
            </template>
        </modal>

        <token-pin v-show="isTokenPinVisible" ref="tokenPinComponent"
                   @close-token-pin-modal="closeTokenPinModal" @token-data="handleTokenPinData"/>
    </div>
</template>

<script>
    import Modal from './../../layouts/Modal'
    import {mapGetters} from 'vuex'
    import TokenPin from "../../../../../liquidex-admin/src/components/verifications/TokenPin";

    export default {
        name: "NotificationModal",
        data() {
            return {
                isTokenPinVisible: false,
                count: null,
                dir: 0,
                current: 0,
                use3d: true,
                slides: [{}],
                isConfirmModalVisible: false,
                conversion_abbr: '',
                action: 10,
                token: {
                    code: null,
                    pin: null,
                },
            }
        },
        methods: {
            retrieveNotifications() {
                //
                this.$store.dispatch('retrieveNotificationsList')
                    .then(response => {
                        // this.slides = response.data.data[0];
                        for (let i = 0; i <= response.data.data.length; i++) {
                            if (response.data.data[i].statuses[0].status === 0 && response.data.data[i].type === 0) {
                                this.slides.push(response.data.data[i])
                            }
                        }

                    })
                    .catch(error => {
                        if (error.response) {
                            this.handleErrors(error.response)
                        }
                        this.loader = false
                    })
            },
            nav(dir) {
                this.dir = dir;
                let len = this.slides.length;
                // Loop around the array so last slide goes to first slide & vice-versa.
                this.current = ((this.current + dir % len) + len) % len;
            },
            sgBeforeLeave(el) {
                let rect = el.getBoundingClientRect();
                el.style.width = (rect.right - rect.left) + 'px';
                el.style.height = (rect.bottom - rect.top) + 'px';
                el.style.position = 'fixed';
                el.style.top = rect.top + 'px';
                el.style.left = rect.left + 'px';
            },
            closeConfirmModal() {
                this.isConfirmModalVisible = false
            },
            confirm(abbr) {
                this.isConfirmModalVisible = true
                this.conversion_abbr = abbr
            },
            closeThisModal() {
                this.$emit('close-modal')
            },
            convert() {
                this.$store.dispatch('sendFiatConversion', {
                    code: this.token.code,
                    pin: this.token.pin,
                    action: this.action,
                    abbr: this.conversion_abbr
                })
                    .then(
                        this.$toasted.show('solicitando...', {position: 'bottom-left', type: 'info'}).goAway(3000)
                    )
                    .then(response => {
                        this.$toasted.show(response.data.message, {
                            position: 'bottom-left',
                            type: 'success'
                        }).goAway(3000)
                        this.refresh()
                    }).catch(error => {
                    if (error.response) {
                        this.handleErrors(error.response)
                    }
                })
            },
            resetToken() {
                this.token.code = null
                this.token.pin = null
                this.$refs.tokenPinComponent.resetData()
            },
            refresh() {
                setTimeout(function () {
                    location.reload()
                }, 3000)
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
                this.convert()
            },
        },
        computed: {
            ...mapGetters([
                'user'
            ]),
            transitionName() {
                return 'sg-' +
                    (this.use3d ? '3d-' : '') +
                    (this.dir > 0 ? 'right' : 'left');
            }
        },
        mounted() {
            this.retrieveNotifications()
            setTimeout(() => {
                this.nav(1);
            }, 200)
            this.slides.splice(0, 1)

        },
        components: {
            TokenPin,
            Modal
        }
    }
</script>

<style scoped>
    .vue-modal-backdrop {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    }

    .modal {
        top: 1.6rem;
    }

    .sg-left-move,
    .sg-right-move {
        transition: transform 0.6s cubic-bezier(0.29, 0.15, 0.24, 0.97);
    }

    .sg-left-leave-active,
    .sg-right-leave-active {
        transition: opacity 0.3s linear, transform 0.3s cubic-bezier(0.64, 0.01, 0.67, 0.92);
    }

    .sg-left-enter-active,
    .sg-right-enter-active {
        transition: opacity 0.3s linear, transform 0.3s cubic-bezier(0.29, 0.15, 0.24, 0.97);
        transition-delay: .25s, .3s;
    }

    .sg-left-enter,
    .sg-right-enter,
    .sg-left-leave-to,
    .sg-right-leave-to {
        opacity: 0;
    }

    .sg-left-leave-to,
    .sg-right-enter {
        transform: translateX(30%);
    }

    .sg-left-enter,
    .sg-right-leave-to {
        transform: translateX(-30%);
    }

    /* ////////////////////////////////////////////////////////////////////////// */
    .sg-3d-left-move,
    .sg-3d-right-move {
        transition: transform 0.6s cubic-bezier(0.29, 0.15, 0.24, 0.97);
    }

    .sg-3d-left-leave-active,
    .sg-3d-right-leave-active,
    .sg-3d-left-enter-active,
    .sg-3d-right-enter-active {
        transform: perspective(700px) rotateY(0deg);
    }

    .sg-3d-left-leave-active,
    .sg-3d-right-leave-active {
        transition: transform 0.3s cubic-bezier(0.64, 0.01, 0.67, 0.92), opacity 0.1s linear;
        transition-delay: 0s, .2s;
    }

    .sg-3d-left-enter-active,
    .sg-3d-right-enter-active {
        transition: transform 0.3s cubic-bezier(0.29, 0.15, 0.24, 0.97), opacity 0.1s linear;
        transition-delay: .2s, .2s;
    }

    .sg-3d-left-enter,
    .sg-3d-right-enter,
    .sg-3d-left-leave-to,
    .sg-3d-right-leave-to {
        opacity: 0;
    }

    .sg-3d-left-leave-to,
    .sg-3d-right-enter {
        transform: perspective(700px) translateZ(-300px) rotateY(90deg);
    }

    .sg-3d-left-enter,
    .sg-3d-right-leave-to {
        transform: perspective(700px) translateZ(-300px) rotateY(-90deg);
    }

    /* ////////////////////////////////////////////////////////////////////////// */
    .slide-group {
        width: 80%;
        max-width: 90em;
        margin: auto;
        text-align: center;
    }

    .slide {
        background: #FFF;
        text-align: left;
        border: solid 1px #ccc;
        padding: 1rem;
        margin: 1rem 0;
        max-height: 50rem;
        overflow: auto;
    }

    .slide img {
        display: block;
        margin-bottom: 1rem;
    }

    /* ////////////////////////////////////////////////////////////////////////// */
    .nav-container {
        width: 90%;
        margin: auto;
        position: absolute;
        /*position: fixed;*/
        top: 50%;
        left: 0;
        right: 0;
        transform: translateY(-50%);
        display: flex;
        justify-content: space-between;
        z-index: 2;
    }

    .nav {
        display: block;
        width: 2em;
        fill: none;
        stroke: #000;
        cursor: pointer;
        transition: stroke 0.2s linear;
    }

    .nav:hover,
    .nav:focus {
        stroke: #f15268;
    }

    /* ////////////////////////////////////////////////////////////////////////// */
    .preloader {
        position: absolute;
        top: 0;
        left: 0;
        width: 1px;
        height: 1px;
        padding: 1px;
        box-sizing: content-box;
        overflow: hidden;
    }

    /* ////////////////////////////////////////////////////////////////////////// */
    * {
        box-sizing: border-box;
    }

    button {
        cursor: pointer;
    }

    svg,
    img {
        max-width: 100%;
        height: auto;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    p {
        margin: 0 0 1rem;
    }

    .pointer {
        cursor: pointer;
        text-decoration: underline red;
    }

</style>