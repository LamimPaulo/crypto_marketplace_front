<template>
    <div>
        <div class="loader" v-if="loader"></div>
        <vue-headful title="Seu Perfil Liquidex" description="Liquidex"
        />
        <div class="content-box">

            <div class="row">

                <div class="col-sm-12 col-md-12 col-lg-7">
                    <div class="element-wrapper">
                        <div class="element-box">

                            <div class="element-info">
                                <div class="element-info-with-icon">
                                    <div class="element-info-icon">
                                        <div class="os-icon os-icon-coins-4"></div>
                                    </div>
                                    <div class="element-info-text">
                                        <h5 class="element-inner-header">
                                            Moedas preferenciais
                                        </h5>
                                        <div class="element-inner-desc">
                                            Definição de moedas preferencias para conversão de saldo.<br>
                                            Na ausência de saldo para operações na plataforma, outra moeda preferencial
                                            pode ser usada para
                                            completar o pagamento da operação automaticamente.
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div class="pipelines-w">
                                <div class="pipeline white lined-primary">
                                    <div class="pipeline-body">
                                        <SlickList v-model="wallets" axis="xy" @input="onSortEnd($event)" class="row">
                                            <SlickItem v-for="(wallet, index) in wallets" :index="index"
                                                       :key="wallet.id" class="col-lg-6 col-xxl-3 mb-3">

                                                <div class="pipeline-item">

                                                    <div class="pi-body">
                                                        <div class="avatar">
                                                            <img alt=""
                                                                 :src="require(`@/assets/img/${wallet.coin.icon}`)">
                                                        </div>
                                                        <div class="pi-info">
                                                            <div class="h6 pi-name">
                                                                {{ wallet.coin.abbr }}
                                                            </div>
                                                            <div class="pi-sub">
                                                                {{ wallet.coin.name }}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="pi-foot">
                                                        <div class="tags">
                                                            <a class="tag" href="#">#{{ index + 1}}</a>
                                                        </div>
                                                        <a class="extra-info" href="#">
                                                            <i class="os-icon os-icon-wallet-loaded"></i><span>{{wallet.balance_rounded}}</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </SlickItem>
                                        </SlickList>
                                    </div>
                                </div>


                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
	import {SlickItem, SlickList} from 'vue-slicksort';

	export default {
		name: "UserConfigs",
		components: {
			SlickItem,
			SlickList
		},
		data() {
			return {
				wallets: [],
				loader: true,
			}
		},
		methods: {
			onSortEnd: function (evt) {
				this.loader = true
				this.$store.dispatch('updateWalletsConversionOrder', {wallets: evt})
					.then(response => {
						this.wallets = response.data.wallets
						this.loader = false
					})
					.catch(error => {
						if (error.response) {
							this.handleErrors(error.response)
						}
						this.loader = false
					})
			},
			retrieveWalletsConversionOrder() {
				this.$store.dispatch('retrieveWalletsConversionOrder')
					.then(response => {
						this.wallets = response.data.wallets
						this.loader = false
					})
					.catch(error => {
						if (error.response) {
							this.handleErrors(error.response)
						}
						this.loader = false
					})
			},
		},
		mounted() {
			this.retrieveWalletsConversionOrder()
		},
	}
</script>

<style scoped>

</style>
