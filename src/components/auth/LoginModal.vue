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

            <p>Todos os Masternodes que foram desfeitos, e estornadas as moedas para sua carteira, abriremos uma nova
                janela de recontratação de Masternodes. Para que isso não afete os casos de PIN FOUNDER.</p>
            <p>
                Não é necessário abrir ticket para questionar esse tema, assim que abrirmos essa janela de
                recontratação, deixaremos um recado e avisaremos nos canais oficiais da Liquidex.
            </p>
            <p>
                Essa solução poderá ser esperada para as próximas 2 semanas, dia 01/03 colocaremos no ar, mas somente
                para os que tiveram os Masternodes desfeitos, e haverá um prazo de 2 semanas para recontratar.
            </p>
            <p>
                Após essa data, não haverá mais contratação de Masternodes via Liquidex, somente a manutenção dos
                ativos.
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
