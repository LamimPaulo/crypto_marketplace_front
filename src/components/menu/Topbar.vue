<template>
    <div>
        <marquee-text class="dark-bg test" :repeat="5" :duration="60">
            <div>


            </div>
        </marquee-text>

    </div>
</template>

<script>
    import DropdownProfile from './DropdownProfile'
    import {mapGetters} from 'vuex'
    import Vue from 'vue'
    import MarqueeText from 'vue-marquee-text-component'
    import OrderWindow from './../user/orders/OrderWindow'

    Vue.component('marquee-text', MarqueeText)

    export default {
        name: "Topbar",
        data() {
            return {
                isOrderWindowVisible: false,
                quotes: [],
                timer: '',
                coin: [],
            }
        },
        methods: {
            closeModalOrder() {
                this.isOrderWindowVisible = false
            },
            showModalOrder(coin, type, fiat) {
                this.coin = coin
                this.$refs.orderWindow.setOrderCoins(coin.abbr, fiat)
                if (type === 'buy') {
                    this.$refs.orderWindow.showBuyWindow()
                } else {
                    this.$refs.orderWindow.showSellWindow()
                }

                this.isOrderWindowVisible = true
            },
            retrieveQuotes() {
                this.$store.dispatch('retrieveQuotes')
                    .then(response => {
                        this.quotes = response.data

                    }).catch(error => {
                    if (error.response) {
                        this.handleErrors(error.response)
                    }
                })
            },
        },
        mounted() {
            this.retrieveQuotes();
            this.timer = setInterval(function () {
                this.retrieveQuotes();
            }.bind(this), 60000);

        },
        components: {
            DropdownProfile,
            MarqueeText,
            OrderWindow
        },
        computed: {
            ...mapGetters([
                'user'
            ]),
        }
    }
</script>

<style scoped>
    .dark-bg {
        background-color: #293144;
        padding: 3px 10px;
        z-index: 20
    }

    .market {
        width: 150px;
        display: inline-block;
        height: 36px;
        margin-right: 10px;
        border-right: 3px solid #293144;
        padding-right: 10px;
        box-shadow: 1px 0 0px #6f6f6f;
    }

    .market .market-share {
        float: left;
        width: 100%;
    }

    .market .market-share .share-name {
        float: left;
        margin: 0;
        font-size: .9rem;
    }

    .market .market-share .share-name a {
        color: #fff;
    }

    .market .market-share .marketdata {
        float: right;
    }

    .market .marketchangedata {
        float: left;
        width: 100%;
    }

    .market .marketchangedata .marketLast {
        color: #fff;
        float: left;
        font-size: 1.3em;
    }

    .market .marketchangedata .marketlastchange {
        float: left;
        color: #fff;
    }

    .market .marketchangedata .marketpercent {
        float: right;
        color: #fff;
    }

    .market .marketchangedata .marketpercent i {
        padding-right: 5px;
    }

    .market .marketpercent.red i, .market .marketlastchange.red, .market .marketpercent.red {
        color: #f44336;
        font-size: .9em;
        cursor: pointer;
    }

    .market .marketpercent.green i, .market .marketlastchange.green, .market .marketpercent.green {
        color: #26c281;
        font-size: 1.1em;
        cursor: pointer;
    }

    .red {
        color: #f44336;
    }

    .green {
        color: #26c281;
    }

    @media (max-width: 767px) {
        .test {
            max-width: 100%
        }

    }


</style>
