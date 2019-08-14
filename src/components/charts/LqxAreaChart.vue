<template>
    <div class="container-fluid horizontal-center">
        <area-chart class="row-fluid" :colors="['#bddaf5', '#7cb5ec']" :data="chartData" :options="{responsive: true}" width="1020px" height="300px"></area-chart>
    </div>
</template>

<script>
    import Vue from 'vue'
    import VueChartkick from 'vue-chartkick'
    import Chart from 'chart.js'

    Vue.use(VueChartkick, {adapter: Chart})

    export default {
        name: "LqxAreaChart",
        props: ['chartData'],
        data () {
            return {
                // chart_data: [],
                //chartData: [["24/04/2019", 0.020], ["25/04/2019", 0.011], ["26/04/2019", 0.045], ["27/04/2019", 0.051], ["28/04/2019", 0.020],["29/04/2019", 0.020], ["30/04/2019", 0.011], ["31/04/2019", 0.045], ["01/05/2019", 0.051], ["02/05/2019", 0.020]],
            }
        }
    }
</script>

<style scoped>

</style>