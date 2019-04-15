<template>
  <transition name="vue-modal-fade">

    <div class="vue-modal-backdrop" @click="closeThisModal">
         <div class="receipt">

          <div class="receipt__header">
            <div class="receipt__logo-wrapper">
              <img src="https://s3.amazonaws.com/navi-public/api/clients/3/cbed47c0-5323-4873-baf7-0284f80bbf0a.png" alt="Liquidex" class="receipt__logo">
            </div>

            <div class="receipt__header-info">
              <span class="receipt__date">25.04.2016</span>
              <span class="receipt__ref">Nº do documento: 36566337</span>
            </div>
          </div>

          <div class="receipt__subheader-wrapper">
            <div class="receipt__subheader">
              <h1 class="receipt__username">Username Nome Usuário</h1>
              <span class="receipt__help-text">
                <strong>Agência: </strong>0655 <strong class="ml-5">Conta: </strong>642601-8
              </span>
            </div>
          </div>

          <div class="receipt__cart">
            <strong>Descrição:</strong> <span>AGIPLAN ADMINISTRADORA DE CONSORCIOS S.A</span>

            <hr />

            <ul class="receipt__cart-list">
              <li class="receipt__cart-item">
                <span class="receipt__item-name">Data de vencimento:</span>
                <span class="receipt__item-price">15/03/2019</span>
              </li>
    
              <li class="receipt__cart-item">
                <span class="receipt__item-name">Valor original:</span>
                <span class="receipt__item-price">R$487.71</span>
              </li>
              
              <li class="receipt__cart-item">
                <span class="receipt__cart-total">Valor do Pagamento</span>
                <span class="receipt__item-price">R$487.71</span>
              </li>
            </ul>
          </div>

          <div class="receipt__footer">
            <h5 class="text-center">CÓDIGO DE BARRAS:</h5>
            <h6 class="text-center">
              12190.00005 00163.147507 00817.927544 1 78290000048771
            </h6>
          </div>
        </div>
    </div>

  </transition>
</template>

<script>
//   import TokenPin from './../../verifications/TokenPin'

  export default {
    name: "ReceiptModal",
    props: ['transaction'],
    data() {
      return {
        isTokenPinVisible: false,
        token: {
          code: null,
          pin: null,
          action: 18,
          transaction: null
        }
      }
    },
    methods: {
      closeThisModal() {
        this.$emit('close-token-modal')
      },
      cancelDraft() {
        this.$toasted.show('enviando solicitação...', {position: 'bottom-left'}).goAway(3000)
        this.$store.dispatch('sendCancelDraft', this.token)
          .then(response => {
            this.$toasted.show(response.data.message, {position: 'bottom-left'}).goAway(3000)
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
      closeTokenPinModal() {
        this.isTokenPinVisible = false;
      },
      handleTokenPinData(data) {
        this.token.code = data.code
        this.token.pin = data.pin

        if (data.method === 'cancelDraft') {
          this.cancelDraft()
        }
      },
    },
    components: {
    //   TokenPin
    }
  }
</script>

<style scoped>
  .receipt-modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
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
  background: #fcffcd;
  box-shadow: 2px 2px 20px 1px;

  position: fixed;
  left: 50%;
  display: inline-block;
  max-width: 100%;
  width: auto;
  clear: both;

  -webkit-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  -o-transform: translateX(-50%);
  transform: translateX(-50%);
}

.receipt:before {
  content: '';
  position: absolute;
  display: block;
  height: 10px;
  bottom: -10px;
  left: 0;
  right: 0;
  background: linear-gradient(45deg, transparent 33.333%, #fcffcd 33.333%, #fcffcd 66.667%, transparent 66.667%), linear-gradient(-45deg, transparent 33.333%, #fcffcd 33.333%, #fcffcd 66.667%, transparent 66.667%);
  background-size: 8px 20px;
  /* toothSize doubleHeight */
  background-position: 0 -10px;
  /* horizontalOffset -height */
}
.receipt:after {
  content: '';
  position: absolute;
  display: block;
  height: 10px;
  top: -10px;
  left: 0;
  right: 0;
  background: linear-gradient(45deg, #fcffcd 33.333%, transparent 33.333%, transparent 66.667%, #fcffcd 66.667%), linear-gradient(-45deg, #fcffcd 33.333%, transparent 33.333%, transparent 66.667%, #fcffcd 66.667%);
  background-size: 8px 20px;
  /* toothSize doubleHeight */
  background-position: 0 -10px;
  /* horizontalOffset -height */
}

.receipt__header {
  display: flex;
  -ms-align-items: flex-start;
  align-items: flex-start;

  padding: 30px 30px 45px;
  background: #fcffcd;
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
  flex: 1 0 50%;
}

.receipt__date,
.receipt__ref {
  display: block;
  font-size: 19px;
  color: #939232;;
  font-weight: 300;
}

.receipt__date {
  margin-bottom: 5px;
}

.receipt__subheader-wrapper {
  background: #fcffcd;
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
  color: #939232;;
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
  border-top: 2px dashed #939232;;

  font-size: 18px;
}

.receipt__cart-item:first-child {
  border-top: 0;
}

.receipt__cart-item:last-child {
  margin-bottom: 0;
  border-top: 2px solid #FFE155;
}

.receipt__item-name {
  color: #939232;;
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
  background-color: #fcffcd;

  transform-style: preserve-3d;
  transform-origin: top center;
  transform: perspective(100px) rotateX(-90deg) translate3d(0, 0, 0);

  animation: slide-down 0.4s 2s ease-out forwards;
}

.receipt__footer {
  background-color: #fcffcd;

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
