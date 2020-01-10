<template>
  <modal>
    <template slot="header">
      <h6 class="pull-left ml-3 mt-2">
        Caros usuários,
      </h6>

      <button class="btn btn-grey pull-right"
              type="button"
              @click="closeModal">
        <i class="os-icon os-icon-close"></i>
      </button>
    </template>

    <template slot="body">
      <p>
        Nesse início de ano, foi necessário realizar a troca de equipamento do servidor novamente, pois o volume de
        processamento de informações com Masternodes e envios de criptomoedas aumentou em 10x.
        <br>
        Com isso, comunicamos que até o dia 17/01, concluiremos a migração de todas as contas entre os equipamentos, se você está com sua conta bloqueada, pedimos que aguarde o término da migração, ela está sendo feita por ordem de Keycode.
      </p>

      <p>
        Agradecemos a compreensão. <br>
        Equipe Liquidex
      </p>
    </template>
    <template slot="footer">
      <div class="col-sm-12 text-center">
        <button class="btn btn-primary" type="button" @click="closeModal"> Fechar</button>
      </div>
    </template>
  </modal>

</template>

<script>
  import Modal from './../layouts/Modal'

  export default {
    name: "LoginModal",
    methods: {
      closeModal() {
        this.$emit('close')
      }
    },
    components: {
      Modal
    }
  }
</script>

<style scoped>

</style>
