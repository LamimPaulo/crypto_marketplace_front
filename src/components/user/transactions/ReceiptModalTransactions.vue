<template>
    <div name="vue-modal-fade">
        <div class="receipt-modal-backdrop">

            <div class="btn-group btn-group-lg btn-group-vertical topright" role="group" aria-label="Controls">
                <button type="button" class="btn btn-secondary" @click="closeThisModal"><i class="os-icon os-icon-close"
                                                                                           style="font-size: 1.9rem;"></i>
                </button>
                <button type="button" class="btn btn-secondary" @click="print()"><i class="os-icon os-icon-printer"
                                                                                    style="font-size: 1.9rem;"></i>
                </button>
            </div>


            <div id="receipt" class="receipt" v-if="transaction.coin" ref="printReceipt">
                <div class="receipt__header">
                    <div class="receipt__logo-wrapper">
                        <img src="https://s3.amazonaws.com/navi-public/api/clients/3/cbed47c0-5323-4873-baf7-0284f80bbf0a.png"
                             alt="Liquidex" class="receipt__logo">
                    </div>

                    <div class="receipt__header-info">
                        <div class="receipt__ref d-flex justify-content-end">
                            <strong class="pr-2">Transação:</strong>
                            <!--transactions-->
                            <span v-if="transaction.category===1">
                              {{ transaction.coin.abbr}} {{ transaction.type === 1 ? 'Recebido' : 'Enviado' }}
                            </span>

                            <!--orders-->
                            <span v-if="transaction.category===2">
                              {{ transaction.type === 1 ? 'Ordem de Compra' : 'Ordem de Venda' }}
                            </span>

                            <!--deposits-->
                            <div class="value" v-if="transaction.category===3">
                                Depósito {{ transaction.coin.abbr}}
                            </div>

                            <!--drafts-->
                            <div class="value" v-if="transaction.category===4">
                                Saque {{ transaction.coin.abbr}}
                            </div>

                            <!--conversions-->
                            <div class="value" v-if="transaction.category===6">
                                Conversão {{ transaction.coin.abbr}}
                                <i class="os-icon os-icon-arrow-down-left text-success" v-if="transaction.type===1"></i>
                                <i class="os-icon os-icon-arrow-down-right text-danger" v-if="transaction.type===2"></i>
                            </div>

                            <!--transfer-->
                            <div class="value" v-if="transaction.category===8">
                                Transferência
                                <span v-if="transaction.type===1">Recebida</span>
                                <span v-if="transaction.type===2">Efetuada</span>
                            </div>
                            <!--Investimento-->
                            <div class="value" v-if="transaction.category===9">
                                <span v-if="transaction.type===1">Resgate</span>
                                <span v-if="transaction.type===2">Investimento</span>
                                Nanotech
                            </div>
                            <!--Index Fund-->
                            <div class="value" v-if="transaction.category===10">
                                <span v-if="transaction.type===1">Venda</span>
                                <span v-if="transaction.type===2">Aquisição</span>
                                Index Fund
                            </div>
                            <!--Envio Credminer-->
                            <div class="value" v-if="transaction.category===18">
                                Envio R$ Credminer
                            </div>
                        </div>
                        <div class="receipt__ref d-flex justify-content-end">
                            <strong class="pr-1">Moeda:</strong>
                            <span> {{ transaction.coin.name }}</span>
                        </div>
                    </div>
                </div>

                <div class="receipt__subheader-wrapper">
                    <div class="receipt__subheader">
                        <h1 class="receipt__username">{{ this.$store.state.user.name }}</h1>


                        <!-- <div class="receipt__help-text">
                          <h6>{{ transaction.user_account.nickname }}</h6>
                          <span class="receipt__help-text">
                          <strong class="pr-1">Agência: </strong>{{ transaction.user_account.agency }} - {{ transaction.user_account.agency_digit }}
                          <strong class="ml-5 pr-1">Conta: </strong>{{ transaction.user_account.account }} - {{ transaction.user_account.account_digit }}
                        </div> -->

                    </div>
                </div>

                <div class="receipt__cart">
                    <div class="d-flex justify-content-end">
                        <strong class="pr-1">Status:</strong> <span :class="'badge badge-' + transaction.statusClass">{{ transaction.statusClient }}</span>
                    </div>


                    <hr/>

                    <ul class="receipt__cart-list">
                        <li class="receipt__cart-item" v-if="transaction.fee>0">
                            <span class="receipt__item-name" v-if="transaction.category===4">TED:</span>
                            <span class="receipt__item-name" v-else>Fee:</span>
                            <span class="receipt__item-price" v-if="transaction.coin.is_crypto">{{ transaction.feeRounded }} {{transaction.coin.abbr}}</span>
                            <span class="receipt__item-price" v-else> {{transaction.coin.shortname}} {{ transaction.feeRounded }}</span>
                        </li>

                        <li class="receipt__cart-item" v-if="transaction.tax>0">
                            <span class="receipt__item-name">Taxa:</span>
                            <span class="receipt__item-price" v-if="transaction.coin.is_crypto">{{ transaction.taxRounded }} {{transaction.coin.abbr}}</span>
                            <span class="receipt__item-price" v-else> {{transaction.coin.shortname}} {{ transaction.taxRounded }}</span>
                        </li>

                        <li class="receipt__cart-item">
                            <span class="receipt__item-name">Valor:</span>
                            <span class="receipt__item-price" v-if="transaction.coin.is_crypto">{{ transaction.amountRounded }} {{transaction.coin.abbr}}</span>
                            <span class="receipt__item-price" v-else> {{transaction.coin.shortname}} {{ transaction.amountRounded }}</span>
                        </li>

                        <li class="receipt__cart-item">
                            <span class="receipt__cart-total">Total</span>
                            <span class="receipt__item-price" v-if="transaction.coin.is_crypto">{{ transaction.totalRounded }} {{transaction.coin.abbr}}</span>
                            <span class="receipt__item-price" v-else> {{transaction.coin.shortname}} {{ transaction.totalRounded }}</span>
                        </li>
                    </ul>

                    <hr/>
                    <span class="receipt__date d-flex justify-content-center" v-if="transaction.info">{{transaction.info}}<br><br></span>
                    <span class="receipt__date d-flex justify-content-center"><strong class="pr-1">Transação efetuada em:</strong>{{transaction.dateLocal}}</span>
                </div>

                <div class="receipt__footer">
                    <h6 class="text-center">
                        <!--transactions-->
                        <a target="_blank" :href="transaction.coin.tx_explorer + transaction.tx"
                           v-if="transaction.category===1">
                            {{ transaction.tx }}
                        </a>
                        <!--orders-->
                        <a target="_blank" :href="'/order/' + transaction.tx" v-else-if="transaction.category===2">
                            {{ transaction.tx }}
                        </a>
                        <!--conversions-->
                        <a target="_blank" :href="'/conversion/' + transaction.tx" v-else-if="transaction.category===6">
                            {{ transaction.tx }}
                        </a>
                        <span v-else> {{ transaction.tx }} </span>
                    </h6>
                </div>
            </div>


            <div class="btn-group bottom" role="group" aria-label="Basic example">
                <button @click.prevent="showSocialShareModal()"
                        type="button" class="btn btn-secondary"><i class="os-icon os-icon-share"></i>Compartilhar
                </button>
                <button class="btn btn-danger" type="submit"
                        @click.prevent="showTokenPinModal('cancelDraft', 18, transaction)"
                        v-if="transaction.category===4&&transaction.status===1">Cancelar Saque
                </button>
            </div>

        </div>


        <token-pin v-show="isTokenPinVisible" ref="tokenPinComponent"
                   @close-token-pin-modal="closeTokenPinModal"
                   @token-data="handleTokenPinData"/>

        <social-share-modal v-show="isSocialShareModalVisible" ref="linkToShare"
                            @close-social-share-modal="closeSocialShareModal"/>

    </div>
