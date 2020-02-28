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
        Caros usuários,

      </p>

      <p>
        Para desativar 2FA, é necessário enviar um e-mail para contato@liquidex.com.br e anexar uma foto tipo selfie do
        usuário, com o documento com foto e com CPF legível, um papel com data do dia e a frase "QUERO REMOVER O 2FA".

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
