<template>
    <ul class="main-menu">
        <li class="selected" v-if="user.country_id===31">
            <div class="sub-menu-w" style="z-index: 50; margin-top: -25px">
                <topbar></topbar>
            </div>
        </li>
        <li>
            <a href="/dashboard">
                <div class="icon-w">
                    <img :src="require(`@/assets/img/svg_icons/customize-view.png`)" width="30px" alt="">
                </div>
                <span>Dashboard</span>
            </a>
        </li>
        <li>
            <a href="/wallets/list">
                <div class="icon-w"><img  :src="require(`@/assets/img/svg_icons/icons8-wallet-40.png`)" width="30px" alt=""></div>
                <span>Carteiras</span>
            </a>
        </li>
        <li>
            <a href="/transactions/list">
                <div class="icon-w">
                    <img  :src="require(`@/assets/img/svg_icons/icons8-exchange-40.png`)" width="30px" alt="">
                </div>
                <span>Transações</span>
            </a>
        </li>
        <li>
            <a href="/masternode">
                <div class="icon-w">
                    <img  :src="require(`@/assets/img/svg_icons/icons8-expensive-price-40.png`)" width="30px" alt="">
                </div>
                <span>Masternode</span>
            </a>
        </li>
        <li>
            <a href="/levels">
                <div class="icon-w"><img  :src="require(`@/assets/img/svg_icons/icons8-coins-40.png`)" width="30px" alt=""></div>
                <span>Keycodes</span>
            </a>
        </li>
        <li>
            <a href="/index/fund">
                <div class="icon-w"><img  :src="require(`@/assets/img/svg_icons/line-chart.png`)" width="30px" alt=""></div>
                <span>Investimentos</span>
            </a>
        </li>
        <li>
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

ul.main-menu li:hover {
    background-color: #b8bbc4;
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