</template>

<script>
	import Modal from './../../layouts/Modal'
	import TokenPin from './../../verifications/TokenPin'
	import {Printd} from 'printd'
	import SocialShareModal from './../../layouts/SocialShareModal'

	export default {
		name: "ReceiptModalTransactions",
		props: ['transaction'],
		data() {
			return {
				isTokenPinVisible: false,
				isSocialShareModalVisible: false,
				token: {
					code: null,
					pin: null,
					action: 18,
					transaction: null
				},
				output: null
			}
		},
		methods: {
			closeThisModal() {
				this.$emit('close-token-modal')
			},
			cancelDraft() {
				this.$toasted.show('enviando solicitação...', {position: 'bottom-left', type: 'info'}).goAway(3000)
				this.$store.dispatch('sendCancelDraft', this.token)
					.then(response => {
						this.$toasted.show(response.data.message, {position: 'bottom-left', type: 'success'}).goAway(3000)
						this.closeThisModal()
						this.$emit('retrieve-transactions')
					})
					.catch(error => {
						if (error.response) {
							this.handleErrors(error.response)
						}
					})
			},
			showTokenPinModal(method, action, transaction) {
				this.isTokenPinVisible = true
				this.token.transaction = transaction.id
				this.$refs.tokenPinComponent.setData(method, action)
			},
			showSocialShareModal() {
				this.isSocialShareModalVisible = true
			},
			closeTokenPinModal() {
				this.isTokenPinVisible = false;
			},
			closeSocialShareModal() {
				this.isSocialShareModalVisible = false;
			},
			handleTokenPinData(data) {
				this.token.code = data.code
				this.token.pin = data.pin

				if (data.method === 'cancelDraft') {
					this.cancelDraft()
				}
			},
			print() {
				const cssText = `
        .receipt {
          background: #fff;
          box-shadow: 2px 2px 20px 1px;
          clear: both;
        }

        .receipt__header {
          display: flex;
          -ms-align-items: flex-start;
          align-items: flex-start;

          padding: 30px 30px 45px;
          background: #fff;
          border-top-right-radius: 5px;
          border-top-left-radius: 5px;
        }

        .receipt__logo-wrapper {
          flex: 1 0 40%;
        }

        .receipt__logo {
          display: block;
          width: 130px;
          height: auto;
          margin-left: 15px;
        }

        .receipt__header-info {
          position: absolute;
          top: 20px;
          right: 16px;
          font-size: 18px;
        }

        .receipt__date,
        .receipt__ref {
          display: block;
          font-size: 14px;
          color: #005093;;
          font-weight: 300;
        }

        .receipt__date {
          margin-bottom: 5px;
        }

        .receipt__subheader-wrapper {
          background: #fff;
          padding-bottom: 20px;
        }

        .receipt__subheader {
          padding: 0 45px 0 40px;
          border-left: 5px solid #029de0;
        }

        .receipt__username {
          margin: 0 0 10px 0;
          font-size: 22px;
          font-weight: 600;
        }

        .receipt__help-text {
          color: #005093;;
          font-weight: 300;
        }

        .receipt__cart {
          display: block;
          padding: 25px 30px 45px;
        }

        .receipt__cart-title {
          display: block;
          margin-top: 0;
          margin-bottom: 25px;
          text-align: center;
        }

        .receipt__cart-list {
          margin: 0;
          padding: 0 15px;
          list-style: none;
        }

        .receipt__cart-item {
          display: block;
          padding-top: 20px;
          margin-bottom: 20px;
          border-top: 2px dashed #005093;;

          font-size: 18px;
        }

        .receipt__cart-item:first-child {
          border-top: 0;
        }

        .receipt__cart-item:last-child {
          margin-bottom: 0;
          border-top: 2px solid #199de1;
        }

        .receipt__item-name {
          color: #005093;;
          font-weight: 300;
        }

        .receipt__item-price {
          float: right;
          letter-spacing: 1px;
        }

        .receipt__cart-total {
          font-size: 20px;
          text-transform: uppercase;
        }

        .receipt__footer {
          position: relative;
          padding: 30px 20px;
          border-top: 2px dashed #FF84A1;

          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
          text-align: center;
        }

        .receipt__footer::before {
          left: 0;
          border-left: 7px solid #ff85a1;
        }

        .receipt__footer::after {
          right: 0;
          border-right: 7px solid #ff85a1;
        }

        .receipt__barcode {
          display: block;
          margin: 0 auto;
          max-width: 300px;
          height: auto;
        }
        `
				const d = new Printd()
				d.print(document.getElementById('receipt'), [cssText])
			}
		},
		components: {
			Modal,
			TokenPin,
			SocialShareModal
		},
		mounted() {
			// print()
		},
	}
