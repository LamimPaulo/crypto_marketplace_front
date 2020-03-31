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
        Bom dia, os envios e recebimentos de LQX estarão liberados na Liquidex
        após 12h de hoje, 31/03/2020.
      </p>

      <p>
        <strong> ATENÇÃO </strong>
      </p>

      <p>
        O endereço da sua carteira de LQX foi trocado, atente-se à este detalhe
        ao realizar transações de LQX envolvendo sua conta da Liquidex.
      </p>

      <p>
        Agradecemos a paciência de todos durante essa manutenção, que foi longa,
        porém necessária.
      </p>

      <p>
        Uma boa semana à todos.
      </p>

      <p>
        Equipe Liquidex
      </p>
    </template>
    <template slot="footer">
      <div class="col-sm-12 text-center">
        <button class="btn btn-primary" type="button" @click="closeModal">
          LI E COMPREENDI
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
