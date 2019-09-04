<template>
    <div class="element-wrapper mt-5">
        <h6 class="mb-0">
            Últimas Operações
            <span class="animate-border my-3"></span>
        </h6>
        <div class="element-box-tp">
            <div class="table-responsive">
                <table class="table table-padded">
                    <thead>
                    <tr>
                        <th class="text-center"><i class="os-icon os-icon-calendar-time"></i> Execução</th>
                        <th class="text-center"><i class="os-icon os-icon-bar-chart"></i> Moeda</th>
                        <th class="text-center"><i class="os-icon os-icon-arrow-up-right"></i> Comprando de</th>
                        <th class="text-center"><i class="os-icon os-icon-coins-4"></i> Valor</th>
                        <th class="text-center"><i class="os-icon os-icon-arrow-down-right"></i> Vendendo para</th>
                        <th class="text-center"><i class="os-icon os-icon-coins-4"></i> Valor</th>
                        <th class="text-center"><i class="os-icon os-icon-arrow-up6"></i> Lucro</th>
                        <th class="text-center"><i class="os-icon os-icon-coins-4"></i> Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="trade in trades">
                        <td>{{trade.dateLocal}}</td>
                        <td>BTC/BRL</td>
                        <td>
                            <img alt="" :src="require(`@/assets/img/${trade.quote_exchange}.jpg`)">
                        </td>
                        <td>
                            {{trade.quotePriceBRL }}<br>
                            <small>{{trade.amountLocal }} BTC</small>
                        </td>
                        <td>
                            <img alt="" :src="require(`@/assets/img/${trade.base_exchange}.jpg`)">
                        </td>
                        <td>
                            {{trade.basePriceBRL }}<br>
                            <small>{{trade.amountLocal }} BTC</small>
                        </td>
                        <td>
                            {{trade.profitLocal}} BTC<br>
                            <small>{{trade.profitPercentLocal }} %</small>
                        </td>
                        <td>
                            <small>{{trade.profitBRL }}</small>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LastTrades",
        data() {
            return {
                trades: {},
                timer: null,
            }
        },
        methods: {
            retrieveLastTrades() {
                this.$store.dispatch('retrieveLastTrades')
                    .then(response => {
                        this.trades = response.data
                    })
                    .catch(error => {
                        if (error.response) {
                            this.handleErrors(error.response)
                        }
                    })
            }
            ,
        },
        mounted() {
            this.retrieveLastTrades();
            this.timer = setInterval(function () {
                this.retrieveLastTrades();
            }.bind(this), 15000);
        }
    }
</script>

<style scoped>

</style>
