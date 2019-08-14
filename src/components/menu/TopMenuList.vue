<template>
    <div>
        <ul class="main-menu">
            <li>
                <router-link to="/dashboard">
                    <div class="icon-w">
                        <img :src="require(`@/assets/img/svg_icons/customize-view.png`)"
                             width="30px" alt="">
                    </div>
                    <span>Dashboard</span>
                </router-link>
            </li>
            <li>
                <router-link to="/wallets/list">
                    <div class="icon-w">
                        <img :src="require(`@/assets/img/svg_icons/icons8-wallet-40.png`)"
                             width="30px" alt="">
                    </div>
                    <span>Carteiras</span>
                </router-link>
            </li>
            <li>
                <router-link to="/transactions/list">
                    <div class="icon-w">
                        <img :src="require(`@/assets/img/svg_icons/icons8-exchange-40.png`)"
                             width="30px" alt="">
                    </div>
                    <span>Transações</span>
                </router-link>
            </li>
            <li>
                <router-link to="/masternode">
                    <div class="icon-w">
                        <img :src="require(`@/assets/img/svg_icons/icons8-expensive-price-40.png`)"
                             width="30px" alt="">
                    </div>
                    <span>Masternode</span>
                </router-link>
            </li>
            <li>
                <router-link to="/levels">
                    <div class="icon-w">
                        <img :src="require(`@/assets/img/svg_icons/icons8-coins-40.png`)"
                             width="30px" alt="">
                    </div>
                    <span>Keycodes</span>
                </router-link>
            </li>
            <li>
                <router-link to="/index/fund">
                    <div class="icon-w">
                        <img :src="require(`@/assets/img/svg_icons/line-chart.png`)"
                             width="30px" alt="">
                    </div>
                    <span>Investimentos</span>
                </router-link>
            </li>
            <li>
                <router-link to="/nanotech/lqx">
                    <div class="icon-w">
                        <img :src="require(`@/assets/img/svg_icons/icons8-increase-40.png`)"
                             width="30px" alt="">
                    </div>
                    <span>Nanotech</span>
                </router-link>
            </li>
            <li class="">
                <router-link to="/mining">
                    <div class="icon-w">
                        <img :src="require(`@/assets/img/icons/mining.png`)"
                             width="30px" alt="">
                    </div>
                    <span>Mining</span>
                </router-link>
            </li>


        </ul>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "TopMenuList",
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

    .main-menu li span {
        font-size: 0.9em;
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
            font-size: 0.8rem;
        }
    }

</style>
