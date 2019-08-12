<template>
    <div>
        <vue-headful title="Status Mineração" description="Navi Capital"
        />
        <div class="content-box">

            <div class="row">

                <div class="col-sm-12">
                    <div class="element-wrapper">
                        <h6 class="element-header">
                            Pool Status
                        </h6>
                        <div class="element-content mb-4">
                            <div class="tablo-with-chart">
                                <div class="row">

                                    <div class="col-sm-6">
                                        <!--START - Chart Box-->
                                        <div class="element-box">
                                            <div class="el-tablo bigger highlight bold-label">
                                                <div class="value">
                                                    {{ pool.hashrate | roundValue }} Th/s
                                                </div>
                                                <div class="label">
                                                    Hash Rate
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">

                                            <div class="col-sm-6">
                                                <a class="element-box el-tablo centered trend-in-corner padded bold-label"
                                                   href="#">
                                                    <div class="value">
                                                        {{ pool.round_duration }}
                                                    </div>
                                                    <div class="label">
                                                        Duração da Rodada
                                                    </div>
                                                </a>
                                            </div>
                                            <div class="col-sm-6">
                                                <a class="element-box el-tablo centered trend-in-corner padded bold-label"
                                                   href="#">
                                                    <div class="value">
                                                        {{ reward_estimate * pool.ths_multi | fixValue }}
                                                    </div>
                                                    <div class="label">
                                                        Total do Dia
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                        <!--END - Chart Box-->
                                    </div>

                                    <div class="col-sm-6">
                                        <div class="tablos">
                                            <div class="row">
                                                <div class="col-sm-6">
                                                    <a class="element-box el-tablo centered trend-in-corner padded bold-label"
                                                       href="#">
                                                        <div class="value">
                                                            {{ workers.alive }}
                                                        </div>
                                                        <div class="label">
                                                            Workers
                                                        </div>
                                                        <div class="trending trending-up">
                                                            <span>Online</span><i class="os-icon os-icon-arrow-up2"></i>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div class="col-sm-6">
                                                    <a class="element-box el-tablo centered trend-in-corner padded bold-label"
                                                       href="#">
                                                        <div class="value">
                                                            {{ workers.dead }}
                                                        </div>
                                                        <div class="label">
                                                            Workers
                                                        </div>
                                                        <div class="trending trending-down">
                                                            <span>Down</span><i class="os-icon os-icon-arrow-down"></i>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-6">
                                                    <a class="element-box el-tablo centered trend-in-corner padded bold-label"
                                                       href="#">
                                                        <div class="value">
                                                            {{ pool.confirmed_reward * pool.ths_multi | fixValue }}
                                                        </div>
                                                        <div class="label">
                                                            Confirmados
                                                        </div>
                                                        <div class="trending trending-up">
                                                            <span>Recompensas</span><i
                                                                class="os-icon os-icon-arrow-up2"></i>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div class="col-sm-6">
                                                    <a class="element-box el-tablo centered trend-in-corner padded bold-label"
                                                       href="#">
                                                        <div class="value">
                                                            {{ pool.unconfirmed_reward * pool.ths_multi | fixValue }}
                                                        </div>
                                                        <div class="label">
                                                            Não confirmadas
                                                        </div>
                                                        <div class="trending trending-unconfirmed">
                                                            <span>Recompensas</span><i
                                                                class="os-icon os-icon-arrow-up2"></i>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-sm-12 col-md-12">
                    <div class="element-wrapper">
                        <h6 class="element-header">
                            Blocos / Recompensas
                        </h6>
                        <div class="element-box-tp">
                            <div class="table-responsive">
                                <table class="table table-padded">
                                    <thead>
                                    <tr>
                                        <th class="text-center"><i class="os-icon os-icon-bar-chart"></i> Bloco</th>
                                        <th class="text-center"><i class="os-icon os-icon-calendar-time"></i> Tempo</th>
                                        <th class="text-center"><i class="os-icon os-icon-coins-4"></i> Recompensa</th>
                                        <th class="text-center"><i class="os-icon os-icon-check-circle"></i> Confirmação
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="block in blocks.data" class="cursor-pointer" @click.prevent="openExplorer(block.block)">
                                        <td>
                                            {{ block.block}}
                                        </td>
                                        <td>{{ block.diff }}</td>
                                        <td>{{ block.reward * pool.ths_multi | fixValue8 }}</td>
                                        <td>{{ block.confirmations }}%</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                            <pagination :pagination="blocks" @paginate="retrieveMiningBlocks()" :offset="10"/>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import Pagination from './../layouts/Pagination'

    export default {
        name: "Mining",
        components: {
            Pagination
        },
        data() {
            return {
                pool: {
                    unconfirmed_reward: '...',
                    rating: '...',
                    nmc_send_threshold: '...',
                    unconfirmed_nmc_reward: '...',
                    estimated_reward: '...',
                    hashrate: '...',
                    confirmed_nmc_reward: '...',
                    send_threshold: '...',
                    confirmed_reward: '...'
                },
                workers: {
                    alive: 0,
                    dead: 0
                },
                reward_estimate: 0,
                blocks: {
                    current_page: 1
                },
                timer: null,
                reward_chart: {}
            }
        },
        methods: {
            openExplorer(block){
                window.open("https://www.blockchain.com/btc/block-height/"+block)
            },
            retrieveMiningStatus() {
                this.$store.dispatch('retrieveMiningStatus')
                    .then(response => {
                        this.pool = response.data.pool
                        this.plan = response.data.plan
                        this.reward_estimate = response.data.reward_estimate
                        this.workers.alive = response.data.workers_alive
                        this.workers.dead = response.data.workers_dead
                    })
                    .catch(error => {
                        if (error.response) {
                            this.handleErrors(error.response)
                        }
                    })
            },
            retrieveMiningBlocks() {
                this.$store.dispatch('retrieveMiningBlocks', this.blocks.current_page)
                    .then(response => {
                        this.blocks = response.data
                    })
                    .catch(error => {
                        if (error.response) {
                            this.handleErrors(error.response)
                        }
                    })
            },
        },
        mounted() {
            this.retrieveMiningStatus();
            this.retrieveMiningBlocks();

            this.timer = setInterval(function () {
                this.retrieveMiningStatus();
                this.retrieveMiningBlocks();
            }.bind(this), 60000);
        }
    }
</script>

<style scoped>
    .el-tablo.bigger .value {
        font-size: 2rem !important;
    }

    .trending-unconfirmed {
        background: #047bf8;
        color: #fff
    }

    .element-wrapper {
        padding-bottom: 0 !important;
    }
    .cursor-pointer{
        cursor: pointer;
    }
</style>
