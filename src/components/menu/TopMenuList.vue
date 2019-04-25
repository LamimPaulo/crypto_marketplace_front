<template>
    <ul class="main-menu">
        <li class="selected has-sub-menu">
            <a href="/dashboard">
                <div class="icon-w">
                    <img :src="require(`@/assets/img/svg_icons/customize-view.png`)" width="30px" alt="">
                </div>
                <span>Dashboard</span>
            </a>
            <div class="sub-menu-w" style="z-index: 99">
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
            <a href="/masternode">
                <div class="icon-w">
                    <img  :src="require(`@/assets/img/svg_icons/icons8-expensive-price-40.png`)" width="30px" alt="">
                </div>
                <span>Masternode</span>
            </a>
        </li>
        <li class="has-sub-menu">
            <a href="/levels">
                <div class="icon-w"><img  :src="require(`@/assets/img/svg_icons/icons8-coins-40.png`)" width="30px" alt=""></div>
                <span>Níveis</span>
            </a>
        </li>
        <li class="has-sub-menu">
            <a href="/index/fund">
                <div class="icon-w"><img  :src="require(`@/assets/img/svg_icons/line-chart.png`)" width="30px" alt=""></div>
                <span>Investimentos</span>
            </a>
        </li>
        <li class="has-sub-menu">
            <a href="/nanotech/lqx">
                <div class="icon-w"><img  :src="require(`@/assets/img/svg_icons/icons8-increase-40.png`)" width="30px" alt=""></div>
                <span>Nanotech</span>
            </a>
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
        /*font-size: 0.6rem;*/
    }
}

</style>
