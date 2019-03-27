<template>
    <ul class="main-menu">
        <li class="sub-header"><span>Layouts</span></li>
        <li class="has-sub-menu">
            <a href="/dashboard">
                <div class="icon-w">
                    <img  :src="require(`@/assets/img/svg_icons/customize-view.png`)" width="30px" alt="">
                </div>
                <span>Dashboard</span>
            </a>
            <div class="sub-menu-w">
                <div class="sub-menu-header">Dashboard</div>
                <div class="sub-menu-icon">
                    <i class="fas fa-tachometer-alt"></i>
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
        <li class="has-sub-menu">
            <a href="/wallets/list">
                <div class="icon-w"><img  :src="require(`@/assets/img/svg_icons/icons8-wallet-40.png`)" width="30px" alt=""></div>
                <span>Carteiras</span>
            </a>
        </li>
        <li class="has-sub-menu">
            <a href="/transactions/list">
                <div class="icon-w">
                    <img  :src="require(`@/assets/img/svg_icons/icons8-exchange-40.png`)" width="30px" alt="">
                </div>
                <span>Transações</span>
            </a>
        </li>
        <li class="has-sub-menu">
            <a href="/user/mining">
                <div class="icon-w"><img  :src="require(`@/assets/img/svg_icons/icons8-processor-40.png`)" width="30px" alt=""></div>
                <span>Mineração</span>
            </a>
        </li>
        <li class="has-sub-menu">
            <a href="/coin/assets">
                <div class="icon-w"><img  :src="require(`@/assets/img/svg_icons/icons8-coins-40.png`)" width="30px" alt=""></div>
                <span>Crypto Ativos</span>
            </a>
        </li>
        <li class="has-sub-menu">
            <a href="/index/fund">
                <div class="icon-w"><img  :src="require(`@/assets/img/svg_icons/line-chart.png`)" width="30px" alt=""></div>
                <span>Index Fund</span>
            </a>
        </li>
        <li class="has-sub-menu">
            <a href="/trader/arbitrage">
                <div class="icon-w"><img  :src="require(`@/assets/img/svg_icons/icons8-increase-40.png`)" width="30px" alt=""></div>
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
.main-menu {
    border-bottom: 1px solid #fff;
}


/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (max-width: 1450px) {
    .menu-w.menu-layout-compact ul.main-menu > li > a {
        font-size: 1rem;
    }
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (max-width: 1250px) {
    .menu-w.menu-layout-compact ul.main-menu > li > a {
        font-size: 0.6rem;
    }
}
</style>