</script>

<style scoped>
    .bottom {
        position: absolute;
        bottom: 3%;
        /* right: 16px; */
        font-size: 18px;
    }

    .topright {
        position: absolute;
        top: 8px;
        right: 16px;
        font-size: 18px;
        z-index: 20000;
    }

    .receipt-modal-backdrop {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 5;
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        z-index: 99;
    }

    .receipt {
        background: #fff;
        box-shadow: 2px 2px 20px 1px;
        -webkit-border-radius: 18px;
        -moz-border-radius: 18px;
        border-radius: 18px;

        position: fixed;
        left: 50%;
        display: inline-block;
        max-width: 100%;
        min-width: 500px;
        clear: both;

        -webkit-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
        -o-transform: translateX(-50%);
        transform: translateX(-50%);
    }

    .receipt__header {
        display: flex;
        -ms-align-items: flex-start;
        align-items: flex-start;

        padding: 30px 30px 45px;
        background: #fff;
        border-top-right-radius: 18px;
        border-top-left-radius: 18px;
    }

    .receipt__logo-wrapper {
        flex: 1 0 40%;
    }

    .receipt__logo {
        display: block;
        width: 130px;
        height: auto;
        margin-left: 15px;
    }

    .receipt__header-info {
        flex: 1 0 50%;
    }

    .receipt__date,
    .receipt__ref {
        display: block;
        font-size: 14px;
        color: #005093;
        font-weight: 300;
    }

    .receipt__date {
        margin-bottom: 5px;
    }

    .receipt__subheader-wrapper {
        background: #fff;
        padding-bottom: 20px;
    }

    .receipt__subheader {
        padding: 0 45px 0 40px;
        border-left: 5px solid #029de0;
    }

    .receipt__username {
        margin: 0 0 10px 0;
        font-size: 22px;
        font-weight: 600;
    }

    .receipt__help-text {
        color: #005093;;
        font-weight: 300;
    }

    .receipt__cart {
        display: block;
        padding: 25px 30px 45px;
    }

    .receipt__cart-title {
        display: block;
        margin-top: 0;
        margin-bottom: 25px;
        text-align: center;
    }

    .receipt__cart-list {
        margin: 0;
        padding: 0 15px;
        list-style: none;
    }

    .receipt__cart-item {
        display: block;
        padding-top: 20px;
        margin-bottom: 20px;
        border-top: 2px dashed #005093;;

        font-size: 18px;
    }

    .receipt__cart-item:first-child {
        border-top: 0;
    }

    .receipt__cart-item:last-child {
        margin-bottom: 0;
        border-top: 2px solid #66c348;
    }

    .receipt__item-name {
        color: #005093;;
        font-weight: 300;
    }

    .receipt__item-price {
        float: right;
        letter-spacing: 1px;
    }

    .receipt__cart-total {
        font-size: 20px;
        text-transform: uppercase;
    }

    .receipt__footer {
        position: relative;
        padding: 30px 20px;
        border-top: 2px dashed #FF84A1;

        border-bottom-left-radius: 18px;
        border-bottom-right-radius: 18px;
    }

    .receipt__footer::before,
    .receipt__footer::after {
        content: '';
        position: absolute;
        top: 0;
        border: 4px solid transparent;

        -webkit-transform: translateY(calc(-50% - 1px));
        -ms-transform: translateY(calc(-50% - 1px));
        -o-transform: translateY(calc(-50% - 1px));
        transform: translateY(calc(-50% - 1px));
    }

    .receipt__footer::before {
        left: 0;
        border-left: 7px solid #ff85a1;
    }

    .receipt__footer::after {
        right: 0;
        border-right: 7px solid #ff85a1;
    }

    .receipt__barcode {
        display: block;
        margin: 0 auto;
        max-width: 300px;
        height: auto;
    }

    /**
     * Paypal Animations
     */

    @keyframes show-paypal {
        0% {
            opacity: 0;
            transform: scale(0) translateX(-50%);
        }

        85% {
            opacity: 0;
        }

        100% {
            opacity: 1;
            transform: scale(1) translateX(-50%);
        }
    }

    .paypal {
        transform-origin: top left;
        animation: show-paypal 1s ease-out forwards;
    }

    @keyframes show-subheader {
        0% {
            opacity: 0;
            transform: scale(0);
        }

        65% {
            opacity: 0;
        }

        100% {
            opacity: 1;
            transform: scale(1);
        }
    }

    .receipt__subheader {
        opacity: 0;
        animation: show-subheader 1s 0.5s ease-out forwards;
    }

    @keyframes slide-down {
        to {
            transform: perspective(100px) rotateX(0) translate3d(0, 0, 0);
        }
    }

    .receipt__cart {
        background-color: #fff;

        transform-style: preserve-3d;
        transform-origin: top center;
        transform: perspective(100px) rotateX(-90deg) translate3d(0, 0, 0);

        animation: slide-down 0.4s 2s ease-out forwards;
    }

    .receipt__footer {
        background-color: #fff;

        transform-style: preserve-3d;
        transform-origin: top center;
        transform: perspective(100px) rotateX(-90deg) translate3d(0, 0, 0);

        animation: slide-down 0.4s 2.5s ease-out forwards;
    }

    @keyframes show-cart-title {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .receipt__cart-title {
        opacity: 0;
        transform: translateY(10px);

        animation: show-cart-title 0.5s 2.25s ease-in forwards;
    }

    @keyframes show-cart-item {
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    .receipt__cart-item {
        opacity: 0;
        transform: translateX(-30px);

        animation: show-cart-item 0.3s 2.75s ease-in forwards;
    }

    .receipt__cart-item:nth-child(2) {
        animation-delay: 2.9s;
    }

    .receipt__cart-item:nth-child(3) {
        animation-delay: 3.05s;
    }

    .receipt__cart-item:nth-child(4) {
        animation-delay: 3.2s;
    }

</style>
