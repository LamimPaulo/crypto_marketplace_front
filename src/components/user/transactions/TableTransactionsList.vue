<template>
    <div>
        <table class="table table-lightborder table-striped">
            <thead>
            <tr>
                <th></th>
                <th> Criação</th>
                <th> Transação</th>
                <th> Tx</th>
                <th> Valor</th>
                <th class="text-center"> Status <br> Efetivação</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="transaction in transactions" v-if="(transaction.category!==22)||(transaction.category===22&&transaction.dateShow)">
                <td>
                    <button @click.prevent="receiptModalTransactions(transaction)"
                            class="btn btn-rounded btn-sm btn-primary">
                      <i class="os-icon os-icon-search"></i></button>
                </td>
                <td> {{ transaction.dateLocal }}</td>
                <td>
                    <!--transactions-->
                    <div class="value" v-if="transaction.category===1">
                        {{ transaction.coin.abbr}} {{ transaction.type === 1 ? 'Recebido' : 'Enviado' }}
                    </div>
                    <!--orders-->
                    <div class="value" v-else-if="transaction.category===2">
                        {{ transaction.type === 1 ? 'Ordem de Compra' : 'Ordem de Venda' }} {{ transaction.coin.abbr}}
                    </div>
                    <!--deposits-->
                    <div class="value" v-else-if="transaction.category===3">
                        Depósito {{ transaction.coin.abbr}}
                    </div>
                    <!--drafts-->
                    <div class="value" v-else-if="transaction.category===4">
                        Saque {{ transaction.coin.abbr}}
                    </div>
                    <!--conversions-->
                    <div class="value" v-else-if="transaction.category===6">
                        Conversão {{ transaction.coin.abbr}}
                        <i class="os-icon os-icon-arrow-down-left text-success" v-if="transaction.type===1"></i>
                        <i class="os-icon os-icon-arrow-down-right text-danger" v-if="transaction.type===2"></i>
                    </div>
                    <!--transfer-->
                    <div class="value" v-else-if="transaction.category===8">
                        Transferência
                        <span v-if="transaction.type===1">Recebida</span>
                        <span v-if="transaction.type===2">Efetuada</span>
                        {{ transaction.coin.abbr}}
                    </div>
                    <!--Investimento-->
                    <div class="value" v-else-if="transaction.category===9">
                        <span v-if="transaction.type===1">Resgate</span>
                        <span v-if="transaction.type===2">Investimento</span>
                        Nanotech {{ transaction.coin.abbr}}
                    </div>
                    <!--Index Fund-->
                    <div class="value" v-else-if="transaction.category===10">
                        <span v-if="transaction.type===1">Resgate</span>
                        <span v-if="transaction.type===2">Aquisição</span>
                        Fundo {{ transaction.coin.abbr}}
                    </div>

                    <!--Credminer-->
                    <div class="value" v-else-if="transaction.category===11">
                        Credminer {{ transaction.coin.abbr}}
                    </div>

                    <!--Level-->
                    <div class="value" v-else>
                        {{ transaction.categoryName}}
                    </div>

                </td>
                <td>
                    <!--transactions-->
                    <a target="_blank" :href="transaction.coin.tx_explorer + transaction.tx"
                       v-if="transaction.category===1">
                        {{ transaction.tx | shortStr }}
                    </a>
                    <!--orders-->
                    <a target="_blank" :href="'/order/' + transaction.tx" v-else-if="transaction.category===2">
                        {{ transaction.tx | shortStr }}
                    </a>
                    <!--conversions-->
                    <a target="_blank" :href="'/conversion/' + transaction.tx"
                       v-else-if="transaction.category===6||transaction.category===8">
                        {{ transaction.tx | shortStr }}
                    </a>
                    <!--others-->
                    <span v-else> {{ transaction.tx | shortStr }} </span>
                </td>
                <td>

                    <span v-if="transaction.type===1" class="badge badge-success">{{ transaction.amountRounded }}</span>
                    <span v-if="transaction.type===2" class="badge badge-danger">{{ transaction.amountRounded }}</span>

                </td>
                <td class="text-center">
                  <span :class="'badge badge-'+transaction.statusClass">
                    {{ transaction.statusClient}} <br>
                    {{ transaction.paymentDateLocal || transaction.updatedLocal }}
                  </span>
                </td>
            </tr>


            </tbody>
        </table>

        <receipt-modal-transactions :transaction="transaction" v-show="isReceiptVisible"
                                    @close-token-modal="closeTokenModal"
                                    @retrieve-transactions="retrieveTransactions"/>
    </div>
</template>

<script>
	import ReceiptModalTransactions from './../transactions/ReceiptModalTransactions'

	export default {
		name: "TableTransactionsList",
		props: ['transactions'],
		data() {
			return {
				isReceiptVisible: false,
				isDetalisVisible: false,
				transaction: {
					coin: null
				}
			}
		},
		methods: {
			receiptModalTransactions(transaction) {
				this.transaction = transaction
				this.isReceiptVisible = true
			},
			closeTokenModal() {
				this.isDetalisVisible = false;
				this.isReceiptVisible = false
			},
			retrieveTransactions() {
				this.$emit('retrieve-transactions')
			}
		},
		components: {
			ReceiptModalTransactions
		}
	}
</script>

<style scoped>

</style>
