<template>
    <ul class="main-menu">
        <li class="sub-header"><span>Layouts</span></li>
        <li class="selected has-sub-menu">
        
        <!-- <li class=""> -->
            <a href="/dashboard">
                <div class="icon-w">
                    <div class="os-icon os-icon-layout"></div>
                </div>
                <span>Dashboard</span>
            </a>
            <div class="sub-menu-w">
                <div class="sub-menu-header">Dashboard</div>
                <div class="sub-menu-icon">
                    <i class="os-icon os-icon-layout"></i>
                </div>
                <!-- <div class="sub-menu-i">
                    <ul class="sub-menu">
                        <li><a href="index.html">Dashboard 1</a></li>
                        <li><a href="apps_crypto.html">Crypto Dashboard <strong class="badge badge-danger">Hot</strong></a></li>
                        <li><a href="apps_support_dashboard.html">Dashboard 3</a></li>
                        <li><a href="apps_projects.html">Dashboard 4</a></li>
                        <li><a href="apps_bank.html">Dashboard 5</a></li>
                        <li><a href="layouts_menu_top_image.html">Dashboard 6</a></li>
                    </ul>
                </div> -->
                <topbar></topbar>
            </div>
        </li>
        <li>
            <a href="/wallets/list">
                <div class="icon-w"><div class="os-icon os-icon-wallet-loaded"></div></div>
                <span>Carteiras</span>
            </a>
        </li>
        <li>
            <a href="/transactions/list">
                <div class="icon-w">
                    <div class="os-icon os-icon-package"></div>
                </div>
                <span>Transações</span>
            </a>
        </li>
        <li>
            <a href="/user/mining">
                <div class="icon-w"><div class="os-icon os-icon-zap"></div></div>
                <span>Mineração</span>
            </a>
        </li>
        <li>
            <a href="/coin/assets">
                <div class="icon-w"><div class="os-icon os-icon-layers"></div></div>
                <span>Crypto Ativos</span>
            </a>
        </li>
        <li>
            <a href="/index/fund">
                <div class="icon-w"><div class="os-icon os-icon-target"></div></div>
                <span>Index Fund</span>
            </a>
        </li>
        <li>
            <a href="/trader/arbitrage">
                <div class="icon-w"><div class="os-icon os-icon-activity"></div></div>
                <span>Arbitragem</span>
            </a>
        </li>
        <li class="has-sub-menu" v-if="user.level.is_gateway_elegible">
            <a href="#">
                <div class="icon-w"><div class="os-icon os-icon-grid"></div></div>
                <span>Gateway</span>
            </a>
            <div class="sub-menu-w">
                <div class="sub-menu-header">Gateway</div>
                <div class="sub-menu-icon"><i class="os-icon os-icon-grid"></i></div>
                <div class="sub-menu-i">
                    <ul class="sub-menu">
                        <li><a href="/gateway">Api Key</a></li>
                        <li><a href="/gateway/pdv">PDV</a></li>
                        <li><a href="/gateway/payments">Transações</a></li>
                    </ul>
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Topbar from './Topbar'

  export default {
    name: "TopMenuList",
    components: {
        Topbar
    },
    computed: {
      ...mapGetters([
        'user'
      ]),
    }
  }
</script>

<style scoped>
</style>
