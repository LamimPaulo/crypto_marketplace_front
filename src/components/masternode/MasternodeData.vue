<template>
    <div class="element-wrapper">
        <h6 class="element-header mb-0">
            Masternode Stats
        </h6>
        <div class="element-box-tp">
            <div class="table-responsive">
                <table class="table table-padded">
                    <thead>
                    <tr>
                        <th class="text-center"><i class="os-icon os-icon-calendar-time"></i> Atualização</th>
                        <th class="text-center" colspan="2"><i class="os-icon os-icon-bar-chart"></i> Moeda</th>
                        <th class="text-center"><i class="os-icon os-icon-coins-4"></i> Retorno Diário</th>
                        <th class="text-center"><i class="os-icon os-icon-coins-4"></i> Retorno BTC</th>
                        <th class="text-center"><i class="os-icon os-icon-arrow-up6"></i> Roi</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="data in masternodes">
                        <td>{{data.createdLocal}}</td>
                        <td>
                            <img alt="" :src="require(`@/assets/img/${data.coin.icon}`)" style="width: 25px">
                        </td>
                        <td>{{data.coin.abbr}}</td>
                        <td>{{data.daily_return}}</td>
                        <td>{{data.daily_return_btc}}BTC</td>
                        <td>{{data.roiLocal}}%</td>

                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
	export default {
		name: "MasternodeData",
		data() {
			return {
				masternodes: {},
				timer: null,
			}
		},
		methods: {
			retrieveMasternodes() {
				this.$store.dispatch('retrieveMasternodes')
					.then(response => {
						this.masternodes = response.data
					})
					.catch(error => {
						if (error.response) {
							this.handleErrors(error.response)
						}
					})
			}
			,
		},
		mounted() {
			this.retrieveMasternodes();
			this.timer = setInterval(function () {
				this.retrieveMasternodes();
			}.bind(this), 360000);
		}
	}
</script>

<style scoped>

</style>
