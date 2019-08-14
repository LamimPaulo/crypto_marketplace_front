<template>
    <div class="row">
        <div class="loader" v-if="loader"></div>
        <vue-headful title="Minhas Carteiras - Liquidex" description="Liquidex"/>

        <div class="col-12">
            <div class="element-box">
                Conversão: <strong> {{ this.$route.params.id }}</strong>
            </div>
        </div>
        <div class="col-6" v-for="conversion in transactions">
            <div class="element-box">
                <h5 class="form-header">
                    {{ conversion.type === 1 ? 'Entrada de' : 'Saída de' }} {{conversion.coin.abbr}}
                    <i class="os-icon os-icon-arrow-down-left text-success" v-if="conversion.type===1"></i>
                    <i class="os-icon os-icon-arrow-down-right text-danger" v-if="conversion.type===2"></i>
                </h5>
                <div class="table-responsive">

                    <table class="table table-lightborder">
                        <tr>
                            <td> Criação</td>
                            <td>{{conversion.dateLocal}}</td>
                        </tr>
                        <tr>
                            <td> Moeda</td>
                            <td> {{ conversion.coin.name }}</td>
                        </tr>
                        <tr>
                            <td> Valor</td>
                            <td> {{ conversion.amountRounded }}</td>
                        </tr>
                        <tr>
                            <td> Cotação Executada</td>
                            <td> {{ conversion.marketRounded }}</td>
                        </tr>
                        <tr>
                            <td> Fee</td>
                            <td> {{ conversion.feeRounded }}</td>
                        </tr>
                        <tr>
                            <td> Taxas</td>
                            <td> {{ conversion.taxRounded }}</td>
                        </tr>
                        <tr>
                            <td> Status</td>
                            <td> {{ conversion.statusName }}</td>
                        </tr>
                        <tr>
                            <td> Atualização</td>
                            <td v-if="conversion.status===3"> {{ conversion.updatedLocal }}</td>
                            <td v-if="conversion.status!==3"> {{ conversion.timestamp }}</td>
                        </tr>

                    </table>

                </div>
            </div>
        </div>
    </div>


</template>

<script>
	export default {
		name: "Conversion",
		data() {
			return {
				transactions: [],
				loader: true
			}
		},
		methods: {
			retrieveOrder() {
				this.$store.dispatch('retrieveConversionTx', this.$route.params.id)
					.then(response => {
						this.transactions = response.data.order
						this.loader = false
					})
					.catch(error => {
						this.loader = false
						if (error.response) {
							this.handleErrors(error.response)
						}
					})
			},
		},
		mounted() {
			this.retrieveOrder()
		}
	}
</script>

<style scoped>

</style>
