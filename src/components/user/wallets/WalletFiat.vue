<template>
    <div>
        <div class="loader" v-if="loader"></div>
        <vue-headful title="Minhas Carteiras - Liquidex" description="Liquidex"/>

        <div class="element-wrapper compact pt-4 pb-0">
            <div class="element-actions d-sm-block">
                <a class="btn btn-primary btn-sm" href="/wallets/list">
                    <i class="os-icon os-icon-arrow-left"></i><span> Ver Carteiras</span>
                </a>
            </div>

            <h6 class="element-header mb-0">
                <i class="os-icon os-icon-wallet-loaded"></i> {{ wallet.coin.name }}
            </h6>
            <div class="element-box-tp">
                <div class="row">
                    <div class="col-12">
                        <div class="element-balances justify-content-between mobile-full-width">
                            <div class="balance balance-v2">
                                <div class="balance-title">
                                    Meu Saldo
                                </div>
                                <div class="balance-value">
                                    <span class="font-50">{{ wallet.coin.shortname }} {{wallet.balance_rounded}}</span>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>

        <fiat-send :wallet="wallet"></fiat-send>

        <transactions-list-wallet :symbol="wallet.coin.abbr"
                                  :address="wallet.address"
                                  v-if="wallet.type===1"
                                  ref="transactionsList"></transactions-list-wallet>

    </div>
</template>

<script>
    import FiatSend from './FiatSend';
    import TransactionsListWallet from './../transactions/TransactionsListWallet';
    import {mapGetters} from 'vuex'

    export default {
        name: "WalletFiat",
        data() {
            return {
                transactions: {
                    data: []
                },
                count: null,
                loading: false,
                wallet: {
                    coin: {
                        name: 'carregando...',
                        icon: 'brl_icon.png',
                        shortname: 'R$'
                    },
                    balance_rounded: 'carregando...',
                    address: 'carregando...',
                },
                loader: true,
                depositWindow: false,
                draftWindow: false,
                sendWindow: false,
            }
        },
        computed: {
            ...mapGetters([
                'user'
            ]),
        },
        methods: {
            openSendWindow() {
                this.draftWindow = this.depositWindow = false
                this.sendWindow = true
            },
            openDepositWindow() {
                this.draftWindow = this.sendWindow = false
                this.depositWindow = true
            },
            openDraftWindow() {
                this.depositWindow = this.sendWindow = false
                this.draftWindow = true
            },
            retrieveWallet() {
                this.$store.dispatch('retrieveWallet', this.$route.params.symbol)
                    .then(response => {
                        this.wallet = response.data.wallet
                        this.loader = false
                    })
                    .catch(error => {
                        if (error.response) {
                            this.handleErrors(error.response)
                        }
                    })
            },
        },
        components: {
            FiatSend,
            TransactionsListWallet
        },
        mounted() {
            this.retrieveWallet()
        },
    }
</script>

<style scoped>

</style>
