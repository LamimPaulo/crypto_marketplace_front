<template>
  <modal>
    <template slot="header">
      <h6 class="pull-left ml-3 mt-2">
        Atenção:
      </h6>

      <button class="btn btn-grey pull-right" type="button" @click="closeModal">
        <i class="os-icon os-icon-close"></i>
      </button>
    </template>

    <template slot="body">
      <p>
        Caros usuários,
      </p>

      <p>
        É altamente recomendada a atualização das carteiras offline para a
        versão mais recente disponibilizada em
        <a href="https://lqxcoin.com/" target="_blank">https://lqxcoin.com/</a>.
      </p>
      <p>
        Transações efetuadas de carteiras desatualizadas para carteiras da
        liquidex correm o risco de serem perdidas definitivamente devido à
        diferença de versão das mesmas. Esta é uma conveção da blockchain, não
        sendo de responsabilidade da liquidex a ocorrência ou não dos casos.
      </p>

      <p>
        Agradecemos a compreensão. <br />
        Equipe Liquidex
      </p>
    </template>
    <template slot="footer">
      <div class="col-sm-12 text-center">
        <button class="btn btn-primary" type="button" @click="closeModal">
          Fechar
        </button>
      </div>
    </template>
  </modal>
</template>

<script>
import Modal from "./../layouts/Modal";

export default {
  name: "LoginModal",
  methods: {
    closeModal() {
      this.$emit("close");
    }
  },
  components: {
    Modal
  }
};
</script>

<style scoped></style>
