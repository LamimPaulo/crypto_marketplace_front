<template>
  <div class="logged-user-menu color-style-bright">
    <a href="/profile" class="logged-user-avatar-info">
      <div class="avatar-w">
        <img alt="" src="../../assets/img/avatar-dev.png">
      </div>
      <div class="logged-user-info-w">
        <div class="logged-user-name">
          {{ this.$store.state.user.name }}
        </div>
        <div class="logged-user-role">
          {{ this.$store.state.user.level.name }}
        </div>
      </div>
    </a>
    <div class="bg-icon">
      <i class="os-icon os-icon-wallet-loaded"></i>
    </div>
    <ul>
      <li>
        <a href="/profile">
          <i class="os-icon os-icon-user-male-circle2"></i> <span>Detalhes do Perfil</span> </a>
      </li>
      <li>
        <a href="/payment-accounts">
          <i class="os-icon os-icon-coins-4"></i><span>Dados de Pagamento</span>
        </a>
      </li>
      <li>
        <a href="/user-configs">
          <i class="os-icon os-icon-settings"></i><span>Configurações</span>
        </a>
      </li>

      <li>
        <a href="/logout">
          <i class="os-icon os-icon-signs-11"></i><span>Sair</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "DropdownProfile"
  }
</script>

<style scoped>

</style>
