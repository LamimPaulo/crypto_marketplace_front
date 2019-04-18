<template>
  <ul class="main-menu">
    <li class="selected" v-tooltip.right="'Dashboard'">
      <a href="/dashboard">
        <div class="icon-w">
          <div class="os-icon os-icon-layout"></div>
        </div>
        <span>Dashboard</span>
      </a>
    </li>
    <li class="" v-tooltip.right="'Carteiras'">
      <a href="/wallets/list">
        <div class="icon-w">
          <div class="os-icon os-icon-wallet-loaded"></div>
        </div>
        <span>Carteiras</span>
      </a>
    </li>
    <li class="" v-tooltip.right="'Transações'">
      <a href="/transactions/list">
        <div class="icon-w">
          <div class="os-icon os-icon-refresh-cw"></div>
        </div>
        <span>Transações</span>
      </a>
    </li>
    <li class="" v-tooltip.right="'Mineração'">
      <a href="/user/mining">
        <div class="icon-w">
          <div class="os-icon os-icon-zap"></div>
        </div>
        <span>Mineração</span>
      </a>
    </li>
    <li class="" v-tooltip.right="'Crypto Ativos'">
      <a href="/coin/assets">
        <div class="icon-w">
          <div class="os-icon os-icon-layers"></div>
        </div>
        <span>Crypto Ativos</span>
      </a>
    </li>

    <li class="" v-tooltip.right="'Investimentos'">
      <a href="/index/fund">
        <div class="icon-w">
          <div class="os-icon os-icon-target"></div>
        </div>
        <span>Investimentos</span>
      </a>
    </li>

    <li class="" v-tooltip.right="'Nanotech'">
      <a href="/trader/arbitrage">
        <div class="icon-w">
          <div class="os-icon os-icon-activity"></div>
        </div>
        <span>Nanotech</span>
      </a>
    </li>

    <li class="has-sub-menu" v-tooltip.right="'Gateway'" v-if="user.level.is_gateway_elegible">
      <a href="#">
        <div class="icon-w">
          <div class="os-icon os-icon-ui-54"></div>
        </div>
        <span>Gateway</span>
      </a>
      <ul class="sub-menu">
        <li><a href="/gateway">Api Key</a></li>
        <li><a href="/gateway/pdv">PDV</a></li>
        <li><a href="/gateway/payments">Transações</a></li>

      </ul>
    </li>

  </ul>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "MenuList",
    computed: {
      ...mapGetters([
        'user'
      ]),
    }
  }
</script>

<style scoped>
  .menu-w .logo-w img {
    width: 85%;
  }

  .menu-w {
    height: 100%;
    min-width: 260px;
  }

  .menu-w.menu-layout-compact {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 260px;
    flex: 0 0 260px;
  }
</style>
