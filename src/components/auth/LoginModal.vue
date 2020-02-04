<template>
  <modal>
    <template slot="header">
      <h6 class="pull-left ml-3 mt-2">
        Atenção:
      </h6>

      <button class="btn btn-grey pull-right"
              type="button"
              @click="closeModal">
        <i class="os-icon os-icon-close"></i>
      </button>
    </template>

    <template slot="body">
      <p>
        Todos os Masternodes INATIVOS após dia 15/02/2020,
        serão estornados para carteira de origem.
      </p>
      <p>
        As recompensas serão creditadas na carteira, bem como a opção para pagamento do servidor em LQX.
      </p>
      <p>
        Vale lembrar que o PIN Founder, somente terá validade para servidores internos, qualquer usuário
        de servidores externos não serão considerados PIN FOUNDER.
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
