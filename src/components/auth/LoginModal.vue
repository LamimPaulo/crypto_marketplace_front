<template>
  <modal>
    <template slot="header">
      <h6 class="pull-left ml-3 mt-2">
        Caros usuários,
      </h6>

      <button class="btn btn-grey pull-right" type="button" @click="closeModal">
        <i class="os-icon os-icon-close"></i>
      </button>
    </template>

    <template slot="body">
      <p>
        Estamos realizando manutenções de rede e hardware em nosso servidor para
        melhor atendê-lo.
      </p>

      <p>Nosso node de LQX está em manutenção e os envios de LQX seguirão bloqueados até o término da manutenção.</p>

      <p>Estimativa de retorno dos serviços em 31/03/2020.</p>

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
